import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";
import Navbar from "./components/navbar";

const history = require("history").createBrowserHistory;

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
