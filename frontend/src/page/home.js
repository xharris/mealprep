import React from "react";

import Header from "@feature/header";

const Home = () => {
  return (
    <>
      <div>
        <Header />
        <div>todays meals</div>
        <div>
          <div>trending</div>
          <div>popular tags</div>
        </div>
      </div>
    </>
  );
};

export default Home;
