import csv
from decimal import Decimal
from django.core.exceptions import ValidationError
from openpyxl import Workbook
from io import StringIO
from .repositories import AccountRepository

class AccountService:

    @staticmethod
    def import_accounts_from_csv(uploaded_file):
        errors = [] # errors array for errors excel
        accounts_data = []
        error_file_path = 'errors.xlsx'

      
        uploaded_file.seek(0)  
        file_data = uploaded_file.read().decode('utf-8')
        csvfile = StringIO(file_data)
        
        reader = csv.DictReader(csvfile)
        for row in reader:
            try:
                exists = AccountRepository.get_account_by_number(row['ID'])
                print(exists)
                if exists:
                    row['error'] = "Account number is exists"
                    errors.append(row)
                    continue
                item = {}
                item['account_number'] = row['ID']
                item['account_holder'] = row['Name']
                item['balance'] = Decimal(row['Balance'])

                # Save account after validate it in model
                AccountRepository.store(item)
                accounts_data.append(row)

            except (KeyError, ValueError, ValidationError) as e:
                # get errors if exists
                row['error'] = str(e)
                errors.append(row)

        # return new excel with each row with its error
        if errors:
            wb = Workbook()
            ws = wb.active
            ws.append(['ID', 'Name', 'Balance', 'error'])
            for error_row in errors:
                ws.append([error_row.get('ID', ''), 
                    error_row.get('Name', ''), 
                    error_row.get('Balance', ''), 
                    error_row.get('error', '')])
            wb.save(error_file_path)

            # Return file path for response
            return error_file_path
        return None

    @staticmethod
    def transfer_funds(source_account_number, destination_account_number, amount):
        if amount <= 0:
            raise ValidationError("Transfer amount must be positive")

        source_account = AccountRepository.get_account_by_number(source_account_number)
        destination_account = AccountRepository.get_account_by_number(destination_account_number)

        if source_account.balance < amount:
            raise ValueError("Insufficient funds")

        source_account.balance -= amount
        destination_account.balance += amount

        AccountRepository.update_balance(source_account_number, source_account.balance)
        AccountRepository.update_balance(destination_account_number, destination_account.balance)
