import React from "react";
import LodgingItineraryItemDetails from "./LodgingItineraryItemDetails";
import CreateLodgingItineraryItem from "./CreateLodgingItineraryItem";
import { useSelector } from "react-redux";

const LodgingItineraryItem = ({ deleteLodgingItem, tripId }) => {
  const lodgingItineraryItems = useSelector((state) =>
    Object.values(state.trip.trip[tripId].lodgingItineraryItems)
  );
  const itemsList = lodgingItineraryItems.map((item, idx) => {
    return (
      <LodgingItineraryItemDetails
        key={`item-${idx}`}
        item={item}
        // deleteLodgingItem={deleteLodgingItem}
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
      <CreateLodgingItineraryItem tripId={tripId} />
    </div>
  );
};

export default LodgingItineraryItem;
