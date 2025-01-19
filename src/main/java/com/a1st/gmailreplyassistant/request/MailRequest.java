package com.a1st.gmailreplyassistant.request;

import com.a1st.gmailreplyassistant.domain.TONE;

/**
 * @author: Abderrahman Youabd aka: A1ST
 * @version: 1.0
 */
public record MailRequest
        (
                String mailContent,
                TONE tone
        ) {
}
