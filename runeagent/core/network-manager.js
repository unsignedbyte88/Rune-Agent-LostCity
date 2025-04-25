class NetworkManager {

    constructor() {
        this.currentInboundPacket = null;
            this.currentOutboundPacket = null;
            this.packetSubscribers = new Set();

        subscribeToStream(this.handleStreamCallback);
    }


    setInputPacket(id, byteSize) {
        if (this.currentInboundPacket !== null) {
            this.notifyPacketSubscribers(RuneAgentEvent.INCOMING_PACKET,this.currentInboundPacket);
        }
        this.currentInboundPacket = packet.clonePacket(packet);
        const name = IncomingOpcodeNames[id] || `UnknownOpcode_${id}`;
        this.currentInboundPacket.opcode = id;
        this.currentInboundPacket.name = name;
        this.currentInboundPacket.byteSize = byteSize;




    }

    handleStreamCallback(event, ...args){
        console.log(event, ...args);
    }

    subscribeToPackets(callback) {
        this.packetSubscribers.add(callback);
        // Immediately notify with current packet if present
        if (this.currentInboundPacket) callback(this.currentInboundPacket);
    }

    unsubscribeFromPackets(callback) {
        this.packetSubscribers.delete(callback);
    }

    notifyPacketSubscribers(event,packet) {
        for (const callback of this.packetSubscribers) {
            try {
                callback(event,packet);
            } catch (err) {
                console.warn("Error in packet subscriber callback:", err);
            }
        }
    }
}