import React from 'react';
import '../styles/HomePage.css';
import Landing from '../components/Landing';
import Introduction from '../components/Introduction';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
const HomePage = () => {
    return (
        <main>
            <div className='homepageMainContainer'>
                <Landing />
                <Introduction />
                <Projects />
                <Contact />
            </div>
        </main>
    )
}

export default HomePage
