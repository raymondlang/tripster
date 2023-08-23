import ItineraryItemDetails from "./ItineraryItemDetails";
import CreateItineraryItem from "./CreateItineraryItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectTripById } from "../../slices/tripSlice";

const ItineraryItem = ({ deleteItem, tripId }) => {
  // const trip = useSelector((state) => selectTripById(state, tripId));
  // const trip = useSelector((state) => state.trip.trip.tripId.itineraryItems);
  const itineraryItems = useSelector((state) =>
    Object.values(state.trip.trip[tripId].itineraryItems)
  );

  console.log(useSelector((state) => state.trip.trip[tripId].itineraryItems));

  const itemsList = itineraryItems.map((item, idx) => (
    <ItineraryItemDetails
      key={`item-${idx}`}
      item={item}
      deleteItem={deleteItem}
    />
  ));

  return (
    <div>
      <ul className="items-container">
        {itemsList}
        <br />
      </ul>

      <br />
      <CreateItineraryItem tripId={tripId} />
    </div>
  );
};

export default ItineraryItem;
