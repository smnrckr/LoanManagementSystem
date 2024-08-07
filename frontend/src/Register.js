import React, { useState } from 'react';
import './App.css';
import useApi from './useApi/useApi';
import { register } from './apiUrl/apiUrl';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için kullan

const CreateUser = () => {
    const { post, response, loading } = useApi();
    const navigate =useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [tcknVkn, setTcknVkn] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userCode, setUserCode] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Submitting form with data:', {
                companyName,
                tcknVkn,
                address,
                email,
                password
            });

            await post(register, {
                companyName,
                tcknVkn,
                address,
                email,
                password
            });

            if (response.ok) {
                console.log('Response data:', response.data);
                setUserCode(response.data.userCode); 
                navigate('/');
            } else {
                console.error('Unexpected response status:', response.status);
                setError('Kullanıcı oluşturulamadı.');
            }
        } catch (error) {
            console.error('Error occurred during registration:', error);
            setError('Kullanıcı oluşturulurken bir hata meydana geldi.');
        }
    };

    return (
        <div>
            <h1 align="center">REGISTER</h1>
            <form onSubmit={handleSubmit}>
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
                    placeholder="TCKN/VKN"
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
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Parola"
                    required
                />
                <button type="submit" disabled={loading}>Kaydet</button>
            </form>
            {userCode && (
                <p>Kullanıcı Kodu: {userCode}</p>
            )}
            {error && (
                <p className="error">{error}</p>
            )}
        </div>
    );
};

export default CreateUser;
