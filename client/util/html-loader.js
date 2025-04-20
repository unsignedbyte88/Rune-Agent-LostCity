async function loadHTML(url, targetSelector) {
    const response = await fetch(url);
    const html = await response.text();
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const scripts = tempDiv.querySelectorAll('script');
    scripts.forEach(script => script.remove());

    while (tempDiv.firstChild) target.appendChild(tempDiv.firstChild);

    for (const script of scripts) {
        const newScript = document.createElement('script');
        if (script.src) {
            newScript.src = script.src;
            newScript.async = false;
        } else {
            newScript.textContent = `(function(){
${script.textContent}
})();`;
        }
        try {
            document.head.appendChild(newScript);
        } catch (e) {
            console.warn("Script injection error:", e);
        }
    }
}

function loadCSS(url) {
    return new Promise(resolve => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = resolve;
        document.head.appendChild(link);
    });
}