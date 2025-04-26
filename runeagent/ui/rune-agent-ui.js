(async function RuneAgentUIBootstrap() {
    console.log("[RuneAgent] Injecting UI...");

    // === SAFETY CHECK ===
    if (!window.RuneAgentDomHelper) {
        console.error("[RuneAgent] DomHelper not found.");
        return;
    }

    // === INJECT CSS ===
    RuneAgentDomHelper.injectStyleFromUrl('runeagent/ui/css/rune-agent.css');

    // === CREATE LAYOUT WRAPPER ===
    const layout = document.createElement('div');
    layout.id = 'runeagent-layout';

    // === WRAP EXISTING PAGE CONTENT INTO LEFT PANEL ===
    const leftPanel = RuneAgentDomHelper.wrapBodyContent('runeagent-left-panel');

    // === CREATE DRAGGABLE RESIZER ===
    const resizer = document.createElement('div');
    resizer.id = 'runeagent-resizer';

    // === LOAD RIGHT PANEL HTML ===
    const rightPanelWrapper = document.createElement('div');
    const htmlWrapper = await RuneAgentDomHelper.injectHtmlFromUrl('runeagent/ui/html/main-ui.html');
    Array.from(htmlWrapper.childNodes).forEach(child => rightPanelWrapper.appendChild(child));

    // === BUILD THE FINAL SPLIT LAYOUT ===
    layout.appendChild(leftPanel);
    layout.appendChild(resizer);
    layout.appendChild(rightPanelWrapper);

    // === ATTACH TO DOCUMENT ===
    document.body.appendChild(layout);

    // === TAB SWITCHING LOGIC ===
    const buttons = rightPanelWrapper.querySelectorAll('.runeagent-tab-button');
    const contents = rightPanelWrapper.querySelectorAll('.runeagent-tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            button.classList.add('active');
            const target = button.getAttribute('data-tab');
            const activePanel = rightPanelWrapper.querySelector(`#${target}`);
            if (activePanel) activePanel.classList.add('active');
        });
    });

    // === DRAG-TO-RESIZE LOGIC ===
    const rightPanel = rightPanelWrapper.querySelector('#runeagent-right-panel');
    let isDragging = false;

    resizer.addEventListener('mousedown', (e) => {
        isDragging = true;
        document.body.style.cursor = 'ew-resize';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const newRightWidth = window.innerWidth - e.clientX;
        const clamped = Math.min(800, Math.max(200, newRightWidth));
        rightPanel.style.width = `${clamped}px`;
        leftPanel.style.flex = 'none';
        leftPanel.style.width = `calc(100vw - ${clamped + 5}px)`;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = '';
        }
    });

    console.log("[RuneAgent] UI injected successfully.");
})();