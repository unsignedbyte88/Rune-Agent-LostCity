function setInputPacket(id, bytesize) {

    if (packet.opcode !== null) processCompletePacket();
    packet.opcode = id;
    packet.name = opcodeNameMap[id] || `UnknownOpcode_${id}`;
    packet.bytesize = bytesize;
    packet.payload = [];
    packet.methodCalls = [];
    packet.payloadOffset = 0;
    logToPanel("inputStreamLog", `Packet: ${packet.name} (${id}), bytesize: ${packet.bytesize} methodCalls: ${packet.methodCalls}`);
}