import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CalendarPage from "@front/page/calendar";

const styleApp = makeStyles(theme => ({
  app: {
    width: "100%",
    height: "100%"
  },
  innerPage: {
    maxWidth: "1000px"
  }
}));

const App = () => {
  const style = styleApp();
  return (
    <div className={style.app}>
      <CalendarPage className={style.innerPage} />
    </div>
  );
};

export default App;
