import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NewApplication.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Alert from "../../components/alert/Alert";
import {
  newApplication,
  distinctNames,
  campaign_details,
  campaign_terms,
} from "../../services/api/apiUrl";

const NewApplication = () => {
  const { userCode } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [rate, setRate] = useState("");
  const [loanOptions, setLoanOptions] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

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
      setAlertMessage("Geçersiz TCKN. TCKN 11 basamaklı bir sayı olmalıdır!");
      setAlertType("error");
      setShowAlert(true);
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.emailClient
    );
    if (!isEmailValid) {
      setAlertMessage("Girdiğiniz Email Formatı Geçersizdir!");
      setAlertType("error");
      setShowAlert(true);
      return;
    }

    return true;
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    setLoading(true);
    fetch(distinctNames.replace(":userCode", userCode))
      .then((response) => response.json())
      .then((data) => setCampaigns(data))
      .finally(() => {
        setLoading(false);
      });
    setSelectedCampaign("");
  }, [userCode]);

  useEffect(() => {
    if (selectedCampaign) {
      setSelectedTerm("");
      setRate("");
      setLoading(true);
      fetch(campaign_details(selectedCampaign))
        .then((response) => response.json())
        .then((data) => {
          setLoanOptions(data.dataList);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoanOptions([]);
      setSelectedTerm("");
      setRate("");
    }
  }, [selectedCampaign]);

  useEffect(() => {
    if (selectedTerm) {
      setRate("");
      setLoading(true);
      fetch(campaign_terms(selectedCampaign, selectedTerm))
        .then((response) => response.json())
        .then((data) => {
          const details = data;
          setRate(details.interestRate);
        })
        .finally(() => {
          setLoading(false);
        });
    }else{
      setRate("");

    }
  }, [selectedTerm]);

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
      setAlertType("error");
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
    const response = await fetch(newApplication(userCode), {
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
        monthlySalary: unformattedSalary,
        loanAmount: unformattedLoanAmount,
      }),
    });

    if (response.ok) {
      setAlertMessage("Kredi Başvurusu Başarıyla Yapıldı");
      setAlertType("success");
      setShowAlert(true);
      setTimeout(() => {
        navigate(`/loans/${userCode}`);
      }, 1000);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="new-app-cointainer">
      {showAlert && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={handleCloseAlert}
        />
      )}
      <h1>KREDİ BAŞVURUSU</h1>
      <div className="form-section-parent">
        <div className="form-section-child">
          <form className="new-app-form">
            <h3
              style={{
                textAlign: "center",
                marginBottom: "30px",
                color: "#013771",
              }}
            >
              Müşteri Bilgileri
            </h3>
            <div className="input-container">
              <input
                type="text"
                id="tckn"
                placeholder=" "
                value={formData.tckn}
                onChange={(e) =>
                  setFormData({ ...formData, tckn: e.target.value })
                }
                required
              />
              <label htmlFor="tckn">TCKN</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                id="phoneNumber"
                placeholder=" "
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                required
              />
              <label htmlFor="phoneNumber">Telefon</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                id="name"
                placeholder=" "
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <label htmlFor="name">Ad</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                id="surname"
                placeholder=" "
                value={formData.surname}
                onChange={(e) =>
                  setFormData({ ...formData, surname: e.target.value })
                }
                required
              />
              <label htmlFor="surname">Soyad</label>
            </div>
            <div className="input-container">
              <input
                type="email"
                id="emailClient"
                placeholder=" "
                value={formData.emailClient}
                onChange={(e) =>
                  setFormData({ ...formData, emailClient: e.target.value })
                }
                required
              />
              <label htmlFor="emailClient">Email</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                id="address"
                placeholder=" "
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
              <label htmlFor="address">Adres</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                id="monthlySalary"
                placeholder=" "
                value={formData.monthlySalary}
                onChange={handleSalaryChange}
                required
              />
              <label htmlFor="monthlySalary">Aylık Gelir</label>
            </div>
          </form>
        </div>

        <div className="form-section-child">
          <form className="new-app-form">
            <h3
              style={{
                textAlign: "center",
                marginBottom: "30px",
                color: "#013771",
              }}
            >
              Kredi Bilgileri
            </h3>
            <div className="input-container">
              <input
                type="text"
                id="loanAmount"
                placeholder=" "
                value={formData.loanAmount}
                onChange={handleLoanAmountChange}
                required
              />
              <label htmlFor="loanAmount">Kredi Tutarı</label>
            </div>
            <div className="input-container">
              <DatePicker
                selected={formData.birthDate}
                dateFormat="dd/MM/yyyy"
                onChange={(date) =>
                  setFormData({ ...formData, birthDate: date })
                }
                required
                className="date-picker"
              />
              <label className="date-picker-label">Doğum Tarihi</label>
            </div>
            <div className="input-container">
              <DatePicker
                selected={formData.loanDate}
                dateFormat="dd/MM/yyyy"
                onChange={(date) =>
                  setFormData({ ...formData, loanDate: date })
                }
                required
                className="date-picker"
              />
              <label className="date-picker-label">Kredi Tarihi</label>
            </div>

            <div className="combo-style">
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
              >
                <option value="">Bir Kampanya Seçin</option>
                {campaigns.map((campaignName, index) => (
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
                  type="text"
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
