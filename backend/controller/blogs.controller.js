  const blogModel = require("../model/blogs.model");

  const createBlogs = async (req, res) => {
    const { title, author, content, publishedDate, tags } = req.body;

    if (!title || !author || !content || !publishedDate || !tags) {
      return res.status(400).json({ message: "Please fill all the blanks!" });
    }

    try {
      const userId = req.user._id;

      const blog = await blogModel.create({ ...req.body, userId });

      return res
        .status(201)
        .json({ message: "Blog created successfully!", blog });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  const getBlogs = async (req, res) => {
    const { userId } = req.params;

    if (req.user._id != userId) {
      return res.status(400).json({ message: "u can't access this notes" });
    }
    try {
      const allBlogs = await blogModel.find({ userId });
      if (!(allBlogs.length > 0)) {
        return res.status(400).json({ message: "data not found" });
      }
      return res
        .status(200)
        .json({ message: "data fetched successfully ", allBlogs });
    } catch (error) {
      return res.status(400).json({ message: error?.message });
    }
  };
  const deleteBlog = async (req, res) => {
    const { userId, blogId } = req.params;

    if (req.user._id != userId) {
      return res.status(400).json({ message: "u can't access this blog" });
    }
    try {
      const result = await blogModel.findByIdAndDelete(blogId);
      if (!result) {
        return res.status(400).json({ message: "data not fond" });
      }
      return res.status(200).json({ message: "blog deleted succefully" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  const updateBlogs = async (req, res) => {
    const { userId, blogId } = req.params;
    if (req.user._id != userId) {
      return res.status(400).json({ message: "u can't access this blog" });
    }
    try {
      const upadateData = await blogModel.findByIdAndUpdate(blogId, {
        $set: { ...req.body },
      });

      if (!upadateData) {
        return res.status(500).json({ message: "blog not found" });
      }
      return res.status(200).json({ message: "notes updated", upadateData });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const updateBlogByAdmin = async (req, res) => {
    const { blogId } = req.params;
    // if (req.user._id != userId) {
    //   return res.status(400).json({ message: "u can't access this blog" });
    // }
    try {
      const upadateData = await blogModel.findByIdAndUpdate(blogId, {
        $set: { ...req.body },
      });

      if (!upadateData) {
        return res.status(500).json({ message: "blog not found" });
      }
      return res.status(200).json({ message: "notes updated", upadateData });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  const deleteBlogByAdmin = async (req, res) => {
    const { blogId } = req.params;
    try {
      const upadateData = await blogModel.findByIdAndDelete(blogId);

      if (!upadateData) {
        return res.status(500).json({ message: "blog not found" });
      }
      return res.status(200).json({ message: "notes deleted", upadateData });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  const getBlogsByadmin = async (req, res) => {
    try {
      const allNotes = await blogModel.find();

      return res
        .status(200)
        .json({ message: "data fetched successfully ", allNotes });
    } catch (error) {
      return res.status(400).json({ message: "hello" });
    }
  };
  const getSingleBlogs = async (req, res) => {
    const { userId, blogId } = req.params;
  
    if (req.user._id != userId) {
      return res.status(403).json({ message: "Access denied" });
    }
  
    try {
      const blog = await blogModel.findById(blogId);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      return res.status(200).json({ message: "Data fetched successfully", blog });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  module.exports = {
    getBlogsByadmin,
    createBlogs,
    updateBlogs,
    deleteBlog,
    updateBlogByAdmin,
    getBlogs,
    deleteBlogByAdmin,
    getSingleBlogs,
  };
