import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";
import { CalendarMonth } from "@front/feature/calendar";

const styleCalendarPage = makeStyles(theme => ({}));

const CalendarPage = () => {
  const style = styleCalendarPage();
  return (
    <Container>
      <CalendarMonth />
    </Container>
  );
};

export default CalendarPage;
