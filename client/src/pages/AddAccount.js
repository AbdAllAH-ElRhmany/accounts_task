// src/pages/AddAccount.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AddAccount() {
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/accounts/', {
        account_holder: accountHolder,
        account_number: accountNumber,
        balance: accountBalance,
      });
      setMessage({ type: 'success', text: 'Account added successfully.' });
      navigate('/'); // Redirect to account list
    } catch (error) {
      console.error('Error adding account:', error);
      setMessage({ type: 'error', text: 'Failed to add account.' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add Account
      </Typography>
      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Account Holder"
          fullWidth
          margin="normal"
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
        />
        <TextField
          label="Account Number"
          fullWidth
          margin="normal"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <TextField
          label="Account Balance"
          fullWidth
          margin="normal"
          value={accountBalance}
          onChange={(e) => setAccountBalance(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Account
        </Button>
      </form>
    </Box>
  );
}

export default AddAccount;
