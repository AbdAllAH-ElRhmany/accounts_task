from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Account
from .serializers import AccountSerializer, TransferSerializer
from .services import AccountService
import os
from django.core.exceptions import ValidationError
from .tasks import transfer_funds_task  
from django.http import FileResponse
from django.urls import reverse



class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    @action(detail=False, methods=['post'])
    def import_accounts(self, request):
        if 'file' not in request.FILES:
            return Response({'error': 'file is required'}, status=400)

        file = request.FILES['file']
        error_file_path = AccountService.import_accounts_from_csv(file)

        if error_file_path:
            # Generate the file name from the path
            file_name = os.path.basename(error_file_path)
            # Generate the URL for the error file
            download_link = request.build_absolute_uri(f'/api/accounts/{file_name}/')
            return Response({'status': 'accounts imported with errors', 'error_file': download_link})

        return Response({'status': 'accounts imported successfully'})




    @action(detail=True, methods=['post'])
    def transfer(self, request, pk=None):
        serializer = TransferSerializer(data=request.data)
        if serializer.is_valid():
            source_account_number = pk
            destination_account_number = serializer.validated_data['destination_account_number']
            amount = serializer.validated_data['amount']

            try:
                
                AccountService.transfer_funds(source_account_number, destination_account_number, amount)
                return Response({'msg': 'transfered successfully'})
                # إرسال المهمة إلى Celery
                transfer_funds_task.delay(source_account_number, destination_account_number, amount)
                return Response({'status': 'transfer initiated'})
            except (ValueError, ValidationError) as e:
                return Response({'error': str(e)}, status=400)
        return Response(serializer.errors, status=400)
    
    
    @staticmethod
    def serve_error_file(self, request, file_name=None):
        # Adjust the path according to where your error files are stored
        # Assuming the file is located in the root directory of the project
        file_path = os.path.join(os.path.dirname(file_name))
        file_path = os.path.abspath(file_path)

        if not os.path.exists(file_path):
            raise Http404("File not found")

        return FileResponse(open(file_path, 'rb'), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')