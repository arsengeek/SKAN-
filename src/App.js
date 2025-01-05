import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from './Home';
import {Login} from './Login';
import {Histograme} from './Histograme';
import HistogramResults from './HistogrameResults.js';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/histograme" element={<Histograme />} />
                <Route path="/histogramresults" element={<HistogramResults />} />
            </Routes>
        </Router>
    );
}

export default App;
