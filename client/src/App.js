// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import AccountList from './components/AccountList';
import { Container } from '@mui/material';
import AddAccount from './pages/AddAccount';

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/accounts/:id" element={<AccountPage />} />
          <Route path="/accounts" element={<AccountList />} />
          <Route path="/add-account" element={<AddAccount />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
