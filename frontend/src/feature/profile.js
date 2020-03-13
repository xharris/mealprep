import React, { useContext } from "react";

import authContext from "@db/authContext";

import Form from "@feature/form";
import Modal from "@feature/modal";
import Thumbnail from "@feature/thumbnail";

import "@style/profile.scss";

export const ProfileContent = props => {
  const { user } = useContext(authContext);
  const onProfileSave = e => {};

  return [
    <Thumbnail
      key={"image"}
      className={"profile-image"}
      type={"rounded"}
      alt={"wow"}
      src={user.img_url}
      onChange={e => {
        var reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        reader.onload = e => {
          const data = e.target.result;
        };
      }}
    />,
    <Form
      key={"form"}
      onSubmit={onProfileSave}
      className="form-profile"
      inputs={[
        { type: "email", label: "Email:", name: "email", required: true },
        {
          type: "text",
          label: "Display Name:",
          name: "display_name"
        },
        {
          type: "tel",
          label: "Phone Number:",
          name: "phone",
          pattern: `\\(?[0-9]{3}\\)?[\\-\\s]?[0-9]{3}[\\-\\s]?[0-9]{4}`
        },
        {
          type: "password",
          label: "New password:",
          name: "password"
        },
        {
          type: "password",
          label: "Retype your new password:",
          name: "password2"
        },
        { type: "submit" }
      ]}
    />
  ];
};

export const ProfileModal = props => (
  <Modal
    className="f-modal-profile"
    is_open={props.is_open}
    title={<div className="modal-profile-title">Edit profile</div>}
    onClose={props.onClose}
  >
    <ProfileContent />
  </Modal>
);
