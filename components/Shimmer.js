import React  from 'react';

const Shimmer = ( {cards}) => {
  console.log(cards)
  const shimmers = [];

  for (let i = 0; i < cards; i++){
      
    shimmers.push(
      
      <div key={i} className="skimmer-card">
        <div className="title"></div>
        <div className="description"></div>
        <div className="description2"></div>
        </div>
      
    );
    console.log(shimmers);
    }

  return <>{shimmers}</>;
}

export default Shimmer;