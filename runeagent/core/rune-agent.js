class RuneAgent {
    constructor() {
        this.networkManager = null;
        this.gameClient = null;
        this.uiManager = null;
    }

    initializeRuneAgent() {
        this.gameClient = new GameClient();
        this.networkManager = new NetworkManager();
        this.uiManager = new RuneAgentUIManager();
      //  this.uiManager.init();
        console.log("RuneAgent initialized");
    }

    getNetworkManager() {
        return this.networkManager;
    }
}



