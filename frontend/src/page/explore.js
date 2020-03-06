import React, { useState } from "react";

import Header from "@feature/header";

const Explore = () => {
  const [setIsSearching, isSearching] = useState(false);
  return (
    <>
      <div>
        <Header />
        <div>Search input</div>
        {isSearching === true ? (
          <div>results</div>
        ) : (
          <div>default explore view</div>
        )}
      </div>
    </>
  );
};

export default Explore;
