import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.scss";
import Navbar from "./components/Common/navbar";
import Home from "./components/home";
import Login from "./components/Login/login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
