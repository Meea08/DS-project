package com.example.WebsocketMessaging.controller;


import com.example.WebsocketMessaging.model.Message;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.UUID;

@Controller
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials="true")
public class WebSocketController {

    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/final")
    public void receiveChatMessage(@Payload String jsonMessage) { //asta il primesc de la frontend
        System.out.println(jsonMessage);
        try {
            Message socketMessage = objectMapper.readValue(jsonMessage, Message.class);

            sendMessageToCorespondant(socketMessage.getToUser(), "/message", socketMessage);
            //trimite mesaj catre /user/user_id/chat
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendMessageToCorespondant(UUID userId, String destination, Object message) {
        messagingTemplate.convertAndSendToUser(String.valueOf(userId), destination, message);

    }
}




