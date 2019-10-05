import React, { Component, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup
} from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const moment = require("moment");

const styleMonthYearSelector = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const MonthYearSelector = () => {
  const style = styleMonthYearSelector();

  const [currentMonth, setCurrentMonth] = useState(moment().month());

  let onMonthChange = e => {
    setCurrentMonth(e.target.value);
  };
  return (
    <React.Fragment>
      <FormControl className={style.formControl}>
        <Select
          value={currentMonth}
          onChange={onMonthChange}
          inputProps={{
            name: "month",
            id: "input-month"
          }}
        >
          {moment.months().map((m, i) => (
            <MenuItem value={i}>{m}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={style.formControl}>
        <Select
          value={currentMonth}
          onChange={onMonthChange}
          inputProps={{
            name: "year",
            id: "input-year"
          }}
        >
          {moment.months().map((m, i) => (
            <MenuItem value={i}>{m}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );
};

const styleCalendar = makeStyles(theme => ({
  calendar: {
    textAlign: "left",
    width: 400
  },
  monthYear: {
    width: "100%"
  },
  month: {
    flex: 1
  },
  table: {
    width: "100%"
  },
  tableCell: {
    textAlign: "center"
  }
}));

const Calendar = () => {
  const style = styleCalendar();
  var currentDate = moment();

  const [currentMonth, setCurrentMonth] = useState(currentDate.month());
  const [currentYear, setCurrentYear] = useState(currentDate.year());

  useEffect(() => {
    currentDate = moment({ month: currentMonth, year: currentYear });
  });

  return (
    <Paper className={style.calendar}>
      <ButtonGroup
        className={style.monthYear}
        variant="contained"
        color="primary"
      >
        <Button className={style.month} color="primary">
          {moment.months()[currentMonth] + " " + currentYear}
        </Button>
        <Button color="primary" size="small">
          <ArrowLeftIcon />
        </Button>
        <Button color="primary" size="small">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
      <table className={style.table}>
        <tr>
          {[...Array(7).keys()].map(d => (
            <th className={style.tableCell}>
              {moment()
                .weekday(d)
                .format("dd")}
            </th>
          ))}
        </tr>
        {[...Array(currentDate.daysInMonth()).keys()].map(d => {
          return (
            <tr>
              {moment()
                .weekday(d)
                .format("dd")}
            </tr>
          );
        })}
      </table>
    </Paper>
  );
};

export default Calendar;
