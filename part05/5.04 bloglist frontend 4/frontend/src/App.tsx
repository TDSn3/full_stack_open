import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import Blog from './components/Blog';
import Login from './components/Login';
import Notification from './components/Notification';
import AddBlogForm from './components/AddBlogForm';

import blogService from './services/blog';
import loginService from './services/login';

import { BlogType } from './utils/type';

function App() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [notificationClassName, setNotificationClassName] = useState<string>('');
  const [user, setUser] = useState<string>('');

  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const hook = () => {
    blogService
      .getAll()
      .then((blogsValue) => setBlogs(blogsValue));
  };

  const hookIsLogged = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    const userIdJSON = window.localStorage.getItem('userId');

    if (loggedUserJSON && loggedUserJSON !== '') {
      const userToken = JSON.parse(loggedUserJSON);

      setUser(userToken);
      blogService.setToken(userToken);
    }
    if (userIdJSON && userIdJSON !== '') {
      const userIdToken = JSON.parse(userIdJSON);

      setUserId(userIdToken);
    }
  };

  useEffect(hook, []);
  useEffect(hookIsLogged, []);

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const userLoginStatus = await loginService.login({
        username, password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(userLoginStatus.token));
      window.localStorage.setItem('userId', JSON.stringify(userLoginStatus.userId));

      blogService.setToken(userLoginStatus.token);
      setUser(userLoginStatus.token);
      setUsername('');
      setPassword('');
      setUserId(userLoginStatus.userId);
    } catch (exception) {
      setNotificationMessage('Wrong credentials');
      setNotificationClassName('error');
      setTimeout(() => {
        setNotificationMessage('');
        setNotificationClassName('');
      }, 5000);
    }
  };

  const handleClick = () => {
    localStorage.removeItem('loggedUser');
    setUser('');
    setUserId('');
  };

  const handleAddBlog = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
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
      };

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
    <div className="App">
      {
        user === '' ? (
          <>
            <Notification message={notificationMessage} messageClassName={notificationClassName} />
            <Login
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          </>
        ) : (
          <>
            <button className="cta-style" onClick={handleClick} type="button">logout</button>
            <Notification message={notificationMessage} messageClassName={notificationClassName} />
            <Divider style={{ marginTop: '16px' }} />
            <AddBlogForm
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
              handleAddBlog={handleAddBlog}
            />
            <h2>blogs</h2>
            {blogs.map((blogValue: BlogType) => <Blog key={blogValue.id} blog={blogValue} />)}
          </>
        )
      }
    </div>
  );
}

export default App;
