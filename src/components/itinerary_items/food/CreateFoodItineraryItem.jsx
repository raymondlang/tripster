import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createItineraryItem } from "../../../slices/intineraryItemSlice";

const CreateFoodItineraryItem = ({ tripId }) => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    setErrors({});
  }, []);

  const handleChange = (field) => (e) => {
    if (field === "itemName") setItemName(e.target.value);
    else if (field === "category") setCategory(e.target.value);
    else if (field === "address") setAddress(e.target.value);
    else if (field === "description") setDescription(e.target.value);
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
    dispatch(createItineraryItem(item)).then((item) => {
      setItemName("");
      setCategory("");
      setAddress("");
      setDescription("");
      setErrors({});
      navigate("/ ");
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
          <button className="create-item-submit-btn" onClick={handleSubmit}>
            Create Itinerary Item
          </button>
          <div className="asterisk"> *Required Fields</div>
        </div>
      </form>
    </div>
  );
};

export default CreateFoodItineraryItem;
