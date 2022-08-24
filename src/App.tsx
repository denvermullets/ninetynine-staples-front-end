import React from "react";
import { createUseStyles } from "react-jss";
import AppContainer from "./components/AppContainer";
import { Navbar } from "./components/NavBar";
import LandingPage from "./views/Landing";

const useStyles = createUseStyles(() => ({
  root: {
    width: "100%",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <AppContainer>
      <div className={classes.root}>
        <Navbar />
        <LandingPage />
      </div>
    </AppContainer>
  );
}

export default App;
