import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUser from "./Register/Register.js";
import Login from "./Login/Login.js";
import LoanTable from "./LoanTable/LoanTable.js";
import NewApplication from "./NewApplication/NewApplication.js";

function App() {
  return (
    <Router>
      <div >
        <header>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<CreateUser />} />
            <Route path="/loans/:userCode" element={<LoanTable />} />
            <Route path="/newApplication/:userCode" element={<NewApplication />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
