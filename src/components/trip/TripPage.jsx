import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchATrip, selectTripById } from "../../slices/tripSlice";
import { deleteItem } from "../../slices/intineraryItemSlice";
import { deleteFlightItem } from "../../slices/flightItineraryItemSlice";
import { deleteLodgingItem } from "../../slices/lodgingItineraryItemSlice";
import { deleteFoodItem } from "../../slices/foodItineraryItemSlice";
import Itinerary from "../itinerary_items/Itinerary";
import FlightItineraryItem from "../itinerary_items/flight/FlightItineraryItem";
import LodgingItineraryItem from "../itinerary_items/lodging/LodgingItineraryItem";
import ItineraryItem from "../itinerary_items/ItineraryItem";
import FoodItineraryItem from "../itinerary_items/food/FoodItineraryItem";
import { useParams } from "react-router-dom";
import UsersList from "../users_list/UsersList";
import Comments from "../comments/comments";

const TripPage = () => {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const [currentTab, setCurrentTab] = useState("flights");
  const trip = useSelector((state) => selectTripById(state, tripId));

  // const users = useSelector((state) => trip.users);

  const itineraryItems = useSelector((state) =>
    Object.values(trip.itineraryItems ?? {})
  );

  const flightItineraryItems = useSelector((state) =>
    Object.values(trip.flightItineraryItems)
  );
  const lodgingItineraryItems = useSelector((state) =>
    Object.values(trip.lodgingItineraryItems)
  );
  const foodItineraryItems = useSelector((state) =>
    Object.values(trip.foodItineraryItems)
  );
  const error = useSelector((state) => state.trip.errors);

  useEffect(() => {
    dispatch(fetchATrip(tripId));
  }, [dispatch, tripId]);

  const createFlightItemAction = (item) => {
    dispatch(createFlightItineraryItem(item));
  };

  const createLodgingItemAction = (item) => {
    dispatch(createLodgingItineraryItem(item));
  };

  const createFoodItemAction = (item) => {
    dispatch(createFoodItineraryItem(item));
  };

  const createOtherItemAction = (item) => {
    dispatch(createOtherItineraryItem(item));
  };

  if (!trip) {
    return (
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  // if (error === "Unauthorized") {
  //   return (
  //     <div className="error-container">
  //       <div className="error-message">
  //         Sorry, you are not authorized to view this trip. Please check your
  //         permissions.
  //       </div>
  //     </div>
  //   );
  // }

  const tabArr = [
    {
      title: "Flights",
      content: (
        <FlightItineraryItem
          tripId={tripId}
          flightItineraryItems={flightItineraryItems}
          deleteFlightItem={deleteFlightItem}
        />
      ),
    },
    {
      title: "Lodging",
      content: (
        <LodgingItineraryItem
          tripId={tripId}
          lodgingItineraryItems={lodgingItineraryItems}
          deleteLodgingItem={deleteLodgingItem}
        />
      ),
    },
    {
      title: "Food",
      content: (
        <FoodItineraryItem
          tripId={tripId}
          foodItineraryItems={foodItineraryItems}
          deleteFoodItem={deleteFoodItem}
        />
      ),
    },
    {
      title: "Other",
      content: (
        <ItineraryItem
          tripId={tripId}
          itineraryItems={itineraryItems}
          deleteItem={deleteItem}
        />
      ),
    },
  ];

  return (
    <div className="trip-page-container">
      <div className="trip-page-subcontainer">
        <div className="trip-sidebar-container">
          <div className="trip-sidebar-container-elements">
            <UsersList tripId={trip._id} />
          </div>
        </div>
        <div className="trip-chat-container">
          <Comments tripId={trip._id} />
        </div>
        <div className="trip-items-container">
          <header className="trip-items-header">
            <h1>Next stop, {trip.destination}!</h1>
            <br />
          </header>
          <div className="trip-items-subcontainer">
            <Itinerary
              tripId={tripId}
              tabs={tabArr}
              createFlightItemAction={createFlightItemAction}
              createLodgingItemAction={createLodgingItemAction}
              createFoodItemAction={createFoodItemAction}
              createOtherItemAction={createOtherItemAction}
            />
          </div>
        </div>
        <div className="filler-queen"></div>
      </div>
      <div className="map-container">{/* <Map /> */}</div>
    </div>
  );
};

export default TripPage;
