import React, { useState } from 'react'
import '../styles/Contact.css'

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sub, setSub] = useState('');
    const [additional, setAdditional] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Details: Name - ${name}, Email - ${email}, Subject - ${sub}, Additional - ${additional || 'N/A'}`);
    }    

    return (
        <section className='contactContainer'>
            <div className='backgroundContainer'></div>
            <div className='contentContainer'>
                <div className="contactWrapper">
                    <div className="contactLeft">
                        <h2>Let's have a coffee together!</h2>
                        <div className="contactMailMe">
                            <span>
                                <i className="fa-regular fa-envelope"></i>
                            </span>
                            <div>
                                <p>Mail me at:</p>
                                <a href="mailto:mailpriyanshugarg@gmail.com">mailpriyanshugarg@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <div className="contactRight">
                        <h4>Send a message</h4>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                placeholder='Full Name' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder='Email' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input 
                                type="text" 
                                name="subject" 
                                id="subject" 
                                placeholder='Subject' 
                                value={sub} 
                                onChange={(e) => setSub(e.target.value)}
                            />
                            <h5>Tell me more about your project</h5>
                            <textarea 
                                name="more" 
                                id="more" 
                                cols="30" 
                                rows="4" 
                                value={additional} 
                                onChange={(e) => setAdditional(e.target.value)}
                            >
                            </textarea>
                            <button type='submit'>Send message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
