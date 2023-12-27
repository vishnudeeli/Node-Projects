import React, { useState } from 'react';
import axios from 'axios';

const CreateBlogPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/blog-posts', {
        title,
        content,
        author,
        publication_date: publicationDate,
      });
      setTitle('');
      setContent('');
      setAuthor('');
      setPublicationDate('');
      window.location = '/';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Create Blog Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlogPost;
