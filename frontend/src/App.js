import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "purecss";
import "@style/index.scss";

import { getUser } from "@db";
import authContext from "@db/authContext";

import Home from "@page/home";
import EventList from "@page/eventlist";
import EventView from "@page/eventview";

const App = () => {
  const user = getUser();
  return (
    <authContext.Provider value={{ user: user }}>
      <BrowserRouter className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/events/global" component={EventList} />
          <Route path="/events/me" component={EventList} />
          <Route path="/e/:eventid" component={EventView} />
        </Switch>
      </BrowserRouter>
    </authContext.Provider>
  );
};

export default App;
