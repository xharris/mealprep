import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "purecss";
import "@style/index.scss";

import Home from "@page/home";
import Explore from "@page/explore";
import Create from "@page/create";
import Plan from "@page/plan";

const App = () => {
  return (
    <BrowserRouter className="app">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/explore">
          <Explore />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/plan">
          <Plan />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
