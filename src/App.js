import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' exact Component={HomePage} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;