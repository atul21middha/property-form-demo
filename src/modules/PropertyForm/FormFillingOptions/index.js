import React, {useState} from 'react';

const FormFillingOptions = ({onMoveToNextStep}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChangeValue = (e) => {
    setValue(e.target.value);
    setError('')
  };

  const onProceed = () => {
    if (value) {
      onMoveToNextStep(1, value);
    } else {
      setError('Please select one field!')
    }
  };

  return (
    <div className='flex-grow-1 d-flex flex-column justify-content-center align-items-center'>
      <div>
      <div className='d-flex align-items-center'>
        <div>
          <input type="radio" name="form-option" value="custom" onChange={handleChangeValue}/>
          <label className='ml-2' htmlFor="male">Add From Scratch</label>
        </div>
        <div className='ml-5'>
          <input type="radio" name="form-option" value="csv" onChange={handleChangeValue}/>
          <label className='ml-2' htmlFor="female">Upload as CSV</label>
        </div>
      </div>
      <div className='text-danger'>{error}</div>
      </div>
      <div className='mt-4'>
        <button className='bg-primary text-white rounded border-0 py-1 px-2' onClick={onProceed}>Proceed</button>
      </div>
    </div>
  );
};

export default FormFillingOptions;