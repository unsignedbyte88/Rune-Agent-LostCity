class NetworkManager {

    constructor() {
        this.currentInboundPacket = null;
            this.currentOutboundPacket = null;
            this.packetSubscribers = new Set();

        subscribeToStream(this.handleStreamCallback.bind(this));
    }


    setInputPacket(id, byteSize) {
        if (this.currentInboundPacket !== null) {
            logPacket('runeagent-incoming-log', this.currentInboundPacket);
            this.notifyPacketSubscribers(RuneAgentEvent.INCOMING_PACKET,this.currentInboundPacket);
        }
        this.currentInboundPacket = packet.clonePacket(packet);
        const name = IncomingOpcodeNames[id] || `UnknownOpcode_${id}`;
        this.currentInboundPacket.opcode = id;
        this.currentInboundPacket.name = name;
        this.currentInboundPacket.byteSize = byteSize;




    }

    handleStreamCallback(event, ...args){

        switch(event){
            case RuneAgentEvent.INBOUND_STREAM_HOOKED:
            case RuneAgentEvent.OUTBOUND_STREAM_HOOKED:
                runeAgent.getUIManager().logToTab("runeagent-agent-log", event);
                break;
            case RuneAgentEvent.INCOMING_PACKET_METHOD_CALLED:
                const [refactored, original, payloadData] = args;
                this.currentInboundPacket.payload.push(payloadData);
                this.currentInboundPacket.methodCallsRefactored.push(refactored);
                this.currentInboundPacket.methodCallsOriginal.push(original);
                break;
        }
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

function logPacket(logId, packet) {
    const logContainer = document.getElementById(logId);
    const entry = document.createElement('div');
    entry.className = 'runeagent-log-entry';

    const timestamp = document.createElement('span');
    timestamp.className = 'runeagent-log-timestamp';
    timestamp.textContent = `[${new Date().toLocaleTimeString()}] `;

    const packetInfo = document.createElement('span');
    packetInfo.className = 'runeagent-log-packet';

    const originalCalls = packet.methodCallsOriginal.length > 0 ? packet.methodCallsOriginal.join(', ') : 'None';
    const refactoredCalls = packet.methodCallsRefactored.length > 0 ? packet.methodCallsRefactored.join(', ') : 'None';

    const fullPayload = JSON.stringify(packet.payload);
    const shortPayload = `[${packet.payload.slice(0, 30).join(', ')}${packet.payload.length > 30 ? ', ...' : ''}]`;

    const isLargePayload = packet.payload.length > 30;

    packetInfo.innerHTML = `
        <strong>${packet.name || 'UnknownOpcode_' + packet.opcode}</strong><br>
        Opcode: <code>${packet.opcode}</code> | Size: <code>${packet.byteSize} bytes</code><br>
        <em>Original Calls:</em> ${originalCalls}<br>
        <em>Refactored Calls:</em> ${refactoredCalls}<br>
        <em>Payload:</em> 
        <span class="payload-content">${isLargePayload ? shortPayload : fullPayload}</span>
        ${isLargePayload ? `
          <a href="#" class="toggle-payload">(show full payload)</a>
          <a href="#" class="copy-payload" style="display:none;">✂️</a>
        ` : ''}
    `;

    entry.appendChild(timestamp);
    entry.appendChild(packetInfo);
    logContainer.appendChild(entry);

    logContainer.scrollTop = logContainer.scrollHeight;

    // Handle expanding/collapsing and copying
    if (isLargePayload) {
        const toggleLink = entry.querySelector('.toggle-payload');
        const copyLink = entry.querySelector('.copy-payload');
        const payloadContent = entry.querySelector('.payload-content');
        let expanded = false;

        toggleLink.addEventListener('click', (e) => {
            e.preventDefault();
            expanded = !expanded;
            payloadContent.textContent = expanded ? fullPayload : shortPayload;
            toggleLink.textContent = expanded ? '(hide payload)' : '(show full payload)';
            copyLink.style.display = expanded ? 'inline' : 'none';
        });

        copyLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(fullPayload)
                .then(() => {
                    copyLink.textContent = '✔️'; // Quick visual feedback
                    setTimeout(() => copyLink.textContent = '✂️', 1000); // Reset after 1s
                })
                .catch(() => {
                    copyLink.textContent = '❌';
                    setTimeout(() => copyLink.textContent = '✂️', 1000);
                });
        });
    }
}