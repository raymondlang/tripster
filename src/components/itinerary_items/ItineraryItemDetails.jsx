import React from "react";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../slices/intineraryItemSlice";

const ItineraryItemDetails = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteItem(item._id));
  };

  return (
    <div>
      <li className="itinerary-item-list">
        <p className="item-detail-side">{item.itemName}</p>
        <p className="item-detail-middle">{item.description}</p>
        <button className="item-detail-side" onClick={handleDelete}>
          Delete Item
        </button>
      </li>
    </div>
  );
};

export default ItineraryItemDetails;
