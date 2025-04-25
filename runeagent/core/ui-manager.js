class RuneAgentUIManager {
    constructor() {
        this.tabs = new Map(); // key: tab id, value: { button, content }
        this.activeTab = null;
    }

     init(wrapperId = 'runeagent-wrapper') {
        this.wrapper = document.getElementById(wrapperId);
        if (!this.wrapper) {
            console.error('RuneAgentUIManager: Wrapper not found!');
            return;
        }
        this.tabButtons = this.wrapper.querySelector('.runeagent-tabs');
        this.tabContentPanel = this.wrapper.querySelector('.runeagent-tabbed-panel');

        // Setup already existing tabs
        this._registerExistingTabs();
    }

     _registerExistingTabs() {
        const buttons = this.wrapper.querySelectorAll('.runeagent-tab-button');
        const contents = this.wrapper.querySelectorAll('.runeagent-tab-content');

        buttons.forEach(button => {
            const tabId = button.getAttribute('data-tab');
            const content = [...contents].find(c => c.id === tabId);
            if (tabId && content) {
                this.tabs.set(tabId, { button, content });
                button.addEventListener('click', () => this.switchToTab(tabId));
            }
        });

        // Set default active
        if (buttons.length > 0) {
            this.activeTab = buttons[0].getAttribute('data-tab');
        }
    }

     addTab(tabName, tabId, htmlContent = '') {
        if (this.tabs.has(tabId)) {
            console.warn(`RuneAgentUIManager: Tab "${tabId}" already exists.`);
            return;
        }

        // Create tab button
        const button = document.createElement('button');
        button.className = 'runeagent-tab-button';
        button.textContent = tabName;
        button.setAttribute('data-tab', tabId);
        this.tabButtons.appendChild(button);

        // Create tab content
        const content = document.createElement('div');
        content.className = 'runeagent-tab-content';
        content.id = tabId;
        content.innerHTML = htmlContent;
        content.style.display = 'none';
        this.tabContentPanel.appendChild(content);

        // Save and wire up event
        this.tabs.set(tabId, { button, content });
        button.addEventListener('click', () => this.switchToTab(tabId));
    }

     switchToTab(tabId) {
        if (!this.tabs.has(tabId)) {
            console.warn(`RuneAgentUIManager: Tab "${tabId}" not found.`);
            return;
        }

        this.tabs.forEach(({ button, content }, id) => {
            const active = id === tabId;
            button.classList.toggle('active', active);
            content.style.display = active ? 'block' : 'none';
        });

        this.activeTab = tabId;
    }

     logToTab(tabId, message) {
        if (!this.tabs.has(tabId)) {
            console.warn(`RuneAgentUIManager: Tab "${tabId}" not found.`);
            return;
        }

        const { content } = this.tabs.get(tabId);
        const logEntry = document.createElement('div');
        logEntry.textContent = message;
        logEntry.style.padding = '2px 0';
        content.appendChild(logEntry);

        // Optional: Auto-scroll to bottom
        content.scrollTop = content.scrollHeight;
    }
}
