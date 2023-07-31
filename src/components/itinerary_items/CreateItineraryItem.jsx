import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItineraryItem } from "../../slices/intineraryItemSlice";

const CreateItineraryItem = ({ tripId }) => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  // const errors = useSelector(selectItineraryItemErrors);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearErrors());
  //   };
  // }, [dispatch]);

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
    });
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
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Itinerary Item Name*"
              />
              <br />
            </div>

            <div>
              <input
                className="create-item-input-1"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address*"
            />
            <br />
          </div>
          <input
            className="create-item-input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description*"
          />
          <br />
          <div></div>

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

export default CreateItineraryItem;
