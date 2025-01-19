package com.a1st.gmailreplyassistant.service;

import com.a1st.gmailreplyassistant.request.MailRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

/**
 * @author: Abderrahman Youabd aka: A1ST
 * @version: 1.0
 */
@Service
public class MailReplyService {
    private final ChatClient chatClient;

    public MailReplyService(ChatClient.Builder chatClient) {
        this.chatClient = chatClient.build();
    }

    public Flux<String> generateReply(MailRequest mailRequest) {
        return chatClient
                .prompt()
                .system("")
                .user(mailRequest.mailContent())
                .stream()
                .content();
    }
}
