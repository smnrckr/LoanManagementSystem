import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './App.css';
import useApi from './useApi/useApi';
import { login } from './apiUrl/apiUrl';

const Login = () => {
    const { post, response } = useApi();
    const [tcknVkn, setTckn] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await post(login, {
                tcknVkn,
                password
            });
            if (response.ok) {
                navigate('/loans'); 
            }else{
                console.error('Unexpected response status:', response.status);
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
        <div>
            <h1 align="center">LOGIN</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={tcknVkn}
                    onChange={(e) => setTckn(e.target.value)}
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
            </form>
            {loginError && (
                <p className="error">{loginError}</p>
            )}
            <br></br>
            <button onClick={handleRegisterRedirect}>Kullanıcı Oluştur</button>
        </div>
    );
};

export default Login;
