import React from "react";
import { Route, Routes } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import SignUp from "./components/Authentication/SignUp";
import Navbar from "./components/NavBar";
import Boxsets from "./views/Boxsets";
import Collections from "./views/Collections";
import LandingPage from "./views/Landing";
import Login from "./views/Login";

function App() {
  return (
    <AppContainer>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/collections/:username/:id" element={<Collections />} />
        <Route path="/sets" element={<Boxsets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
