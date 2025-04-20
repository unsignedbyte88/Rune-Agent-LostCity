function initializeRuneAgent() {
    loadCSS('styles.css');
    loadHTML('log-panel.html', 'body').then(() => {
        initPanels();
        initBotPanel();
    });
}
