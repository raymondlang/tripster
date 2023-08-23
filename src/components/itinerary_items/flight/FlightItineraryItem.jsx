import React from "react";
import FlightItineraryItemDetails from "./FlightItineraryItemDetails";
import CreateFlightItineraryItem from "./CreateFlightItineraryItem";
import { useSelector } from "react-redux";
import { selectTripById } from "../../../slices/tripSlice";

const FlightItineraryItem = ({
  deleteFlightItem,
  tripId,
  // flightItineraryItems,
}) => {
  const flightItineraryItems = useSelector((state) =>
    Object.values(state.trip.trip[tripId].flightItineraryItems)
  );

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
      <CreateFlightItineraryItem tripId={tripId} />
    </div>
  );
};

export default FlightItineraryItem;
