import React from "react";
import FlightItineraryItemDetails from "./FlightItineraryItemDetails";
import CreateFlightItineraryItem from "./CreateFlightItineraryItem";

const FlightItineraryItem = ({ flightItineraryItems, deleteFlightItem }) => {
  const itemsList = flightItineraryItems.map((item, idx) => (
    <FlightItineraryItemDetails
      key={`item-${idx}`}
      item={item}
      deleteFlightItem={deleteFlightItem}
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
      <CreateFlightItineraryItem />
    </div>
  );
};

export default FlightItineraryItem;
