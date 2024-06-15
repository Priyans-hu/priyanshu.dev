import React from 'react';
import Head from 'next/head';
import "../../styles/globals.css";
import Landing from '../components/Landing';
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
            <div className='bg-gray-950'>
                <Header secondary={'about'}/>
                <div>
                    <Landing />
                    <div className='m-auto w-11/12 xl:w-2/3 xl:grid grid-cols-2 gap-4'>
                        <ThreeDCard 
                            title='UrbanKicks'
                            img='https://images.unsplash.com/photo-1460925895917-afdab827c52f'
                        />
                        <ThreeDCard 
                            title='StockFlow'
                            img='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/19b6d228583461.55c823e68eee6.png'
                        />
                        <ThreeDCard 
                            title='Pastebox'
                            img='https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?'
                        />
                    </div>
                    <Contact />
                </div>
            </div>
        </>
    )
}

export default HomePage;
