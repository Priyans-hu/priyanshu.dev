// pages/pastebox.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/header';
import Image from 'next/image';
import "../../styles/globals.css";

const PasteBox = () => {
    const projectDescription = `PasteBox is a simple yet powerful online tool for storing and sharing text snippets, code, and notes. It allows users to create paste bins, share them with others, and manage their content easily.`;

    return (
        <>
            <Head>
                <title>Priyanshu Garg</title>
                <meta name="description" content="Web Developer and Tech Enthusiast - Priyanshu Garg" />
            </Head>
            <div className='bg-gray-950 min-h-screen'>
                <Header secondary={'home'} />
                <main className="p-8">
                    <div className='m-auto md:max-w-4xl xl:w-2/3 text-white'>
                        <h1 className="text-5xl lg:text-6xl font-semibold mt-32 mb-12 lg:mt-52">PasteBox</h1>
                        <div className='text-xl'>
                            <p className="text-xl mb-6">{projectDescription}</p>
                            <div className="grid grid-cols-2 gap-4 my-16">
                                <Image
                                    src="/pastebox1.jpg"
                                    alt="PasteBox Image 1"
                                    width={500}
                                    height={300}
                                    className="rounded-lg"
                                />
                                <Image
                                    src="/pastebox2.jpg"
                                    alt="PasteBox Image 2"
                                    width={500}
                                    height={300}
                                    className="rounded-lg"
                                />
                                <Image
                                    src="/pastebox3.jpg"
                                    alt="PasteBox Image 3"
                                    width={500}
                                    height={300}
                                    className="rounded-lg"
                                />
                                <Image
                                    src="/pastebox4.jpg"
                                    alt="PasteBox Image 4"
                                    width={500}
                                    height={300}
                                    className="rounded-lg"
                                />
                            </div>
                            <p className="text-xl mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum nec odio nec rutrum. In hac habitasse platea dictumst. Donec pharetra, turpis nec feugiat vestibulum, tellus elit sagittis felis, ac tempus enim justo a velit.</p>
                            <p className="text-xl mb-6">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam eu libero eget lacus eleifend dictum.</p>
                            <div className="mb-8">
                                <p className="font-semibold text-2xl mb-2">Key Features:</p>
                                <ul className="list-disc ml-8 mb-4">
                                    <li>Easy text snippet and code storage</li>
                                    <li>Secure sharing options</li>
                                    <li>Organized paste bins for managing content</li>
                                    <li>Responsive design for mobile and desktop</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold text-2xl mb-2">Technologies Used:</p>
                                <ul className="list-disc ml-8 mb-4">
                                    <li>React.js for frontend development</li>
                                    <li>Node.js and Express.js for backend development</li>
                                    <li>MongoDB for database management</li>
                                    <li>Tailwind CSS for styling</li>
                                </ul>
                            </div>
                        </div>
                        <Link href="/" className="text-emerald-500 hover:underline">Back to Home</Link>
                    </div>
                </main>
            </div>
        </>
    );
};

export default PasteBox;