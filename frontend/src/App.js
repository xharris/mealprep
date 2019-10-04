import React from "react";
import logo from "./logo.svg";
import "./App.scss";

import Calendar from "@front/feature/calendar";

// import { getWelcomeText } from '@front/db';

const App = () => {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
};

export default App;
