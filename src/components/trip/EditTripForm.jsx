import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchATrip, updateTrip } from "../../slices/tripSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditTripForm = () => {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const trip = useSelector((state) =>
    state.trip.trips.find((trip) => trip._id === tripId)
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState(trip);

  useEffect(() => {
    dispatch(fetchATrip(tripId));
  }, [dispatch, tripId]);

  const handleSubmit = (updatedTrip) => {
    dispatch(updateTrip(updatedTrip)).then(() => {
      dispatch(fetchATrip(tripId)).then(() => {
        navigate(`/trips/${tripId}`);
      });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setFormData({
        ...formData,
        startDate: value,
        endDate: value > formData.endDate ? value : formData.endDate,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const currDate = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  if (!trip) {
    return null;
  }

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
              name="tripName"
              value={formData.tripName}
              onChange={handleChange}
              placeholder="Trip Name"
            />
          </div>
          <div>
            <input
              className="edit-trip-input-element"
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Destination"
            />
          </div>
          <input
            className="edit-trip-date-element"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            min={currDate()}
          />
          <input
            className="edit-trip-date-element"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            min={formData.startDate.slice(0, 10)}
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
