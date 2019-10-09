import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { MealCard } from "@front/feature/mealcard";

export const MealList = props => {
  return props.meals.map(meal => (
    <MealCard
      key={meal.id}
      meal_info={meal}
      selected={meal.selected}
      onClick={() => {
        meal.selected = !meal.selected;
      }}
    />
  ));
};
