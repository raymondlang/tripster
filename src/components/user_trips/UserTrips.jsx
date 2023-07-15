import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TripDetails from "./TripDetails";
import { Link } from "react-router-dom";
import { fetchUserTrips, deleteTrip } from "../../slices/tripSlice";

const UserTrips = () => {
  const dispatch = useDispatch();
  const trips = useSelector((state) => Object.values(state.trip.trip));
  const currentUser = useSelector((state) => state.session?.user);

  useEffect(() => {
    dispatch(fetchUserTrips(currentUser.id));
  }, [dispatch, currentUser.id]);

  if (trips.length === 0) {
    return (
      <div className="no-trip-page">
        <div className="no-trip-container">
          <h1>You don't have any trips planned yet!</h1>
          <div className="no-trip-create-btn-container">
            <Link className="no-trip-create-btn" to="/trips/create">
              Create a new trip
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="users-trip-page">
        <div className="user-trips-nav-border"></div>
        <div className="users-trip-container">
          <div className="users-trip-header">
            <h1>My Trips</h1>
          </div>

          <ul className="users-trip-subcontainer">
            {trips.map((trip) => (
              <TripDetails key={trip._id} trip={trip} deleteTrip={deleteTrip} />
            ))}
            <Link className="new-trip-btn" to="/trips/create">
              Create a new trip
            </Link>
          </ul>

          <br />
        </div>
      </div>
    );
  }
};

export default UserTrips;
