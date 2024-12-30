import React, { useState } from 'react';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import './styles/App.css';

function App() {
  const [username, setUsername] = useState(null);

  return (
    <div className="app">
      {!username ? (
        <Login onLogin={setUsername} />
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

export default App;
