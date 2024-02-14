import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blog';

import { BlogType } from './utils/type';
import Login from './components/Login';
import loginService from './services/login';
import Notification from './components/Notification';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [user, setUser] = useState<string>('');

  const hook = () => {
    blogService
      .getAll()
      .then((blogsValue) => setBlogs(blogsValue));
  };

  const hookIsLogged = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON && loggedUserJSON !== '') {
      const userToken = JSON.parse(loggedUserJSON);

      setUser(userToken);
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

      setUser(userLoginStatus.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleClick = () => {
    localStorage.removeItem('loggedUser');
    setUser('');
  };

  return (
    <div className="App">
      {
        user === '' ? (
          <>
            <Notification message={errorMessage} messageClassName="error" />
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
            <h2>blogs</h2>
            {blogs.map((blogValue: BlogType) => <Blog key={blogValue.id} blog={blogValue} />)}
          </>
        )
      }
    </div>
  );
}

export default App;
