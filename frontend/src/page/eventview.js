import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { getEvent, getAnnouncements } from "@db";
import authContext from "@db/authContext";

import Body from "@feature/body";
import Map, { latAdd } from "@feature/map";
import Header from "@feature/header";
import { TagList } from "@feature/tag";
import Thumbnail from "@feature/thumbnail";

import "@style/eventview.scss";

const date_now = Date.now();

const DateCreated = props => (
  <div
    className="date-created"
    title={props.date_created.format("M/D/YY h:mma")}
  >
    {props.date_created.isSame(date_now, "day")
      ? props.date_created.format("h:mma")
      : props.date_created.format("M/D/YY")}
  </div>
);

const Text = props => (
  <div className="announcement text">
    <DateCreated date_created={props.date_created} />
    <div className="value">"{props.value}"</div>
  </div>
);

const Poll = props => {
  const { max_votes, user_voted } = props;
  const [checked, setChecked] = useState(0);
  const [votes, setVotes] = useState({});

  useEffect(() => {
    props.choices.forEach((c, i) => setVotes({ ...votes, [i]: false }));
  }, []);

  const onCheck = e => {
    setVotes({ ...votes, [e.target.value]: true });
    e.target.checked ? setChecked(checked + 1) : setChecked(checked - 1);
  };

  const submit = e => {
    console.log(votes);
    // add votes
    e.preventDefault();
  };

  return (
    <authContext.Consumer>
      {({ user }) => {
        const voted = user_voted[user.id];

        return (
          <div className="announcement poll">
            <span className="title">{props.title}</span>
            <DateCreated date_created={props.date_created} />
            <form className="choices" onSubmit={submit}>
              <button
                type="submit"
                className="submit"
                disabled={voted || checked !== max_votes}
              >
                {voted
                  ? `Voted`
                  : checked !== max_votes
                  ? `Select ${max_votes - checked}`
                  : "Submit"}
              </button>
              {props.choices.map((c, i) => {
                const choice_id = i.toString(); // NOTE: change to c.id later
                const votes = (c.votes / props.votes) * 100;
                return (
                  <div
                    key={choice_id}
                    className={`choice ${
                      voted && voted.includes(choice_id) ? " voted" : ""
                    }`}
                  >
                    {voted ? null : (
                      <input
                        type={max_votes == 1 ? "radio" : "checkbox"}
                        name={`poll-${props.id}`}
                        value={i}
                        onChange={onCheck}
                      />
                    )}
                    <div
                      className="right"
                      style={{ left: voted ? 0 : 20 }}
                      title={`"${c.text}" (${parseInt(votes * 10) / 10}%)`}
                    >
                      <span className="text">{c.text}</span>
                      <div className="votes-container">
                        <div
                          className="votes-fill"
                          style={{ width: votes + "%" }}
                        />
                        <div className="votes-percent">
                          {parseInt(votes) + "%"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </form>
          </div>
        );
      }}
    </authContext.Consumer>
  );
};

const EventList = withRouter(props => {
  const event = getEvent(props.match.params.eventid);

  const announcements = getAnnouncements(props.match.params.eventid);
  const el_announcements = announcements
    .filter(a => a.event_id == event.id)
    .map(a => {
      if (a.type === "text") return <Text key={a.id} {...a} />;
      if (a.type === "poll") return <Poll key={a.id} {...a} />;
    });

  return (
    <div className="p-event-view">
      <Header />
      <Body>
        <div className="body-left">
          <Thumbnail src={event.img_url} />
          <Map
            center={event.geolocation.slice().reverse()}
            zoom={13}
            interactive={false}
          />
        </div>
        <div className="body-right">
          <div className="title">{event.title}</div>
          <div className="date_loc">
            <span>
              <i className="material-icons">access_time</i>
              {event.time_string}
            </span>
            <span>
              <i className="material-icons">location_on</i>
              <a
                target="_blank"
                href={`https://www.google.com/maps/search/${event.geo_string.replace(
                  /\s/g,
                  "+"
                )}`}
              >
                {event.geo_string}
              </a>
            </span>
          </div>
          <div className="description">{event.description}</div>
          <TagList
            list={[
              "popcorn",
              "free",
              "interactive",
              "SEB",
              "Birds of Prey and the Fantabulous Emancipation of one Harley Quinn"
            ]}
          />
          {el_announcements.length > 0 && (
            <div className="announcements">
              <span>Announcements</span>
              <div className="list">{el_announcements}</div>
            </div>
          )}
        </div>
      </Body>
    </div>
  );
});

export default EventList;
