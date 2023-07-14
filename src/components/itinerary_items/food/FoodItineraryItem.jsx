import React from "react";
import FoodItineraryItemDetails from "./FoodItineraryItemDetails";
import CreateFoodItineraryItem from "./CreateFoodItineraryItem";

const FoodItineraryItem = ({ foodItineraryItems, deleteFoodItem }) => {
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
      <CreateFoodItineraryItem />
    </div>
  );
};

export default FoodItineraryItem;
