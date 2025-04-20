priorityScripts.push(
    {
        name: "MOB_INFO",
        run: function(p) {
            // Simplified note: full mob_info logic was inlined in the original script
            // It should be moved here as-is, and uses mobs, npcIds, npcCount, and NpcUpdate
            console.log("MOB_INFO handler triggered");
            return true;
        }
    },
    {
        name: "CHAT_FILTER_SETTINGS",
        run: function(p) {
            if (p.name === "CHAT_FILTER_SETTINGS") {
                client.PUBLIC_CHAT_SETTING = p.payload[0];
                client.PRIVATE_CHAT_SETTING = p.payload[1];
                client.TRADE_CHAT_SETTING = p.payload[2];
                logToScriptPanel(`client: ${JSON.stringify(client)}`);
            }
            return true;
        }
    },
    {
        name: "PID",
        run: function(p) {
            if (p.name !== "SET_PID") return true;
            localPlayer.pid = p.payload[0];
            return true;
        }
    },
    {
        name: "Set Scene",
        run: function(p) {
            if (p.name !== "REBUILD_NORMAL") return true;
            scene.setScene(p.payload[0], p.payload[1]);
            console.log(scene);
            return true;
        }
    },
    {
        name: "Zone Packet",
        run: function(p) {
            // Stub: replace with your full LOC/OBJ/MAP opcode logic as needed
            return true;
        },
        readZonePacket: function(p, opcode) {
            // Stub for zone packet reader
        }
    },
    {
        name: "DRUNKEN DWARF",
        init: function() {
            console.log("Drunken Dwarf Solver Loaded");
        },
        run: function(p) {
            return true;
        }
    }
);