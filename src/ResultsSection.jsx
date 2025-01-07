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
    const requestData = localStorage.getItem('requestData')
    const [data, setResponseData] = useState(null)
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false); 
    const [dataCounts, setDataCounts] = useState('');
    const [dataCountsDev, setDataCountsDev] = useState('');
 

    //Распознавание размера экрана для версии верстки
    useEffect(() => {
            const handleResize = () => {
              setIsMobile(window.innerWidth <= 480); 
            };
        
            handleResize(); 
            window.addEventListener("resize", handleResize); 
        
            return () => window.removeEventListener("resize", handleResize);
          }, []);
    
    useEffect(() => {

         ///Итерация получения данных
    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке запроса');
            }

            const data = await response.json();
            setResponseData(data);

            const totalCompanies = data.data.reduce((acc, histogram) => {   
                return acc + histogram.data.length / 2
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
            setError(err.message);
            console.error('Ошибка:', err);
        } finally {
            setLoading(false);
        }
    };

  //Симуляция 
        // setTimeout(() => {
        //     try {
        //         const mockData = {
        //             data: [
        //                 {
        //                     data: [
        //                         { date: '2020-11-01T03:00:00+03:00', value: 1 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 2 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 3 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 4 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 6 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 7 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 8 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 9 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 10 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 11},
        //                         { date: '2020-06-01T03:00:00+03:00', value: 12 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 13 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 14 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 15 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 16 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 17 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 18 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 19 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 20 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 21 },


        //                     ],
        //                     histogramType: 'totalDocuments',
        //                 },
        //                 {
        //                     data: [
        //                         { date: '2020-11-01T03:00:00+03:00', value: 2 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 1 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 10 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 2 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 2 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                         { date: '2020-06-01T03:00:00+03:00', value: 5 },
        //                     ],
        //                     histogramType: 'riskFactors',
        //                 },

                        
        //             ],
        //         };
                
        //         setResponseData(mockData);
        //         console.log(data)
                
                
    //         } catch (err) {
    //             setError('Ошибка при загрузке данных');
    //         } finally {
    //             setLoading(false);
    //         }
    //     }, 1000); 
    }, []);


    //Загрузка
    if (loading) {
        return <div className="container">
            <img src={loadgif} className="loading-gif-results" autoPlay loop playsInline></img>
            <p className="text-loading">Загрузка данных</p>
            </div>;
    }
    //ошибка
    if (error) {
        return <div className="error">{error}</div>;
    }
    
    //нет данных. или они еще не загрузились
    if (!data || !data.data) {
        setLoading(true)
        return 0;
    }

    //Данные для обеспечения карусели
    const totalDocuments = data.data.find((item) => item.histogramType === 'totalDocuments')?.data || [];
    const riskFactors = data.data.find((item) => item.histogramType === 'riskFactors')?.data || [];

    const visibleDocuments = totalDocuments.slice(currentIndex, currentIndex + 10);
    const visibleRiskFactors = riskFactors.slice(currentIndex, currentIndex + 10);

    //кнопки прокрутки
    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 10, totalDocuments.length - visibleDocuments.length)
        );
    };
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 10, 0));
    };

    return (
         <>
            <h3 className='counts-text'>Найдено {dataCounts} {dataCountsDev}</h3>
                         
            {isMobile ? (
                // Мобильная версия
                                    
                <div className="carousel-item">
                    <h3 className='data-text'>{new Date(totalDocuments[currentIndex].date).toLocaleDateString()}</h3>
                    <p className='all'>Всего: {totalDocuments[currentIndex]?.value}</p>
                    <p className='risks'>Риски: {riskFactors[currentIndex]?.value || 0}</p>
                </div>
            ) : (
                // Компьютерная версия
                visibleDocuments.map((item, index) => (
                    <div key={index} className="carousel-item">
                        <h3 className="data-text">{new Date(item.date).toLocaleDateString()}</h3>
                        <p className="all">Всего: {item.value}</p>
                        <p className="risks">Риски: {visibleRiskFactors[index]?.value || 0}</p>
                    </div>
                    ))
            )}    
            <img onClick={handleNext} className="arrow-2-results" src={arrow} />    
            <img onClick={handlePrev} className="arrow-1-results" src={arrow} />          
         </>                
    )
} 
  
  
  
  
  
  
  
  
  
 