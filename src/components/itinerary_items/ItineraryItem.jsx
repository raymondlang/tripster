import ItineraryItemDetails from "./ItineraryItemDetails";
import CreateItineraryItem from "./CreateItineraryItem";

const ItineraryItem = ({ itineraryItems, deleteItem, tripId }) => {
  const itemsList = itineraryItems.map((item, idx) => (
    <ItineraryItemDetails
      key={`item-${idx}`}
      item={item}
      deleteItem={deleteItem}
    />
  ));

  return (
    <div>
      <li className="items-container">
        {itemsList}
        <br />
      </li>

      <br />
      <CreateItineraryItem tripId={tripId} />
    </div>
  );
};

export default ItineraryItem;
