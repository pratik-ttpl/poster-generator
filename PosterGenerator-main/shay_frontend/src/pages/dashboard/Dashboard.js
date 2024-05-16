
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../homePage/HomePage';

function Dashboard() {
  return (
    <div>
      {}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {}
      </Routes>
    </div>
  );
}

export default Dashboard;
