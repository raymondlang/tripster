import React from "react";
import FoodItineraryItemDetails from "./FoodItineraryItemDetails";
import CreateFoodItineraryItem from "./CreateFoodItineraryItem";
import { useSelector } from "react-redux";

const FoodItineraryItem = ({ deleteFoodItem, tripId }) => {
  const foodItineraryItems = useSelector((state) =>
    Object.values(state.trip.trip[tripId].foodItineraryItems)
  );
  const itemsList = foodItineraryItems.map((item, idx) => (
    <FoodItineraryItemDetails
      key={`item-${idx}`}
      item={item}
      deleteFoodItem={deleteFoodItem}
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
      <CreateFoodItineraryItem tripId={tripId} />
    </div>
  );
};

export default FoodItineraryItem;
