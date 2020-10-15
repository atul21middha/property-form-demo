import React from 'react';

const steps = [
  {title: 'Step 1', slug: 1},
  {title: 'Step 2', slug: 2},
  {title: 'Step 3', slug: 3}
];

const Stepper = ({step}) => {
  return (
    <div className='d-flex align-items-center mb-4'>
      {steps.map((item, index) => (
        <div className='d-flex align-items-center' key={index}>
        <div className='d-flex flex-column align-items-center justify-content-center ml-3'>
          <div className={`${step === item.slug ? 'bg-primary' : 'bg-dark'}`}
               style={{height: 25, width: 25, borderRadius: '50%', textAlign: 'center', color: '#fff'}}>{item.slug}
          </div>
          <div className={`${step === item.slug ? 'text-primary' : ''}`}>{item.title}</div>
        </div>
          {index !== (steps.length-1) &&
          <div style={{width: 50, height: 1, backgroundColor: 'black', marginLeft: 20}}/>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;