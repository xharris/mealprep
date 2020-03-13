import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "purecss";
import "@style/index.scss";

import authContext from "@db/authContext";

import Home from "@page/home";
import EventList from "@page/eventlist";
import EventView from "@page/eventview";
import EventCreate from "@page/eventcreate";

const App = () => {
  const user = null; // getUser();
  return (
    <authContext.Provider value={{ user: user }}>
      <BrowserRouter className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/events/global" component={EventList} />
          <Route path="/events/me" component={EventList} />
          <Route path="/e/:eventid" component={EventView} />
          <Route path="/create" component={EventCreate} />
        </Switch>
      </BrowserRouter>
    </authContext.Provider>
  );
};

export default App;
