import React from "react";
import { useDispatch } from "react-redux";
import { deleteTrip } from "../../slices/tripSlice";
import { Link, useNavigate } from "react-router-dom";

const TripDetails = ({ trip }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteTrip(trip._id));
  };

  const handleEdit = () => {
    navigate(`/trips/${trip._id}/edit`);
  };

  return (
    <li className="trip-card">
      <div>
        <div className="trip-name">
          <h2 className="trip-details-color">
            <Link to={`/trips/${trip._id}`}>{trip.tripName}</Link>
          </h2>
        </div>

        <div className="trip-details">
          <p className="trip-details-color">Destination: {trip.destination}</p>
          <p className="trip-details-color">
            Dates:{" "}
            {`${trip.startDate.slice(0, 10)} - ${trip.endDate.slice(0, 10)}`}
          </p>
        </div>
      </div>

      <div className="user-trip-links">
        <button className="delete-trip" onClick={handleDelete}>
          Delete This Trip
        </button>
        <button className="edit-trip" onClick={handleEdit}>
          Edit This Trip
        </button>
      </div>
    </li>
  );
};

export default TripDetails;
