import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import { CalendarMonth } from "@feature/calendar";
import { MealList } from "@feature/meallist";

import { Meal } from "@front/util";

const moment = require("moment");

const styleCalendarPage = makeStyles(theme => ({
  calendar: {
    marginTop: 50
  }
}));

const CalendarPage = () => {
  const style = styleCalendarPage();

  const [time, setTime] = useState(moment());

  return (
    <Grid
      className={style.calendar}
      container
      spacing={2}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <CalendarMonth time={time} onDateSelect={setTime} />
      </Grid>
      <Grid item>
        <MealList
          title={"Meal Library"}
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
            },
            {
              id: 2,
              name: "Goop",
              time: moment({ hours: 3, minutes: 2, seconds: 1 })
            },
            {
              id: 3,
              name: "Grain of rice on toast",
              time: moment({ seconds: 30 })
            },
            {
              id: 4,
              name: "Lemonade with fresh lemons! OMG long title!!",
              time: moment({ minutes: 30 })
            }
          ].map(d => new Meal(d))}
        />
      </Grid>
    </Grid>
  );
};

export default CalendarPage;
