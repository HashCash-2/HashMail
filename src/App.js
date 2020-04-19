import React from "react";
import "./App.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { StoreProvider, createStore } from "easy-peasy";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import globalStore from "./stores/globalStore";

import Navbar from "./components/Common/navbar";
import Home from "./components/Home/home";
import Login from "./components/Login/login";

toast.configure({ position: toast.POSITION.BOTTOM_RIGHT });

const store = createStore(globalStore);

function App() {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    </StoreProvider>
  );
}

export default App;
