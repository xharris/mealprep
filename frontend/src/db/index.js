import React from "react";

var moment = require("moment");

const events = {
  "1": {
    title: "Quadmania",
    description: "",
    timestart: moment(Date.now()),
    timeend: moment(Date.now() + 10000000),
    geolocation: [0, 0]
  },
  "2": {
    title: "Movie Night - The Evil Dead",
    description: "Join (seb) for our Weekly Movie! Fridays are interactive.",
    timestart: moment(Date.now()),
    timeend: moment(Date.now() + 100000000),
    geolocation: [0, 0]
  },
  "3": {
    title:
      "Movie Night - Birds of Prey and the Fantabulous Emancipation of one Harley Quinn",
    description: "Join (seb) for our Weekly Movie! Fridays are interactive.",
    timestart: moment(Date.now()),
    timeend: moment(Date.now() + 1000000000),
    geolocation: [0, 0]
  }
};

export const getWelcomeText = () =>
  fetch("http://localhost:3000/api").then(res => res.text());
export const getEvent = (id, opts) => {
  var event = events[id];
  opts = opts || {
    show_year: true
  };
  var { timestart, timeend } = event;

  var fmt_day = opts.show_year ? "MMM D 'YY" : "MMM D";
  var fmt_time = "h:mma";

  const getTime = (t, id) => (
    <i key={id}>
      <b>{t.format(fmt_day)}</b>
      {" · " + t.format(fmt_time)}
    </i>
  );

  return Object.assign(
    {
      id: id,
      geo_string: "1234 Billy St., New York, New York",
      time_string:
        timestart.isSame(timeend, "day") === true
          ? [getTime(timestart), " - ", timeend.format(fmt_time)]
          : [getTime(timestart, "start"), " - ", getTime(timeend, "end")]
    },
    event
  );
};
