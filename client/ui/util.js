function loadScript(url) {
    return new Promise(resolve => {
        const s = document.createElement("script");
        s.src = url;
        s.onload = resolve;
        document.head.appendChild(s);
    });
}
