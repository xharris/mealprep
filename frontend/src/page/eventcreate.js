import React from "react";

import Header from "@feature/header";
import Body from "@feature/body";
import Thumbnail from "@feature/thumbnail";
import Form from "@feature/form";

import "@style/eventcreate.scss";

const EventCreate = () => {
  const onCreateSubmit = e => {
    console.log(e);
  };
  return (
    <div className="p-event-create">
      <Header />
      <Body>
        <Thumbnail
          className={"event-image"}
          type={"rounded"}
          alt={"wow"}
          onChange={e => {
            console.log(e);
          }}
        />
        <Form
          onSubmit={onCreateSubmit}
          className="form-create"
          inputs={[
            // title, description, timestart, timeend, address, tags, visibility
            { type: "text", default: "what", name: "title", label: "Title:" },
            { type: "textarea", name: "description", label: "Description:" },
            { type: "date", name: "timestart", label: "Start:" },
            { type: "date", name: "timeend", label: "End:" },
            { type: "text", name: "address", label: "Address:" },
            {
              type: "radio",
              name: "visbility",
              label: "Visibility:",
              checked: "public",
              choices: [
                { label: "public", value: "public" },
                { label: "request invite", value: "invite" },
                { label: "private", value: "private" }
              ]
            },
            {
              type: "checkbox",
              name: "users_can_invite",
              label: "Attendees can invite others"
            },
            { type: "submit", label: "Create event" }
          ]}
        />
      </Body>
    </div>
  );
};

export default EventCreate;
