import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import { Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import lightGreen from "@material-ui/core/colors/lightGreen";
import orange from "@material-ui/core/colors/orange";

import CalendarPage from "@page/calendar";

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: orange
  }
});

const styleApp = makeStyles(theme => ({
  app: {
    width: "100%",
    height: "100%"
  }
}));

const App = () => {
  const style = styleApp();
  return (
    <ThemeProvider theme={theme}>
      <Box className={style.app}>
        <CalendarPage />
      </Box>
    </ThemeProvider>
  );
};

export default App;
