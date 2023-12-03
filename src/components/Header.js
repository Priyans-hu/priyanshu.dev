import React, { useState, useEffect } from 'react';
import '../styles/Header.css'
import arrow from '../assets/images/allArrow.png'

export default function Header() {
    const [menuBtn, setMenuBtn] = useState(0);

    const menuToggleHandler = (e) => {
        if (menuBtn) {
            setMenuBtn(0);
            e.target.classList.remove('fa-xmark');
        } else {
            setMenuBtn(1);
            e.target.classList.add('fa-xmark');
        }
    }

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;

            // Show/hide scroll to top button based on scroll position
            if (scrollTop > 20) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Attach scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Add smooth scrolling behavior
        });
    };

    return (
        <header>
            <div className='navTop'>
                <div className='headerContainer'>
                    {/* <h1 className='headerMainHeading'>Priyanshu</h1> */}
                    <h1 className='headerMainHeading'>प्रियांशू</h1>
                    <div className='headerNavigationContainer'>
                        <i className='fa-solid fa-bars menuToggleBtn' onClick={menuToggleHandler}></i>
                        <ul className='headerNavigationList'>
                            <li className='headerNavigationListItem'><a href='/about'>About</a></li>
                            <li className='headerNavigationListItem'><a href='/work'>Work</a></li>
                            <li className='headerNavigationListItem'><a href='/contact'>Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="navLeftFixed">
                <div className='verticalDividerLine'></div>
                <div className='verticalFixed'>Priyanshu / 2023</div>
            </div>
            <div className="navRightFixed">
                <div className={`toTopArrow ${isVisible ? 'visible' : 'hidden'}`}>
                    <button onClick={scrollToTop}>
                        <img src={arrow} alt="To Top" />
                    </button>
                </div>
            </div>
        </header>
    )
};
