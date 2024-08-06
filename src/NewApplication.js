import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewApplication = () => {
  const { userCode } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tckn: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    monthlyIncome: "",
    loanAmount: "",
    campaignName: "",
    termLoan: "",
    interestRate: "",
  });

  const [campaign,setCampaign]=useState([]);

  useEffect(()=>{
    fetch(`/api/campaign`)
    .then((response)=>response.json())
    .then((data)=>setCampaign(data));
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`api/loans/${userCode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        // Redirect to the loan table after a successful submission
        navigate(`/api/loans/${userCode}`);
      })
      .catch((error) => {
        setLoading(false);
        console.error("There was an error submitting the application!", error);
      });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="TCKN"
          value={formData.tckn}
          onChange={(e) => setFormData({ ...formData, tckn: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Telefon"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Ad"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Soyad"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Adres"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Aylık Gelir"
          value={formData.monthlyIncome}
          onChange={(e) =>
            setFormData({ ...formData, monthlyIncome: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Kredi Tutarı"
          value={formData.loanAmount}
          onChange={(e) =>
            setFormData({ ...formData, loanAmount: e.target.value })
          }
          required
        />
        
      </form>
      <button onClick={handleSubmit}></button>
    </div>
  );
};
export default NewApplication;
