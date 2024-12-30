import React, { useState, useEffect, useRef } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';

const ChatContainer = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const ws = useWebSocket('ws://34.207.88.255:3000', username);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message) => {
    if (message.trim() && ws) {
      ws.send(JSON.stringify({
        type: 'message',
        content: message
      }));
    }
  };

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages(prev => [...prev, data]);
      };
    }
  }, [ws]);

  return (
    <div className="chat-container">
      <ChatHeader />
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${
              msg.type === 'message' 
                ? msg.username === username 
                  ? 'sent' 
                  : 'received'
                : 'system-message'
            }`}
          >
            {msg.type === 'message' ? (
              <>
                <strong>{msg.username}: </strong>
                <span>{msg.content}</span>
              </>
            ) : (
              msg.username + (
                msg.type === 'userConnected' 
                  ? ' se ha conectado'
                  : ' se ha desconectado'
              )
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;