import React from "react";
import { createUseStyles } from "react-jss";
import { Route, Routes } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import SignUp from "./components/Authentication/SignUp";
import Navbar from "./components/NavBar";
import { CurrentPlayerProvider } from "./components/providers/CurrentPlayerProvider";
import Boxsets from "./views/Boxsets";
import LandingPage from "./views/Landing";
import Login from "./views/Login";

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
        <CurrentPlayerProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sets" element={<Boxsets />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </CurrentPlayerProvider>
      </div>
    </AppContainer>
  );
}

export default App;
