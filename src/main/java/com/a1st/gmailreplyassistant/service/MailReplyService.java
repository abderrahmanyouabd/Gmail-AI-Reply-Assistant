package com.a1st.gmailreplyassistant.service;

import com.a1st.gmailreplyassistant.request.MailRequest;
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
        System.out.println(buildPrompt(mailRequest));
        return chatClient
                .prompt()
                .user(buildPrompt(mailRequest))
                .stream()
                .content();
    }

    private String buildPrompt(MailRequest mailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("I received an email with the following content: \n");
        prompt.append(mailRequest.mailContent());
        prompt.append("\nPlease reply to this email for me with the following tone: ");
        prompt.append(mailRequest.tone().name()).append(" tone.");
        prompt.append("\nReturn only the email directly no further information or explanation is needed from your side. including 'Here is'\n");
        return prompt.toString();
    }
}