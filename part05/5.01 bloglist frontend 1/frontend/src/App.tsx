import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';

import { BlogType } from './utils/type';

function App() {
  const [blogs, setBlogs] = useState([]);

  const hook = () => {
    blogService
      .getAll()
      .then((blogsValue) => setBlogs(blogsValue));
  };

  useEffect(hook, []);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blogValue: BlogType) => <Blog key={blogValue.id} blog={blogValue} />)}
    </div>
  );
}

export default App;
