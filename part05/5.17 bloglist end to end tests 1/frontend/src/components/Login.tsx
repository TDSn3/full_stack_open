import { Divider } from '@mui/material';

interface LoginProps {
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>,

  handleLogin: (event: { preventDefault: () => void }) => void,
}

function Login({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}: LoginProps) {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <span>username </span>
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <span>password </span>
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          <button id="login-button" type="submit">Login</button>
        </div>
        <Divider style={{ marginTop: '16px' }} />
      </form>
    </div>
  );
}

export default Login;
