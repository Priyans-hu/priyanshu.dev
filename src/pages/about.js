import React from 'react';
import Head from 'next/head';
import '../../styles/globals.css';
import Header from '../components/header';
import { Contact } from '../components/contact';
import { GeminiEffect } from '../components/about';

const About = () => {
    return (
        <>
            <Head>
                <title>Priyanshu Garg</title>
                <meta name='description' content='Web Developer and Tech Enthusiast - Priyanshu Garg' />
            </Head>
            <div className='bg-gray-950 pointer-events-none select-none'>
                <Header />
                <div className='min-h-screen flex items-center justify-center'>
                    <div className='max-w-3xl text-white shadow-md rounded-lg py-8'>
                        <GeminiEffect />
                        <div className='text-xl text-slate-200 my-20'>
                            <p className='my-12'>
                                With a strong foundation in computer science and a passion for software development, I have actively engaged in diverse projects and tech-related clubs, honing my skills and delivering exceptional results. My experience spans organizing events, solving competitive programming questions, and optimizing code for efficiency.
                            </p>
                            <p className='my-12'>
                                Thriving in dynamic environments, I excel in problem-solving and driving solutions from inception to completion. My expertise lies in crafting functional and visually appealing user interfaces using MERN stack, Java, and a variety of design tools. I prioritize user-centric design and maintain a flexible approach that adapts seamlessly to project requirements, encompassing research, implementation, and evaluation stages.
                            </p>
                            <p className='my-12'>
                                I foster open communication and teamwork, leveraging my technical proficiency in JavaScript, Node.js, Express.js, React.js, Tailwind CSS, and NoSQL/SQL databases. My commitment to continuous learning ensures I stay updated with the latest industry trends and technologies. I believe a supportive and collaborative environment is key to success and strive to create such an atmosphere in every team I join. Always eager to learn, I seek new experiences to enhance my skills and contribute meaningfully to innovative projects.
                            </p>
                        </div>

                        <div className='my-20'>
                            <h2 className='text-4xl font-semibold my-4'>Skills</h2>
                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 my-8'>
                                <div className='col-span-2 bg-gray-900 bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-md'>
                                    <h3 className='text-2xl font-semibold mb-2'>Programming Languages</h3>
                                    <ul className='list-disc pl-5 text-slate-200'>
                                        <li className='mb-2'>Java</li>
                                        <li className='mb-2'>JavaScript</li>
                                        <li className='mb-2'>C/C++</li>
                                        <li className='mb-2'>Python</li>
                                    </ul>
                                </div>
                                <div className='col-span-1 bg-gray-900 bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-md'>
                                    <h3 className='text-2xl font-semibold mb-2'>Tools & Technologies</h3>
                                    <ul className='list-disc pl-5 text-slate-200'>
                                        <li className='mb-2'>Git & GitHub</li>
                                        <li className='mb-2'>Docker</li>
                                        <li className='mb-2'>CI/CD</li>
                                        <li className='mb-2'>Agile Methodologies</li>
                                        <li className='mb-2'>Deployment</li>
                                    </ul>
                                </div>
                                <div className='col-span-1 bg-gray-900 bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-md'>
                                    <h3 className='text-2xl font-semibold mb-2'>Databases</h3>
                                    <ul className='list-disc pl-5 text-slate-200'>
                                        <li className='mb-2'>SQL</li>
                                        <li className='mb-2'>NoSQL (MongoDB)</li>
                                    </ul>
                                </div>
                                <div className='col-span-2 bg-gray-900 bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-md'>
                                    <h3 className='text-2xl font-semibold mb-2'>Web Development</h3>
                                    <ul className='list-disc pl-5 text-slate-200'>
                                        <li className='mb-2'>React.js</li>
                                        <li className='mb-2'>Node.js & Express.js</li>
                                        <li className='mb-2'>Next.js</li>
                                        <li className='mb-2'>HTML & CSS</li>
                                        <li className='mb-2'>Tailwind CSS</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='my-20'>
                            <h2 className='text-4xl font-semibold my-4'>Education</h2>
                            <ul className='list-disc pl-8 mb-8'>
                                <li className='text-lg my-10'>
                                    <span className='block text-2xl mb-1'>Bachelor of Engineering in Computer Science</span>
                                    <span className='block text-slate-400 mb-2'>Chitkara University</span>
                                    <p className='text-slate-200 text-base mb-2'>
                                        Continuously expanding my knowledge and expertise in software development, with a focus on real-world applications and problem-solving.
                                    </p>
                                    <span className='text-slate-400 text-base'>2021-2025</span>
                                </li>
                                <li className='text-lg mb-10'>
                                    <span className='block text-2xl mb-1'>High School</span>
                                    <span className='block text-slate-400 mb-2'>CCDPS</span>
                                    <p className='text-slate-200 text-base mb-2'>
                                        Built a strong foundation in computer science and PCM (Physics, Chemistry, Mathematics).
                                    </p>
                                    <span className='text-slate-400 text-base'>Graduated in 2021</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='text-slate-400 mx-auto max-w-3xl text-3xl text-left'>Feel free to reach out for projects, collaborations, or just to say hello! Currently seeking new opportunities.</div>
                <Contact />
            </div>
        </>
    );
};

export default About;