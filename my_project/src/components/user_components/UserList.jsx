import React, { useState } from "react";
import ChatPopup from '../websocket_components/ChatPopup';
import { initializeWebSocket, sendMessage } from '../websocket_components/WebSocketAss3'; // Update the import path

const UserList = ({ users, editUser, deleteUser }) => {
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);

  const startChatWithUser = (user) => {
    setSelectedUser(user);
    setShowChatPopup(true);

    if (stompClient === null) {
      const userUserId = sessionStorage.getItem('userId');
      const client = initializeWebSocket(userUserId, (message) => {
        console.log('Received message from user:', message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      setStompClient(client);
    }
  };

  const closeChatPopup = () => {
    setSelectedUser(null);
    setShowChatPopup(false);
  };

  const sendMessageToUser = (message) => {
    if (selectedUser && message.trim() && stompClient) {
      sendMessage(stompClient, selectedUser.id, message);
      const sentMessage = {
        text: message,
        fromUser: sessionStorage.getItem('userId'),
        toUser: selectedUser.id,
      };
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
    }
  };

  return (
      <div>
        <table className="table table-hover mt-3" align="center">
          <thead className="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
            <th scope="col">Option</th>
          </tr>
          </thead>
          {users.map((user, index) => {
            return (
                <tbody key={user.id}>
                <tr>
                  <th scope="row">{user.id} </th>
                  <td>{user.name}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => editUser(user)}
                    >
                      Edit
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger mx-2"
                        onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger mx-2"
                        onClick={() => startChatWithUser(user)}
                    >
                      Chat
                    </button>
                  </td>
                </tr>
                </tbody>
            );
          })}
        </table>
        {showChatPopup && (
            <ChatPopup
                user={selectedUser}
                onClose={closeChatPopup}
                onSendMessage={sendMessageToUser}
                messages={messages.filter((msg) => msg.toUser === selectedUser.id || msg.fromUser === selectedUser.id)}
            />
        )}
      </div>
  );
};

export default UserList;
