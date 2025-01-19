console.log('Extension started');

function findComposeBar() {
    const selectors = ['.btC', '.aDh', '[role="toolbar"]', '.gU.Up'];
    const toolbar = selectors.map(selector => document.querySelector(selector)).find(toolbar => toolbar !== null);
    return toolbar || null;
}

function createAiButtonWithDropdown() {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    buttonContainer.style.marginRight = '8px';
    buttonContainer.style.position = 'relative';
    buttonContainer.style.display = 'inline-flex';
    buttonContainer.style.alignItems = 'center';
    buttonContainer.style.borderRadius = '18px';
    buttonContainer.style.backgroundColor = '#0b57d0';
    buttonContainer.style.cursor = 'pointer';


    const mainButton = document.createElement('div');
    mainButton.style.padding = '0 12px';
    mainButton.style.color = 'white';
    mainButton.innerHTML = 'AI Reply';
    mainButton.style.borderRight = '1px solid rgba(255,255,255,0.3)';
    mainButton.style.border = 'none';
    buttonContainer.appendChild(mainButton);

    const divider = document.createElement('div');
    divider.style.width = '1px';
    divider.style.height = '100%';
    divider.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    buttonContainer.appendChild(divider);


    const dropdownTrigger = document.createElement('div');
    dropdownTrigger.style.padding = '0 8px';
    dropdownTrigger.innerHTML = `
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 2.5L8.66987 7.5H1.33013L5 2.5Z" fill="white"/>
        </svg>
    `;
    dropdownTrigger.style.color = 'white';
    dropdownTrigger.style.fontSize = '10px';
    dropdownTrigger.style.transform = 'rotate(180deg)';
    buttonContainer.appendChild(dropdownTrigger);


    const dropdownContent = document.createElement('div');
    dropdownContent.style.display = 'none';
    dropdownContent.style.position = 'absolute';
    dropdownContent.style.top = '100%';
    dropdownContent.style.left = '0';
    dropdownContent.style.backgroundColor = 'white';
    dropdownContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    dropdownContent.style.borderRadius = '4px';
    dropdownContent.style.marginTop = '4px';
    dropdownContent.style.zIndex = '999';
    dropdownContent.style.width = '150px';

    const tones = ['Professional', 'Friendly', 'Informal', 'Formal'];
    let selectedTone = tones[0];

    tones.forEach(tone => {
        const option = document.createElement('div');
        option.style.padding = '8px 16px';
        option.style.cursor = 'pointer';
        option.style.color = '#202124';
        option.textContent = tone;
        option.addEventListener('mouseover', () => {
            option.style.backgroundColor = '#f1f3f4';
        });
        option.addEventListener('mouseout', () => {
            option.style.backgroundColor = 'white';
        });
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedTone = tone;
            dropdownContent.style.display = 'none';
            dropdownTrigger.style.transform = 'rotate(180deg)';
        });
        dropdownContent.appendChild(option);
    });

    buttonContainer.appendChild(dropdownContent);


    dropdownTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdownContent.style.display !== 'none';
        dropdownContent.style.display = isOpen ? 'none' : 'block';
        dropdownTrigger.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    });

    document.addEventListener('click', () => {
        dropdownContent.style.display = 'none';
        dropdownTrigger.style.transform = 'rotate(180deg)';
    });


    mainButton.addEventListener('click', async () => {
        try {
            console.log("Button clicked with tone:", selectedTone);
            buttonContainer.innerHTML = '⌛';
            buttonContainer.style.pointerEvents = 'none';
            buttonContainer.style.opacity = '0.5';

            const emailContent = getEmailContent();
            // change the URL to the deployed server 'http://localhost:8080' same for manifest.json
            const response = await fetch(`http://localhost:8080/api/v1/mail/stream/generate-reply?mailContent=${encodeURIComponent(emailContent)}&tone=${encodeURIComponent(selectedTone.toUpperCase())}`, {
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
            buttonContainer.innerHTML = '';
            buttonContainer.appendChild(mainButton);
            buttonContainer.appendChild(dropdownTrigger);
            buttonContainer.appendChild(dropdownContent);
            buttonContainer.style.pointerEvents = 'auto';
            buttonContainer.style.opacity = '1';
        }
    });

    return buttonContainer;
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
        return;
    }

    const aiButton = createAiButtonWithDropdown();
    aiButton.classList.add('ai-reply-btn');
    composeBar.insertBefore(aiButton, composeBar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const hasComposeEls = node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]');
                if (hasComposeEls) {
                    console.log("Compose dialog detected");
                    setTimeout(injectButton, 500);
                }
            }
        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});