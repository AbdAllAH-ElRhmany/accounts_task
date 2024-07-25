from django.db import models
from django.core.exceptions import ValidationError
from decimal import Decimal
# Create your models here.

class Account(models.Model):
    account_number = models.CharField(max_length=30, unique=True)
    account_holder = models.CharField(max_length=150)
    balance = models.DecimalField(max_digits=20, decimal_places=2)
    
    
    
    
    def clean(self):
        if not self.account_number or not self.account_holder:
            raise ValidationError('Account number and account name are required.')
        if self.balance < Decimal('0.00'):
            raise ValidationError('Balance cannot be negative.')

    def save(self, *args, **kwargs):
        self.clean()  
        super().save(*args, **kwargs)


    
    def __str__(self):
        return f"{self.account_holder} - {self.account_number}"