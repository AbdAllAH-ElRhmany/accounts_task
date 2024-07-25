from django.test import TestCase

# Create your tests here.

from django.test import TestCase
from .repositories import AccountRepository
from .services import AccountService
from decimal import Decimal
from django.core.exceptions import ValidationError

class AccountTests(TestCase):

    def setUp(self):
        accounts = [
            {
                'account_number': '1232545-564654',
                'account_holder': 'test1',
                'balance': 12533
            },
            {
                'account_number': '1232545-56434654',
                'account_holder': 'test2',
                'balance': 123
            }
        ]
        for acc in accounts:
            AccountRepository.store(acc)
        # AccountRepository.store('123', 'John Doe', Decimal('1000.00'))
        # AccountRepository.create_account('456', 'Jane Doe', Decimal('500.00'))

    def test_transfer_funds(self):
        AccountService.transfer_funds('1232545-56434654', '1232545-564654', 10)
        source_account = AccountRepository.get_account_by_number('1232545-56434654')
        destination_account = AccountRepository.get_account_by_number('1232545-564654')

        self.assertEqual(source_account.balance, Decimal('800.00'))
        self.assertEqual(destination_account.balance, Decimal('700.00'))

    def test_transfer_funds_insufficient(self):
        with self.assertRaises(ValueError):
            AccountService.transfer_funds('1232545-56434654', '1232545-564654', 255)

    def test_transfer_funds_negative_amount(self):
        with self.assertRaises(ValidationError):
            AccountService.transfer_funds('1232545-56434654', '1232545-564654', 2588)