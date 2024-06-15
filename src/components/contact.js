import React from "react";
import { FlipWords } from "./ui/flip-words";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Contact() {
    const words = ["better", "cute", "beautiful", "modern"];

    const handleCopyEmail = () => {
        const email = "mailpriyanshugarg@gmail.com";
        navigator.clipboard.writeText(email)
            .then(() => {
                toast.success('Email address copied to clipboard!', {
                    position: "bottom-right",
                    autoClose: 500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            })
            .catch(err => {
                console.error('Failed to copy the email address: ', err);
            });
    };

    return (
        <>
            <div className="h-[40rem] flex justify-center items-center px-4">
                <div className="text-xl sm:text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 text-center sm:text-left">
                    <div className="text-left">
                        Build
                        <FlipWords words={words} />websites <span className='text-base text-neutral-600 dark:text-neutral-400 font-semibold'>(Click to copy)</span><br />
                    </div>
                    <div
                        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white cursor-pointer mt-4"
                        onClick={handleCopyEmail}
                        title="Click to copy email address"
                    >
                        mailpriyanshugarg@gmail.com
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Contact;