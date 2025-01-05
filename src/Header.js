import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logoFooter from "./assets/6465f70937726c512fe72d7d2f4a4889.png";
import logo from "./assets/SGN_09_24_2022_1663968217400 1.png";
import loadgif from "./assets/4.gif";
import './css/Home.css';
import './css/tariffs.css';


export const Header = () => {
    const API_URL = 'https://gateway.scan-interfax.ru';
    
        const [isLoggedIn, setIsLoggedIn] = useState(true);
        const [username, setUsername] = useState(''); 
        const [accountInfo, setAccountInfo] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [menu, setMenu] = useState(false);

        useEffect(() => {
                    setTimeout(() => {
                        try {
                            const token = {
                                eventFiltersInfo: [
                                    {
                                        "usedCompanyCount": 34,
                                        "companyLimit": 1000
                                    },
                                ],
                            };
                            setAccountInfo(token);          
                            setUsername('Arsen');
                            console.log(token)
                            console.log(username)
                        } catch (err) {
                            setError('Ошибка при загрузке данных');
                        } finally {
                            setLoading(false);
                        }
                    }, 1000); 
                }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setUsername(null);
    };

    return (
        <>  
           
                <header>
                <img className={menu ? "logo-none" : "logo"} src={logo} alt="logo" />
                <div className="hamburger" onClick={() => { console.log("Открытие меню"); setMenu(true); }}>
                    <span onClick={() => { console.log("Открытие меню"); setMenu(true); }}></span>
                    <span onClick={() => { console.log("Открытие меню"); setMenu(true); }}></span>
                    <span onClick={() => { console.log("Открытие меню"); setMenu(true); }}></span>
                </div>

                <nav className="nav">
                    <p><Link to="/" className="link-home-pc">Главная</Link></p>
                    <p>Тарифы</p>
                    <p>FAQ</p>
                </nav>

                {isLoggedIn ? (
                    <div className="container-name">
                        <h2 className="username">{username}</h2>
                        <p className='exit-button' onClick={handleLogout}>Выйти</p>
                        {loading ? (
                            <img src={loadgif} className="loading-gif" autoPlay loop playsInline></img>
                        ) : (
                            <div>
                                <p className="used-commpanies">Использовано компаний: <span>{accountInfo?.eventFiltersInfo[0]?.usedCompanyCount} </span></p>
                                <p className="limit-commpanies">Лимит компаний: <span>{accountInfo?.eventFiltersInfo[0]?.companyLimit}</span></p>
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

            {isLoggedIn ? (
                <div className={menu ? "menu" : "menu-none"}>
                    <img src={logoFooter} alt="logo-footer" />
                    <div className="exit" onClick={() => setMenu(false)}></div>
                    <ul>
                        <li><Link to="/" className="link-home">Главная</Link></li>
                        <li>Тарифы</li>
                        <li>FAQ</li>
                    </ul>
                    

                    <p className='exit-button-mobile' onClick={handleLogout}>Выйти</p>
                </div>
            
            ) : (
                <div className={menu ? "menu" : "menu-none"}>
                    <img src={logoFooter} alt="logo-footer" />
                    <div className="exit" onClick={() => setMenu(false)}></div>
                    <ul>
                        <li><Link to="/" className="link-home">Главная</Link></li>
                        <li>Тарифы</li>
                        <li>FAQ</li>
                    </ul>
                    
                    <p>Зарегистрироватся</p>
                    <button className="link-button-reg">
                        <Link to="/login">Войти</Link>
                    </button>
                </div>

            )}
            </header>
        </>
        )
};