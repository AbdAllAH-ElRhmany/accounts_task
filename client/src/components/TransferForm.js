import React, { useState } from 'react';
import { transferFunds } from '../api';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

function TransferForm({ sourceAccount, onTransferComplete }) {
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    try {
      const result = await transferFunds(sourceAccount, destination, amount);
      if (result.msg) {
        setMessage({ type: 'success', text: result.msg });
        setDestination('');
        setAmount('');
        if (onTransferComplete) {
          onTransferComplete(); // Notify parent component about the transfer completion
        }
      } else {
        setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        setMessage({ type: 'error', text: 'Please correct the errors and try again.' });
      } else {
        setMessage({ type: 'error', text: 'An error occurred during the transfer.' });
      }
    }
  };

  const handleClose = () => {
    setMessage(null);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button component={Link} to="/accounts" variant="outlined" sx={{ mb: 2 }}>
        Back to Accounts
      </Button>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Destination Account Number"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.destination_account_number}
          helperText={errors.destination_account_number?.[0]}
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.amount}
          helperText={errors.amount?.[0]}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Transfer
        </Button>
        {message && (
          <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={message.type} sx={{ width: '100%' }}>
              {message.text}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </Box>
  );
}

export default TransferForm;
