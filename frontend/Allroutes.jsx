import React from "react";
// import { Route, Routes } from 'react-router-dom'
import Homepage from "./src/pages/Homepage";
import SignIn from "./src/pages/SignIn ";
import SignUp from "./src/pages/SignUp";
import { Route, Routes } from "react-router-dom";
import BlogList from "./src/pages/BlogList";
import BlogForm from "./src/pages/BlogForm";
import MovieDetails from "./src/pages/MovieDetails";

import Admin from "./src/pages/Admin";
import PrivateAdmin from "./src/pages/PrivateAdmin";
import EditBlog from "./src/pages/Edit";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/BlogList" element={<BlogList />}></Route>
      <Route path="/BlogForm" element={<BlogForm />}></Route>
      <Route path="/MovieDetails" element={<MovieDetails />}></Route>
      <Route path="/edit/:userId/:blogId" element={< EditBlog/>}></Route>
      <Route
        path="/admin"
        element={
          <PrivateAdmin>
            <Admin />
          </PrivateAdmin>
        }
      ></Route>
    </Routes>
  );
};

export default Allroutes;
