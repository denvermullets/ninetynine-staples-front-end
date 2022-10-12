import React from "react";
import { createUseStyles } from "react-jss";
import { Route, Routes } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import SignUp from "./components/Authentication/SignUp";
import Navbar from "./components/NavBar";
import Boxsets from "./views/Boxsets";
import Collections from "./views/Collections";
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
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/collections/:username/:id" element={<Collections />} />
          <Route path="/sets" element={<Boxsets />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </AppContainer>
  );
}

export default App;
