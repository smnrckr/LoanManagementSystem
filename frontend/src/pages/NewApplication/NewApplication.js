import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NewApplication.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Alert from "../../components/alert/Alert";

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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); 
  
  const [formData, setFormData] = useState({
    tckn: "",
    phoneNumber: "",
    name: "",
    surname: "",
    emailClient: "",
    address: "",
    monthlySalary: "",
    loanAmount: "",
    loanDate: null,
    birthDate: null,
  });

  const validateForm = () => {
    const isTcknValid = /^\d{11}$/.test(formData.tckn);
    if (!isTcknValid) {
      setAlertMessage('Geçersiz TCKN. TCKN 11 basamaklı bir sayı olmalıdır!');
      setAlertType('error');
      setShowAlert(true);
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailClient);
    if (!isEmailValid) {
      setAlertMessage('Girdiğiniz Email Formatı Geçersizdir!');
      setAlertType('error');
      setShowAlert(true);
      return;
    }

    // Proceed with form submission or other actions
    return(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  //kampanya bilgilerinin alınması için
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/user/${userCode}/campaigns`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setCampaigns(data))
      .finally(() => {
        setLoading(false);
      });
  }, [userCode, navigate]);

  //comboboxa atılacak kampanya isimlerinin seçilmesiyle detayların filtrelenmesi
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
    setSelectedTerm("");
    setRate("");
  }, [selectedCampaign, campaigns]);

  //vadenin filtrelenmesi ve vadeye göre otomaik dolacak faiz oranının atanması
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
      setAlertMessage("18 Yaşından Küçüklere Kredi Verilemez!");
      setAlertType('error');
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const formatCurrency = (number) => {
    const rawValue = number.replace(/[^\d,]/g, "");
    const [integerPart, decimalPart] = rawValue.split(",");

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const formattedDecimal = decimalPart ? decimalPart.slice(0, 2) : "";

    return formattedDecimal
      ? `${formattedInteger},${formattedDecimal}`
      : formattedInteger;
  };

  const handleSalaryChange = (e) => {
    const formattedValue = formatCurrency(e.target.value);
    setFormData({ ...formData, monthlySalary: formattedValue });
  };

  const handleLoanAmountChange = (e) => {
    const formattedValue = formatCurrency(e.target.value);
    setFormData({ ...formData, loanAmount: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (!ageCalculate()) {
      return;
    }
    const formattedLoanDate = formatDate(formData.loanDate);
    const formattedBirthDate = formatDate(formData.birthDate);
    const unformattedSalary = parseFloat(
      formData.monthlySalary.replace(/\./g, "").replace(",", ".")
    );
    const unformattedLoanAmount = parseFloat(
      formData.loanAmount.replace(/\./g, "").replace(",", ".")
    );
    const response = await fetch(
      `http://localhost:8080/api/newApplication/${userCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          loanDate: formattedLoanDate,
          birthDate: formattedBirthDate,
          campaignName: selectedCampaign,
          termLoan: selectedTerm,
          interestRate: rate,
          campaignCode: selectedCampaignCode,
          monthlySalary: unformattedSalary,
          loanAmount: unformattedLoanAmount,
        }),
      }
    );

    if (response.ok) {
      setAlertMessage("Kredi Başvurusu Başarıyla Yapıldı");
      setAlertType('success');
      setShowAlert(true);
      setTimeout(() => {
        navigate(`/loans/${userCode}`);
      }, 1000);
      
    }
  };

  //kampanya isilerinin bir kere çıkması için
  //service
  const uniqueCampaignNames = [
    ...new Set(campaigns.map((campaign) => campaign.campaignName)),
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="new-app-cointainer">
      {showAlert && (
        <Alert message={alertMessage} type={alertType} onClose={handleCloseAlert} />
      )}
      <h1> KREDI BAŞVURUSU</h1>
      <div className="form-section-parent">
        <div className="form-section-child">
          <form className="new-app-form">
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#013771",
              }}
            >
              Müşteri Bilgileri
            </h3>
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
              type="text"
              placeholder="Aylık Gelir"
              value={formData.monthlySalary}
              onChange={handleSalaryChange}
              required
            />
          </form>
        </div>

        <div className="form-section-child">
          <form className="new-app-form">
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#013771",
              }}
            >
              Kredi Bilgileri
            </h3>
            <input
              type="text"
              placeholder="Kredi Tutarı"
              value={formData.loanAmount}
              onChange={handleLoanAmountChange}
              required
            />
            <DatePicker
              selected={formData.birthDate}
              placeholderText="Doğum Tarihi"
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setFormData({ ...formData, birthDate: date })}
              required
            />
            <DatePicker
              selected={formData.loanDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="Kredi Tarihi"
              onChange={(date) => setFormData({ ...formData, loanDate: date })}
              required
            />

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
                  disabled={!selectedTerm}
                />
              </>
            </div>
          </form>
        </div>
      </div>

      <div>
        <button className="new-app-button" onClick={handleSubmit}>
          Başvuru Yap
        </button>
      </div>
    </div>
  );
};
export default NewApplication;
