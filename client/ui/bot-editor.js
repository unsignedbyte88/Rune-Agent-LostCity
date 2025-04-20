let userScriptActive = false;
let userScriptFunc = null;
let userScriptInitialized = false;

function resetUserScript() {
    userScriptActive = false;
    userScriptFunc = null;
    userScriptInitialized = false;
}

function initBotPanel() {
    const editor = document.getElementById('script-editor');

    document.getElementById('load-script-btn').onclick = () => {
        document.getElementById('script-file-input').click();
    };

    document.getElementById('script-file-input').onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                editor.value = reader.result;
                logToScriptPanel(`Loaded script: ${file.name}`);
            };
            reader.readAsText(file);
        }
    };

    document.getElementById('start-script-btn').onclick = () => {
        try {
            const scriptCode = editor.value;
            resetUserScript();
            const scriptObj = eval(`(${scriptCode})`);

            if (typeof scriptObj.run !== 'function') {
                throw new Error("Script must have a 'run(packet)' method.");
            }

            userScriptFunc = scriptObj;
            userScriptActive = true;

            if (typeof userScriptFunc.init === 'function') {
                userScriptFunc.init();
                userScriptInitialized = true;
            }

            logToScriptPanel("User script started.");
        } catch (e) {
            logToScriptPanel(`Error in user script: ${e.message}`);
        }
    };

    document.getElementById('stop-script-btn').onclick = () => {
        resetUserScript();
        logToScriptPanel("User script stopped.");
    };

    document.getElementById('save-script-btn').onclick = () => {
        const blob = new Blob([editor.value], { type: "text/javascript" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "user-script.js";
        link.click();
    };
}