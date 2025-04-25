
(async function() {
    while (!window.RuneAgentDomHelper) {
        await new Promise(resolve => setTimeout(resolve, 50)); // wait until it loads
    }
    if (!window.RuneAgentDomHelper) {
        console.error('RuneAgentDomHelper not found. Make sure it is loaded first.');
        return;
    }

    // 1. Inject the CSS
    RuneAgentDomHelper.injectStyleFromUrl('runeagent/ui/css/rune-agent.css');

    // 2. Inject the HTML
    const wrapper = await RuneAgentDomHelper.injectHtmlFromUrl('runeagent/ui/html/main-ui.html', 'body');

    // 3. Move the canvas into the Game Client tab
    RuneAgentDomHelper.moveCanvas('#runeagent-game');

    // 4. Setup tab switching
    const buttons = wrapper.querySelectorAll('.runeagent-tab-button');
    const contents = wrapper.querySelectorAll('.runeagent-tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');

            const tab = button.getAttribute('data-tab');
            contents.forEach(content => {
                content.style.display = (content.id === tab) ? 'block' : 'none';
            });
        });
    });
    console.log("RuneAgent UI added");
})();