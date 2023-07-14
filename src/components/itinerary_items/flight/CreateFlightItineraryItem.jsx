import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItineraryItem } from "../../../slices/intineraryItemSlice";
import { fetchATrip } from "../../../slices/tripSlice";
import { useNavigate } from "react-router-dom";

const CreateFlightItineraryItem = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const tripId = useSelector((state) => Object.keys(state.trips.trip)[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use the useNavigate hook to access the navigation functions

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    switch (field) {
      case "itemName":
        setItemName(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      itemName,
      category,
      address,
      description,
      tripId,
    };
    dispatch(createItineraryItem(item)).then(() => {
      setItemName("");
      setCategory("");
      setAddress("");
      setDescription("");
      setErrors({});
      navigate("/"); // Use the navigate function to redirect to a different route
    });
  };

  const clearErrors = () => {
    dispatch(receiveErrors({}));
  };

  return (
    <div className="create-item-container">
      <form>
        <div className="create-item-box">
          <div className="create-item-first-row">
            <div>
              <input
                className="create-item-input-1"
                type="text"
                value={itemName}
                onChange={handleChange("itemName")}
                placeholder="Itinerary Item Name*"
              />
              <br />
            </div>

            <div>
              <input
                className="create-item-input-1"
                type="text"
                value={category}
                onChange={handleChange("category")}
                placeholder="Category*"
              />
              <br />
            </div>
          </div>

          <div>
            <input
              className="create-item-input"
              type="text"
              value={address}
              onChange={handleChange("address")}
              placeholder="Address*"
            />
            <br />
          </div>
          <input
            className="create-item-input"
            type="text"
            value={description}
            onChange={handleChange("description")}
            placeholder="Description*"
          />
          <br />
          <div />

          {/* <div className="create-item-errors">
            {renderErrors()}
          </div> */}

          <button className="create-item-submit-btn" onClick={handleSubmit}>
            Create Itinerary Item
          </button>
          <div className="asterisk"> *Required Fields</div>
        </div>
      </form>
    </div>
  );
};

export default CreateFlightItineraryItem;
