const GameClient = {
    // === INTERNAL STATE STORAGE ===
    _state: {
        chatSettings: { public: 0, private: 0, trade: 0 },
    },

    // === LISTENERS MAP ===
    _listeners: new Map(), // key: property name, value: Set of callbacks

    // === SUBSCRIBE TO CHANGES ===
    onChange(prop, callback) {
        if (!this._listeners.has(prop)) {
            this._listeners.set(prop, new Set());
        }
        this._listeners.get(prop).add(callback);
    },
    // === REMOVE LISTENERS ===
    offChange(prop, callback) {
        const listeners = this._listeners.get(prop);
        if (listeners) {
            listeners.delete(callback);
            if (listeners.size === 0) {
                this._listeners.delete(prop); // Optional cleanup
            }
        }
    },
    // === TRIGGER LISTENERS ===
    _notify(prop, value) {
        if (this._listeners.has(prop)) {
            for (const callback of this._listeners.get(prop)) {
                callback(value);
            }
        }
    },

    // === GETTERS ===
    get chatSettings() { return this._state.chatSettings; },

    // === SETTERS WITH HOOKS ===

    setChatSettings(publicC, privateC, tradeC) {
        this._state.chatSettings = { public: publicC, private: privateC, trade: tradeC };
        this._notify("chatSettings", this._state.chatSettings);
    },

    // === PACKET DISPATCH ===
    updateFromPacket(packet) {
   /*     switch (packet.opcode) {
            case 238:
                this.setChatSettings(packet.payload[0], packet.payload[1], packet.payload[2]);
                break;

        }

    */
    }
};