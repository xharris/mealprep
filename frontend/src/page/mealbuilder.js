import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid, Paper } from "@material-ui/core";

const styleMealBuilder = makeStyles(theme => ({
  mealBuilder: {
    maxWidth: 500,
    margin: "auto",
    marginTop: 50
  },
  gridItem: {
    flex: "1 0 auto"
  }
}));

const MealBuilder = () => {
  const style = styleMealBuilder();

  return (
    <Paper className={style.mealBuilder}>
      <Grid container spacing={0} direction="row" justify="space-evenly">
        <Grid className={style.gridItem} item>
          image and stuff
        </Grid>
        <Grid className={style.gridItem} item>
          info and inputs
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MealBuilder;
