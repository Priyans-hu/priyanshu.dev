import React, { useState } from 'react';
import '../styles/Header.css'

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

    return (
        <header>
            <div className='navTop'>
                <div className='headerContainer'>
                    <h1 className='headerMainHeading'>Priyanshu</h1>
                    <div className='headerNavigationContainer'>
                        <i className='fa-solid fa-bars menuToggleBtn' onClick={menuToggleHandler}></i>
                        <ul className='headerNavigationList'>
                            <li className='headerNavigationListItem'><a href='/'>About</a></li>
                            <li className='headerNavigationListItem'><a href='/'>Work</a></li>
                            <li className='headerNavigationListItem'><a href='/'>Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="navLeftFixed">
                <div className='verticalDividerLine'></div>
                <div className='verticalFixed'>Priyanshu / 2023</div>
            </div>
        </header>
    )
};
