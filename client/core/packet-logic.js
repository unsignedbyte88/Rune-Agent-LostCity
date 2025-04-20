let packet = { opcode: null, name: null, size: 0, payload: [], methodCalls: [], payloadOffset: 0 };

const opcodeNameMap = {
    237: "REBUILD_NORMAL", 32: "CHAT_FILTER_SETTINGS", 139: "SET_PID", 184: "PLAYER_INFO",
    1: "MOB_INFO", 193: "RESET_CLIENT_VARCACHE", 150: "VARP_SMALL", 135: "UPDATE_ZONE_FULL_FOLLOWS",
    129: "INTERFACE_CLOSE", 239: "CAMERA_RESET", 167: "INTERFACE_OPEN_SIDE_OVERLAY",
    25: "HINT_ARROW", 201: "INTERFACE_SET_TEXT", 4: "MESSAGE_GAME", 23: "LOC_MERGE", 42: "LOC_ANIM",
    49: "OBJ_DEL", 50: "OBJ_REVEAL", 59: "LOC_ADD_CHANGE", 69: "MAP_PROJANIM", 76: "LOC_DEL",
    151: "OBJ_COUNT", 191: "MAP_ANIM", 223: "OBJ_ADD"
};

function setInputPacket(id, bytesize) {
    if (packet.opcode !== null) processCompletePacket();
    packet.opcode = id;
    packet.name = opcodeNameMap[id] || `UnknownOpcode_${id}`;
    packet.bytesize = bytesize;
    packet.payload = [];
    packet.methodCalls = [];
    packet.payloadOffset = 0;
    logToPanel("inputStreamLog", `Packet: ${packet.name} (${id}), bytesize: ${packet.bytesize}`);
}

function processCompletePacket() {
    logToPanel("inputStreamLog", `Packet complete: ${JSON.stringify(packet)}`);
    handlePacket(packet);
}

function handlePacket(p) {
    for (const script of priorityScripts) {
        try {
            if (!script.run(p)) {
                logToScriptPanel(`Stopped by: ${script.name}`);
                return;
            }
        } catch (e) {
            logToScriptPanel(`Script error in '${script.name}': ${e.message}`);
        }
    }

    if (typeof userScriptFunc !== 'undefined' && userScriptFunc) {
        try {
            if (typeof userScriptFunc === "object") {
                if (!userScriptInitialized && typeof userScriptFunc.init === "function") {
                    userScriptFunc.init();
                    userScriptInitialized = true;
                }
                if (typeof userScriptFunc.run === "function") {
                    userScriptFunc.run(p);
                }
            } else {
                userScriptFunc(p);
            }
        } catch (e) {
            logToScriptPanel(`User script error: ${e.message}`);
        }
    }
}