import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createItineraryItem } from "../../../slices/intineraryItemSlice";
import { fetchATrip } from "../../../slices/tripSlice";

const CreateLodgingItineraryItem = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const tripId = useSelector((state) => Object.keys(state.trips.trip)[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setErrors({});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      itemName,
      category,
      address,
      description,
      tripId,
    };
    dispatch(createItineraryItem(item))
      .then((item) => {
        setItemName("");
        setCategory("");
        setAddress("");
        setDescription("");
        setErrors({});
        navigate("/"); // Redirect to the desired page after form submission
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setErrors(err.response.data);
        }
      });
  };

  const handleChange = (field) => (e) => {
    if (field === "itemName") {
      setItemName(e.target.value);
    } else if (field === "category") {
      setCategory(e.target.value);
    } else if (field === "address") {
      setAddress(e.target.value);
    } else if (field === "description") {
      setDescription(e.target.value);
    }
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
          <div></div>

          {/* <div className="create-item-errors">
            {Object.keys(errors).map((error, idx) => (
              <li className="create-item-errors-element" key={`err-${idx}`}>
                {errors[error]}
              </li>
            ))}
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

export default CreateLodgingItineraryItem;
