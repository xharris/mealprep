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

  var onMonthChange = e => {
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

  var createTableDays = () => {
    var rows = [];
    var days = currentDate.daysInMonth();
    for (var i = 0; i < 31; i++) {
      if (i % 7 === 0) {
        let cells = [];
        for (var k = 0; k < 7; k++) {
          let d = i + k - currentDate.day() + 1;
          if (d > 0 && d <= days)
            cells.push(
              <td className={style.tableCell} key={d}>
                {d}
              </td>
            );
          else cells.push(<td key={d}></td>);
        }
        rows.push(<tr key={i / 7}>{cells}</tr>);
      }
    }
    return rows;
  };

  var prevMonth = () => {
    if (currentMonth <= 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  var nextMonth = () => {
    if (currentMonth >= 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  var tableDays = createTableDays();
  useEffect(() => {
    currentDate = moment({ month: currentMonth, year: currentYear });
    console.log("real", currentDate.daysInMonth());
    tableDays = createTableDays();
  }, [currentMonth, currentYear]);

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
        <Button color="primary" size="small" onClick={prevMonth}>
          <ArrowLeftIcon />
        </Button>
        <Button color="primary" size="small" onClick={nextMonth}>
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
      <table className={style.table}>
        <thead>
          <tr>
            {[...Array(7).keys()].map(d => (
              <th className={style.tableCell} key={d}>
                {moment()
                  .weekday(d)
                  .format("dd")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tableDays}</tbody>
      </table>
    </Paper>
  );
};

export default Calendar;
