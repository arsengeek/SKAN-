import React, { useState } from "react"; 
import { Link } from 'react-router-dom';
import logoFooter from "./assets/6465f70937726c512fe72d7d2f4a4889.png";
import logo from "./assets/SGN_09_24_2022_1663968217400 1.png";
import "./css/Login.css";
import "./css/Home.css";

export const Login = () => {
    const API_URL = 'https://gateway.scan-interfax.ru';

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
            const { accessToken, expire } = data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('expire', expire);

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
            <header>
                <img className={menu ? "logo-none" : "logo"} src={logo} alt="logo" />
                <div className="hamburger" onClick={() => setMenu(true)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <nav className="nav">
                    <p><Link to="/" className="link-home">Главная</Link></p>
                    <p>Тарифы</p>
                    <p>FAQ</p>
                </nav>

                {isLoggedIn ? (
                                    <div>
                                        <h2>{username}!</h2>
                                        {loading ? (
                                            <p>Загрузка информации об аккаунте...</p>
                                        ) : (
                                            <div>
                                                <p>Использовано компаний: {accountInfo?.usedCompanyCount}</p>
                                                <p>Лимит компаний: {accountInfo?.companyLimit}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className='reg-form'>
                                        <p>Зарегистрироваться</p>
                                        <div></div>
                                        <button className="reg-button">
                                            <Link className="link-button-reg" to="/login">Войти</Link>
                                        </button>
                                    </div>
                                )}

                <div className={menu ? "menu" : "menu-none"}>
                    <img src={logoFooter} alt="logo-footer" />
                    <div className="exit" onClick={() => setMenu(false)}></div>
                    <ul>
                        <li><Link to="/" className="link-home">Главная</Link></li>
                        <li>Тарифы</li>
                        <li>FAQ</li>
                    </ul>
                    <p>Зарегистрироватся</p>
                        <Link to="/login"><button className="link-button-reg">Войти</button></Link>

                </div>
            </header>

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
                                <img className="logo-footer" src={logoFooter} alt="logo-footer" />
                                <p>г. Москва, Цветной б-р, 40 <br /> +7 495 771 21 11 <br /> info@skan.ru</p>
                                <p>Copyright. 2022</p>
                </footer>
            </main>
        </>
    );
};
