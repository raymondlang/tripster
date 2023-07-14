import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserToTrip, removeUserFromTrip } from "../../actions/users_actions";

const UsersList = () => {
  const tripId = useSelector((state) => Object.keys(state.trips.trip)[0]);
  const errors = useSelector((state) => state.errors.user);
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
    return <li>{errors}</li>;
  };
};
