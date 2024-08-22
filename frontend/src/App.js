import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUser from "./pages/Register/Register.js";
import Login from "./pages/Login/Login.js";
import LoanTable from "./pages/LoanTable/LoanTable.js";
import NewApplication from "./pages/NewApplication/NewApplication.js";
import AdminOperations from "./pages/Admin/Admin.js";
import Header from "././components/layout/Header.js";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <Router>
      <div >
        <Header/>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<CreateUser />} />
            <Route path="/loans/:userCode" element={<LoanTable />} />
            <Route path="/newApplication/:userCode" element={<NewApplication />} />
            <Route path="/user-campaign-table" element={<AdminOperations/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
