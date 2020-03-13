import React, { useEffect, useState } from "react";

import FakeLink from "@feature/fakelink";
import Form from "@feature/form";
import Modal from "@feature/modal";

import "@style/signin.scss";

const Separator = () => <div className="separator" />;

export const SignInLinks = props => {
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (props.onChange) props.onChange(showSignUp);
  }, [showSignUp]);

  return (
    <div className="f-signin-title">
      <FakeLink
        className={showSignUp ? "" : "selected"}
        text={"Login"}
        onClick={() => setShowSignUp(false)}
      ></FakeLink>
      <Separator />
      <FakeLink
        className={showSignUp ? "selected" : ""}
        text={"Create an account"}
        onClick={() => setShowSignUp(true)}
      ></FakeLink>
    </div>
  );
};

export const SignInContent = props => {
  const onSignUpSubmit = e => {};
  const onLoginSubmit = e => {};

  return props.showSignUp ? (
    <Form
      onSubmit={onSignUpSubmit}
      className="form-signup"
      inputs={[
        { type: "email", label: "Email:", name: "email", required: true },
        {
          type: "text",
          label: "Display Name:",
          name: "display_name",
          required: true
        },
        {
          type: "tel",
          label: "Phone Number:",
          name: "phone",
          pattern: `\\(?[0-9]{3}\\)?[\\-\\s]?[0-9]{3}[\\-\\s]?[0-9]{4}`
        },
        {
          type: "password",
          label: "Password:",
          name: "password",
          required: true
        },
        {
          type: "password",
          label: "Retype your password:",
          name: "password2",
          required: true
        },
        { type: "submit" }
      ]}
    />
  ) : (
    <Form
      onSubmit={onLoginSubmit}
      className="form-login"
      inputs={[
        { label: "Email:", type: "email", name: "email", required: true },
        {
          label: "Password:",
          type: "password",
          name: "password",
          required: true
        },
        { type: "submit" }
      ]}
    />
  );
};

export const SignInModal = props => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <Modal
      className="f-modal-login"
      is_open={props.is_open}
      title={
        <div className="modal-login-title">
          <SignInLinks onChange={setShowSignUp} />
        </div>
      }
      onClose={props.onClose}
    >
      <SignInContent showSignUp={showSignUp} />
    </Modal>
  );
};
