import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserToTrip,
  removeUserFromTrip,
  getUsersForTrip,
} from "../../slices/usersSlice";

const UsersList = ({ tripId }) => {
  const errors = useSelector((state) => state.users.errors);
  // const trip = useSelector((state) => selectTripById(state, tripId));
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state) => Object.values(state.users));

  useEffect(() => {
    dispatch(getUsersForTrip(tripId)).catch((error) => {
      console.error("Error fetching users:", error);
    });
  }, [dispatch, tripId]);

  // const tripUsers = useSelector((state) => {
  //   const trip = state.trip.trips[tripId];
  //   return trip?.users ? Object.values(trip.users) : [];
  // });

  const addFriend = (e) => {
    e.preventDefault();
    if (email !== "") {
      const user = {
        email,
        tripId,
      };

      dispatch(addUserToTrip(user)).then(() => setEmail(""));
    }
  };

  const removeFriend = (userId) => (e) => {
    e.preventDefault();
    const user = {
      userId,
      tripId,
    };

    dispatch(removeUserFromTrip(user));
  };

  const renderErrors = (errors) => {
    return Object.keys(errors).map((key) => <li key={key}>{errors[key]}</li>);
  };

  return (
    <div className="userslist-container">
      <div className="userslist-users-container">
        <header className="userslist-header-element-1">
          <h2>Adventurers</h2>
        </header>
        <ul className="trip-users-list">
          {users.map((user, idx) => (
            <li className="trip-users-element" key={`user-${idx}`}>
              <p className="trip-users-text">{user.username}</p>
              <div className="uninvite-friend">
                <button onClick={removeFriend(user._id)}>✕</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="userslist-invite-users-container">
        <header className="userslist-header-element-2">
          <h3>Invite friends</h3>
        </header>
        <form onSubmit={addFriend}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="userslist-input-element"
          />
          <div />
          <ul className="users-list-errors">{renderErrors(errors)}</ul>
          <div />
          <br />
          <button className="invite-button">Send Invite</button>
        </form>
      </div>
    </div>
  );
};

export default UsersList;
