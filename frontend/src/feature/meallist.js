import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Box, Card, CardMedia, CardContent } from "@material-ui/core";

const styleMealList = makeStyles(theme => ({
  gridList: {
    flexWrap: "nowrap"
  },
  card: {
    display: "flex",
    marginBottom: 5
  },
  content: {
    flex: "1 0 auto"
  },
  image: {
    width: 150
  }
}));

export const MealList = props => {
  const style = styleMealList();
  return (
    <Box>
      {props.meals.map(meal => (
        <Card key={meal.id} className={style.card}>
          <CardMedia
            className={style.image}
            image="https://img.buzzfeed.com/thumbnailer-prod-us-east-1/dc23cd051d2249a5903d25faf8eeee4c/BFV36537_CC2017_2IngredintDough4Ways-FB.jpg"
            title="pizza"
          />
          <CardContent className={style.content}>{meal.name}</CardContent>
        </Card>
      ))}
    </Box>
  );
};
