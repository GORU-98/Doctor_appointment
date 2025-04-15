import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import healthBlogs from './healthBlogs'; 


const BlogPage = () => {
  
const token=localStorage.getItem("authtoken");
const navigate= useNavigate();

  useEffect(()=>{
    if (!token) {
      navigate('/login');
      return;
    }
     // eslint-disable-next-line
},[])
  return (
    <div className="blog-page">
      <h1>Health Blogs</h1>
      <div className="blog-list">
        {healthBlogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <h2>{blog.title}</h2>
              <p className="blog-author">By {blog.author}</p>
              <p className="blog-summary">{blog.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;