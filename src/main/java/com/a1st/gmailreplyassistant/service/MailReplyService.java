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
                .system("You should always return only the requested email, no more, no less, and no further information.")
                .user(buildPrompt(mailRequest))
                .stream()
                .content();
    }

    private String buildPrompt(MailRequest mailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You received an email with the following content: \n");
        prompt.append(mailRequest.mailContent());
        prompt.append("\nPlease reply to this email with the following tone: ");
        prompt.append(mailRequest.tone().name()).append(" tone.");
        return prompt.toString();
    }
}