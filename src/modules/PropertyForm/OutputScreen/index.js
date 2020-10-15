import React from 'react';

const OutputScreen = ({formData, onResetForm}) => {
  const {address, bedrooms, bathrooms, description, images} = formData;
  return (
    <div>
      <div className='font-weight-bold h4'>Form Output:</div>
      <div className='d-flex align-items-center mt-5'>
        <div className='font-weight-bold'>Address:</div>
        <div className='ml-3'>{address}</div>
      </div>

      <div className='d-flex align-items-center mt-3'>
        <div className='font-weight-bold'>Bedrooms:</div>
        <div className='ml-3'>{bedrooms}</div>
      </div>

      <div className='d-flex align-items-center mt-3'>
        <div className='font-weight-bold'>Bathrooms:</div>
        <div className='ml-3'>{bathrooms}</div>
      </div>

      {description &&
      <div className='d-flex align-items-center mt-3'>
        <div className='font-weight-bold'>Description:</div>
        <div className='ml-3'>{description}</div>
      </div>}

      {images.length > 0 &&
      <div className='d-flex align-items-center flex-wrap mt-3'>
        {images.map((file, index) => (
          <div className='w-50 p-2' key={index}>
            <img src={file.preview} alt='uploads' height={100} width={100}/>
          </div>
        ))}
      </div>}

      <div className='d-flex align-items-center justify-content-center mt-4'>
        <button className='bg-light rounded border-0 py-1 px-2' onClick={onResetForm}>Reset Form</button>
      </div>

    </div>
  );
};

export default OutputScreen;