import React, { useState } from "react";

const LoanTable = () => {
  return (
    <div>
      <h1>Kredi Tablosu</h1>
      <table style={{width: "%100"}}>
        <tr>
          <th>Ad Soyad</th>
          <th>Kampanya Adı</th>
          <th>Kredi Tarihi</th>
          <th>Tutar</th>
          <th>Oran</th>
        </tr>
      </table>
    </div>
  );
};

export default LoanTable;
