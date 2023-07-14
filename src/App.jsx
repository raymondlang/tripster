// import { useState } from "react";
// import { AuthRoute } from "./util/route_util";
import "./App.scss";
import NavBar from "./components/nav/navbar";
import { Routes, Route } from "react-router-dom";
import Splash from "./components/splash/splash_page";
import SignupForm from "./components/session/signup_form";
import LoginForm from "./components/session/login_form";
import Footer from "./components/nav/footer";
import TripPage from "./components/trip/trip_page";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Splash />} />
        <Route exact path="/signup" element={<SignupForm />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/trip" element={<TripPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
