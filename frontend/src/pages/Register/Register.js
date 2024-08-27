import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Alert from "../../components/alert/Alert";
import { register } from '../../services/api/apiUrl';

const CreateUser = () => {
  const [companyName, setCompanyName] = useState("");
  const [tcknVkn, setTcknVkn] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCode, setUserCode] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const validateForm = () => {
    const isTcknValid = /^\d{11}$/.test(tcknVkn);
    if (!isTcknValid) {
      setAlertMessage("Geçersiz TCKN. TCKN 11 basamaklı bir sayı olmalıdır!");
      setAlertType("error");
      setShowAlert(true);
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch(register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          tcknVkn,
          address,
          email,
          password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setUserCode(responseData.userCode);
        setAlertMessage("Kullanıcı Başarıyla Yapıldı");
        setAlertType("success");
        setShowAlert(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        console.error("Unexpected response status:", response.status);
        setError("Kullanıcı oluşturulamadı.");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      setError("Kullanıcı oluşturulurken bir hata meydana geldi.");
    }
  };

  return (
    <div className="register-container">
      {showAlert && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={handleCloseAlert}
        />
      )}
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Üye Ol</h1>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Firma Adı"
          required
        />
        <input
          type="text"
          value={tcknVkn}
          onChange={(e) => setTcknVkn(e.target.value)}
          placeholder="TCKN"
          required
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Adres"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-Mail"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Parola"
          required
        />
        <button className="register-button" type="submit">
          Kaydet
        </button>
      </form>
      {userCode && <p>Kullanıcı Kodu: {userCode}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CreateUser;
