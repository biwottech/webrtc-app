import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Chat = ({ contact, onCallInitiate, messages, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    onSendMessage(contact, message);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      {contact ? (
        <>
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <div className="font-semibold">{contact.name}</div>
                <div className="text-sm text-gray-500">{contact.email}</div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                className="p-2 bg-blue-500 text-white rounded-full"
                onClick={() => onCallInitiate(contact, 'audio')}
              >
                <i className="fas fa-phone"></i>
              </button>
              <button
                className="p-2 bg-green-500 text-white rounded-full"
                onClick={() => onCallInitiate(contact, 'video')}
              >
                <i className="fas fa-video"></i>
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <div className="font-semibold">{msg.sender}</div>
                <div>{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-2 border rounded"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </form>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full justify-center items-center text-gray-500">
          Select a contact to start chatting
        </div>
      )}
    </div>
  );
};

Chat.propTypes = {
  contact: PropTypes.object,
  onCallInitiate: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  onSendMessage: PropTypes.func.isRequired,
};

export default Chat;
