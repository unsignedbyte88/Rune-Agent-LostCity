let outputStream = null;
let inputStream = null;
let outputStreamSet = false;
let inputStreamSet = false;

const outMethodNameMappings = {
    $: "opcode", S: "p1", Z: "p2", dd: "p3", d8: "p4"
};
const inMethodNameMappings = {
    dC: "g1", dg: "g1b", dF: "g2", dT: "g2b", dm: "g4", dQ: "gjstr", dX: "g8", V: "gbit"
};

function injectCallback(obj, method, cb) {
    const orig = obj[method];
    if (typeof orig !== "function") return console.warn(`${method} not a function`);
    obj[method] = function (...args) {
        cb(method, ...args);
        return orig.apply(this, args);
    };
}

function outstreamCallback(method, arg) {
    const name = outMethodNameMappings[method] || method;
    logToPanel("outputStreamLog", `Output => ${name}: ${arg}`);
}

function injectInstreamCallback(obj, method, cb) {
    const orig = obj[method];
    if (typeof orig !== "function") return console.warn(`${method} not a function`);
    obj[method] = function (...args) {
        const val = orig.apply(this, args);
        cb(method, val);
        return val;
    };
}

function instreamCallback(method, arg) {
    if (packet !== null && packet.opcode !== null) {
        const readableName = inMethodNameMappings[method] || method;
        packet.methodCalls[packet.payloadOffset] = readableName;
        packet.payload[packet.payloadOffset++] = arg;
    }
}

function setOutputStream(stream) {
    if (outputStreamSet) return;
    outputStream = stream;
    globalThis.outputStream = outputStream;
    Object.entries(outMethodNameMappings).forEach(([obf, deobf]) => {
        injectCallback(stream, obf, outstreamCallback);
        if (obf !== deobf && !(deobf in stream)) {
            stream[deobf] = (...args) => stream[obf](...args);
            injectCallback(stream, deobf, outstreamCallback);
        }
    });
    outputStreamSet = true;
    logToPanel("outputStreamLog", "outputStream initialized");
}

function setInputStream(stream) {
    if (inputStreamSet) return;
    inputStream = stream;
    globalThis.inputStream = inputStream;
    Object.keys(inMethodNameMappings).forEach(fn =>
        injectInstreamCallback(stream, fn, instreamCallback)
    );
    inputStreamSet = true;
    logToPanel("inputStreamLog", "inputStream initialized");
}