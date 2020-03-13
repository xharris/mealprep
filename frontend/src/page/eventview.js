import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";

import { getEvent, getAnnouncements, getComments, getUser } from "@db";
import authContext from "@db/authContext";

import Body from "@feature/body";
import Map from "@feature/map";
import Header from "@feature/header";
import { TagList } from "@feature/tag";
import Thumbnail from "@feature/thumbnail";
import Button from "@feature/button";
import { status_color, status_string } from "@feature/status";
import Modal from "@feature/modal";
import Form from "@feature/form";
import FakeLink from "@feature/fakelink";

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
        const logged_in = user !== null;
        const voted = user ? user_voted[user.id] : false;

        return (
          <div className="announcement poll">
            <span className="title">{props.title}</span>
            <DateCreated date_created={props.date_created} />
            <form className="choices" onSubmit={submit}>
              <Button
                type="submit"
                className="submit"
                disabled={voted || !logged_in || checked !== max_votes}
              >
                {voted
                  ? `Voted`
                  : checked !== max_votes
                  ? `Select ${max_votes - checked}`
                  : "Submit"}
              </Button>
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
                    {voted || !logged_in ? null : (
                      <input
                        className="input"
                        type={max_votes === 1 ? "radio" : "checkbox"}
                        name={`poll-${props.id}`}
                        value={choice_id}
                        onChange={onCheck}
                      />
                    )}
                    <div
                      className="right"
                      style={{ left: !user || voted ? 0 : 20 }}
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

const CommentBox = props => {
  const { user } = useContext(authContext);
  const onCommentSubmit = e => {
    if (!user) {
      console.log("please log in");
    } else {
      console.log(e.comment);
    }
  };
  const [commentHeight, setCommentHeight] = useState("auto");
  return (
    <Form onSubmit={onCommentSubmit}>
      <textarea
        className="textarea"
        type="text"
        name="comment"
        placeholder="Type your comment here..."
        style={{ height: commentHeight }}
        onKeyDown={e => {
          var el = e.target;
          setCommentHeight(el.scrollHeight - 6);
        }}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

const Comment = ({ comment_id, user_id, value, is_reply }) => {
  const { user } = useContext(authContext);
  const replies = getComments({ reply_to_id: comment_id });
  const comment_user = getUser(user_id);

  const [commentBoxOpen, setCommentBoxOpen] = useState(false);

  return (
    <>
      <div
        key={comment_id + "-div"}
        className={`comment ${is_reply ? "is_reply" : ""}`}
      >
        <Thumbnail src={comment_user.img_url} type={"rounded"} />
        <div className="value">
          <div className="text">
            <span className="username">{comment_user.full_name}</span>
            {value}
          </div>

          {user && (
            <div className="comment-actions">
              <FakeLink
                text={commentBoxOpen ? "Cancel Reply" : "Reply"}
                onClick={() => setCommentBoxOpen(!commentBoxOpen)}
              />
            </div>
          )}
        </div>
      </div>
      {commentBoxOpen && <CommentBox />}
      {replies.map(c => (
        <Comment
          key={c.id + "-reply"}
          comment_id={c.id}
          user_id={c.user_id}
          value={c.value}
          is_reply={true}
        />
      ))}
    </>
  );
};

const EventList = withRouter(props => {
  const { user } = useContext(authContext);
  const event_id = props.match.params.eventid;
  const event = getEvent(event_id);
  const comments = getComments({ event_id });
  const announcements = getAnnouncements(event_id);
  const el_announcements = announcements
    .filter(a => a.event_id === event.id)
    .map(a => {
      if (a.type === "text") return <Text key={a.id} {...a} />;
      if (a.type === "poll") return <Poll key={a.id} {...a} />;
      return null;
    });

  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const onInvitationSubmit = e => {
    const invitation_list = e.invitation_list
      .split(",")
      .map(i => i.trim().replace(/[()\-\s]/g, ""));
    console.log(invitation_list);
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
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/search/${event.geo_string.replace(
                  /\s/g,
                  "+"
                )}`}
              >
                {event.geo_string}
              </a>
            </span>
          </div>
          {event.description && (
            <div className="description">{event.description}</div>
          )}
          <TagList list={event.tags} />
          <div className="action-container">
            {user && user.event_status[event_id] !== "owned" && (
              <div className="button-group">
                {["going", "maybe", "cant"].map(s => (
                  <Button
                    key={s}
                    title={status_string[s]}
                    color={status_color[s]}
                  >
                    {user && user.event_status[event_id] === s ? (
                      <i className="material-icons">check</i>
                    ) : (
                      s
                    )}
                  </Button>
                ))}
              </div>
            )}
            {((user && user.event_status[event_id] === "owned") ||
              event.users_can_invite) && (
              <Button
                className="btn-invite"
                onClick={() => {
                  setInviteModalOpen(true);
                }}
              >
                <i className="material-icons">mail_outline</i>Invite people
              </Button>
            )}
          </div>
          {el_announcements.length > 0 && (
            <div className="announcements">
              <span>Announcements</span>
              <div className="list">{el_announcements}</div>
            </div>
          )}
          <div className="comments">
            <span>Comments</span>
            {user && <CommentBox />}
            {comments.length > 0 && (
              <div className="list">
                {comments.map((c, i) => (
                  <Comment
                    key={c.id}
                    user_id={c.user_id}
                    comment_id={c.id}
                    value={c.value}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Body>
      <Modal
        className="modal-invitation"
        title={"Invite people"}
        is_open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      >
        <Form onSubmit={onInvitationSubmit}>
          <span className="instructions">
            Enter a comma-seperated list of emails, phone numbers, or usernames
          </span>
          <textarea
            name="invitation_list"
            placeholder={"jimbo@gmail.com, (973) 123-3210, ..."}
          ></textarea>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal>
    </div>
  );
});

export default EventList;
