import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const BlogList = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const _id = userData?._id;
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!_id) {
      toast.error("Login first");
      return;
    }
    fetchBlogs();
  }, [_id]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
      `${import.meta.env.VITE_BASEURL}/api/blog/getBlogs/${_id}`,
        { withCredentials: true }
      );
    
      setBlogs(response.data.allBlogs);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch blogs");
    }
  };

  const handleDelete = async (blogId) => {
    try {
      const response = await axios.delete(
        `http://localhost:9999/api/blog/deleteBlog/${_id}/${blogId}`,
        { withCredentials: true }
      );
      toast.success(response.data.message || "Blog deleted successfully");
      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <Card style={{ width: "18rem" }} key={blog._id}>
            {blog.image && (
              <Card.Img variant="top" src={blog.image} alt={blog.title} />
            )}
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text>Author: {blog.author}</Card.Text>
              <Card.Text>Tags: {Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags}</Card.Text>
              <Card.Text>
                {blog.content?.substring(0, 100)}... <Link to={`/view/${blog._id}`}>Read more</Link>
              </Card.Text>
              <Link to={`/edit/${_id}/${blog._id}`}>
                <Button variant="primary" className="me-2">Edit</Button> 
              </Link>
              <Button variant="danger" onClick={() => handleDelete(blog._id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default BlogList;
