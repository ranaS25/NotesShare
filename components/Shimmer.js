
import React  from 'react';

const Shimmer = ({numOfShimmers})=>{

    for(let i=0; i<numOfShimmers; i++){
        <div className="skimmer-card">
                <div className="title"></div>
                <div className="description"></div>
                <div className="description2"></div>
        </div>
    }

    return (

            <div className="skimmer-card">
                <div className="title"></div>
                <div className="description"></div>
                <div className="description2"></div>
            </div>
        
            )
}

export default Shimmer;