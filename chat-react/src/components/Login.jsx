import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
      <h2>Ingresa al Chat</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Tu nombre de usuario"
      />
      <button onClick={handleSubmit}>Entrar</button>
    </div>
  );
};

export default Login;