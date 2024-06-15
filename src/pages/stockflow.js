// pages/stockflow.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import "../../styles/globals.css";
import Header from '../components/header';

const StockFlow = () => {
    const projectDescription = `StockFlow is a comprehensive stock management system designed to streamline inventory processes for businesses. It offers features like real-time tracking, order management, and detailed analytics to help businesses maintain optimal stock levels and reduce operational costs.`;

    return (
        <>
            <Head>
                <title>Priyanshu Garg</title>
                <meta name="description" content="Web Developer and Tech Enthusiast - Priyanshu Garg" />
            </Head>
            <div className='bg-gray-950 min-h-screen'>
                <Header secondary={'about'} />
                <main className="p-8 px-4">
                    <div className='m-auto md:max-w-4xl xl:w-2/3 text-white'>
                        <h1 className="text-5xl lg:text-6xl font-semibold mt-32 mb-12 lg:mt-52">StockFlow</h1>
                        <div className='text-xl'>
                            <p className="text-xl mb-6">{projectDescription}</p>
                            <div className="grid grid-cols-2 gap-4 my-16">
                                <Image
                                    src="/stockflow1.jpg"
                                    alt="StockFlow Image 1"
                                    width={500}
                                    height={300}
                                    className="rounded-lg"
                                />
                                <Image
                                    src="/stockflow2.jpg"
                                    alt="StockFlow Image 2"
                                    width={500}
                                    height={300}
                                    className="rounded-lg"
                                />
                                <Image
                                    src="/stockflow3.jpg"
                                    alt="StockFlow Image 3"
                                    width={500}
                                    height={300}
                                    className="rounded-lg"
                                />
                                <Image
                                    src="/stockflow4.jpg"
                                    alt="StockFlow Image 4"
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
                                    <li>Real-time stock tracking</li>
                                    <li>Order management system</li>
                                    <li>Detailed inventory analytics</li>
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

export default StockFlow;