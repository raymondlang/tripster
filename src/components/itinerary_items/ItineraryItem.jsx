import ItineraryItemDetails from "./itinerary_item_details";
import CreateItineraryItem from "./CreateItineraryItem";

const ItineraryItem = (props) => {
  const itemsList = props.itineraryItems.map((item, idx) => (
    <ItineraryItemDetails
      key={`item-${idx}`}
      item={item}
      deleteItem={props.deleteItem}
    />
  ));

  return (
    <div>
      <ul>
        <li className="items-container">
          {itemsList}
          <br />
        </li>
      </ul>
      <br />
      <CreateItineraryItemContainer />
    </div>
  );
};

export default ItineraryItem;
