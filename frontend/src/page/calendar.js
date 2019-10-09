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
          meals={[
            {
              id: 0,
              name: "Pizza",
              time: moment({ minutes: 17 }),
              image:
                "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/dc23cd051d2249a5903d25faf8eeee4c/BFV36537_CC2017_2IngredintDough4Ways-FB.jpg"
            },
            {
              id: 1,
              name: "Burger",
              time: moment({ hours: 1, minutes: 10 }),
              image:
                "https://assets.bonappetit.com/photos/5d1cb1880813410008e914fc/16:9/w_1200,c_limit/Print-Summer-Smash-Burger.jpg"
            }
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default CalendarPage;
