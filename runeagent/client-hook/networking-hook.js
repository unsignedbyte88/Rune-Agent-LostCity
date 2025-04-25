let outputStream = null;
let inputStream = null;
let outputStreamSet = false;
let inputStreamSet = false;

const streamSubscribers = new Set();

function subscribeToStream(callback) {
    streamSubscribers.add(callback);
}

function unsubscribeFromStream(callback) {
    streamSubscribers.delete(callback);
}

function notifySubscribers(eventType, ...args) {
    for (const callback of streamSubscribers) {
        try {
            callback(eventType, ...args);
        } catch (e) {
            console.warn(`Error notifying subscriber for ${eventType}:`, e);
        }
    }
}

function injectCallback(obj, method, cb) {
    const orig = obj[method];
    if (typeof orig !== "function") return console.warn(`${method} not a function`);
    obj[method] = function (...args) {
        cb(method, ...args);
        return orig.apply(this, args);
    };
}

function outstreamCallback(method, arg) {
    const name = OutMethodMap.getReadable(method) || method;
    notifySubscribers(RuneAgentEvent.OUTGOING_PACKET_METHOD_CALLED,name,method,arg);
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
        const readableName = InMethodMap.getReadable(method) || method;
        notifySubscribers(RuneAgentEvent.INCOMING_PACKET_METHOD_CALLED,readableName,method,arg);
}

function setOutputStream(stream) {
    if (outputStreamSet) return;
    outputStream = stream;

    Object.entries(OutMethodMap.obfToReadable).forEach(([obf, readable]) => {
        injectCallback(stream, obf, outstreamCallback);

        if (obf !== readable && !(readable in stream)) {
            stream[readable] = (...args) => stream[obf](...args);
            injectCallback(stream, readable, outstreamCallback);
        }
    });

    outputStreamSet = true;
    notifySubscribers(RuneAgentEvent.OUTBOUND_STREAM_SET, outputStream);
}

function setInputStream(stream) {
    if (inputStreamSet) return;
    inputStream = stream;

    Object.keys(InMethodMap.obfToReadable).forEach(obf => {
        injectInstreamCallback(stream, obf, instreamCallback);
    });

    inputStreamSet = true;
    notifySubscribers(RuneAgentEvent.INBOUND_STREAM_SET, inputStream);
}