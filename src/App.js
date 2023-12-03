// Importing react libraries
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importing components
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Contact from './components/Contact';
import Introduction from './components/Introduction';
import Footer from './components/Footer';
import Projects from './components/Projects';

function App() {
    return (
        <div className="App">
            <Header />
            <Router>
                <Routes>
                    <Route path='/' exact Component={HomePage} />
                    <Route path='/about' exact Component={Introduction} />
                    <Route path='/work' exact Component={Projects} />
                    <Route path='/contact' exact Component={Contact} />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;