import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserToTrip, removeUserFromTrip } from "../../slices/usersSlice";

const UsersList = ({ tripId }) => {
  const errors = useSelector((state) => state.users.errors);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

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

  const tripUsers = useSelector(
    (state) => state.trip.trips.find((trip) => trip._id === tripId)?.users || []
  );

  return (
    <div className="userslist-container">
      <div className="userslist-users-container">
        <header className="userslist-header-element-1">
          <h2>Adventurers</h2>
        </header>
        <ul className="trip-users-list">
          {tripUsers.map((user, idx) => (
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
        <div />
        <ul className="users-list-errors">{renderErrors(errors)}</ul>
        <div />
        <header className="userslist-header-element-2">
          <h3>Invite friends</h3>
        </header>
        <form onSubmit={addFriend}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="userslist-input-element"
          />
          <br />
          <button className="invite-button">Send Invite</button>
        </form>
      </div>
    </div>
  );
};

export default UsersList;
