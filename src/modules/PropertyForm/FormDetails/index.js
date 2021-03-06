import React, {useEffect, useState} from 'react';
import {formValidation} from "./formValidation";
import {useDropzone} from "react-dropzone";
import Papa from 'papaparse';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const FormDetails = ({formFillType, onMoveToNextStep, onMoveToPrevStep}) => {
  const [csvData, setCsvData] = useState(null);
  const [address, setAddress] = useState('');
  const [bedrooms, setBedRooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [description, setDescription] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [addressText, setAddressText] = useState(formFillType === 'custom' ? 'Bikaner, Rajasthan, India' : '');

  useEffect(() => {
    if (csvData) {
      setAddressText(csvData[1][0]);
      setAddress(csvData[1][0]);
      setBedRooms(csvData[1][1]);
      setBathrooms(csvData[1][2]);
      setDescription(csvData[1][3])
    }
  }, [csvData]);


  const {getRootProps, getInputProps} = useDropzone({
    accept: '.csv',
    multiple: false,
    onDrop: acceptedFiles => {
      Papa.parse(acceptedFiles[0], {
        complete: (result) => {
          setCsvData(result.data)
        },
      });

    },
  });

  const getErrorMessage = (property) => {
    if (validationErrors.errors && validationErrors.errors[property]) {
      return (
        <div className='text-danger'>{validationErrors.errors[property]}</div>
      )
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    let validateForm = formValidation({address: addressText ? addressText : address, bedrooms, bathrooms});
    if (validateForm.ERROR) {
      setValidationErrors(validateForm)
    } else {
      onSaveEvent();
    }
  };

  const onSaveEvent = () => {
    onMoveToNextStep(2, {address: addressText ? addressText : address, bedrooms, bathrooms, description})
  };

  const handleDisableCondition = () => {
    return formFillType === 'csv' && !csvData
  };

  const handleAddressText = value => {
    setAddressText(value);
    setValidationErrors({});
  };

  const onSelectAddress = (e) => {
    setAddress(e.label)
  };

  return (
    <div className='flex-grow-1'>

      {formFillType === 'csv' && <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <div className='text-center'>
          <button className='bg-primary text-white rounded border-0 py-1 px-2'>Upload CSV File</button>
        </div>
      </div>}

      <form onSubmit={onSubmitForm}>

        <div className='mt-3'>
          <label className='font-weight-bold'>Address:</label>
          <GooglePlacesAutocomplete
            apiKey='AIzaSyBfvfj5oqsEKSY6uLFzrcX0dSvk412wkh0'
            selectProps={{
              inputValue: addressText,
              onInputChange: handleAddressText,
              onChange: onSelectAddress,
              isDisabled: handleDisableCondition(),
              placeholder: 'Search the Address...'
            }}

          />
          {getErrorMessage('address')}
        </div>

        <div className='mt-3'>
          <label className='font-weight-bold'>Number of Bedrooms:</label>
          <input type="text" disabled={handleDisableCondition()} value={bedrooms} className='w-100' maxLength={10}
                 onChange={(e) => {
                   setBedRooms(e.target.value)
                   setValidationErrors({})
                 }}/>
          {getErrorMessage('bedrooms')}
        </div>

        <div className='mt-3'>
          <label className='font-weight-bold'>Number of Bathrooms:</label>
          <input type="text" disabled={handleDisableCondition()} value={bathrooms} className='w-100' maxLength={5}
                 onChange={(e) => {
                   setBathrooms(e.target.value)
                   setValidationErrors({})
                 }}/>
          {getErrorMessage('bathrooms')}
        </div>

        <div className='mt-3'>
          <label className='font-weight-bold'>Description</label>
          <input type="text" disabled={handleDisableCondition()} value={description} className='w-100'
                 onChange={(e) => setDescription(e.target.value)}/>
        </div>

        <div style={{marginTop: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <button className='bg-light rounded border-0 py-1 px-2' onClick={onMoveToPrevStep}>Go Back
          </button>
          <button className='bg-primary text-white rounded border-0 py-1 px-2' type='submit'>Save & Proceed</button>
        </div>

      </form>
    </div>
  );
};

export default FormDetails;