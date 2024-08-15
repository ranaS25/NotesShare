import React  from 'react';

const Shimmer = ({ cards }) => {
  const shimmers = [];

  for (let i = 0; i < cards; i++) {
    shimmers.push(
      <div
        key={i}
        className="w-[300px] h-fit flex flex-col gap-3 bg-slate-200 dark:bg-slate-700 p-4 grow-[0.3] rounded"
      >
        <div className="h-6 w-1/3 bg-slate-400 rounded dark:bg-slate-600"></div>
        <div className="h-4 w-full bg-slate-400 rounded dark:bg-slate-600"></div>
        <div className="h-4 w-10/12 bg-slate-400 rounded dark:bg-slate-600"></div>
      </div>
    );
  }

  return <>{shimmers}</>;
};

export default Shimmer;