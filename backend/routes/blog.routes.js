const express = require("express");
const {
  createBlogs,
  getBlogs,
  getSingleBlogs,
  deleteBlog,
  updateBlogs,
  updateBlogByAdmin,
  deleteBlogByAdmin,
  getBlogsByadmin,
} = require("../controller/blogs.controller");

const isAuth = require("../middleware/Auth");
const CheckAdmin = require("../middleware/CheckAdmin");

const blogRouter = express.Router();

// User blog routes
blogRouter.post("/blogPost", isAuth, createBlogs);
blogRouter.get("/getBlogs/:userId", isAuth, getBlogs);
blogRouter.get("/getSingleBlogs/:userId/:blogId", isAuth, getSingleBlogs);
blogRouter.delete("/deleteBlog/:userId/:blogId", isAuth, deleteBlog);
blogRouter.put("/updateBlogs/:userId/:blogId", isAuth, updateBlogs);

// Admin blog routes
blogRouter.put("/updateBlogByAdmin/:blogId", isAuth, CheckAdmin, updateBlogByAdmin);
blogRouter.delete("/deleteBlogByAdmin/:blogId", isAuth, CheckAdmin, deleteBlogByAdmin);
blogRouter.get("/getBlogsByadmin", isAuth, CheckAdmin, getBlogsByadmin);

module.exports = blogRouter;