import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/user/new" element={<UserForm />} />
      <Route path="/user/:id" element={<UserForm />} />
    </Routes>
  );
};

export default App;
