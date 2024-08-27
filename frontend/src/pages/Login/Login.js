import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { login } from '../../services/api/apiUrl';


const Login = () => {
  const [tcknVkn, setTcknVkn] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
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

      const loginData = await response.json();
      if(response.ok){
        if(loginData.userType===1){
            if(loginData.userCode){
                navigate(`/loans/${loginData.userCode}`);
            }else{
                setLoginError('Kullanıcı adı ya da parola yanlış');
            }

        }else if(loginData.userType===2){
            navigate(`/user-campaign-table`);
        }else{
            setLoginError("Kullanıcı adı ya da parola yanlış");
        }
      }
    
    }catch (error) {
        console.error('Giriş sırasında hata meydana geldi!', error);
        setLoginError('Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }

};

const handleRegisterRedirect = () => {
    navigate('/register'); 
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h1>Kullanıcı Girişi</h1>
        <input
          type="text"
          value={tcknVkn}
          onChange={(e) => setTcknVkn(e.target.value)}
          placeholder="TCKN"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Parola"
          required
        />
        <button className='login-button' type="submit">Giriş Yap</button>
        <br />
        <button className='login-button' onClick={handleRegisterRedirect}>Kullanıcı Oluştur</button>
      </form>
      
      {loginError && (
        <p className="error">{loginError}</p>
      )}
    </div>
  );
};

export default Login;
