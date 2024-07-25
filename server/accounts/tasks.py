# accounts/tasks.py

from celery import shared_task
from .services import AccountService
from django.core.exceptions import ValidationError

@shared_task
def transfer_funds_task(source_account_number, destination_account_number, amount):
    try:
        AccountService.transfer_funds(source_account_number, destination_account_number, amount)
    except (ValueError, ValidationError) as e:
        print(f'Error occurred during fund transfer: {e}')
