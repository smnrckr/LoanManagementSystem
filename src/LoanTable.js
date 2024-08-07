import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
  };

  const thStyle = {
    backgroundColor: "#fff",
    padding: "10px",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  };

  const buttonStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px",
    width: "25%",
    borderCollapse: "collapse",
  };

  return (
    <>
      <div>
        <h1>Kredi Tablosu</h1>
        <div style={buttonStyle}>
          <button onClick={handleNewApplicationRedirect}>
            Kredi Başvurusu
          </button>
        </div>
      </div>
      <div>
        <div style={tableStyle}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <table border={1}>
                <thead>
                  <tr>
                    <th style={thStyle}>TCKN</th>
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
                      <td style={tdStyle}>{borrower.tckn}</td>
                      <td>{borrower.phoneNumber}</td>
                      <td>{borrower.name}</td>
                      <td>{borrower.surname}</td>
                      <td>{borrower.emailClient}</td>
                      <td>{borrower.address}</td>
                      <td>{borrower.monthlySalary}</td>
                      <td>{borrower.campaignName}</td>
                      <td>{borrower.loanDate}</td>
                      <td>{borrower.loanAmount}</td>
                      <td>{borrower.interestRate}</td>
                      <td>{borrower.termLoan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoanTable;
