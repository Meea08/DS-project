import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatPopup from "../../components/websocket_components/ChatPopup";
import { initializeWebSocket, sendMessage  } from "../../components/websocket_components/WebSocketAss3"; // Update the import path

const AllAdmins = () => {
    const [adminList, setAdminList] = useState([]);
    const [showChatPopup, setShowChatPopup] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);

    const startChatWithAdmin = (admin) => {
        setSelectedAdmin(admin);
        setShowChatPopup(true);

        if (stompClient === null) {
            const adminUserId = sessionStorage.getItem('userId');
            const client = initializeWebSocket(adminUserId, (message) => {
                console.log('Received message from user:', message);
                setMessages((prevMessages) => [...prevMessages, message]);
            });
            setStompClient(client);
        }
    };

    const closeChatPopup = () => {
        setSelectedAdmin(null);
        setShowChatPopup(false);
    };

    const sendMessageToAdmin = (message) => {
        if (selectedAdmin && message.trim() && stompClient) {
            sendMessage(stompClient, selectedAdmin.id, message);
            const sentMessage = {
                text: message,
                fromUser: sessionStorage.getItem('userId'),
                toUser: selectedAdmin.id,
            };
            setMessages((prevMessages) => [...prevMessages, sentMessage]);
        }
    };

    useEffect(() => {
        fetchAdminList();

        return () => {
            // Cleanup the WebSocket connection when component unmounts
            if (stompClient) {
                stompClient.disconnect();
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAdminList = async () => {
        try {
            const response = await axios.get("http://localhost:8080/user/viewAdmin");
            setAdminList(response.data);
        } catch (error) {
            console.error("Error fetching admin list:", error.message);
        }
    };

    return (
        <div>
            <h1>All Admins Page</h1>
            {adminList.length > 0 ? (
                <table className="table table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {adminList.map((admin) => (
                        <tr key={admin.id}>
                            <td>{admin.id}</td>
                            <td>{admin.name}</td>
                            <td>{admin.role}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger mx-2"
                                    onClick={() => startChatWithAdmin(admin)}
                                >
                                    Chat
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No admins found.</p>
            )}
            {showChatPopup && (
                <ChatPopup
                    user={selectedAdmin}
                    onClose={closeChatPopup}
                    onSendMessage={sendMessageToAdmin}
                    messages={messages.filter((msg) => msg.toUser === selectedAdmin.id || msg.fromUser === selectedAdmin.id)}
                />
            )}
        </div>
    );
};

export default AllAdmins;
