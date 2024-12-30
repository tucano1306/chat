import { useState, useEffect } from 'react';

export const useWebSocket = (url, username) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket(url);

    websocket.onopen = () => {
      websocket.send(JSON.stringify({
        type: 'login',
        username: username
      }));
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [url, username]);

  return ws;
};