import React, { useState } from 'react';

const ChatPopup = ({ user, onClose, onSendMessage, messages }) => {
    const [messageText, setMessageText] = useState('');

    const handleSendMessage = () => {
        if (messageText.trim() && onSendMessage) {
            onSendMessage(messageText);
            setMessageText(''); // Clear input after sending message
        }
    };

    return (
        <div className="chat-popup">
            <div className="chat-header">
                <h3>Chatting with {user.name}</h3>
                <button onClick={onClose}>Close</button>
            </div>
            <div className="chat-messages">
                {/* Display messages */}
                {messages.map((message, index) => (
                    <div key={index}>
                        {/* Display the sender and message */}
                        <div>
                            <strong>{message.fromUser === user.id ? user.name : "you"}:</strong> {message.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPopup;
