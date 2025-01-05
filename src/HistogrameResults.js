import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/HistogramResults.css';
import logoFooter from './assets/6465f70937726c512fe72d7d2f4a4889.png';
import logo from './assets/SGN_09_24_2022_1663968217400 1.png';
import arrow from "./assets/icons8-шеврон-вправо-90 1.png";

const HistogramResults = () => {
    const API_URL = ('https://gateway.scan-interfax.ru/api/v1/objectsearch');
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null); 
    const [menu, setMenu] = useState(false);
    const [accountInfo, setAccountInfo] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dataCounts, setDataCounts] = useState('');
    const [dataCountsDev, setDataCountsDev] = useState('');
    const [requestData, setRequestData] = useState(''); //Данные для получения результатов поиска
    const [requestDataPublic, setRequestDataPublic] = useState('');
    const [publicData, setPublicData] = useState('') //Данные публикаций
    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isMobile, setIsMobile] = useState(false); 
    const [visibleCount, setVisibleCount] = useState(2); 

    const PAGE_SIZE = 10;

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 480); 
        };
    
        handleResize(); 
        window.addEventListener("resize", handleResize); 
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);


    // Симуляция загрузки данных
    useEffect(() => {
        setTimeout(() => {
            try {
                const mockData = {
                    data: [
                        {
                            data: [
                                { date: '2020-11-01T03:00:00+03:00', value: 8 },
                                { date: '2020-06-01T03:00:00+03:00', value: 6 },
                                { date: '2020-06-01T03:00:00+03:00', value: 3 },
                                { date: '2020-06-01T03:00:00+03:00', value: 4 },
                                { date: '2020-06-01T03:00:00+03:00', value: 5 },
                                { date: '2020-06-01T03:00:00+03:00', value: 5 },
                                { date: '2020-06-01T03:00:00+03:00', value: 5 },
                                { date: '2020-06-01T03:00:00+03:00', value: 5 },
                                { date: '2020-06-01T03:00:00+03:00', value: 5 },
                                { date: '2020-06-01T03:00:00+03:00', value: 5 },
                            ],
                            histogramType: 'totalDocuments',
                        },
                        {
                            data: [
                                { date: '2020-11-01T03:00:00+03:00', value: 2 },
                                { date: '2020-06-01T03:00:00+03:00', value: 1 },
                                { date: '2020-06-01T03:00:00+03:00', value: 10 },
                                { date: '2020-06-01T03:00:00+03:00', value: 2 },
                                { date: '2020-06-01T03:00:00+03:00', value: 2 },
                                { date: '2020-06-01T03:00:00+03:00', value: 5 },
                                { date: '2020-06-01T03:00:00+03:00', value: 5 },
                                { date: '2020-06-01T03:00:00+03:00', value: 5 },
                                { date: '2020-06-01T03:00:00+03:00', value: 5 },
                            ],
                            histogramType: 'riskFactors',
                        },

                        
                    ],
                };
                setData(mockData);

                const totalCompanies = mockData.data.reduce((acc, histogram) => {   
                    return acc + histogram.data.length
                }, 0);

                const getWordEnding = (number) => {
                    const lastDigit = number % 10;
                    const lastTwoDigits = number % 100;
    
                    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
                        return 'вариантов';
                    }
                    if (lastDigit === 1) {
                        return 'вариант';
                    }
                    if (lastDigit >= 2 && lastDigit <= 4) {
                        return 'варианта';
                    }
                    return 'вариантов';
                };
    
                setDataCountsDev(getWordEnding(totalCompanies)); 
                setDataCounts(totalCompanies)
                
            } catch (err) {
                setError('Ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        }, 1000); 
    }, []);

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
    
    useEffect(() => {
        setTimeout(() => {
            try {
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
                  
                setRequestDataPublic(dataPublicDoc);
                setPublications(dataPublicDoc);
                
            } catch (err) {
                setError('Ошибка');
            } finally {
                setLoading(false);
            }
        }, 1000); 
    }, []);


    const handleLoadMore = () => {
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

      useEffect(() => {
        if (requestDataPublic && requestData && data) {
            console.log(requestDataPublic, requestData, data);
        }
    }, [requestDataPublic, requestData, data]);


    
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

    // Реальная итерация получаеня данных публикаций
    // useEffect(() => {
    //     const fetchDataPublic = async () => {
    //         if (!requestDataPublic) return; 
    
    //         try {
    //             setLoading(true);
    //             const response = await fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //                 },
    //                 body: JSON.stringify(requestDataPublic),
    //             });
    
    //             if (!response.ok) {
    //                 throw new Error("Ошибка при выполнении запроса.");
    //             }
    
    //             const result = await response.json();
    //             setPublicData(result.data);
    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    
    //     fetchDataPublic();
    // }, [requestDataPublic]);

    // Реальная итерация получаеня данных о компаниях
    // useEffect(() => {
    //     let interval;
    //     if (loading) {
    //         interval = setInterval(() => {
    //             setLoader((prev) => (prev === '...' ? '' : prev + '.'));
    //         }, 1000);
    //     }
    //     return () => clearInterval(interval); 
    // }, [loading]);

    // useEffect(() => {
    //     if (location.state?.data) {
    //         setData(location.state.data);
    //         setLoading(false);
    //     } else {
    //         setError("Данные отсутствуют. Вернитесь на предыдущую страницу и выполните поиск.");
    //         setLoading(false);
    //     }
    // }, [location.state])


    //Реальная итерация получения данных для публикаций
    // useEffect(() => {
        //     if (location.state?.requestData) {
        //         setRequestData(location.state.requestData);
        //         setLoading(false);
        //     } else {
        //         setError("Данные отсутствуют. Повторите попытку");
        //         setLoading(false);
        //     }
        // }, [location.state])
    
        // useEffect(() => {
        //     if (location.state?.requestData) {
        //         setRequestData(location.state.requestData);
        //         setLoading(false);
        //     } else {
        //         setError("Данные отсутствуют. Повторите попытку");
        //         setLoading(false);
        //     }
        // }, [location.state]);
    
        // useEffect(() => {
        //     const fetchData = async () => {
        //         if (!requestData) return;
    
        //         try {
        //             setLoading(true);
        //             const response = await fetch(API_URL, {
        //                 method: "POST",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //                 },
        //                 body: JSON.stringify(requestData),
        //             });
    
        //             if (!response.ok) {
        //                 throw new Error("Ошибка при выполнении запроса.");
        //             }
    
        //             const result = await response.json();
        //             setRequestDataPublic(result.data);
    
        //         } catch (error) {
        //             setError(error.message);
        //         } finally {
        //             setLoading(false);
        //         }
        //     };
    
        //     fetchData();
        // }, [requestData]);
    
        useEffect(() => {
            if (requestDataPublic?.data?.ok) {
                loadMorePublications();
            }
        }, [requestDataPublic]);

        const loadMorePublications = () => {
            if (isLoading || !hasMore) return;
    
            setIsLoading(true);
    
            const allPublications = Array.isArray(requestDataPublic?.data?.ok)
                ? requestDataPublic.data.ok
                : [requestDataPublic?.data?.ok];
    
            const start = page * PAGE_SIZE;
            const end = start + PAGE_SIZE;
    
            const newPublications = allPublications.slice(start, end); 
            setPublications((prev) => [...prev, ...newPublications]);
    
            if (newPublications.length < PAGE_SIZE) {
                setHasMore(false); 
            }
    
            setPage((prevPage) => prevPage + 1);
            setIsLoading(false);
        };
        



    const handleNext = () => {
        if (data) {
            const totalDocuments = data.data.find((item) => item.histogramType === 'totalDocuments')?.data || [];
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalDocuments.length); 
        }
    };

    const handlePrev = () => {
        if (data) {
            const totalDocuments = data.data.find((item) => item.histogramType === 'totalDocuments')?.data || [];
            setCurrentIndex((prevIndex) => (prevIndex - 1 + totalDocuments.length) % totalDocuments.length); 
        }
    };
    

    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="no-data">
                <p>Данные не получены. Попробуйте снова.</p>
            </div>
        );
    }

    const totalDocuments = data.data.find((item) => item.histogramType === 'totalDocuments')?.data || [];
    const riskFactors = data.data.find((item) => item.histogramType === 'riskFactors')?.data || [];
    

    return (
        <div>
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
                    <button className="link-button-reg">
                        <Link to="/login">Войти</Link>
                    </button>
                </div>
            </header>

            <main className='main'>
                <h2 className='head-text'>Ищем. Скоро будут результаты</h2>
                <p className='back-head-text'>Поиск может занять некоторое время, просим сохранять терпение.</p>
                <div className='background-head'></div>
                <h2 className='back-text'>Общая сводка</h2>
                <h3 className='counts-text'>Найдено {dataCounts} {dataCountsDev}</h3>
                
                <div className="carousel">
                    <img onClick={handlePrev} className="arrow-1-results" src={arrow} />
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
                
                        {isMobile ? (
                            // Мобильная версия
                            <div className="carousel-item">
                                <h3 className='data-text'>{new Date(totalDocuments[currentIndex].date).toLocaleDateString()}</h3>
                                <p className='all'>Всего: {totalDocuments[currentIndex]?.value}</p>
                                <p className='risks'>Риски: {riskFactors[currentIndex]?.value || 0}</p>
                            </div>
                        ) : (
                            // Компьютерная версия
                            totalDocuments
                                .slice(currentIndex, currentIndex + 10)
                                .map((item, index) => (
                                    <div key={item.id || index} className="carousel-item">
                                        <h3 className='data-text'>{new Date(item.date).toLocaleDateString()}</h3>
                                        <p className='all'>{item.value}</p>
                                        <p className='risks'>{riskFactors[index]?.value || 0}</p>
                                    </div>
                                ))
                        )}               
                    <img onClick={handleNext} className="arrow-2-results" src={arrow} />
                </div>
                </div>
                <div className='container-publications'>
                    <h2 className='text-documents'>Список публикаций</h2>

                    {publications.slice(0, visibleCount).map((publication, index) => {
                        const content = parseContent(publication?.data?.ok?.content?.markup);
                        const wordCount = countWords(content);

                        return (
                            <div key={index} className="publication">
                            <p className="data-publication-name">
                                {publication.data.ok.issueDate
                                ? `${new Date(publication.data.ok.issueDate).toLocaleDateString()} ${publication.data.ok.source?.name || "not found"}`
                                : "Данные отсутствуют"}
                            </p>

                            <h3 className="title-text-publication">
                                {publication.data.ok.title?.text || "Данные отсутствуют"}
                            </h3>
                            <img
                                className="image-publication"
                                src={publication.data.ok.content?.markup.match(/<img src="([^"]+)"/)?.[1] || ""}
                                alt="publication"
                            />
                            <p className="extracted-text">{content}</p>
                            <p className='counts-text'>5000 слов</p>
                            <a href={publication.data.ok.url}>
                                <button className="button-publication">Читать в источнике</button>
                            </a>
                            </div>
                        );
                    })}
                        <button onClick={handleLoadMore} className="load-more-button">
                            {console.log(visibleCount)}
                            Показать больше
                        </button>
                </div>
            </main>
        </div>
    );
};

export default HistogramResults;
