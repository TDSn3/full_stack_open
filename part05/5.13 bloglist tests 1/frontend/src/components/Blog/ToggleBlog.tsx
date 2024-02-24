import { useState, forwardRef, useImperativeHandle } from 'react';
import { BlogType } from '../../utils/type';
import blogService from '../../services/blog';
import Blog from './Blog';

interface ToggleBlogProps {
  buttonLabel: string,
  blog: BlogType,
  blogs: BlogType[],
  setBlogs: React.Dispatch<React.SetStateAction<BlogType[]>>,
  userId: string,
}

const ToggleBlog = forwardRef(({
  buttonLabel,
  blog,
  blogs,
  setBlogs,
  userId,
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

  const handleRemoveBlogButton = () => {
    const promise = blogService.deleteOne(blog);

    promise.then((_data) => {
      const newBlogList = blogs.filter((value: BlogType) => (value.id !== blog.id));
      setBlogs(newBlogList);
    });
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <Blog
      hideWhenVisible={hideWhenVisible}
      showWhenVisible={showWhenVisible}
      blog={blog}
      toggleVisibility={toggleVisibility}
      buttonLabel={buttonLabel}
      handleLikeButton={handleLikeButton}
      userId={userId}
      handleRemoveBlogButton={handleRemoveBlogButton}
    />
  );
});

export default ToggleBlog;
