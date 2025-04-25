import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/blog/getBlogsByadmin`,
        { withCredentials: true }
      );
      setBlogs(res.data.allNotes || []);
    } catch (error) {
      console.error("Error fetching admin blogs:", error);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASEURL}/api/blog/deleteBlogByAdmin/${blogId}`,
        { withCredentials: true }
      );
      toast.success("Blog deleted successfully!");
      setBlogs(blogs.filter((blog) => blog._id !== blogId)); // remove from UI
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", padding: "1rem" }}>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Card key={blog._id} style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text><strong>Author:</strong> {blog.author}</Card.Text>
              <Card.Text><strong>Date:</strong> {new Date(blog.publishedDate).toLocaleDateString()}</Card.Text>
              <Card.Text>{blog.content.slice(0, 100)}...</Card.Text>
              <Card.Text><strong>Tags:</strong> {blog.tags}</Card.Text>
              <Button variant="danger" onClick={() => deleteBlog(blog._id)}>Delete</Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No blogs found</p>
      )}
    </div>
  );
};

export default AdminBlogs;
