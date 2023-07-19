// import { useState } from "react";
// import { AuthRoute } from "./util/route_util";
import "./App.scss";
import NavBar from "./components/nav/navbar";
import { Routes, Route } from "react-router-dom";
import Splash from "./components/splash/splash_page";
import SignupForm from "./components/session/SignupForm";
import LoginForm from "./components/session/LoginForm";
import Footer from "./components/nav/footer";
import TripPage from "./components/trip/TripPage";
import UserTrips from "./components/user_trips/UserTrips";
import { AuthRoute, ProtectedRoute } from "./util/route_util";
import CreateTripForm from "./components/trip/CreateTripForm";
import { useSelector } from "react-redux";
import EditTripForm from "./components/trip/EditTripForm";

const App = () => {
  const isLoggedIn = useSelector((state) => state.session.isAuthenticated);
  console.log(isLoggedIn);

  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Splash />} />
        <Route exact path="/signup" element={<SignupForm />} />
        <Route exact path="/login" element={<LoginForm />} />

        <Route
          exact
          path="/profile"
          element={isLoggedIn ? <UserTrips /> : <LoginForm />}
        />
        <Route exact path="trips/create" element={<CreateTripForm />} />
        <Route exact path="/trips/:tripId" element={<TripPage />} />
        <Route exact path="/trips/:tripId/edit" element={<EditTripForm />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
