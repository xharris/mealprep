import React from "react";

var moment = require("moment");

const tags = () => [
  { id: "1", value: "popcorn" },
  { id: "2", value: "free" },
  { id: "3", value: "interactive" },
  { id: "4", value: "SEB" },
  {
    id: "5",
    value: "Birds of Prey and the Fantabulous Emancipation of one Harley Quinn"
  }
];

const events = () => [
  {
    id: "1",
    title: "Quadmania",
    description: "",
    timestart: moment(Date.now()),
    timeend: moment(Date.now() + 10000000),
    geolocation: [39.254055, -76.711789],
    geo_string: "The Quad, Baltimore, MD 21250",
    img_url: "https://i.kym-cdn.com/photos/images/newsfeed/001/431/201/40f.png",
    tags: ["2", "3", "4"]
  },
  {
    id: "2",
    title: "Movie Night - The Evil Dead",
    description: "Join (seb) for our Weekly Movie! Fridays are interactive.",
    timestart: moment(Date.now()),
    timeend: moment(Date.now() + 100000000),
    geo_string: "Washington Square Park",
    geolocation: [40.7295174, -73.9986549],
    tags: ["1", "2"],
    users_can_invite: true,
    img_url:
      "https://resizing.flixster.com/oA7m3PC2rASrRcQQr-5LtXqRoW4=/206x305/v1.bTsxMTE3MjMyMjtqOzE4NDQ0OzEyMDA7ODAwOzEyMDA"
  },
  {
    id: "3",
    title:
      "Movie Night - Birds of Prey and the Fantabulous Emancipation of one Harley Quinn",
    description: "Join (seb) for our Weekly Movie! Fridays are interactive.",
    timestart: moment(Date.now()),
    timeend: moment(Date.now() + 1000000000),
    geo_string: "Lecture Hall I, Baltimore, MD",
    geolocation: [39.25479, -76.71184],
    tags: ["1", "2", "3", "4", "5"],
    img_url:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Birds_of_Prey_-_The_Album.jpg/220px-Birds_of_Prey_-_The_Album.jpg"
  }
];

export const getWelcomeText = () =>
  fetch("http://localhost:3000/api").then(res => res.text());

const formatEvent = (event, opts) => {
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
      id: event.id,
      time_string:
        timestart.isSame(timeend, "day") === true
          ? [getTime(timestart), " - ", timeend.format(fmt_time)]
          : [getTime(timestart), " - ", getTime(timeend)]
    },
    event
  );
};

export const getEvents = () => events().map(e => formatEvent(e));

export const getUserEvents = ({ user_id }) => {
  const user = getUser(user_id);
  return Object.keys(user.event_status).map(event_id => getEvent(event_id));
};

// geolocation is stored at lat-long
// mapBox uses long-lat
// google uses lat-long
export const getEvent = (id, opts) => {
  var event_list = events();
  var event;
  for (var e = 0; e < event_list.length; e++) {
    if (event_list[e].id === id) {
      event = event_list[e];
      break;
    }
  }

  return formatEvent(event, opts);
};

export const getAnnouncements = event_id => {
  return [
    {
      id: "1",
      event_id: "3",
      type: "text",
      value: "Let's just have a good time ok?",
      date_created: moment(Date.now())
    },
    {
      id: "2",
      event_id: "3",
      type: "poll",
      title: "Food of choice?",
      votes: 4,
      max_votes: 2,
      choices: [
        { text: "Hot dogs", votes: 3 },
        { text: "Burgers", votes: 1 },
        { text: "Panini", votes: 0 }
      ],
      user_voted: {},
      date_created: moment(Date.now() + 1000000000)
    },
    {
      id: "3",
      event_id: "3",
      type: "poll",
      title: "Need a ride?",
      votes: 6,
      max_votes: 1,
      choices: [
        { text: "Yes", votes: 3 },
        { text: "No", votes: 1 },
        { text: "Maybe", votes: 0 }
      ],
      user_voted: {},
      date_created: moment(Date.now() + 1000000000)
    },
    {
      id: "4",
      event_id: "3",
      type: "poll",
      title:
        "On a scale from 0 to 10, how excited are you really? Be totally honest ok.",
      votes: 10,
      max_votes: 1,
      choices: [
        {
          text: "0 (I'm just here for a good time but also the free food)",
          votes: 0
        },
        { text: "1", votes: 0 },
        { text: "2", votes: 0 },
        { text: "3", votes: 1 },
        { text: "4", votes: 0 },
        { text: "5", votes: 0 },
        { text: "6", votes: 0 },
        { text: "7", votes: 0 },
        { text: "8", votes: 0 },
        { text: "9", votes: 0 },
        { text: "10", votes: 9 }
      ],
      user_voted: {
        "1": ["3"]
      },
      date_created: moment(Date.now() + 1000000000)
    }
  ];
};

export const getUser = user_id => {
  var data = {
    id: "1",
    full_name: "Bob Dillington",
    img_url: "https://avatarfiles.alphacoders.com/146/146703.png",
    event_status: {
      "3": "owned",
      "2": "cant",
      "1": "going"
    }
  };
  return data;
};

const comments = [
  { id: "1", event_id: "3", user_id: "1", value: "Wowie!" },
  {
    id: "2",
    event_id: "3",
    user_id: "1",
    value: `Somebody once told me the world is gonna roll me
  I ain't the sharpest tool in the shed
  She was looking kind of dumb with her finger and her thumb
  In the shape of an "L" on her forehead
  Well the years start coming and they don't stop coming
  Fed to the rules and I hit the ground running
  Didn't make sense not to live for fun
  Your brain gets smart but your head gets dumb
  So much to do, so much to see
  So what's wrong with taking the back streets?
  You'll never know if you don't go
  You'll never shine if you don't glow
  Hey now, you're an all-star, get your game on, go play
  Hey now, you're a rock star, get the show on, get paid
  And all that glitters is gold
  Only shooting stars break the mold`
  },
  { id: "3", event_id: "3", user_id: "1", value: "Zowie!", reply_to: "1" }
];

export const getComments = ({ event_id, comment_id, reply_to_id }) => {
  if (reply_to_id) return comments.filter(c => reply_to_id == c.reply_to);
  if (comment_id) return comments.filter(c => c.id == comment_id);
  if (event_id)
    return comments.filter(c => !c.reply_to && event_id == c.event_id);
};

export const getTag = id => tags().filter(t => t.id == id)[0];
