import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from './Header';
import './css/HistogramResults.css';
import { ResultsSection } from './ResultsSection';

const HistogramResults = () => {
    
    const accessToken = localStorage.getItem('accessToken')
    const [error, setError] = useState(null);
    const [requestData, setRequestData] = useState('');
    const [requestDataPublic, setRequestDataPublic] = useState('');
    const [publications, setPublications] = useState([]);
    const data = localStorage.getItem('requestData')
    const [hasMore, setHasMore] = useState(true);
    const [visibleCount, setVisibleCount] = useState(2); 



    useEffect(() => {
            try {
                setPublications(requestDataPublic);  
            } catch (err) {
                setError('Ошибка');
            } finally {

            }       
    }, [visibleCount]);

    //Проверка данных
    const getValidatedPublications = (data) => {
        if (!Array.isArray(data)) {
            console.error("Данные для публикаций некорректны:", data);
            return []; 
        }
        return data; 
    };

//увеличение количества публикаций
    const handleShowMore = () => {
        setVisibleCount(visibleCount + 2); 
    };

    //парсировка
        const extractImageSrc = (input) => {
            if (typeof input !== "string") {
                console.warn("Недопустимое значение в extractImageSrc:", input);
                return ""; 
            }
            return input.match(/src="([^"]+)"/)?.[1] || "";
        };
        
        const imageSrc = extractImageSrc(requestDataPublic?.data?.ok?.content?.markup);

        const parseContent = (markup) => {
            if (typeof markup === 'string') {
                return markup.replace(/<[^>]*>/g, "").trim();
            }

            console.error("Ошибка: markup не является строкой", markup);
            return '';
        };


        // не используется
        // const countWords = (text) => {
        //     if (typeof text === 'string') {
        //         const words = text.split(/\s+/).filter(Boolean);
        //         return words.length;
        //     }
        //     console.error("Ошибка: текст для подсчёта слов не является строкой", text);
        //     return 0;
        // };
    //конец парсировки
    



    // Реальная итерация получаеня id для публикаций
    useEffect(() => {
        const fetchDataPublic = async () => {
            if (!data) return; 
    
            try {
                const response = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body: JSON.stringify(data),
                });
    
                if (!response.ok) {
                    throw new Error("Ошибка при выполнении запроса.");
                }
    
                const result = await response.json();
                setRequestData(result.items);
            } catch (error) {
                setError(error.message);
            } finally {

            }
        };
    
        fetchDataPublic();
    }, [data]);


    //  Реальная итерация получения данных публикаций
        useEffect(() => {
            const fetchData = async () => {
                if (!requestData || requestData.length === 0) return;

                    const ids = requestData.map(item => item.encodedId);
    
                try {
                    const response = await fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                       body: JSON.stringify({ ids }),
                    });
    
                    if (!response.ok) {
                        throw new Error("Ошибка при выполнении запроса.");
                    }
    
                    const result = await response.json();
                    setRequestDataPublic(result.ok || []);
                    setHasMore(result.items.length > 0);
    
                } catch (error) {
                    setError(error.message);
                } finally {
                }
            };
    
            fetchData();
        }, [requestData]);

        

        useEffect(() => {
            try {
                const validatedData = getValidatedPublications(requestDataPublic);
                setPublications(validatedData);
            } catch (err) {
                setError('Ошибка обработки');
            }
        }, [requestDataPublic]);
        
        if (!accessToken) {
            return <div className='login-fall'>
                <p><span>Усп...</span> Для доступа требуется вход в аккаунт</p>
                <Link to="/login">
                    <button className="request-button-default">Войти</button>
                </Link>
            </div> 
        }

        
        const visiblePublications = publications.slice(0, visibleCount);
        console.log(visiblePublications)


    return (
        <div className='container-results'>
            <Header/>

            <main className='main-results'>
                <h2 className='head-text'>Ищем. Скоро будут результаты</h2>
                <p className='back-head-text'>Поиск может занять некоторое время, просим сохранять терпение.</p>
                <div className='background-head'></div>
                <h2 className='back-text'>Общая сводка</h2>
                
                

                <div className="carousel">
                    <div className='container-form'>
                    <div className='form'>
                            <p>Период</p>
                            <p>Всего</p>
                            <p>Риски</p>
                        </div>
                        <div className='form'>
                            <p>Период</p>
                            <p>Всего</p>
                            <p>Риски</p>
                        </div>
                            <ResultsSection/>                     
                        </div>
                        </div>

                <div className='container-publications'>
                    <h2 className='text-documents'>Список публикаций</h2>

                    {visiblePublications.length === 0 ? (
                        <p className='not-found-publications'>Публикации отсутствуют</p>
                ) : (
                    Array.isArray(visiblePublications) && 
                    visiblePublications.map((pub, index) => {
                        
                        const content = parseContent(pub?.ok?.content?.markup);

                        const tags = [];
                        if (pub.ok.attributes.isTechNews) tags.push("Технические новости");
                        if (pub.ok.attributes.isAnnouncement) tags.push("Анонсы и события");
                        if (pub.ok.attributes.isDigest) tags.push("Сводки новостей");
                        console.log(tags);

                        return (
                            <div key={index} className="publication">
                            <p className="data-publication-name">
                                {pub.ok.issueDate
                                ? `${new Date(pub.ok.issueDate).toLocaleDateString()} ${pub.ok.source?.name || "not found"}`
                                : "Данные отсутствуют"}
                            </p>

                            <h3 className="title-text-publication">
                                {pub.ok.title?.text || "Данные отсутствуют"}
                            </h3>
                            <img
                                className="image-publication"
                                src={pub.ok.content?.markup.match(/<img src="([^"]+)"/)?.[1] || ""}
                                alt="publication"
                            />
                            {tags.length > 0 && (
                                <div className="tags">
                                    {tags.map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))}
                                </div>
                            )}
                            <p className="extracted-text">{content}</p>

                            <a href={pub.ok.url}>
                                <button className="button-publication">Читать в источнике</button>
                            </a>
                    
                            </div>
                        );
                    }))};
                   
                </div>
            </main>
            <div className='button-container'>
                        <button onClick={handleShowMore} className="load-more-button">
                            {console.log(visibleCount)}
                            Показать больше
                        </button>
                    </div>
            <footer className="footer2-results">
                <div className="container-img"></div>
                <p>г. Москва, Цветной б-р, 40 <br /> +7 495 771 21 11 <br /> info@skan.ru</p>
                <p>Copyright. 2022</p>
            </footer>
        </div>
    );
};

export default HistogramResults;
