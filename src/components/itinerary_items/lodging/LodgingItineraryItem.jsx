import React from "react";
import LodgingItineraryItemDetails from "./lodging_itinerary_item_details";
import CreateLodgingItineraryItemContainer from "./create_lodging_itinerary_container";

const LodgingItineraryItem = ({ lodgingItineraryItems, deleteLodgingItem }) => {
  const itemsList = lodgingItineraryItems.map((item, idx) => {
    return (
      <LodgingItineraryItemDetails
        key={`item-${idx}`}
        item={item}
        deleteLodgingItem={deleteLodgingItem}
      />
    );
  });

  return (
    <div>
      <ul>
        <li className="items-container">
          {itemsList}
          <br />
        </li>
      </ul>
      <br />
      <CreateLodgingItineraryItemContainer />
    </div>
  );
};

export default LodgingItineraryItem;
