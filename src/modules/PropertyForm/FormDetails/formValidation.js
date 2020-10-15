
const validateNumber = (number) => {
  const pattern = /^[0-9\b]+$/;
  return pattern.test(number)
};

export const formValidation = (data) => {
  let ERROR = false;
  let errors = {};
  if (!data.address.trim()) {
    ERROR = true;
    errors.address = "This field is required "
  }
  if (!data.bedrooms.trim()) {
    ERROR = true;
    errors.bedrooms = "This field is required"
  }
  if(data.bedrooms && !validateNumber(data.bedrooms)){
    ERROR = true;
    errors.bedrooms = "This field must contain only integer value!"
  }
  if (!data.bathrooms.trim()) {
    ERROR = true;
    errors.bathrooms = "Comment is required "
  }
  if(data.bathrooms && !validateNumber(data.bathrooms)){
    ERROR = true;
    errors.bathrooms = "This field must contain only integer value!"
  }
  return {ERROR, errors};
};