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

function getEmailContent() {

}

function callBackEnd(btn) {
    try{
        btn.innerHTML = 'Generating...⌛';
        btn.disabled = true;
        const emailContent = getEmailContent();
    } catch {
        console.log("Error in callback")
    }
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
        callBackEnd(aiButton);
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