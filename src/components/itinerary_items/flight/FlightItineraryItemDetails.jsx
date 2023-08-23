import { useDispatch } from "react-redux";
import { deleteFlightItem } from "../../../slices/flightItineraryItemSlice";

const FlightItineraryItemDetails = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteFlightItem(item._id));
  };
  return (
    <div>
      <ul className="itinerary-item-list">
        <p className="item-detail-side">{item.itemName}</p>
        <p className="item-detail-middle">{item.description}</p>
        <button className="item-detail-side" onClick={handleDelete}>
          Delete Item
        </button>
      </ul>
    </div>
  );
};

export default FlightItineraryItemDetails;
