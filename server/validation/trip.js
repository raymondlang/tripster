import Validator from "validator";
import validText from "./valid-text";

const validateTripInput = (data) => {
  let errors = {};
  data.destination = validText(data.destination) ? data.destination : "";
  data.tripName = validText(data.tripName) ? data.tripName : "";

  if (Validator.isEmpty(data.destination))
    errors.destination = "You need to enter a destination";

  if (Validator.isEmpty(data.tripName))
    errors.tripName = "You need to give your trip a name";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export default validateTripInput;
