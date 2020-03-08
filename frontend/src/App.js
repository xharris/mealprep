import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "purecss";
import "@style/index.scss";

import Home from "@page/home";
import EventList from "@page/eventlist";
import EventView from "@page/eventview";

const App = () => {
  return (
    <BrowserRouter className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/events/global" component={EventList} />
        <Route path="/events/me" component={EventList} />
        <Route path="/e/:eventid" component={EventView} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
