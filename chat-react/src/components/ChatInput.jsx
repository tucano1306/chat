import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default ChatInput;