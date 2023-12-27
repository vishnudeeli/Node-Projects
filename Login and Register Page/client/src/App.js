import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


const handleLogin = () => {
  const userData = {
    username: username,
    password: password,
  };

  axios
    .post('/api/login', userData)
    .then((response) => {
      // Handle successful login
      console.log(response.data);
    })
    .catch((error) => {
      // Handle login error
      console.error(error);
    });
};

const handleRegister = () => {
  const userData = {
    username: username,
    password: password,
  };

  axios
    .post('/api/register', userData)
    .then((response) => {
      // Handle successful registration
      console.log(response.data);
    })
    .catch((error) => {
      // Handle registration error
      console.error(error);
    });
};


  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default App;
