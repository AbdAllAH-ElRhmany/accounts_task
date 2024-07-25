// api.js
const API_BASE = 'http://127.0.0.1:8000/api';

export const fetchAccounts = async () => {
  const response = await fetch(`${API_BASE}/accounts/`);
  return response.json();
};

export const fetchAccount = async (id) => {
  const response = await fetch(`${API_BASE}/accounts/${id}`);
  console.log(response)
  return response.json();
};

export const transferFunds = async (source, destination, amount) => {
  const response = await fetch(`${API_BASE}/accounts/${source}/transfer/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      destination_account_number: destination,
      amount: amount,
    }),
  });
  return response.json();
};
