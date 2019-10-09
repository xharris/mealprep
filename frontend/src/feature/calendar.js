import React, { Component, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Card,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
  ButtonGroup
} from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TodayIcon from "@material-ui/icons/Today";

const moment = require("moment");

const styleMonthYearForm = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const MonthYearForm = () => {
  const style = styleMonthYearForm();

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

const styleMonthYear = makeStyles(theme => ({
  buttonValue: {
    minWidth: "130px"
  }
}));

const MonthYear = ({ time, onChange }) => {
  const style = styleMonthYear();

  var prevMonth = () => {
    onChange(
      moment(time)
        .subtract(1, "M")
        .unix()
    );
  };
  var nextMonth = () => {
    onChange(
      moment(time)
        .add(1, "M")
        .unix()
    );
  };

  return (
    <ButtonGroup variant="text">
      <Button color="primary" size="small" onClick={prevMonth}>
        <ArrowLeftIcon />
      </Button>
      <Button className={style.buttonValue} color="primary">
        {moment(time).format("MMMM 'YY")}
      </Button>
      <Button color="primary" size="small" onClick={nextMonth}>
        <ArrowRightIcon />
      </Button>
    </ButtonGroup>
  );
};

const styleCalendarMonth = makeStyles(theme => ({
  calendar: {
    textAlign: "left",
    width: props => (props.size === "fill" ? "100%" : 300),
    height: props => (props.size === "fill" ? "100%" : 230)
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
  },
  dayButton: {
    width: "30px",
    fontSize: "0.75rem",
    height: "30px"
  },
  todayButton: {}
}));

export const CalendarMonth = props => {
  const style = styleCalendarMonth(props);

  const getTableDays = () => {
    var rows = [];
    var days = time.daysInMonth();
    for (var i = 0; i < 31; i++) {
      // iterate through max number of days
      if (i % 7 === 0) {
        // but only use first day of each week
        let cells = [];
        for (var k = 0; k < 7; k++) {
          // iterate days in week
          let d = i + k - time.day() + 1; // calculate actualy date
          let today =
            props.time.format("MM DD YY") ===
            moment(time)
              .date(d)
              .format("MM DD YY");
          if (d > 0 && d <= days)
            cells.push(
              <td className={style.tableCell} key={d}>
                <IconButton
                  className={`${style.dayButton} ${
                    today ? style.todayButton : ""
                  }`}
                  size={"small"}
                  disabled={today}
                  onClick={() => {
                    if (props.onDateSelect) {
                      props.onDateSelect(time.date(d));
                    }
                  }}
                >
                  {d}
                </IconButton>
              </td>
            );
          else cells.push(<td key={d}></td>);
        }
        rows.push(<tr key={i / 7}>{cells}</tr>);
      }
    }
    return rows;
  };

  const [time, setTime] = useState(props.time);
  const [tableDays, setTableDays] = useState(getTableDays());

  useEffect(() => {
    setTableDays(getTableDays());
  }, [time]);

  return (
    <Card className={style.calendar}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <MonthYear
            time={time}
            onChange={t => {
              setTime(moment.unix(t));
            }}
          />
        </Grid>
        <Grid item>
          <Button
            color="primary"
            onClick={() => {
              setTime(moment());
            }}
          >
            <TodayIcon />
          </Button>
        </Grid>
      </Grid>
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
    </Card>
  );
};
