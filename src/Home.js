import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import Login from './Login.js';
import logoFooter from "./assets/6465f70937726c512fe72d7d2f4a4889.png";
import logo from "./assets/SGN_09_24_2022_1663968217400 1.png";
import loadgif from "./assets/4.gif";
import './css/Home.css';
import './css/tariffs.css';
import icon from "./assets/Mask group.png";
import glass from "./assets/Mask group2.png";
import security from "./assets/Mask group3.png";
import arrow from "./assets/icons8-шеврон-вправо-90 1.png";
import begginerImg from "./assets/Group 1171274215.svg";
import proImg from "./assets/Group 1171274216.svg";
import {Header} from './Header.js';

export function Home() {
    const API_URL = 'https://gateway.scan-interfax.ru';

    const accessToken = localStorage.getItem('accessToken');
    const [userTariff, setTariff] = useState('pro');



    return (
        <>  
           
            <Header/>
            <footer className="footer1">
                <div className="container-img"></div>
                <img src={logoFooter} className="logo-footer"></img>
                <p>г. Москва, Цветной б-р, 40 <br /> +7 495 771 21 11 <br /> info@skan.ru</p>
                <p>Copyright. 2022</p>
            </footer>

            <div className="info">
                <p> сервис по поиску публикаций <br /> о компании <br />по его ИНН</p>
                <p className="text"> Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>

                <div>
                    {accessToken ? (
                        <Link to="/histograme">
                        <button className="request-button">Запросить данные</button>
                        </Link>
                    ) : (
                        <div>
                        <Link to="/login">
                        <button className="request-button-default">Войти</button>
                        </Link>
                        </div>
                    )}
                    </div>

                <div className="white-block"></div>
                <div className='homeImage'></div>
                <p id="pmiddle">почему именно мы</p>

                <div className="mobile-icon">
                    <div>
                        <img className='icon' src={icon} alt="icon" />
                    </div>
                    <p className="text-info" >Высокая и оперативная скорость обработки заявки</p>
                </div>

                <img className="arrow-1" src={arrow} alt="arrow" />
                <img className="arrow-2" src={arrow} alt="arrow" />
                <div className="card">
                    <div>
                        <img src={icon} alt="icon" />
                    </div>

                    <p>Высокая и оперативная скорость<br /> обработки заявки</p>

                    <div>
                        <img src={glass} alt="glass" />
                    </div>
                    <p>Огромная комплексная база<br /> данных, обеспечивающая<br /> объективный ответ на запрос</p>

                    <div>
                        <img src={security} alt="security" />
                    </div>

                    <p>Защита конфиденциальных сведений,<br /> не подлежащих разглашению<br /> по федеральному законодательству</p>
                    <p>наши тарифы</p>
                </div>
            </div>

            <div className="image-man"> </div>
            <div className="tarif-info">

            
                <div className={userTariff === 'begginer' ? 'begginer-pc-version-active': "begginer-pc-version"}>
                    <div className="header-begginer-version">
                        <h3 className="head-text-begginer">Beginner</h3>
                        <p className="head-info-text-begginer">Для небольшого исследования</p>
                        <div className="head-image-begginer"></div>
                    </div>
                    <div className="main-begginer">
                        <h3 className="price">799 ₽</h3>
                        <h3 className="price-decoration">1 200 ₽</h3>
                        <p className="credit-text">или 150 ₽/мес. при рассрочке на 24 мес</p>
                        <ul className="head-tariff-info">В тариф входит:
                            <li><div className="tick"></div>Безлимитная история запросов</li>
                            <li><div className="tick"></div>Безопасная сделка</li>
                            <li><div className="tick"></div>Поддержка 24/7</li>
                        </ul>
                        <div className={userTariff === 'begginer' ? 'image-active' : 'image-active-none'}><p>Текущий тариф</p></div>
                        {userTariff === 'begginer' ? (
                            <button className="button-begginer-pc-version">Перейти в личный кабинет</button>
                        ) : (
                            <button className="button-begginer-active-pc-version">Подробнее</button>
                        )}
                    </div>
                </div>
                
                <div className={userTariff === 'pro' ? 'pro-pc-version-active': "pro-pc-version"}>
                    <div className="header-pro-version">
                        <h3 className="head-text-pro">Pro</h3>
                        <p className="head-info-text-pro">Для HR и фрилансеров</p>
                        <div className="head-image-pro"></div>
                    </div>
                    <div className="main-pro">
                        <h3 className="price">1 299 ₽</h3>
                        <h3 className="price-decoration-pro">2 600 ₽</h3>
                        <p className="credit-text">или 279 ₽/мес. при рассрочке на 24 мес.</p>
                        <ul className="head-tariff-info">В тариф входит:
                            <li><div className="tick"></div>Все пункты тарифа Beginner</li>
                            <li><div className="tick"></div>Экспорт истории</li>
                            <li><div className="tick"></div>Рекомендации по приоритетам</li>
                        </ul>
                        <div className={userTariff === 'pro' ? 'image-active' : 'image-active-none'}><p>Текущий тариф</p></div>
                        {userTariff === 'pro' ? (
                            <button className="button-pro-pc-version">Перейти в личный кабинет</button>
                        ) : (
                            <button className="button-pro-active-pc-version">Подробнее</button>
                        )}
                    </div>
                </div>

                <div className={userTariff === 'buisness' ? 'buisness-pc-version-active': "buisness-pc-version"}>
                    <div className="header-buisness-version">
                        <h3 className="head-text-buisness">Buisness</h3>
                        <p className="head-info-text-buisness">Для корпоративных клиентов</p>
                        <div className="head-image-buisness"></div>
                    </div>
                    <div className="main-buisness">
                        <h3 className="price">2 379 ₽</h3>
                        <h3 className="price-decoration-pro">3 700 ₽</h3>
                        <p className="credit-text"></p>
                        <ul className="head-tariff-info-buisness">В тариф входит:
                            <li><div className="tick"></div>Все пункты тарифа Pro</li>
                            <li><div className="tick"></div>Безлимитное количество запросов</li>
                            <li><div className="tick"></div>Приоритетная поддержка</li>
                        </ul>
                        <div className={userTariff === 'buisness' ? 'image-active' : 'image-active-none'}><p>Текущий тариф</p></div>
                        {userTariff === 'buisness' ? (
                            <button className="button-buisness-pc-version">Перейти в личный кабинет</button>
                        ) : (
                            <button className="button-buisness-active-pc-version">Подробнее</button>
                        )}
                    </div>
                </div>
                </div>    


                <div className={userTariff === 'begginer' ? 'begginer-mobile-version-active': "begginer-mobile-version"}>
                    <div className="header-begginer-version-mobile">
                        <h3 className="head-text-begginer-mobile">Beginner</h3>
                        <p className="head-info-text-begginer-mobile">Для небольшого исследования</p>
                        <div className="head-image-begginer-mobile"></div>
                    </div>
                    <div className="main-begginer">
                        <h3 className="price-mobile">799 ₽</h3>
                        <h3 className="price-decoration-mobile">1 200 ₽</h3>
                        <p className="credit-text-mobile">или 150 ₽/мес. при рассрочке на 24 мес</p>
                        <ul className="head-tariff-info-mobile">В тариф входит:
                            <li><div className="tick"></div>Безлимитная история запросов</li>
                            <li><div className="tick"></div>Безопасная сделка</li>
                            <li><div className="tick"></div>Поддержка 24/7</li>
                        </ul>
                        
                        {userTariff === 'begginer' ? (
                            <button className="button-begginer-mobile-version">Перейти в личный кабинет</button>
                        ) : (
                            <button className="button-begginer-active-mobile-version">Подробнее</button>
                        )}
                    </div>
                </div>

                <div className={userTariff === 'pro' ? 'pro-mobile-version-active': "pro-mobile-version"}>
                    <div className="header-pro-version-mobile">
                        <h3 className="head-text-pro-mobile">Pro</h3>
                        <p className="head-info-text-begginer-mobile">Для HR и фрилансеров</p>
                        <div className="head-image-pro-mobile"></div>
                    </div>
                    <div className="main-begginer">
                        <h3 className="price-mobile">1 299 ₽</h3>
                        <h3 className="price-decoration-mobile-pro">2 600 ₽</h3>
                        <p className="credit-text-mobile">или 279 ₽/мес. при рассрочке на 24 мес.</p>
                        <ul className="head-tariff-info-mobile">В тариф входит:
                            <li><div className="tick"></div>Все пункты тарифа Beginner</li>
                            <li><div className="tick"></div>Экспорт истории</li>
                            <li><div className="tick"></div>Рекомендации по приоритетам</li>
                        </ul>
                        
                        {userTariff === 'pro' ? (
                            <button className="button-pro-mobile-version">Перейти в личный кабинет</button>
                        ) : (
                            <button className="button-pro-active-mobile-version">Подробнее</button>
                        )}
                    </div>
                </div>

                <div className={userTariff === 'buisness' ? 'buisness-mobile-version-active': "buisness-mobile-version"}>
                    <div className="header-buisness-version-mobile">
                        <h3 className="head-text-buisness-mobile">Pro</h3>
                        <p className="head-info-text-buisness">Для HR и фрилансеров</p>
                        <div className="head-image-buisness-mobile"></div>
                    </div>
                    <div className="main-begginer">
                        <h3 className="price-mobile">1 299 ₽</h3>
                        <h3 className="price-decoration-mobile-pro">2 600 ₽</h3>
                        <p className="credit-text-mobile">или 279 ₽/мес. при рассрочке на 24 мес.</p>
                        <ul className="head-tariff-info-mobile">В тариф входит:
                            <li><div className="tick"></div>Все пункты тарифа Pro</li>
                            <li><div className="tick"></div>Безлимитное количество запросов</li>
                            <li><div className="tick"></div>Приоритетная поддержка</li>
                        </ul>
                        
                        {userTariff === 'buisness' ? (
                            <button className="button-buisness-mobile-version">Перейти в личный кабинет</button>
                        ) : (
                            <button className="button-buisness-active-mobile-version">Подробнее</button>
                        )}
                    </div>
                </div>
            

            <footer className="footer2">
                <div className="container-img"></div>
                <p>г. Москва, Цветной б-р, 40 <br /> +7 495 771 21 11 <br /> info@skan.ru</p>
                <p>Copyright. 2022</p>
            </footer>
            </>
    );
}
