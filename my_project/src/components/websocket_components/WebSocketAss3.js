import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const wsEndpoint = 'http://localhost:8090/message'; // Update WebSocket endpoint to match your backend

function initializeWebSocket(userId, onMessageReceived) {
    const socket = new SockJS(wsEndpoint);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        stompClient.subscribe(`/user/${userId}/message`, (message) => {
            const parsedMessage = JSON.parse(message.body);
            onMessageReceived(parsedMessage);
        });
    }, (error) => {
        console.error('Error connecting to WebSocket:', error);
    });

    return stompClient;
}

function sendMessage(stompClient, userId, messageText) {
    const chatMessage = {
        text: messageText,
        toUser: userId,
        fromUser: sessionStorage.getItem('userId'),
    };

    stompClient.send('/app/final', {}, JSON.stringify(chatMessage));
}

export { initializeWebSocket, sendMessage };
