import { useState, forwardRef, useImperativeHandle } from 'react';
import { Divider } from '@mui/material';
import { BlogType } from '../utils/type';

interface ToggleBlogProps {
  buttonLabel: string,
  blog: BlogType,
}

const ToggleBlog = forwardRef(({ buttonLabel, blog }: ToggleBlogProps, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  const hideWhenVisible = { display: (visible ? 'none' : '') };
  const showWhenVisible = { display: (visible ? '' : 'none') };

  const toggleVisibility = () => {
    setVisible(!visible);
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
        <br />
        <button type="button" onClick={toggleVisibility}>hide</button>
        <Divider />
      </div>
    </div>
  );
});

export default ToggleBlog;
