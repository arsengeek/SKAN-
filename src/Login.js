import React, { useState } from "react"; 
import { Link } from 'react-router-dom';
import "./css/Login.css";
import "./css/Home.css";
import {Header} from './Header.js';

export const Login = () => {
    const API_URL = 'https://gateway.scan-interfax.ru';

    const accessToken = localStorage.getItem("accessToken")

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [menu, setMenu] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null); 
    const [accountInfo, setAccountInfo] = useState(null);

    if(accessToken) {
        return (
        <>
            <div className="login-fall-return">Вы уже вошли</div>
            <p><Link to="/" className="link-home-login-fall">Главная</Link></p>
        </>
        )
    }

    const fetchAccountLogin = async (login, password) => {
        setLoading(true);
        setLoginError(false); 
        setPasswordError(false);  


        try {
            const response = await fetch(`${API_URL}/api/v1/account/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json', 
                },
                body: JSON.stringify({
                    login: login,  
                    password: password,  
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при авторизации');
            }

            const data = await response.json();
            const {accessToken, expire } = data;


            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            localStorage.setItem('expire', JSON.stringify(expire));

            console.log('Access Token:', accessToken);
            console.log('Expire:', expire);
            
        } catch (error) {
            setError('');
            

            if (error.message.includes('пароль')) {
                setLogin('');
                setPassword('');
                setLoginError(true);
                setPasswordError(true);
            } else {
                setLoginError(true);  
                setPassword('');  
            }

            console.error('Ошибка при авторизации:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        setLoginError(false); 
        setPasswordError(false); 

        if (!login) {
            setLoginError(true); 
        }

        if (!password) {
            setPasswordError(true);  
        }

        if (login && password) {
            fetchAccountLogin(login, password);
        }
    };

    

    return (
        <>
            <Header />

            <main className="main-section">
                <h2>Для оформления подписки<br /> на тариф, необходимо авторизоваться.</h2>
                <div className="image"></div>

                <div className="login-form">
                
                    <p>Войти</p>
                    <p>Зарегистрироваться</p>
                    <div className="rectangle1"></div>
                    <div className="rectangle2"></div>
                    <div className="box-shadow"></div>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='login' htmlFor="login">Логин или номер телефона:</label>
                            <input
                                className={`input-login ${loginError ? 'input-error-login' : ''}`}
                                type="text"
                                id="login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                            />
                            {loginError && <p className="error-text-login">Введите корректные данные</p>}
                        </div>
                        <div>
                            <label className='password' htmlFor="password">Пароль:</label>
                            <input
                                className={`input-password ${passwordError ? 'input-error-password' : ''}`}
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {passwordError && <p className="error-text-password">Неправильный пароль</p>}
                        </div>
                        <button 
                            className={`login-button ${login && password ? 'active' : ''}`} 
                            type="submit" 
                            disabled={loading || !login || !password}
                        >
                            {loading ? 'Загрузка...' : 'Войти'}
                        </button>

                        {error && <p>{error}</p>}
                        <a className="password-recover">Восстановить пароль</a>
                        <p className="login-def-text">Войти через:</p>
                        <div className="login-def">
                            <button className="google"></button>
                            <button className="facebook"></button>
                            <button className="yandex"></button>
                        </div>
                        <div className="image-key"></div>
                    </form>
                </div>    
                <footer className="footer2-login">
                <div className="container-img"></div>
                <p>г. Москва, Цветной б-р, 40 <br /> +7 495 771 21 11 <br /> info@skan.ru</p>
                <p>Copyright. 2022</p>
            </footer>
            </main>
        </>
    );
};
