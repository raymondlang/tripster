import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchATrip } from "../../slices/tripSlice";
import { deleteItem } from "../../slices/intineraryItemSlice";
import { deleteFlightItem } from "../../slices/flightItineraryItemSlice";
import { deleteLodgingItem } from "../../slices/lodgingItineraryItemSlice";
import { deleteFoodItem } from "../../slices/foodItineraryItemSlice";
import ItineraryContainer from "../itinerary_items/itinerary";
import FlightItineraryItem from "../itinerary_items/flight/flight_itinerary_item";
import LodgingItineraryItem from "../itinerary_items/lodging/lodging_itinerary_item";
import ItineraryItem from "../itinerary_items/other/itinerary_item";
import FoodItineraryItem from "../itinerary_items/food/food_itinerary_item";
import Map from "../map/map";
import { useParams } from "react-router-dom";
import UsersList from "../users_list/UsersList";
import Comments from "../comments/comments";

const TripPage = () => {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const trip = useSelector((state) => state.trips.trip);
  const users = useSelector((state) => state.users);
  const comments = useSelector((state) => state.comments);
  const itineraryItems = useSelector((state) => state.items);
  const flightItineraryItems = useSelector((state) => state.flightItems);
  const lodgingItineraryItems = useSelector((state) => state.lodgingItems);
  const foodItineraryItems = useSelector((state) => state.foodItems);

  useEffect(() => {
    dispatch(fetchATrip(tripId));
  }, [dispatch, tripId]);

  if (!trip) {
    return <div>Loading Trip...</div>;
  }

  const tabArr = [
    {
      title: "Flights",
      content: (
        <FlightItineraryItem
          tripId={tripId}
          flightItineraryItems={Object.values(flightItineraryItems)}
          deleteFlightItem={deleteFlightItem}
        />
      ),
    },
    {
      title: "Lodging",
      content: (
        <LodgingItineraryItem
          tripId={tripId}
          lodgingItineraryItems={Object.values(lodgingItineraryItems)}
          deleteLodgingItem={deleteLodgingItem}
        />
      ),
    },
    {
      title: "Food",
      content: (
        <FoodItineraryItem
          tripId={tripId}
          foodItineraryItems={Object.values(foodItineraryItems)}
          deleteFoodItem={deleteFoodItem}
        />
      ),
    },
    {
      title: "Other",
      content: (
        <ItineraryItem
          tripId={tripId}
          itineraryItems={Object.values(itineraryItems)}
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
            <UsersList users={trip.users} newusers={users} tripId={tripId} />
          </div>
        </div>
        <div className="trip-chat-container">
          <Comments tripId={trip._id} comments={Object.values(comments)} />
        </div>
        <div className="trip-items-container">
          <header className="trip-items-header">
            <h1>Next stop, {trip.destination}!</h1>
            <br />
          </header>
          <div className="trip-items-subcontainer">
            <ItineraryContainer tripId={tripId} tabs={tabArr} />
          </div>
        </div>
        <div className="filler-queen"></div>
      </div>
      <div className="map-container">
        <Map />
      </div>
    </div>
  );
};

export default TripPage;
