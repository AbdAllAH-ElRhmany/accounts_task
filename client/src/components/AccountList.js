import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Typography, Input, Box, ListItem, ListItemText, List, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/accounts/');
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setMessage({ type: 'error', text: 'Failed to load accounts.' });
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/accounts/import_accounts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      if (response.data.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'errors.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
        setMessage({ type: 'warning', text: 'Accounts imported with errors. Error file has been downloaded.' });
      } else {
        setMessage({ type: 'success', text: 'Accounts imported successfully.' });
        loadAccounts();
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage({ type: 'error', text: 'Failed to upload file.' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Account List
      </Typography>
      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}
      <Button variant="contained" color="primary" component={Link} to="/add-account" sx={{ mb: 2 }}>
        Add Account
      </Button>
      <Input type="file" onChange={handleFileChange} sx={{ mb: 2 }} />
      <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mb: 2 }}>
        Upload Accounts
      </Button>
      <List>
        {accounts.map(account => (
          <ListItem button component={Link} to={`/accounts/${account.id}`} key={account.id}>
            <div>
              <h4>Name: {account.account_holder}</h4>
              <ListItemText primary={`Account ${account.account_number}`} />
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default AccountList;
