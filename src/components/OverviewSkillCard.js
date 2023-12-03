import React from 'react';
import '../styles/overviewSkillCard.css'

const OverviewSkillCard = ( {imgName, title } ) => {
    return (
        <div className='overviewSkillCard'>
            <img src={imgName} alt={imgName} />
            <h3>{title}</h3>
        </div>
    )
}

export default OverviewSkillCard
