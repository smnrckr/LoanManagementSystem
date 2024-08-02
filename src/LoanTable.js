import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LoanTable = () => {
  const { userCode } = useParams();
  const navigate = useNavigate();
  const [borrowerData, setBorrowerData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userCode) {
      navigate('/login');
      return;
    }
  
    setLoading(true);
    fetch(`http://localhost:8080/api/loans/${userCode}`)
      .then(response => response.json())
      .then(json => setBorrowerData(json))
      .catch(error => {
        console.error('Error fetching loan data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userCode, navigate]);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff'
  };

  const thStyle = {
    backgroundColor: '#fff',
    padding: '10px',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };
  
  return (
    <div >
      <h1>Kredi Tablosu</h1>
      <div style={tableStyle}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          
          <table border={1}>
            <thead>
              <tr>
                <th style={thStyle}>İsim Soyisim</th>
                <th>Kampanya Adı</th>
                <th>Kredi Tarihi</th>
                <th>Kredi Tutarı</th>
                <th>Kredi Oranı</th>
              </tr>
            </thead>
            <tbody>
              {borrowerData.map(borrower => (
                <tr key={borrower.id}>
                  <td style={tdStyle}>{borrower.nameSurname}</td>
                  <td>{borrower.campaignName}</td>
                  <td>{borrower.loanDate}</td>
                  <td>{borrower.loanAmount}</td>
                  <td>{borrower.loanRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      </div>
    </div>
  );
};

export default LoanTable;
