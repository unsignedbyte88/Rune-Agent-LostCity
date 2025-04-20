function initPanels() {
    document.getElementById('network-tab-btn').onclick = () => {
        document.getElementById('network-panel').style.display = 'block';
        document.getElementById('bot-panel').style.display = 'none';
    };
    document.getElementById('bot-tab-btn').onclick = () => {
        document.getElementById('network-panel').style.display = 'none';
        document.getElementById('bot-panel').style.display = 'block';
    };
    document.getElementById('toggle-logging-btn').onclick = (e) => {
        loggingActive = !loggingActive;
        e.target.textContent = loggingActive ? "Stop Logging" : "Start Logging";
        logToPanel("script-log-panel", `Logging ${loggingActive ? "enabled" : "disabled"}`);
    };
    document.getElementById('mob-tab-btn').onclick = () => {
        document.getElementById('network-panel').style.display = 'none';
        document.getElementById('bot-panel').style.display = 'none';
        document.getElementById('mob-panel').style.display = 'flex';
    };
}