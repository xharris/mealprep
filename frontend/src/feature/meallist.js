import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Box, Paper } from "@material-ui/core";

import { MealCard } from "@feature/mealcard";
import { Search } from "@feature/search";

const styleMealList = makeStyles(theme => ({
  paper: {
    height: 400,
    width: 262
  },
  box: {
    height: "70%",
    overflow: "auto"
  }
}));

export const MealList = props => {
  const style = styleMealList();

  const [searchTerms, setSearchTerms] = useState([]);

  return (
    <Paper className={style.paper}>
      <Search
        onChange={terms => {
          setSearchTerms(terms);
        }}
      />
      <Box className={style.box}>
        {props.meals
          .filter(meal => meal.filterTags(searchTerms))
          .map(meal => (
            <MealCard
              key={meal.id}
              meal_info={meal}
              selected={meal.selected}
              onClick={() => {
                meal.selected = !meal.selected;
              }}
            />
          ))}
      </Box>
    </Paper>
  );
};
