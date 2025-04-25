class RuneAgent {
    constructor() {
        this.networkManager = null;
        this.gameClient = null;
    }

    initializeRuneAgent() {
        this.gameClient = new GameClient();
        this.networkManager = new NetworkManager();
        console.log("RuneAgent initialized");
    }

    getNetworkManager() {
        return this.networkManager;
    }
}



