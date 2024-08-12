import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NewApplication.css";

const NewApplication = () => {
  const { userCode } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [rate, setRate] = useState("");
  const [loanOptions, setLoanOptions] = useState([]);
  const [selectedCampaignCode, setSelectedCampaignCode] = useState("");

  const [formData, setFormData] = useState({
    tckn: "",
    phoneNumber: "",
    name: "",
    surname: "",
    emailClient: "",
    address: "",
    monthlySalary: "",
    loanAmount: "",
    loanDate: "",
    birthDate: "",
  });

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/campaign")
      .then((response) => {
        return response.json();
      })
      .then((data) => setCampaigns(data))
      .finally(() => {
        setLoading(false);
      });
  }, [userCode, navigate]);

  useEffect(() => {
    if (selectedCampaign) {
      const filteredCampaign = campaigns.find(
        (campaign) => campaign.campaignName === selectedCampaign
      );

      if (filteredCampaign) {
        setSelectedCampaignCode(filteredCampaign.campaignCode);

        const filteredTerms = campaigns
          .filter((campaign) => campaign.campaignName === selectedCampaign)
          .map((campaign) => ({
            termLoan: campaign.termLoan,
            interestRate: campaign.interestRate,
            campaignCode: campaign.campaignCode,
          }));

        setLoanOptions(filteredTerms);
      }
    }
  }, [selectedCampaign, campaigns]);

  useEffect(() => {
    if (selectedTerm) {
      const termData = loanOptions.find(
        (loanOptions) => loanOptions.termLoan === parseFloat(selectedTerm)
      );
      if (termData) {
        setRate(termData.interestRate);
      }
    }
  }, [selectedTerm, loanOptions]);

  const ageCalculate = () => {
    const today = new Date();
    const inputBirthDate = new Date(formData.birthDate);
    let age = today.getFullYear() - inputBirthDate.getFullYear();
    const monthDifference = today.getMonth() - inputBirthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < inputBirthDate.getDate())
    ) {
      age--;
    }
    if (age < 18) {
      alert("18 Yaşından Küçüklere Kredi Verilemez!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isTcknValid = /^\d{11}$/.test(formData.tckn);
    if (!isTcknValid) {
      alert("Geçersiz TCKN. TCKN 11 basamaklı bir sayı olmalıdır!");
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.emailClient
    );

    if (!isEmailValid) {
      alert("Girdiğiniz Email Formatı Geçersizdir!");
      return;
    }

    if (!ageCalculate()) {
      return;
    }

    //const formattedDate = new Date(formData.loanDate).toISOString().split('T')[0];

    const response = await fetch(
      `http://localhost:8080/api/newApplication/${userCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          campaignName: selectedCampaign,
          termLoan: selectedTerm,
          interestRate: rate,
          campaignCode: selectedCampaignCode,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      navigate(`/loans/${userCode}`);
    }
  };

  const uniqueCampaignNames = [
    ...new Set(campaigns.map((campaign) => campaign.campaignName)),
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <div >
      <h1>KREDI BAŞVURUSU</h1>
      <div className="form-section-parent" >
        <div className="form-section-child" >
          <form>
            <input
              type="text"
              placeholder="TCKN"
              value={formData.tckn}
              onChange={(e) =>
                setFormData({ ...formData, tckn: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Telefon"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Ad"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Soyad"
              value={formData.surname}
              onChange={(e) =>
                setFormData({ ...formData, surname: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.emailClient}
              onChange={(e) =>
                setFormData({ ...formData, emailClient: e.target.value })
              }
              required
            />
          </form>
        </div>

        <div className="form-section-child">
          <form>
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
              value={formData.monthlySalary}
              onChange={(e) =>
                setFormData({ ...formData, monthlySalary: e.target.value })
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
            <input
              type="date"
              placeholder="Doğum Tarihi"
              value={formData.birthDate}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
              required
            />
            <input
              type="date"
              placeholder="Kredi Tarihi"
              value={formData.loanDate}
              onChange={(e) =>
                setFormData({ ...formData, loanDate: e.target.value })
              }
              required
            />
          </form>
        </div>
      </div>

      <div className="combo-style">
        <select
          
          value={selectedCampaign}
          onChange={(e) => setSelectedCampaign(e.target.value)}
        >
          <option value="">Bir Kampanya Seçin</option>
          {uniqueCampaignNames.map((campaignName, index) => (
            <option key={index} value={campaignName}>
              {campaignName}
            </option>
          ))}
        </select>

        {selectedCampaign && (
          <>
            <select
              
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              disabled={!selectedCampaign}
            >
              <option value="">Vade Seçimi Yapın</option>
              {loanOptions.map((loanOption, index) => (
                <option key={index} value={loanOption.termLoan}>
                  {loanOption.termLoan}
                </option>
              ))}
            </select>
            <input
              type="readonly"
              value={rate}
              readOnly
              placeholder="Kredi Oranı"
            />
          </>
        )}
      </div>

      <div>
        <button onClick={handleSubmit}>Başvuru Yap</button>
      </div>
    </div>
  );
};
export default NewApplication;
