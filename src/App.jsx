import { useState } from "react";
import { AuthRoute } from "./util/route_util";
import "./App.css";
import "./scss/02_nav/nav.scss";
import NavBar from "./components/nav/navbar";
import { Switch } from "react-router-dom";
import Splash from "./components/splash/splash_page";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={Splash} />
      </Switch>
    </>
  );
}

export default App;
