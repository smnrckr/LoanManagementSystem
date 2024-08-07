import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewApplication = () => {
  const { userCode } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [rate, setRate] = useState("");
  const [loanOptions, setLoanOptions] = useState([]);

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
      const filteredTerms = campaigns
        .filter((campaign) => campaign.campaignName === selectedCampaign)
        .map((campaign) => ({
          termLoan: campaign.termLoan,
          interestRate: campaign.interestRate,
        }));
      setLoanOptions(filteredTerms);
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




const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8080/api/newApplication/${userCode}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, campaignName: selectedCampaign, termLoan: selectedTerm, interestRate: rate }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      navigate(`/loans/${userCode}`);
    }
    
};

  const comboStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px",
    width: "13%",
    borderCollapse: "collapse",
    padding: "1%",
  };
  const buttonStyle = {
    marginBottom: "10px",
    width: "15%",
    borderCollapse: "collapse",
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Kredi Başvurusu</h1>
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
            type="text"
            placeholder="Kredi Tarihi"
            value={formData.loanDate}
            onChange={(e) =>
              setFormData({ ...formData, loanDate: e.target.value })
            }
            required
          />
        </form>
      </div>
      <div>
        <select
          style={comboStyle}
          value={selectedCampaign}
          onChange={(e) => setSelectedCampaign(e.target.value)}
        >
          <option value="">Bir Kampanya Seçin</option>
          {campaigns.map((campaign) => (
            <option key={campaign.id} value={campaign.campaignName}>
              {campaign.campaignName} {}
            </option>
          ))}
        </select>
        {selectedCampaign && (
          <>
            <select
              style={comboStyle}
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              disabled={!selectedCampaign}
            >
              <option value="">Vade Seçimi Yapın</option>
              {loanOptions.map((loanOptions, index) => (
                <option key={index} value={loanOptions.termLoan}>
                  {loanOptions.termLoan}
                </option>
              ))}
            </select>
            <input
              style={comboStyle}
              type="text"
              value={rate}
              readOnly
              placeholder="Kredi Oranı"
            />
          </>
        )}
      </div>
      <div>
        <button style={buttonStyle} onClick={handleSubmit}>
          Başvuru Yap
        </button>
      </div>
    </div>
  );
};
export default NewApplication;
