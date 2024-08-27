import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LoanTable.css";
import { loans } from '../../services/api/apiUrl';
 

const LoanTable = () => {
  const { userCode } = useParams();
  const navigate = useNavigate();
  const [clientData, setclientData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userCode) {
      navigate("/login");
      return;
    }

    setLoading(true);
    fetch(loans(userCode))
      .then((response) => response.json())
      .then((json) => setclientData(json))
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
              {clientData.map((client) => (
                <tr key={client.id}>
                  <td>{client.tckn}</td>
                  <td>{client.phoneNumber}</td>
                  <td>{client.name}</td>
                  <td>{client.surname}</td>
                  <td>{client.emailClient}</td>
                  <td>{client.address}</td>
                  <td>{client.monthlySalary.toLocaleString(navigator.language, { minimumFractionDigits: 2 })} TL</td>
                  <td>{client.campaignName}</td>
                  <td>{client.loanDate}</td>
                  <td>{client.loanAmount.toLocaleString(navigator.language, { minimumFractionDigits: 2 })} TL</td>
                  <td>{client.interestRate}</td>
                  <td>{client.termLoan}</td>
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
