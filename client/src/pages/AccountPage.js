import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAccount } from '../api';
import TransferForm from '../components/TransferForm';

function AccountPage() {
  const [account, setAccount] = useState(null);
  const { id } = useParams();
  const accountId = id;

  useEffect(() => {
    const loadAccount = async () => {
      const data = await fetchAccount(accountId);
      setAccount(data);
    };
    loadAccount();
  }, [accountId]);

  const handleTransferComplete = () => {
    // Reload account details after a successful transfer
    const loadAccount = async () => {
      const data = await fetchAccount(accountId);
      setAccount(data);
    };
    loadAccount();
  };

  return (
    <div>
      {account ? (
        <div>
          <h1>Account Details</h1>
          <p>Account Number: {account.account_number}</p>
          <p>Account Holder: {account.account_holder}</p>
          <p>Balance: {account.balance}</p>
          <TransferForm sourceAccount={account.account_number} onTransferComplete={handleTransferComplete} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AccountPage;
