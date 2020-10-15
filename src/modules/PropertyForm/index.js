import React, {useState} from 'react';
import FormFillingOptions from "./FormFillingOptions";
import FormDetails from "./FormDetails";
import UploadImages from "./UploadImages";
import Stepper from "./Stepper";

const PropertyForm = () => {
  const [step, setStep] = useState(3);
  const [formFillType, setFormFillType] = useState('');

  const onMoveToNextStep = (callStep, data) => {
    setStep(step + 1)
    if (callStep === 1) {
      setFormFillType(data);
    }
  };

  const onMoveToPrevStep = () => {
    setStep(step - 1)
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center h-100'>
      <Stepper step={step}/>
      {step === 1 && <FormFillingOptions onMoveToNextStep={onMoveToNextStep}/>}
      {step === 2 && <FormDetails formFillType={formFillType} onMoveToPrevStep={onMoveToPrevStep}
                                  onMoveToNextStep={onMoveToNextStep}/>}
      {step === 3 && <UploadImages onMoveToPrevStep={onMoveToPrevStep}/>}
    </div>
  );
};

export default PropertyForm;