import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoanTable = () => {
  const navigate = useNavigate();
  const [barrowerData, setBarroworData] = useState([]);
  const fetchBarrowerData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/loans");
      const data = await response.json();
      setBarroworData(data);
    } catch (error) {
      console.error("veriler alınamadı: ", error);
    }
  };
  const handleNewApplicationRedirect = () => {
    navigate("/newApplication");
  };

  useEffect(() => {
    fetchBarrowerData();
  }, []);
  return (
    <div>
      <h1 align="center">Kredi Bilgi Listesi</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <button onClick={handleNewApplicationRedirect}>Yeni Başvuru</button>
        <button onClick={fetchBarrowerData}>Müşterileri Listele</button>
      </div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>Kampanya Adı</th>
            <th>Kredi Tarihi</th>
            <th>Kredi Tutarı</th>
            <th>Kredi Oranı</th>
          </tr>
        </thead>
        <tbody>
          {barrowerData.map((obj) => {
            return (
              <tr key={obj.id}>
                <td>{obj.nameSurname}</td>
                <td>{obj.campaignName}</td>
                <td>{obj.loanAmount}</td>
                <td>{obj.loanDate}</td>
                <td>{obj.loanRate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LoanTable;
