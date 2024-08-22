import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LoanTable.css";

const LoanTable = () => {
  const { userCode } = useParams();
  const navigate = useNavigate();
  const [borrowerData, setBorrowerData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userCode) {
      navigate("/login");
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8080/api/loans/${userCode}`)
      .then((response) => response.json())
      .then((json) => setBorrowerData(json))
      .catch((error) => {
        console.error("Error fetching loan data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userCode, navigate]);

  const handleNewApplicationRedirect = () => {
    navigate(`/newApplication/${userCode}`);
  };

  return (
    <div className="loan-page-container">
      <h1>Başvuru Listesi</h1>
      <div className="loan-button-container">
          <button
            className="loan-button"
            onClick={handleNewApplicationRedirect}
            style={{marginBottom:"10px"}}
          >
            + Yeni başvuru
          </button>
        </div>
      <div className="table-container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>TCKN</th>
                <th>Telefon</th>
                <th>İsim</th>
                <th>Soyisim</th>
                <th>Email</th>
                <th>Adres</th>
                <th>Aylık Gelir</th>
                <th>Kampanya Adı</th>
                <th>Kredi Tarihi</th>
                <th>Kredi Tutarı</th>
                <th>Kredi Oranı</th>
                <th>Vade Süresi</th>
              </tr>
            </thead>
            <tbody>
              {borrowerData.map((borrower) => (
                <tr key={borrower.id}>
                  <td>{borrower.tckn}</td>
                  <td>{borrower.phoneNumber}</td>
                  <td>{borrower.name}</td>
                  <td>{borrower.surname}</td>
                  <td>{borrower.emailClient}</td>
                  <td>{borrower.address}</td>
                  <td>{borrower.monthlySalary.toLocaleString(navigator.language, { minimumFractionDigits: 2 })} TL</td>
                  <td>{borrower.campaignName}</td>
                  <td>{borrower.loanDate}</td>
                  <td>{borrower.loanAmount.toLocaleString(navigator.language, { minimumFractionDigits: 2 })} TL</td>
                  <td>{borrower.interestRate}</td>
                  <td>{borrower.termLoan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LoanTable;
