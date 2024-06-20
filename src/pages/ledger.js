// pages/ledger.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/header';
import Image from 'next/image';
import "../../styles/globals.css";

const Ledger = () => {
    const projectDescription = `Ledger is a comprehensive expense management application designed to simplify financial tracking for businesses and individuals. It features robust tools for customer management, expense tracking, invoice generation, and profit tracking.`;

    const challengesDescription = `One of the major challenges was deciding whether to use MongoDB or MySQL for the database. After careful consideration, we opted to use both databases to leverage their respective strengths. Another challenge was ensuring seamless user authentication and maintaining a responsive design for various devices.`;

    const projectInsightsDescription = `The Ledger application aims to provide an intuitive and efficient way to manage business expenses and income. It features a user-friendly interface and powerful backend capabilities to ensure seamless financial management. By utilizing a combination of databases, the application can efficiently handle different types of data storage and retrieval operations, ensuring high performance and scalability.`;

    return (
        <>
            <Head>
                <title>Priyanshu Garg - Ledger Application</title>
                <meta name="description" content="Web Developer and Tech Enthusiast - Priyanshu Garg" />
            </Head>
            <div className='bg-gray-950 min-h-screen'>
                <Header secondary={'home'} />
                <main className="p-8 px-4">
                    <div className='m-auto md:max-w-4xl xl:w-2/3 text-white'>
                        <h1 className="text-5xl lg:text-6xl font-semibold mt-32 mb-12 lg:mt-52">Ledger Application</h1>
                        <div className='text-xl'>
                            <p className="text-xl mb-6">{projectDescription}</p>
                            <div className="grid grid-cols-2 gap-4 my-16">
                                <Image
                                    src="/ledger1.jpg"
                                    alt="Ledger Application Image 1"
                                    width={500}
                                    height={300}
                                    className="rounded-lg"
                                />
                                <Image
                                    src="/ledger2.jpg"
                                    alt="Ledger Application Image 2"
                                    width={500}
                                    height={300}
                                    className="rounded-lg"
                                />
                                <Image
                                    src="/ledger3.jpg"
                                    alt="Ledger Application Image 3"
                                    width={500}
                                    height={300}
                                    className="rounded-lg"
                                />
                                <Image
                                    src="/ledger4.jpg"
                                    alt="Ledger Application Image 4"
                                    width={500}
                                    height={300}
                                    className="rounded-lg"
                                />
                            </div>
                            <p className="text-xl my-8">{projectInsightsDescription}</p>
                            <div className="mb-8">
                                <p className="font-semibold text-2xl mb-2">Project Insights:</p>
                                <p className="text-xl mb-6">{projectInsightsDescription}</p>
                            </div>
                            <div className='mb-8'>
                                <p className="font-semibold text-2xl mb-2">Challenges:</p>
                                <p className="text-xl mb-6">{challengesDescription}</p>
                            </div>
                            <div className="mb-8">
                                <p className="font-semibold text-2xl mb-2">Key Features:</p>
                                <ul className="list-disc ml-8 mb-4">
                                    <li>Customer Management</li>
                                    <li>Expense Management</li>
                                    <li>Generate invoices/bills (GST and non-GST)</li>
                                    <li>Track payments (income/expenses)</li>
                                    <li>Dashboard for monthly and daily sales data</li>
                                    <li>Profit tracking (daily, monthly, weekly)</li>
                                    <li>User authentication</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold text-2xl mb-2">Technologies Used:</p>
                                <ul className="list-disc ml-8 mb-4">
                                    <li>React.js for frontend development</li>
                                    <li>Node.js and Express.js for backend development</li>
                                    <li>MongoDB, PostgreSQL, and MySQL for database management</li>
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

export default Ledger;