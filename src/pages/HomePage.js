import React from 'react';
import '../styles/HomePage.css';
import Landing from '../components/Landing';
import Introduction from '../components/Introduction';
import Projects from '../components/Projects';
const HomePage = () => {
    return (
        <main>
            <div className='homepageMainContainer'>
                <Landing />
                <Introduction />
                <Projects />
            </div>
        </main>
    )
}

export default HomePage
