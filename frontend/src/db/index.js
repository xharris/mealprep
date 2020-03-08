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
export const getEvent = id => {
  const fmt_full = "MMM D 'YY h:mma";
  const fmt_time = "h:mma";
  var event = events[id];
  var { timestart, timeend } = event;
  return Object.assign(
    {
      id: id,
      geo_string: "1234 Billy St., New York, New York",
      time_string:
        timestart.isSame(timeend, "day") === true
          ? timestart.format(fmt_full) + " - " + timeend.format(fmt_time)
          : timestart.format(fmt_full) + " - " + timeend.format(fmt_full)
    },
    event
  );
};
