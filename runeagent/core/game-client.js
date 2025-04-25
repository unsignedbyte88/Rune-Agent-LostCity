class GameClient {
    constructor() {
        this.subscribers = new Set(); // key: property name, value: Set of callbacks
    }
}