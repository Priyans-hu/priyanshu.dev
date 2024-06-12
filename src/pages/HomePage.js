import React from 'react';
import Head from 'next/head';
import Landing from '../components/Landing';
import "../../styles/globals.css";
import { ThreeDCard } from '../components/WorkCard1';
import { Contact } from '../components/contact';
import Header from '../components/header';

const HomePage = () => {
    return (
        <>
            <Head>
                <title>Priyanshu Garg</title>
                <meta name="description" content="Web Developer and Tech Enthusiast - Priyanshu Garg" />
            </Head>
            <div className='bg-slate-950'>
                <Header />
                <div>
                    <Landing />
                    <div className='m-auto w-11/12 xl:w-2/3 xl:grid grid-cols-2 gap-4'>
                        <ThreeDCard />
                        <ThreeDCard />
                    </div>
                    <Contact />
                </div>
            </div>
        </>
    )
}

export default HomePage;
