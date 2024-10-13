package com.example.WebsocketMessaging.configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials="true")
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/user", "/topic"); // topic -> for all | user -> for subscribed
        config.setApplicationDestinationPrefixes("/app"); //din frontend catre backend trimit la app
        // partea de /user o folosesc pt comunicare intre backend si frontend
    }
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/message").setAllowedOrigins("http://localhost:3000", "http://localhost:8090").withSockJS();
    }

}
