import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="footerContainer">
                <p>&copy; {new Date().getFullYear()} Priyanshu. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer
