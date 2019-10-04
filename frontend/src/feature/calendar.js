import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  }
}));

const Calendar = () => {
  const style = useStyles();

  return (
    <Paper className="calendar">
      <FormControl variant="filled" className={style.formControl}></FormControl>
      <Grid container spacing={1}></Grid>
    </Paper>
  );
};

export default Calendar;
