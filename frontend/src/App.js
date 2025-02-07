// frontend/src/App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/MyProfile";
import UserProfile from "./pages/UserProfile";
import TweetList from "./pages/TweetList";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import NotificationList from "./components/NotificationList";

function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/me" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/users/:username/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/tweets" element={<PrivateRoute><TweetList /></PrivateRoute>} />
          <Route path="/notifications" element={<PrivateRoute><NotificationList /></PrivateRoute>} />
        </Routes>
    </>
  );
}

export default App;