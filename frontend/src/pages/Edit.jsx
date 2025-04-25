import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditBlog = () => {
  const { userId, blogId } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BASEURL
          }/api/blog/getSingleBlogs/${userId}/${blogId}`,
          { withCredentials: true }
        );

        const blog = res.data.blog;
        if (blog) {
          setTitle(blog.title);
          setAuthor(blog.author);
          setContent(blog.content);
          setPublishedDate(blog.publishedDate.split("T")[0]); // format YYYY-MM-DD
          setTags(blog.tags);
        } else {
          toast.error("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        toast.error("Failed to fetch blog");
      }
    };

    fetchBlog();
  }, [userId, blogId]);

  const updateBlog = async () => {
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_BASEURL
        }/api/blog/updateBlogs/${userId}/${blogId}`,
        {
          title,
          author,
          content,
          publishedDate,
          tags,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      navigate("/BlogList");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Edit Blog</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
      />
      <br />

      <input
        type="date"
        value={publishedDate}
        onChange={(e) => setPublishedDate(e.target.value)}
      />
      <br />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <br />

      <button onClick={updateBlog}>Update Blog</button>
    </div>
  );
};

export default EditBlog;
