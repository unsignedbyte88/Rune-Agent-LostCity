const packet = {
    opcode: null,
    name: null,
    byteSize: 0,
    payload: [],
    methodCallsOriginal: [],
    methodCallsRefactored: [],
    payloadOffset: 0,

    // Reads next payload item and advances offset
    read() {
        return this.payload[this.payloadOffset++];
    },

    // Payload length
    length() {
        return this.payload.length;
    },

    // Push value into payload while tracking methods (optional)
    push(value, originalMethod = null, refactoredMethod = null) {
        this.payload.push(value);
        if (originalMethod) this.methodCallsOriginal.push(originalMethod);
        if (refactoredMethod) this.methodCallsRefactored.push(refactoredMethod);
    }
};