import { useState } from 'react';
import { Divider } from '@mui/material';

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
        id: response.id,
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
          <label htmlFor="title">
            title
            <input
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            author
            <input
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="url">
            url
            <input
              id="url"
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
      <Divider style={{ marginTop: '16px' }} />
    </div>
  );
}

export default AddBlogForm;
