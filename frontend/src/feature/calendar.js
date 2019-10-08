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
    width: "100%",
    height: "100%"
  },
  monthYearContainer: {
    width: "100%",
    textAlign: "center"
  },
  monthYear: {},
  month: {
    flex: 1,
    padding: "0px 50px"
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

  const [currentDate, setCurrentDate] = useState(moment());

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
    var month = currentDate.month();
    var year = currentDate.year();
    if (month <= 0) {
      setCurrentDate(moment({ date: 1, month: 11, year: year - 1 }));
    } else {
      setCurrentDate(moment({ date: 1, month: month - 1, year: year }));
    }
  };

  var nextMonth = () => {
    var month = currentDate.month();
    var year = currentDate.year();
    if (month >= 11) {
      setCurrentDate(moment({ date: 1, month: 0, year: year + 1 }));
    } else {
      setCurrentDate(moment({ date: 1, month: month + 1, year: year }));
    }
  };

  var tableDays = createTableDays();

  return (
    <Paper className={style.calendar}>
      <Container className={style.monthYearContainer}>
        <ButtonGroup className={style.monthYear} variant="text">
          <Button color="primary" size="small" onClick={prevMonth}>
            <ArrowLeftIcon />
          </Button>
          <Button className={style.month} color="primary">
            {currentDate.format("MMMM") + " " + currentDate.year()}
          </Button>
          <Button color="primary" size="small" onClick={nextMonth}>
            <ArrowRightIcon />
          </Button>
        </ButtonGroup>
      </Container>
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
