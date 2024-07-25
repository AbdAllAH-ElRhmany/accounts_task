from .models import Account
from django.core.exceptions import ValidationError

class AccountRepository:
    
    @staticmethod
    def get_all():
        return Account.objects.all()
    
    @staticmethod
    def get_account_by_number(account_number):
        try:
            return Account.objects.get(account_number=account_number)
        except Account.DoesNotExist:
            return None
    @staticmethod
    def search_in_accounts_by_number(acc_num):
        return Account.objects.filter(Q (account_number__icontains=acc_num))
    
    @staticmethod
    def store(acc_data):
        if acc_data['balance'] < 0:
            raise ValidationError("Balance cannot be negative")
        
        account = Account(
            account_number = acc_data['account_number'],
            account_holder = acc_data['account_holder'],
            balance=acc_data['balance']
        )
        account.clean()  # Validate the account
        account.save()
        return account
    
    
    
    @staticmethod
    def update_balance(account_number, new_balance):
        if new_balance < 0:
            raise ValidationError("New balance cannot be negative")
        
        account = AccountRepository.get_account_by_number(account_number)
        account.balance = new_balance
        account.clean()  #
        account.save()
        return account