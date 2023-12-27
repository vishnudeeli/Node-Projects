import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayAllBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get('/api/blog-posts');
        setBlogPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/blog-posts/${id}`);
      setBlogPosts(blogPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>All Blog Posts</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.publication_date}</td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleEdit(post.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayAllBlogPosts;
