  import React from "react";
  import { useState, useEffect } from "react";
  import { useLocation } from 'react-router-dom';
  import './css/HistogramResults.css';
  import './css/ResultsSection.css';
  import arrow from "./assets/icons8-шеврон-вправо-90 1.png";
  import loadgif from "./assets/4.gif";
  
export const ResultsSection = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false); 
    const [dataCounts, setDataCounts] = useState('');
    const [dataCountsDev, setDataCountsDev] = useState('');

    useEffect(() => {
            const handleResize = () => {
              setIsMobile(window.innerWidth <= 480); 
            };
        
            handleResize(); 
            window.addEventListener("resize", handleResize); 
        
            return () => window.removeEventListener("resize", handleResize);
          }, []);
    
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
                console.log(data)
                

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


    
    if (loading) {
        return <div className="container">
            <img src={loadgif} className="loading-gif-results" autoPlay loop playsInline></img>
            <p className="text-loading">Загрузка данных</p>
            </div>;
    }
    
    if (error) {
        return <div className="error">{error}</div>;
    }
    
    if (!data || !data.data) {
        setLoading(true)
        return 0;
    }

    const totalDocuments = data.data.find((item) => item.histogramType === 'totalDocuments')?.data || [];
    const riskFactors = data.data.find((item) => item.histogramType === 'riskFactors')?.data || [];


    return (
         <>
            <h3 className='counts-text'>Найдено {dataCounts} {dataCountsDev}</h3>
            <img onClick={handlePrev} className="arrow-1-results" src={arrow} />                   
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
         </>                
    )
} 
  
  
  
  
  
  
  
  
  
 