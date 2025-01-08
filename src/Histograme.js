import React from "react";
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './css/Histograme.css'
import { Header } from "./Header.js";

export const Histograme = () => {
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        maxFullness: false,
        inBusinessNews: false,
        onlyMainRole: false,
        excludeTechNews: false,
        excludeAnnouncements: false,
        excludeDigests: false,
        includeDigests: false,
    });

        const accessToken = localStorage.getItem('accessToken');
        const [loading, setLoading] = useState(false);
        const [inn, setInn] = useState("");
        const [error, setError] = useState("");
        const [errordate, setErrorDate] = useState(false);
        const [errorinn, setErrorInn] = useState("");
        const [tone, setTone] = useState("любая"); 
        const [startDate, setStartDate] = useState("");
        const [endDate, setEndDate] = useState("");
        const [documentCount, setDocumentCount] = useState("");
        const [requestData, setRequestData] = useState('')

        const handleCheckboxChange = (e) => {
            const { name, checked } = e.target;
            setFormData((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        };

        const handleChange = (e) => {
            const value = e.target.value;
            

            const sanitizedValue = value.replace(/[^0-9]/g, '');
            
            setInn(sanitizedValue);
            validateINN(sanitizedValue); 
        };
        
        const validateINN = (value) => {
            const innRegex = /^\d{10}$|^\d{12}$/; 
            if (innRegex.test(value)) {
                if (errorinn !== "") setErrorInn("");
                return true;
            } else {
                if (errorinn === "") setErrorInn("ИНН должен содержать 10 или 12 цифр.");
                return false;
            }
        };
        const validateDates = () => {
            const today = new Date(); 
            const start = new Date(startDate);
            const end = new Date(endDate);
        
            if (start > today || end > today) {
                setErrorDate(true);
              return false;
            }

            if (start > end) {
                setErrorDate(true);
              return false;
            }
        
            setErrorDate(false);
            return true;
          };

            useEffect(() => {
                if (startDate && endDate) {
                    validateDates();  
                }
            }, [startDate, endDate]);

          const handleSubmit = (e) => {
            e.preventDefault();
            if (validateDates()) {
              console.log("Валидация успешна!", { startDate, endDate });
            }
          };

        const handleChangeTone = (e) => {
            setTone(e.target.value);
            console.log("Выбранная тональность:", e.target.value);
        };


        const handleDocumentCountChange = (e) => {
            const value = e.target.value;
            if (!isNaN(value) && +value >= 1 && +value <= 1000) {
                setDocumentCount(value);
                setError("");
            } else {
                setDocumentCount(value);
                setError("Введите число от 1 до 1000");
            }
        };
        
        const handleSearch = async (e) => {
            e.preventDefault();
        
            if (!validateDates()) return;
        
            setLoading(true);
            setError("");
        
            const requestData = {
                intervalType: "month",
                histogramTypes: ["totalDocuments", "riskFactors"],
                issueDateInterval: {
                    startDate,
                    endDate,
                },
                searchContext: {
                    targetSearchEntitiesContext: {
                        targetSearchEntities: [
                            {
                                type: "company",
                                sparkId: null,
                                entityId: null,
                                inn: inn.trim(),
                                maxFullness: formData.maxFullness,
                                inBusinessNews: formData.inBusinessNews,
                            },
                        ],
                        onlyMainRole: formData.onlyMainRole,
                    },
                },
                attributeFilters: {
                    excludeTechNews: formData.excludeTechNews,
                    excludeAnnouncements: formData.excludeAnnouncements,
                    excludeDigests: formData.excludeDigests,
                },
                similarMode: "none",
                limit: parseInt(documentCount, 10),
                sortType: "issueDate",
                sortDirectionType: "asc",
            };
            setRequestData(requestData)
            localStorage.setItem(requestData, 'requestData')

        
              
            navigate('/histogramresults');

        };

        const isFormValid = () => {
            return (
                validateINN(inn.trim()) !== "" &&
                tone.trim() !== "" &&
                documentCount.trim() !== "" &&
                startDate.trim() !== "" &&
                endDate.trim() !== "" &&
                !error
            );
        };
        
            if (!accessToken) {
                return <div className='login-fall'>
                    <p><span>Усп...</span> Для доступа требуется вход в аккаунт</p>
                    <Link to="/login">
                        <button className="request-button-default">Войти</button>
                    </Link>
                </div> 
            }

    return(    
        <>  
            <Header/>
            
            <main className="section">
                <h2 className="text-histograme">Найдите необходимые данные в пару кликов.</h2>
                <p className="question-text1">Задайте параметры поиска.<br></br> Чем больше заполните, тем точнее поиск</p>
                <p className="question-text2">ИНН компании<span className={`required ${errorinn ? 'required-error' : ''}`}>*</span></p>
                <input
                    type="text"
                    id="inn"
                    value={inn}
                    onChange={handleChange}
                    maxLength="12" 
                    className={`inn-input ${errorinn ? "input-error" : ""}`}
                />
                <p className={`text-inn ${errorinn ? "error" : ""}`}>Введите корректные данные</p>

                <p className="question-text3">Тональность</p>

                <select
                    id="tone-select"
                    value={tone}
                    onChange={handleChangeTone}
                    className="tone-select"
                >
                    <option value="позитивная">Позитивная</option>
                    <option value="негативная">Негативная</option>
                    <option value="любая">Любая</option>
                </select>

                <p className='question-text4' >Количество документов в выдаче<span className={`required ${error ? 'required-error' : ''}`}>*</span></p>
                <input
                    type="text"
                    id=""
                    value={documentCount}
                    onChange={handleDocumentCountChange}
                    className={`documents-input ${error ? "input-error2" : ""}`}
                />
                <p className={`text-error-dis ${error ? 'text-error' : ''}`}>Обязательное поле</p>

                <form onSubmit={handleSubmit}>
                    <p className="date-text">Диапозон поиска<span className={`required ${errordate ? 'required-error' : ''}`}>*</span></p>
                    <div>
                    <input
                        type="date"
                        id="start-date"
                        className={errordate ? 'error' : ''}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    </div>
                    <p className={`date-text-error ${errordate ? 'error' : ''}`}>Введите корректные данные</p>
                    <div>
                    <input
                        type="date"
                        id="end-date"
                        className={errordate ? 'error' : ''}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    </div>

                

                </form>

                <div className="checkboxes">
                    <label>
                        <input
                            type="checkbox"
                            name="maxFullness"
                            className="chekbox"
                            checked={formData.maxFullness}
                            onChange={handleCheckboxChange}
                        />
                        <p className="text-label">Признак максимальной полноты</p>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="inBusinessNews"
                            className="chekbox"
                            checked={formData.inBusinessNews}
                            onChange={handleCheckboxChange}
                        />
                        <p className="text-label">Упоминания в бизнес-контексте</p>
                        
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="onlyMainRole"
                            className="chekbox"
                            checked={formData.onlyMainRole}
                            onChange={handleCheckboxChange}
                        />
                        <p className="text-label">Главная роль в публикации</p>
                        
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="excludeTechNews"
                            className="chekbox"
                            checked={formData.excludeTechNews}
                            onChange={handleCheckboxChange}
                        />
                        <p className="text-label">Публикации только с риск-факторами</p>
                        
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="excludeAnnouncements"
                            className="chekbox"
                            checked={formData.excludeAnnouncements}
                            onChange={handleCheckboxChange}
                        />
                        <p className="text-label"> Включать технические новости рынков</p>
                       
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="excludeDigests"
                            className="chekbox"
                            checked={formData.excludeDigests}
                            onChange={handleCheckboxChange}
                        />
                        <p className="text-label">Включать анонсы и календари</p>

                    </label>
                    <label>
                        <input
                        type="checkbox"
                        name="includeDigests"
                        className="chekbox"
                        checked={formData.includeDigests}
                        onChange={handleCheckboxChange}
                        />
                        <p className="text-label">Включать сводки новостей</p>
                    </label>
                </div>
                

                <button className='search-button' type="submit" onClick={handleSearch} disabled={!isFormValid() || loading}>
                    {loading ? "Загрузка..." : "Поиск"}
                </button> 

                <p className="span">* Обязательные к заполнению поля</p>

                <div className="background-image-histograme"></div>
                <div className="document-image"></div>
                <div className="folders-image"></div>
                
            </main>
            <footer className="footer2-histograme">
                <div className="container-img"></div>
                <p>г. Москва, Цветной б-р, 40 <br /> +7 495 771 21 11 <br /> info@skan.ru</p>
                <p>Copyright. 2022</p>
            </footer>
        </>
    )
}
