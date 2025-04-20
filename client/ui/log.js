function logToPanel(panelId, message) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    const entry = document.createElement("div");
    entry.textContent = message;
    panel.appendChild(entry);
    panel.scrollTop = panel.scrollHeight;
}
