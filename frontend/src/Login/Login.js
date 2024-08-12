import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import useApi from '../useApi/useApi';
import { login } from '../apiUrl/apiUrl';
import "./Login.css"

const Login = () => {
    const { post, response } = useApi();
    const [tcknVkn, setTcknVkn] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const loginData = await post(login, {
                tcknVkn,
                password
            });

            if (response.ok && loginData.userCode) {
                navigate(`/loans/${loginData.userCode}`); 
            } else {
                console.error('Unexpected response data:', response.status, loginData);
                setLoginError('Kullanıcı adı veya parola yanlış.');
            }
        } catch (error) {
            console.error('Giriş sırasında hata meydana geldi!', error);
            setLoginError('Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };
    
    const handleRegisterRedirect = () => {
        navigate('/register'); 
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <h1>Hoşgeldiniz!</h1>
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
                <button type="submit">Giriş Yap</button>
                <br></br>
                <button onClick={handleRegisterRedirect}>Kayıt Ol</button>
            </form>
            
            {loginError && (
                <p className="error">{loginError}</p>
            )}
            
            
            
        </div>
    );
};

export default Login;
