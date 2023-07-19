import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTrip } from "../../slices/tripSlice";
import { useNavigate } from "react-router-dom";

const CreateTripForm = () => {
  const [destination, setDestination] = useState("");
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tripErrors = useSelector((state) => state.trip.errors);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trip = {
      destination,
      tripName,
      startDate,
      endDate,
    };

    dispatch(createTrip(trip)).then((returnedTrip) => {
      if (returnedTrip && returnedTrip.type === "trips/createTrip/rejected") {
        setErrors(returnedTrip.payload);
        return;
      }
      navigate(`/trips/${returnedTrip.payload._id}`);
    });
  };

  const renderErrors = () => {
    return (
      <ul>
        {Object.keys(errors).map((error, idx) => (
          <li className="create-trip-errors-element" key={`err-${idx}`}>
            {errors[error]}
          </li>
        ))}
      </ul>
    );
  };

  const currDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="create-trip-container">
      <div className="create-trip-form-container">
        <div className="create-trip-header">
          <h3>Create a Trip!</h3>
        </div>
        <div className="create-trip-errors">{renderErrors()}</div>
        <form onSubmit={handleSubmit} className="create-trip-form">
          <div>
            <input
              className="create-trip-input-element"
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="Trip Name"
            />
          </div>
          <div>
            <input
              className="create-trip-input-element"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination"
            />
          </div>
          <input
            className="create-trip-date-element"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={currDate()}
          />
          <input
            className="create-trip-date-element"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate.length === 0 ? currDate() : startDate}
          />
          <input
            className="create-trip-submit-text"
            type="submit"
            value="Create Trip"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateTripForm;
