import React, {useState} from 'react';
import FormFillingOptions from "./FormFillingOptions";
import FormDetails from "./FormDetails";
import UploadImages from "./UploadImages";
import Stepper from "./Stepper";
import OutputScreen from "./OutputScreen";

const PropertyForm = () => {
  const [step, setStep] = useState(1);
  const [formFillType, setFormFillType] = useState('');
  const[formData, setFormData] = useState(null);

  const onMoveToNextStep = (callStep, data) => {
    setStep(step + 1);
    if (callStep === 1) {
      setFormFillType(data);
    }
    if(callStep === 2) {
      setFormData(data)
    }
  };

  const onMoveToPrevStep = () => {
    setStep(step - 1)
  };

  const onSubmitForm = (images) => {
    setFormData({...formData, images});
    setStep(0);
  };

  const onResetForm = () => {
    setFormData(null);
    setStep(1)
  };

  return (
    <div className='d-flex flex-column align-items-center  h-100'>
      {step !== 0 && <Stepper step={step}/>}
      {step === 1 && <FormFillingOptions onMoveToNextStep={onMoveToNextStep}/>}
      {step === 2 && <FormDetails formFillType={formFillType} onMoveToPrevStep={onMoveToPrevStep}
                                  onMoveToNextStep={onMoveToNextStep}/>}
      {step === 3 && <UploadImages onMoveToPrevStep={onMoveToPrevStep} onSubmitForm={onSubmitForm}/>}
      {step === 0 && <OutputScreen formData={formData} onResetForm={onResetForm}/>}
    </div>
  );
};

export default PropertyForm;