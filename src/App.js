import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateUser from './Register';
import Login from './Login';
import LoanTable from './LoanTable';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<CreateUser />} />
            <Route path="/loans/:userCode" element={<LoanTable />} />          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;