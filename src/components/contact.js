import React from "react";
import { FlipWords } from "./ui/flip-words";

export function Contact() {
    const words = ["better", "cute", "beautiful", "modern"];

    const handleCopyEmail = () => {
        const email = "mailpriyanshugarg@gmail.com";
        navigator.clipboard.writeText(email)
            .then(() => {
                alert('Email address copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy the email address: ', err);
            });
    };

    return (
        <div className="h-[40rem] flex justify-center items-center px-4">
            <div className="text-xl sm:text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 text-center sm:text-left">
                <div className="text-left">
                    Build
                    <FlipWords words={words} />websites <br />
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
    );
}