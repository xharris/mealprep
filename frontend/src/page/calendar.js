import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Calendar from "@front/feature/calendar";

const styleCalendarPage = makeStyles(theme => ({}));

const CalendarPage = () => (
  <React.Fragment>
    <Calendar />
  </React.Fragment>
);

export default CalendarPage;
