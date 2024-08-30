import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { login } from "../../services/api/apiUrl";

const Login = () => {
  const [tcknVkn, setTcknVkn] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tcknVkn: tcknVkn,
          password: password,
        }),
      });

      if (response.status === 401) {
        setLoginError("Kullanıcı adı ya da parola yanlış");
        return;
      }

      if (!response.ok) {
        setLoginError(
          "Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin."
        );
        return;
      }

      const loginData = await response.json();
      if (loginData.userType === 1) {
        if (loginData.userCode) {
          navigate(`/loans/${loginData.userCode}`);
        } else {
          setLoginError("Kullanıcı adı ya da parola yanlış");
        }
      } else if (loginData.userType === 2) {
        navigate(`/user-campaign-table`);
      } else {
        setLoginError("Kullanıcı adı ya da parola yanlış");
      }
    } catch (error) {
      setLoginError("Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Kullanıcı Girişi</h1>

        <div className="input-group">
          <input
            type="text"
            value={tcknVkn}
            onChange={(e) => setTcknVkn(e.target.value)}
            placeholder=" "
            required
          />
          <label>TCKN</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            required
          />
          <label>Parola</label>
        </div>

        <button className="login-button" type="submit">
          Giriş Yap
        </button>
        <br />
        <button className="login-button" onClick={handleRegisterRedirect}>
          Kullanıcı Oluştur
        </button>
      </form>

      {loginError && <p className="error">{loginError}</p>}
    </div>
  );
};

export default Login;
