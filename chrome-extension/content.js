console.log('extension started');

function findComposeBar() {
    const selectors = ['.btC', '.aDh', '[role="toolbar"]', '.gU.Up'];
    const toolbar = selectors.map(selector => document.querySelector(selector)).find(toolbar => toolbar !== null);
    return toolbar || null;
}

function createAiButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = `AI Reply`;
    button.style.borderRadius = '18px';
    button.style.backgroundColor = '#0b57d0'
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate an AI reply');
    return button;
}

function extractContentFromHtml(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const targetElement = doc.querySelector('.gs');
    return targetElement ? targetElement.textContent.trim() : '';
}

function getEmailContent() {
    const selectors = ['.h7', '.a3s.aiL', '.gmail_quote', '[role="presentation"]'];
    const content = selectors.map(selector => document.querySelector(selector)).find(toolbar => toolbar !== null);
    return extractContentFromHtml(content.outerHTML) || '';
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-btn');
    if (existingButton) {
        existingButton.remove();
    }
    const composeBar = findComposeBar();
    if (!composeBar) {
        console.log("Compose bar not found");
    }
    const aiButton = createAiButton();
    aiButton.classList.add('ai-reply-btn');
    aiButton.addEventListener('click', async () => {
        try{
            console.log("Button clicked");
            aiButton.innerHTML = '⌛';
            aiButton.style.pointerEvents = 'none';
            aiButton.style.opacity = '0.5';
            const emailContent = getEmailContent();
            const tone = 'PROFESSIONAL';
            const response = await fetch(`http://localhost:8080/api/v1/mail/stream/generate-reply?mailContent=${encodeURIComponent(emailContent)}&tone=${encodeURIComponent(tone)}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "text/event-stream",
                },
            });
            if (!response.body) throw new Error("ReadableStream not supported.");

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let generatedReply = "";
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                generatedReply += chunk;
            }

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.error('Compose box was not found');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to generate reply');
        } finally {
            aiButton.innerHTML = 'AI Reply';
            aiButton.style.pointerEvents = 'auto';
            aiButton.style.opacity = '1';
        }
    });
    composeBar.insertBefore(aiButton, composeBar.firstChild);

}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutations) => {
        mutations.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const hasComposEts = node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]')
                if (hasComposEts) {
                    console.log("Compose dialog detected");
                    setTimeout(injectButton, 500)
                }
            }
        })
    })
});


observer.observe(document.body, {
    childList: true,
    subtree: true
});