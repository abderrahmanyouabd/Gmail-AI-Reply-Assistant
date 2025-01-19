package com.a1st.gmailreplyassistant.controller;

import com.a1st.gmailreplyassistant.request.MailRequest;
import com.a1st.gmailreplyassistant.service.MailReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

/**
 * @author: Abderrahman Youabd aka: A1ST
 * @version: 1.0
 */
@RestController
@RequestMapping("/api/v1/mail")
@RequiredArgsConstructor
public class MailReplyController {

    private final MailReplyService mailReplyService;

    @GetMapping("/stream/generate-reply")
    public Flux<String> generateReply(@RequestBody MailRequest mailRequest) {
        return mailReplyService.generateReply(mailRequest);
    }


}
