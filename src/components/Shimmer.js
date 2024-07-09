import React  from 'react';

const Shimmer = ({ cards }) => {
  const shimmers = [];

  for (let i = 0; i < cards; i++) {
    shimmers.push(
      <div key={i} className="skimmer-card">
        <div className="title"></div>
        <div className="description"></div>
        <div className="description2"></div>
      </div>
    );
  }

  return <>{shimmers}</>;
};

export default Shimmer;