import React, { useEffect, useState } from "react";

import { SignInLinks, SignInContent } from "@feature/signin";
import Body from "@feature/body";
import Header from "@feature/header";

import "@style/signinpage.scss";

const SignInPage = props => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="p-signin">
      <Header nolinks={true} noavatar={true} />
      <Body>
        <div className="container">
          <SignInLinks onChange={setShowSignUp} />
          <SignInContent showSignUp={showSignUp} />
        </div>
      </Body>
    </div>
  );
};

export default SignInPage;
