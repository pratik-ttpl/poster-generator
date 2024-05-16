import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './assets/scss/index.scss';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<Navigate to={"/dashboard"} replace={true} />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
