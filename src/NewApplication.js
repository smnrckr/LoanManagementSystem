import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewApplication = () => {
  const { userCode } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [campaigns,setCampaigns]=useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState('');
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

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/api/campaign')
      .then((response) => {
        return response.json();
      })
      .then((data) => setCampaigns(data))
      .finally(() => {
        setLoading(false);
      });
  }, [userCode, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
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
    </div>
    <div>
    <select
        value={selectedCampaign}
        onChange={(e) => setSelectedCampaign(e.target.value)}>
        <option value="">Bir Kampanya Seçin</option>
        {campaigns.map((campaign) => (
          <option key={campaign.id} value={campaign.id}>
            {campaign.campaignCode} { }
          </option>
        ))}
      </select>
      <form>
        
      </form>
      </div>
    </div>
    

  );
};
export default NewApplication;
