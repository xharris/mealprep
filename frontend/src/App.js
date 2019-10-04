import React from "react";
import logo from "./logo.svg";
import "./App.scss";

import IngredientCard from "@front/feature/ingredient";

// import { getWelcomeText } from '@front/db';

const App = () => {
  return (
    <div className="App">
      <IngredientCard />
    </div>
  );
};

export default App;
