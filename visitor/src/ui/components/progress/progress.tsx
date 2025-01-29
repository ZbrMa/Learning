import React from 'react';
import './progress.css';

interface ProgressProps {
  progress: number;
  direction?:'vertical'|'horizontal';
  label?:string,
}

export const Progress: React.FC<ProgressProps> = ({ progress,direction='horizontal',label }) => {
  return (
    <div className={`progress-container ${direction ==='horizontal' ? 'flex items-center' : 'flex-col content-center'} g-8`}>
        <div className="tc-black bold tx-sm"><span className='tx-gray'>{label}</span> {progress}%</div>
        <div className='outer-progress-bar'><div
        className={`progress-bar ${progress < 33.33 ? 'low' : progress < 66.66 ? 'mid' : 'high'}`}
        style={{ width: `${progress}%` }}
      /></div>
      
    </div>
  );
};
