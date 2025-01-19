package com.a1st.gmailreplyassistant.controller;

import com.a1st.gmailreplyassistant.domain.TONE;
import com.a1st.gmailreplyassistant.request.MailRequest;
import com.a1st.gmailreplyassistant.service.MailReplyService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

/**
 * @author: Abderrahman Youabd aka: A1ST
 * @version: 1.0
 */
@RestController
@RequestMapping("/api/v1/mail")
@RequiredArgsConstructor
@CrossOrigin
public class MailReplyController {

    private final MailReplyService mailReplyService;

    @GetMapping("/stream/generate-reply")
    public Flux<String> generateReply(@RequestParam String mailContent, @RequestParam String tone) {
        return mailReplyService.generateReply(new MailRequest(mailContent, TONE.valueOf(tone)));
    }


}
