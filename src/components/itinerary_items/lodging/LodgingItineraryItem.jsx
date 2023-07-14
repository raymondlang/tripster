import React from "react";
import LodgingItineraryItemDetails from "./LodgingItineraryItemDetails";
import CreateLodgingItineraryItem from "./CreateLodgingItineraryItem";

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
      <CreateLodgingItineraryItem />
    </div>
  );
};

export default LodgingItineraryItem;
