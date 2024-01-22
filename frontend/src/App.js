import React, { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route exact path="/" element={user ? <Home /> : <Login />} />
      <Route
        exact
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      />
      <Route
        exact
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
      <Route exact path="/profile/:username" element={<Profile />} />
      {/* <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/profile/:username">
        <Profile />
      </Route> */}
    </Routes>
  );
}

export default App;
