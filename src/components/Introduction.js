import React from 'react'
import '../styles/Introduction.css';
import OverviewSkillCard from './OverviewSkillCard';

// Importing images
import fullStack from '../assets/images/full-stack.png';
import backend from '../assets/images/backend.png';
import reactjs from '../assets/images/reactjs.png';
import frontend from '../assets/images/frontend.png';

const Introduction = () => {
    return (
        <section className='introContainer'>
            <div className='backgroundContainer'></div>
            <div className='contentContainer'>
                <h4>INTRODUCTION</h4>
                <div className='overviewContainer'>
                    <h2 className=''>Overview</h2>
                    <p>I'm a skilled Full Stack software developer with experience in TypeScript and JavaScript, and expertise in frameworks like React, Node.js, MongoDB and Express.js. I'm a quick learner and collaborate closely with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems. Let's work together to bring your ideas to life!</p>
                </div>
                <div className="overviewSkillCardsContainer">
                    <OverviewSkillCard title={'FullStack developer'} imgName={fullStack} />
                    <OverviewSkillCard title={'Frontend developer'} imgName={frontend} />
                    <OverviewSkillCard title={'Backend developer'} imgName={backend} />
                    <OverviewSkillCard title={'Reactjs developer'} imgName={reactjs} />
                </div>
            </div>
        </section>
    )
}

export default Introduction
