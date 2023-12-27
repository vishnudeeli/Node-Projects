import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function UpdateBlogPost() {
  const history = useHistory();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  useEffect(() => {
    fetchBlogPost();
  }, []);

  const fetchBlogPost = () => {
    axios.get(`http://localhost:5000/blog/${id}`)
      .then((res) => {
        const blogPost = res.data;
        setTitle(blogPost.title);
        setContent(blogPost.content);
        setAuthor(blogPost.author);
        setPublicationDate(blogPost.publicationDate);
      })
      .catch((err) => {
        console.error(err.response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlogPost = { title, content, author, publicationDate };
    axios.put(`http://localhost:5000/blog/${id}`, updatedBlogPost)
      .then((res) => {
        console.log(res.data.message);
        history.push('/'); // Redirect to display all page
      })
      .catch((err) => {
        console.error(err.response.data.error);
      });
  };

  return (
    <div className="container">
      <h1>Update Blog Post</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        {/* Content */}
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content:</label>
          <textarea className="form-control" id="content" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>

        {/* Author */}
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author:</label>
          <input type="text" className="form-control" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>

        {/* Publication Date */}
        <div className="mb-3">
          <label htmlFor="publicationDate" className="form-label">Publication Date:</label>
          <input type="date" className="form-control" id="publicationDate" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default UpdateBlogPost;
