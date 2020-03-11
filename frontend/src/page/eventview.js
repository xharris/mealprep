import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";

import { getEvent, getAnnouncements, getComments } from "@db";
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

  const onCheck = e => {
    if (max_votes === 1) {
      setVotes({ [e.target.value]: e.target.checked === true });
      setChecked(1);
    } else {
      setVotes({ ...votes, [e.target.value]: e.target.checked === true });
      e.target.checked === true
        ? setChecked(checked + 1)
        : setChecked(checked - 1);
    }
  };

  const submit = e => {
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
                const vote_percent = (c.votes / props.votes) * 100;
                return (
                  <div
                    key={choice_id}
                    className={`choice ${
                      (voted && voted.includes(choice_id)) ||
                      votes[choice_id] === true
                        ? " voted"
                        : ""
                    }`}
                  >
                    {voted ? null : (
                      <input
                        type={max_votes == 1 ? "radio" : "checkbox"}
                        name={`poll-${props.id}`}
                        value={choice_id}
                        onChange={onCheck}
                      />
                    )}
                    <div
                      className="right"
                      style={{ left: voted ? 0 : 20 }}
                      title={`"${c.text}" (${parseInt(vote_percent * 10) /
                        10}%)`}
                    >
                      <span className="text">{c.text}</span>
                      <div className="votes-container">
                        <div
                          className="votes-fill"
                          style={{ width: vote_percent + "%" }}
                        />
                        <div className="votes-percent">
                          {parseInt(vote_percent) + "%"}
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

const Comment = ({ comment_id, value, is_reply }) => {
  const replies = getComments({ reply_to_id: comment_id });
  return (
    <authContext.Consumer>
      {({ user }) => [
        <div className={`comment ${is_reply ? "is_reply" : ""}`}>
          <Thumbnail src={user.img_url} type={"rounded"} />
          <div className="value">
            <span className="username">{user.full_name}</span>
            {value}
          </div>
        </div>,
        replies.map(c => (
          <Comment
            key={c.id}
            comment_id={c.id}
            value={c.value}
            is_reply={true}
          />
        ))
      ]}
    </authContext.Consumer>
  );
};

const EventList = withRouter(props => {
  const event_id = props.match.params.eventid;
  const event = getEvent(event_id);
  const comments = getComments({ event_id });
  const announcements = getAnnouncements(event_id);
  const el_announcements = announcements
    .filter(a => a.event_id == event.id)
    .map(a => {
      if (a.type === "text") return <Text key={a.id} {...a} />;
      if (a.type === "poll") return <Poll key={a.id} {...a} />;
    });

  const onCommentSubmit = e => {
    e.preventDefault();
  };

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
          <div className="comments">
            <span>Comments</span>
            <form className="input-container" onSubmit={onCommentSubmit}>
              <textarea
                type="text"
                placeholder="Type your comment here..."
                onKeyDown={e => {
                  var el = e.target;
                  setTimeout(function() {
                    el.style.cssText = "height:auto; padding:0";
                    // for box-sizing other than "content-box" use:
                    // el.style.cssText = '-moz-box-sizing:content-box';
                    el.style.cssText = "height:" + el.scrollHeight + "px";
                  }, 0);
                }}
              />
              <button type="submit">Submit</button>
            </form>
            <div className="list">
              {comments.map(c => (
                <Comment key={c.id} comment_id={c.id} value={c.value} />
              ))}
            </div>
          </div>
        </div>
      </Body>
    </div>
  );
});

export default EventList;
