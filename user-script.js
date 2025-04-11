({
    init() {
        this.lastActionTime = Date.now();
    },

    run(packet) {
         const now = Date.now();

        // 1-second cooldown
        if ((now - this.lastActionTime) < 2000) {
            return;
        }
console.log(packet.name);
        if (packet.name === "MESSAGE_GAME") {
            const msg = packet.payload[0];
console.log(msg);
            if (typeof msg === "string" && msg.includes("stunned!")) {
                // 6-second stun delay
                this.lastActionTime = now + 6000;
                console.log("Stunned! Waiting 6 seconds.");
                return;
            }
        }

        console.log("Performing action");
        outputStream.opcode(27);
        outputStream.p2(5128);
        this.lastActionTime = now;
    }
})