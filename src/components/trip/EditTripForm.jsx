import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditTripForm = ({ trip, handleSubmit, errors, clearErrors }) => {
  const [tripName, setTripName] = useState(trip.tripName);
  const [destination, setDestination] = useState(trip.destination);
  const [startDate, setStartDate] = useState(trip.startDate);
  const [endDate, setEndDate] = useState(trip.endDate);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedTrip = {
      ...trip,
      tripName,
      destination,
      startDate,
      endDate,
    };
    handleSubmit(updatedTrip);
  };

  const currDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="edit-trip-container">
      <div className="edit-trip-form-container">
        <div className="edit-trip-header">
          <h3>Edit your Trip!</h3>
        </div>
        <form onSubmit={handleFormSubmit} className="edit-trip-form">
          <div>
            <input
              className="edit-trip-input-element"
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="Trip Name"
            />
          </div>
          <div>
            <input
              className="edit-trip-input-element"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination"
            />
          </div>
          <input
            className="edit-trip-date-element"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={currDate()}
          />
          <input
            className="edit-trip-date-element"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate.slice(0, 10)}
          />
          <input
            className="edit-trip-submit-text"
            type="submit"
            value="Edit Trip"
          />
        </form>
      </div>
    </div>
  );
};

export default EditTripForm;
