import React, { useState, useEffect } from "react";

import Header from "@feature/header";
import Body from "@feature/body";
import Thumbnail from "@feature/thumbnail";
import Form from "@feature/form";
import Map from "@feature/map";

import "@style/eventcreate.scss";

const EventCreate = () => {
  const [geolocation, setGeolocation] = useState(null);
  const onCreateSubmit = e => {
    console.log(e);
  };
  useEffect(() => {
    console.log(geolocation);
  }, [geolocation]);
  return (
    <div className="p-event-create">
      <Header />
      <Body>
        <div className="left">
          <Map
            search={e => {
              setGeolocation(Object.assign(e, {}));
            }}
            markers={geolocation ? [geolocation] : []}
          />
        </div>
        <div className="right">
          <Thumbnail
            className={"event-image"}
            type={"rounded"}
            alt={"wow"}
            onChange={e => {
              var reader = new FileReader();
              reader.readAsText(e.target.files[0]);
              reader.onload = e => {
                const data = e.target.result;
              };
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
              {
                type: "text",
                name: "address",
                label: "Address:",
                value: geolocation ? geolocation.place_name : "",
                disabled: true
              },
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
        </div>
      </Body>
    </div>
  );
};

export default EventCreate;
