import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Alert from "../../components/alert/Alert";
import { register } from "../../services/api/apiUrl";

const CreateUser = () => {
  const [companyName, setCompanyName] = useState("");
  const [tcknVkn, setTcknVkn] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      const responseData = await response.json();
      if (response.ok) {
        setAlertMessage("Kullanıcı Başarıyla Oluşturuldu");
        setAlertType("success");
        setShowAlert(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        const errorCode = responseData.errorCode;
        let errorMessage = "Kullanıcı oluşturulamadı.";

        switch (errorCode) {
          case "TCKN_VKN_DUPLICATE":
            errorMessage = "Bu TCKN/VKN kullanılmaktadır!";
            break;
          case "EMAIL_DUPLICATE":
            errorMessage = "Bu email kullanılmaktadır!";
            break;
          default:
            errorMessage = "Bilinmeyen bir hata meydana geldi.";
            break;
        }

        setAlertMessage(errorMessage);
        setAlertType("error");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
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

        <div className="input-group">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            placeholder=""
          />
          <label>Firma Adı</label>
        </div>

        <div className="input-group">
          <input
            type="text"
            value={tcknVkn}
            onChange={(e) => setTcknVkn(e.target.value)}
            required
            placeholder=""
          />
          <label>TCKN</label>
        </div>

        <div className="input-group">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder=""
          />
          <label>Adres</label>
        </div>

        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=""
          />
          <label>E-Mail</label>
        </div>

        <div className="input-group">
          <input
            placeholder=""
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Parola</label>
        </div>

        <button className="register-button" type="submit">
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
