import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const rawUserData = sessionStorage.getItem("userData");
  const userData = rawUserData ? JSON.parse(rawUserData) : null;
  const { _id } = userData || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!_id) {
      toast.error("Please login first");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/blog/blogPost`,
        {
          title,
          author,
          content,
          publishedDate,
          tags,
        },
        { withCredentials: true }
      );

      toast.success(response.data?.message || "Blog created successfully!");
      navigate("/BlogList");

      setTitle("");
      setAuthor("");
      setContent("");
      setPublishedDate("");
      setTags("");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create blog");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />

        <label>Author:</label>
        <input
          type="text"
          placeholder="Enter author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <br />

        <label>Published Date:</label>
        <input
          type="date"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          required
        />
        <br />

        <label>Tags (comma-separated):</label>
        <input
          type="text"
          placeholder="e.g. tech, react, backend"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <br />

        <label>Content:</label>
        <textarea
          rows={10}
          placeholder="Enter content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", marginTop: "10px" }}
          required
        />
        <br />

        <input type="submit" value="Create Blog" />
      </form>
    </div>
  );
};

export default BlogForm;
