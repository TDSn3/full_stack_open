import { useState } from 'react';
import { Divider } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import blogService from '../../services/blog';

import { BlogType } from '../../utils/type';

interface AddBlogFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blogFormRef: React.MutableRefObject<any>,

  userId: string,
  blogs: BlogType[],
  setBlogs: React.Dispatch<React.SetStateAction<BlogType[]>>,
  setNotificationMessage: React.Dispatch<React.SetStateAction<string>>,
  setNotificationClassName: React.Dispatch<React.SetStateAction<string>>,
}

function AddBlogForm({
  blogFormRef,
  userId,
  blogs,
  setBlogs,
  setNotificationMessage,
  setNotificationClassName,
}: AddBlogFormProps) {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const handleAddBlog = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      blogFormRef.current.toggleVisibility();

      const newObject = {
        title,
        author,
        url,
        likes: 0,
        userId,
      };

      console.log(newObject);
      const response = await blogService.addNew(newObject);

      const newBlog: BlogType = {
        id: uuidv4(),
        title: response.title,
        author: response.author,
        url: response.url,
        likes: response.likes,
        user: response.user,
      };

      console.log('response: ', newObject);
      const blogUpdate: BlogType[] = [...blogs, newBlog];
      setBlogs(blogUpdate);

      setNotificationMessage('Blog added');
      setNotificationClassName('validation');
      setTimeout(() => {
        setNotificationMessage('');
        setNotificationClassName('');
      }, 5000);
    } catch (exception) {
      setNotificationMessage('Impossible to add a new blog');
      setNotificationClassName('error');
      setTimeout(() => {
        setNotificationMessage('');
        setNotificationClassName('');
      }, 5000);
    }
  };
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          <span>title </span>
          <input
            type="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <span>author </span>
          <input
            type="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <span>url </span>
          <input
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
      <Divider style={{ marginTop: '16px' }} />
    </div>
  );
}

export default AddBlogForm;
