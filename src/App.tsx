import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { createUseStyles } from "react-jss";
import { Route, Routes } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import SignUp from "./components/Authentication/SignUp";
import { Navbar } from "./components/NavBar";
import { useCurrentPlayerContext } from "./components/providers/CurrentPlayerProvider";
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
  const [cookies] = useCookies(["ninetynine_staples"]);
  const { setCurrentPlayer } = useCurrentPlayerContext();

  useEffect(() => {
    if (cookies.ninetynine_staples) {
      setCurrentPlayer({
        email: cookies.ninetynine_staples.email,
        created_at: cookies.ninetynine_staples.created_at,
        updated_at: cookies.ninetynine_staples.updated_at,
        id: cookies.ninetynine_staples.id,
        username: cookies.ninetynine_staples.username,
        token: cookies.ninetynine_staples.token,
      });
    }
  }, [cookies]);

  return (
    <AppContainer>
      <div className={classes.root}>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sets" element={<Boxsets />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </AppContainer>
  );
}

export default App;
