function injectCallback(obj, method, cb) {
    const orig = obj[method];
    if (typeof orig !== "function") return;
    obj[method] = function (...args) {
        cb(method, ...args);
        return orig.apply(this, args);
    };
}
