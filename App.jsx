// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import Bookmarks from "./pages/Bookmarks";
import Comments from "./pages/Comments";
import MealPlanner from "./pages/MealPlanner";
import Dashboard from "./pages/Dashboard";
import Collaborate from "./pages/Collaborate";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/comments/:id" element={<Comments />} />
        <Route path="/planner" element={<MealPlanner />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/collaborate/:id" element={<Collaborate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;