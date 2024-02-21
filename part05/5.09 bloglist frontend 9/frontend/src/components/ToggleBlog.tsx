import { useState, forwardRef, useImperativeHandle } from 'react';
import { Divider } from '@mui/material';
import { BlogType } from '../utils/type';
import blogService from '../services/blog';

interface ToggleBlogProps {
  buttonLabel: string,
  blog: BlogType,
  blogs: BlogType[],
  setBlogs: React.Dispatch<React.SetStateAction<BlogType[]>>,
}

const ToggleBwlog = forwardRef(({
  buttonLabel,
  blog,
  blogs,
  setBlogs,
}: ToggleBlogProps, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  const hideWhenVisible = { display: (visible ? 'none' : '') };
  const showWhenVisible = { display: (visible ? '' : 'none') };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeButton = () => {
    const promise = blogService.likePlusOne(blog);

    promise.then((_data) => {
      const newBlogList = blogs.map((value: BlogType) => {
        if (value.id === blog.id) {
          return ({ ...value, likes: value.likes + 1 });
        }
        return (value);
      });
      setBlogs(newBlogList);
    });
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <Divider style={{ marginTop: '16px' }} />
        {blog.title}
        {' '}
        {blog.author}
        <button type="button" onClick={toggleVisibility}>{buttonLabel}</button>
        <Divider />
      </div>

      <div style={showWhenVisible}>
        <Divider style={{ marginTop: '16px' }} />
        {blog.title}
        {' '}
        {blog.author}
        <br />
        {blog.url}
        <br />
        likes:
        {' '}
        {blog.likes}
        {' '}
        <button type="button" onClick={handleLikeButton}>like</button>
        <br />
        username:
        {' '}
        {blog.user.username}
        {' | name :'}
        {blog.user.name}
        <br />
        <button type="button" onClick={toggleVisibility}>hide</button>
        <Divider />
      </div>
    </div>
  );
});

export default ToggleBlog;
