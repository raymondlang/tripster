import Validator from "validator";
import validText from "./validText.js";

const validateTripInput = (data) => {
  let errors = {};

  data.comment = validText(data.comment) ? data.comment : "";

  if (Validator.isEmpty(data.comment)) {
    errors.comment = "The comment can't be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export default validateTripInput;
