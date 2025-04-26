class RuneAgentDomHelper {
    static injectStyleFromUrl(url) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }

    static injectHtmlFromUrl(url, containerSelector = 'body') {
        return fetch(url)
            .then(res => res.text())
            .then(html => {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = html;

                const container = containerSelector
                    ? document.querySelector(containerSelector)
                    : document.body;

                if (!container) {
                    console.warn(`[RuneAgentDomHelper] Failed to find container: ${containerSelector}`);
                    return wrapper;
                }

                container.appendChild(wrapper);
                return wrapper;
            });
    }

    static wrapBodyContent(wrapperId = 'runeagent-left-panel') {
        const wrapper = document.createElement('div');
        wrapper.id = wrapperId;

        // Move all current body content into wrapper
        while (document.body.firstChild) {
            wrapper.appendChild(document.body.firstChild);
        }

        return wrapper;
    }
}

window.RuneAgentDomHelper = RuneAgentDomHelper;