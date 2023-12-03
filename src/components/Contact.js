import React from 'react'
import '../styles/Contact.css'

const Contact = () => {
    return (
        <section className='contactContainer'>
            <div className='backgroundContainer'></div>
            <div className='contentContainer'>
                <div className="contactWrapper">
                    <div className="contactLeft">
                        <h2>Let's have a coffee together!</h2>
                        <div className="contactMailMe">
                            <span>
                                <i class="fa-regular fa-envelope"></i>
                            </span>
                            <div>
                                <p>Mail me at:</p>
                                <a href="mailto:mailpriyanshugarg@gmail.com">mailpriyanshugarg@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <div className="contactRight">
                        <h4>Send a message</h4>
                        <form action="">
                            <input type="text" name="name" id="name" placeholder='Full Name' />
                            <input type="email" name="email" id="email" placeholder='Email ' />
                            <input type="text" name="subject" id="subject" placeholder='Subject' />
                            <h5>Tell me more about your project</h5>
                            <textarea name="more" id="more" cols="30" rows="4"></textarea>
                            <button>Send message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
