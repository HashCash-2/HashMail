import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";
import Navbar from "./components/navbar";
import Home from "./components/home";

const history = require("history").createBrowserHistory;

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Navbar />
      </Router>
      <Home />
    </div>
  );
}

export default App;
