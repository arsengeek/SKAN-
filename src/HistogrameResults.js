import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from './Header';
import './css/HistogramResults.css';
import loadgif from "./assets/4.gif";


import { ResultsSection } from './ResultsSection';

const HistogramResults = () => {
    
    const accessToken = localStorage.getItem('accessToken')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [requestData, setRequestData] = useState('');
    const [requestDataPublic, setRequestDataPublic] = useState('');
    const [publications, setPublications] = useState([]);
    const data = localStorage.getItem('requestData')
    const [hasMore, setHasMore] = useState(true);


    const [visibleCount, setVisibleCount] = useState(2); 

    const PAGE_SIZE = 10;


// Симуляция
    useEffect(() => {
        setTimeout(() => {
            try {
                const dataPublic = {
                    data: [
                        {
                            items : [
                                {
                                    encodedId: "1:0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKnehLRnNC1KtGK0Ll9BWLigLo/HXXCrhw=",
                                    influence: 700.0,
                                    similarCount: 3
                                }
                            ]
                        },
                    ],
                };
                
                setRequestData(dataPublic);
                
                
            } catch (err) {
                setError('Ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        }, 1000); 
    }, []);
    
    const dataPublicDoc = [
        {
        data: {
          "ok": {
                "schemaVersion": "1.2",
                "id": "1:0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKnehLRnNC1KtGK0Ll9BWLigLo/HXXCrhw=",
                "version": 1,
                "issueDate": "2019-11-06T09:44:00+03:00",
                "url": "https://www.vesti.ru/doc.html?id=3206990",
                "source": {
                "id": 3264,
                "groupId": 8388638,
                "name": "Вести.Ru (vesti.ru)",
                "categoryId": 7,
                "levelId": 1
                },
                "dedupClusterId": "2596EE21",
                "title": {
                "text": "Медведь напал на охотника в Приморье",
                "markup": "<?xml version=\"1.0\" encoding=\"utf-8\"?><scandoc><sentence>Медведь напал на охотника в <entity type=\"location\" local-id=\"6\">Приморье</entity>\r\n<data>\r\n<div>    <div><p></sentence></scandoc>"
                },
                "content": {
                "markup": "<?xml version=\"1.0\" encoding=\"utf-8\"?><scandoc><sentence><entity type=\"theme\" local-id=\"1\"><entity type=\"theme\" local-id=\"5\">Медведь напал на жителя <entity type=\"location\" local-id=\"6\">Приморья</entity>, пострадавший госпитализирован, - сообщает \"Вести: Приморье\" со ссылкой на <entity type=\"company\" local-id=\"0\">\"Интерфакс-Дальний Восток\"</entity>. </entity></entity></sentence><sentence>Сотрудники полиции проводят проверку по факту инцидента, связанного с нападением медведя на жителя <entity type=\"location\" local-id=\"7\">Уссурийска </entity>в лесу, в окрестностях <entity type=\"location\" local-id=\"8\">села Яконовка</entity>. </sentence><sentence><entity type=\"theme\" local-id=\"2\">Пострадавшего госпитализировали в реанимационное отделение городской больницы.</p>\r\n\r\n<p></entity></sentence><sentence>По данным медиков, он прооперирован, сейчас его жизни ничто не угрожает. </sentence><sentence><entity type=\"theme\" local-id=\"4\">Полицейские установили, что у мужчины есть разрешение на охоту, оружие должным образом зарегистрировано. </entity></sentence><sentence>Обстоятельства случившегося выясняются.</p>\r\n\r\n<p></sentence><sentence><entity type=\"theme\" local-id=\"3\">Напомним, ранее сообщалось, что в минувшие выходные в окрестностях <entity type=\"location\" local-id=\"7\">Уссурийска</entity>, в районе <entity type=\"location\" local-id=\"9\">села Кроуновка </entity>на охотника напал тигр, пострадавший госпитализирован.</p>\r\n</div>\r\n                                                    <div></entity></sentence><sentence>Текст:\r\n                                            ГТРК \"Владивосток\"\r\n                                        </div>\r\n                \r\n                \r\n                <div>\r\n\r\n                    \r\n                    \r\n                    \r\n                </div>\r\n            </div>\r\n</data>\r\n\r\n</sentence><br><img src=\"https://storage.scan-interfax.ru/images/1%3A0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKn0KjQlsKu0K%2FSkdGXfOKAsF3QkjrRnCRmGCFFBybQoNGL0ZMhEFkC4oCYaNC9a9GO0KFYwqwOeNGO0JdUDGzihKJXTNC%2B0ZzRinE%3D\"></scandoc>"
                },
            }
        },
    },
    {
        data: {
            "ok": {
                  "schemaVersion": "1.2",
                  "id": "1:0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKnehLRnNC1KtGK0Ll9BWLigLo/HXXCrhw=",
                  "version": 1,
                  "issueDate": "2019-11-06T09:44:00+03:00",
                  "url": "https://www.vesti.ru/doc.html?id=3206990",
                  "source": {
                  "id": 3264,
                  "groupId": 8388638,
                  "name": "Вести.Ru (vesti.ru)",
                  "categoryId": 7,
                  "levelId": 1
                  },
                  "dedupClusterId": "2596EE21",
                  "title": {
                  "text": "Медведь напал на охотника в Приморье",
                  "markup": "<?xml version=\"1.0\" encoding=\"utf-8\"?><scandoc><sentence>Медведь напал на охотника в <entity type=\"location\" local-id=\"6\">Приморье</entity>\r\n<data>\r\n<div>    <div><p></sentence></scandoc>"
                  },
                  "content": {
                  "markup": "<?xml version=\"1.0\" encoding=\"utf-8\"?><scandoc><sentence><entity type=\"theme\" local-id=\"1\"><entity type=\"theme\" local-id=\"5\">Медведь напал на жителя <entity type=\"location\" local-id=\"6\">Приморья</entity>, пострадавший госпитализирован, - сообщает \"Вести: Приморье\" со ссылкой на <entity type=\"company\" local-id=\"0\">\"Интерфакс-Дальний Восток\"</entity>. </entity></entity></sentence><sentence>Сотрудники полиции проводят проверку по факту инцидента, связанного с нападением медведя на жителя <entity type=\"location\" local-id=\"7\">Уссурийска </entity>в лесу, в окрестностях <entity type=\"location\" local-id=\"8\">села Яконовка</entity>. </sentence><sentence><entity type=\"theme\" local-id=\"2\">Пострадавшего госпитализировали в реанимационное отделение городской больницы.</p>\r\n\r\n<p></entity></sentence><sentence>По данным медиков, он прооперирован, сейчас его жизни ничто не угрожает. </sentence><sentence><entity type=\"theme\" local-id=\"4\">Полицейские установили, что у мужчины есть разрешение на охоту, оружие должным образом зарегистрировано. </entity></sentence><sentence>Обстоятельства случившегося выясняются.</p>\r\n\r\n<p></sentence><sentence><entity type=\"theme\" local-id=\"3\">Напомним, ранее сообщалось, что в минувшие выходные в окрестностях <entity type=\"location\" local-id=\"7\">Уссурийска</entity>, в районе <entity type=\"location\" local-id=\"9\">села Кроуновка </entity>на охотника напал тигр, пострадавший госпитализирован.</p>\r\n</div>\r\n                                                    <div></entity></sentence><sentence>Текст:\r\n                                            ГТРК \"Владивосток\"\r\n                                        </div>\r\n                \r\n                \r\n                <div>\r\n\r\n                    \r\n                    \r\n                    \r\n                </div>\r\n            </div>\r\n</data>\r\n\r\n</sentence><br><img src=\"https://storage.scan-interfax.ru/images/1%3A0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKn0KjQlsKu0K%2FSkdGXfOKAsF3QkjrRnCRmGCFFBybQoNGL0ZMhEFkC4oCYaNC9a9GO0KFYwqwOeNGO0JdUDGzihKJXTNC%2B0ZzRinE%3D\"></scandoc>"
                  },
              }
          },
          data: {
            "ok": {
                  "schemaVersion": "1.2",
                  "id": "1:0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKnehLRnNC1KtGK0Ll9BWLigLo/HXXCrhw=",
                  "version": 1,
                  "issueDate": "2019-11-06T09:44:00+03:00",
                  "url": "https://www.vesti.ru/doc.html?id=3206990",
                  "source": {
                  "id": 3264,
                  "groupId": 8388638,
                  "name": "Вести.Ru (vesti.ru)",
                  "categoryId": 7,
                  "levelId": 1
                  },
                  "dedupClusterId": "2596EE21",
                  "title": {
                  "text": "Медведь напал на охотника в Приморье",
                  "markup": "<?xml version=\"1.0\" encoding=\"utf-8\"?><scandoc><sentence>Медведь напал на охотника в <entity type=\"location\" local-id=\"6\">Приморье</entity>\r\n<data>\r\n<div>    <div><p></sentence></scandoc>"
                  },
                  "content": {
                  "markup": "<?xml version=\"1.0\" encoding=\"utf-8\"?><scandoc><sentence><entity type=\"theme\" local-id=\"1\"><entity type=\"theme\" local-id=\"5\">Медведь напал на жителя <entity type=\"location\" local-id=\"6\">Приморья</entity>, пострадавший госпитализирован, - сообщает \"Вести: Приморье\" со ссылкой на <entity type=\"company\" local-id=\"0\">\"Интерфакс-Дальний Восток\"</entity>. </entity></entity></sentence><sentence>Сотрудники полиции проводят проверку по факту инцидента, связанного с нападением медведя на жителя <entity type=\"location\" local-id=\"7\">Уссурийска </entity>в лесу, в окрестностях <entity type=\"location\" local-id=\"8\">села Яконовка</entity>. </sentence><sentence><entity type=\"theme\" local-id=\"2\">Пострадавшего госпитализировали в реанимационное отделение городской больницы.</p>\r\n\r\n<p></entity></sentence><sentence>По данным медиков, он прооперирован, сейчас его жизни ничто не угрожает. </sentence><sentence><entity type=\"theme\" local-id=\"4\">Полицейские установили, что у мужчины есть разрешение на охоту, оружие должным образом зарегистрировано. </entity></sentence><sentence>Обстоятельства случившегося выясняются.</p>\r\n\r\n<p></sentence><sentence><entity type=\"theme\" local-id=\"3\">Напомним, ранее сообщалось, что в минувшие выходные в окрестностях <entity type=\"location\" local-id=\"7\">Уссурийска</entity>, в районе <entity type=\"location\" local-id=\"9\">села Кроуновка </entity>на охотника напал тигр, пострадавший госпитализирован.</p>\r\n</div>\r\n                                                    <div></entity></sentence><sentence>Текст:\r\n                                            ГТРК \"Владивосток\"\r\n                                        </div>\r\n                \r\n                \r\n                <div>\r\n\r\n                    \r\n                    \r\n                    \r\n                </div>\r\n            </div>\r\n</data>\r\n\r\n</sentence><br><img src=\"https://storage.scan-interfax.ru/images/1%3A0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKn0KjQlsKu0K%2FSkdGXfOKAsF3QkjrRnCRmGCFFBybQoNGL0ZMhEFkC4oCYaNC9a9GO0KFYwqwOeNGO0JdUDGzihKJXTNC%2B0ZzRinE%3D\"></scandoc>"
                  },
              }
          },
          data: {
            "ok": {
                  "schemaVersion": "1.2",
                  "id": "1:0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKnehLRnNC1KtGK0Ll9BWLigLo/HXXCrhw=",
                  "version": 1,
                  "issueDate": "2019-11-06T09:44:00+03:00",
                  "url": "https://www.vesti.ru/doc.html?id=3206990",
                  "source": {
                  "id": 3264,
                  "groupId": 8388638,
                  "name": "Вести.Ru (vesti.ru)",
                  "categoryId": 7,
                  "levelId": 1
                  },
                  "dedupClusterId": "2596EE21",
                  "title": {
                  "text": "Медведь напал на охотника в Приморье",
                  "markup": "<?xml version=\"1.0\" encoding=\"utf-8\"?><scandoc><sentence>Медведь напал на охотника в <entity type=\"location\" local-id=\"6\">Приморье</entity>\r\n<data>\r\n<div>    <div><p></sentence></scandoc>"
                  },
                  "content": {
                  "markup": "<?xml version=\"1.0\" encoding=\"utf-8\"?><scandoc><sentence><entity type=\"theme\" local-id=\"1\"><entity type=\"theme\" local-id=\"5\">Медведь напал на жителя <entity type=\"location\" local-id=\"6\">Приморья</entity>, пострадавший госпитализирован, - сообщает \"Вести: Приморье\" со ссылкой на <entity type=\"company\" local-id=\"0\">\"Интерфакс-Дальний Восток\"</entity>. </entity></entity></sentence><sentence>Сотрудники полиции проводят проверку по факту инцидента, связанного с нападением медведя на жителя <entity type=\"location\" local-id=\"7\">Уссурийска </entity>в лесу, в окрестностях <entity type=\"location\" local-id=\"8\">села Яконовка</entity>. </sentence><sentence><entity type=\"theme\" local-id=\"2\">Пострадавшего госпитализировали в реанимационное отделение городской больницы.</p>\r\n\r\n<p></entity></sentence><sentence>По данным медиков, он прооперирован, сейчас его жизни ничто не угрожает. </sentence><sentence><entity type=\"theme\" local-id=\"4\">Полицейские установили, что у мужчины есть разрешение на охоту, оружие должным образом зарегистрировано. </entity></sentence><sentence>Обстоятельства случившегося выясняются.</p>\r\n\r\n<p></sentence><sentence><entity type=\"theme\" local-id=\"3\">Напомним, ранее сообщалось, что в минувшие выходные в окрестностях <entity type=\"location\" local-id=\"7\">Уссурийска</entity>, в районе <entity type=\"location\" local-id=\"9\">села Кроуновка </entity>на охотника напал тигр, пострадавший госпитализирован.</p>\r\n</div>\r\n                                                    <div></entity></sentence><sentence>Текст:\r\n                                            ГТРК \"Владивосток\"\r\n                                        </div>\r\n                \r\n                \r\n                <div>\r\n\r\n                    \r\n                    \r\n                    \r\n                </div>\r\n            </div>\r\n</data>\r\n\r\n</sentence><br><img src=\"https://storage.scan-interfax.ru/images/1%3A0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKn0KjQlsKu0K%2FSkdGXfOKAsF3QkjrRnCRmGCFFBybQoNGL0ZMhEFkC4oCYaNC9a9GO0KFYwqwOeNGO0JdUDGzihKJXTNC%2B0ZzRinE%3D\"></scandoc>"
                  },
              }
          },
        
      },]

    useEffect(() => {
            try {
                setPublications(dataPublicDoc);
                console.log(dataPublicDoc)   
            } catch (err) {
                setError('Ошибка');
            } finally {
                setLoading(false);
            }       
    }, [visibleCount]);


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

        const countWords = (text) => {
            if (typeof text === 'string') {
                const words = text.split(/\s+/).filter(Boolean);
                return words.length;
            }
            console.error("Ошибка: текст для подсчёта слов не является строкой", text);
            return 0;
        };
    //конец парсировки
    



    // Реальная итерация получаеня id для публикаций
    // useEffect(() => {
    //     const fetchDataPublic = async () => {
    //         if (!data) return; 
    
    //         try {
    //             setLoading(true);
    //             const response = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //                 },
    //                 body: JSON.stringify(data),
    //             });
    
    //             if (!response.ok) {
    //                 throw new Error("Ошибка при выполнении запроса.");
    //             }
    
    //             const result = await response.json();
    //             setRequestData(result.items);
    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    
    //     fetchDataPublic();
    // }, [data]);


    // // Реальная итерация получения данных публикаций

    
        // useEffect(() => {
        //     const fetchData = async () => {
        //         if (!requestData || requestData.length === 0) return;

        //             const ids = requestData.map(item => item.encodedId);
    
        //         try {
        //             setLoading(true);
        //             const response = await fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
        //                 method: "POST",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //                 },
        //                body: JSON.stringify({ ids }),
        //             });
    
        //             if (!response.ok) {
        //                 throw new Error("Ошибка при выполнении запроса.");
        //             }
    
        //             const result = await response.json();
        //             setRequestDataPublic(result.ok || []);
        //             setHasMore(result.items.length > 0);
    
        //         } catch (error) {
        //             setError(error.message);
        //         } finally {
        //             setLoading(false);
        //         }
        //     };
    
        //     fetchData();
        // }, [requestData]);


        if (loading) {
            return <div className='login-fall'>
                <p><span>Усп...</span> Для доступа требуется вход в аккаунт</p>
                <Link to="/login">
                    <button className="request-button-default">Войти</button>
                </Link>
            </div> 
        }
        const visiblePublications = publications.slice(0, visibleCount);
        console.log(publications)

    return (
        <div className='container-results'>
            <Header/>

            <main className='main'>
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
`                           
                        </div>
                        </div>

                <div className='container-publications'>
                    <h2 className='text-documents'>Список публикаций</h2>

                    {visiblePublications.map((pub, index) => {
                        
                        const content = parseContent(pub?.data?.ok?.content?.markup);
                        const wordCount = countWords(content);
                        // console.log('Publications:', publications);
                        // console.log('Visible Count:', visibleCount);

                        return (
                            <div key={index} className="publication">
                            <p className="data-publication-name">
                                {pub.data.ok.issueDate
                                ? `${new Date(pub.data.ok.issueDate).toLocaleDateString()} ${pub.data.ok.source?.name || "not found"}`
                                : "Данные отсутствуют"}
                            </p>

                            <h3 className="title-text-publication">
                                {pub.data.ok.title?.text || "Данные отсутствуют"}
                            </h3>
                            <img
                                className="image-publication"
                                src={pub.data.ok.content?.markup.match(/<img src="([^"]+)"/)?.[1] || ""}
                                alt="publication"
                            />
                            <p className="extracted-text">{content}</p>

                            <a href={pub.data.ok.url}>
                                <button className="button-publication">Читать в источнике</button>
                            </a>
                            </div>
                        );
                    })}
                   
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
