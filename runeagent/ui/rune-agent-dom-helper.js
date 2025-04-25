class RuneAgentDomHelper {


    static injectStyleFromUrl(url) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }

    static injectHtmlFromUrl(url, targetSelector) {
        return fetch(url)
            .then(response => response.text())
            .then(html => {
                const container = document.querySelector(targetSelector) || document.body;
                const wrapper = document.createElement('div');
                wrapper.innerHTML = html;
                container.appendChild(wrapper);
                return wrapper;
            });
    }

    static moveCanvas(targetSelector) {
        const canvas = document.querySelector('canvas');
        const target = document.querySelector(targetSelector);
        if (canvas && target) {
            target.appendChild(canvas);
        } else {
            console.warn("RuneAgentDomHelper: Unable to find canvas or target container.");
        }
    }
}