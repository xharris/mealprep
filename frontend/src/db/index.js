import React from "react";

var moment = require("moment");

const events = {
  "1": {
    title: "Quadmania",
    description: "",
    timestart: moment(Date.now()),
    timeend: moment(Date.now() + 10000000),
    geolocation: [39.254055, -76.711789],
    img_url: "https://i.kym-cdn.com/photos/images/newsfeed/001/431/201/40f.png"
  },
  "2": {
    title: "Movie Night - The Evil Dead",
    description: "Join (seb) for our Weekly Movie! Fridays are interactive.",
    timestart: moment(Date.now()),
    timeend: moment(Date.now() + 100000000),
    geolocation: [40.7295174, -73.9986549],
    img_url:
      "https://resizing.flixster.com/oA7m3PC2rASrRcQQr-5LtXqRoW4=/206x305/v1.bTsxMTE3MjMyMjtqOzE4NDQ0OzEyMDA7ODAwOzEyMDA"
  },
  "3": {
    title:
      "Movie Night - Birds of Prey and the Fantabulous Emancipation of one Harley Quinn",
    description: "Join (seb) for our Weekly Movie! Fridays are interactive.",
    timestart: moment(Date.now()),
    timeend: moment(Date.now() + 1000000000),
    geolocation: [39.25479, -76.71184],
    img_url:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Birds_of_Prey_-_The_Album.jpg/220px-Birds_of_Prey_-_The_Album.jpg"
  }
};

export const getWelcomeText = () =>
  fetch("http://localhost:3000/api").then(res => res.text());

// geolocation is stored at lat-long
// mapBox uses long-lat
// google uses lat-long
export const getEvent = (id, opts) => {
  var event = events[id];
  opts = opts || {
    show_year: true
  };
  var { timestart, timeend } = event;

  var fmt_day = opts.show_year ? "MMM D 'YY" : "MMM D";
  var fmt_time = "h:mma";

  const getTime = t => (
    <i key={t}>
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
          : [getTime(timestart), " - ", getTime(timeend)]
    },
    event
  );
};
