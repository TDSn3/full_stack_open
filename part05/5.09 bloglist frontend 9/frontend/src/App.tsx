import { useState, useEffect, useRef } from 'react';
import { Divider } from '@mui/material';

import ToggleBlog from './components/ToggleBlog';
import ToggleBlogForm from './components/AddBlogForm/ToggleBlogForm';
import Login from './components/Login';
import Notification from './components/Notification';
import AddBlogForm from './components/AddBlogForm/AddBlogForm';

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
      loginService.verifyToken(loggedUserJSON)
        .then((value) => {
          if (value === 200) {
            setUser(userToken);
            blogService.setToken(userToken);
          }
        });
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blogFormRef = useRef<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blogRef = useRef<any>();

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
            <ToggleBlogForm buttonLabel="new blog" ref={blogFormRef}>
              <AddBlogForm
                blogFormRef={blogFormRef}
                userId={userId}
                blogs={blogs}
                setBlogs={setBlogs}
                setNotificationMessage={setNotificationMessage}
                setNotificationClassName={setNotificationClassName}
              />
            </ToggleBlogForm>
            <h2>blogs</h2>
            {blogs.map((blogValue: BlogType) => (
              <ToggleBlog
                key={blogValue.id}
                buttonLabel="show"
                blog={blogValue}
                blogs={blogs}
                setBlogs={setBlogs}
                ref={blogRef}
              />
            ))}
          </>
        )
      }
    </div>
  );
}

export default App;
