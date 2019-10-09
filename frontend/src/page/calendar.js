import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import { CalendarMonth } from "@front/feature/calendar";
import { MealList } from "@front/feature/meallist";

const moment = require("moment");

const styleCalendarPage = makeStyles(theme => ({}));

const CalendarPage = () => {
  const style = styleCalendarPage();

  const [time, setTime] = useState(moment());

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <CalendarMonth
          time={time}
          onDateSelect={t => {
            setTime(t);
          }}
        />
      </Grid>
      <Grid item>
        <MealList
          meals={[{ id: 0, name: "Pizza" }, { id: 1, name: "Burger" }]}
        />
      </Grid>
    </Grid>
  );
};

export default CalendarPage;
