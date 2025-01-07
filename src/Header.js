import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import logoFooter from "./assets/6465f70937726c512fe72d7d2f4a4889.png";
import logo from "./assets/SGN_09_24_2022_1663968217400 1.png";
import loadgif from "./assets/4.gif";
import './css/Home.css';

export const Header = () => {
        const accessToken = localStorage.getItem('accessToken');
        const expire = localStorage.getItem('expire');
        const [username, setUsername] = useState(''); 
        const [accountInfo, setAccountInfo] = useState(null);
        const [loading, setLoading] = useState(true);
        const [menu, setMenu] = useState(false);

        useEffect(() => {
            const fetchAccountInfo = async () => {
                if (accountInfo || !accessToken) {

                    setLoading(false);
                    return;
                }
                setLoading(true);
        
                try {
                        const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    });
        
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
        
                    const data = await response.json();
                    setAccountInfo(data.eventFiltersInfo);
                    localStorage.setItem('accountInfo', JSON.stringify(data));
                    
                } catch (error) {
                    console.error('Ошибка при получении данных:', error);
                } finally {
                    setLoading(false);
                }
            };
        
            fetchAccountInfo();
        }, [accessToken]);
                        

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
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
                    <p><Link to="/" className="link-home">Главная</Link></p>
                    <p>Тарифы</p>
                    <p>FAQ</p>
                </nav>
                
                {accessToken ? (
                    
                    <div className="container-name">
                        <h2 className="username">{username || ''}</h2>
                        <p className='exit-button' onClick={handleLogout}>Выйти</p>
                        
                        {loading ? (
                            <img src={loadgif} className="loading-gif" autoPlay loop playsInline></img>
                        ) : (
                            <div>
                                {console.log(accountInfo)}
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

            {accessToken ? (
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