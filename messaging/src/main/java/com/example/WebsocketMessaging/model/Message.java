package com.example.WebsocketMessaging.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Message {
    private String text;

    private UUID fromUser;

    private UUID toUser;
}
