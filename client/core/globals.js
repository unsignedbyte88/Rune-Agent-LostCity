globalThis.client = {
    PUBLIC_CHAT_SETTING: 0,
    PRIVATE_CHAT_SETTING: 0,
    TRADE_CHAT_SETTING: 0
};

globalThis.PlayerUpdate = {
    APPEARANCE: 0x1, ANIM: 0x2, FACE_ENTITY: 0x4, SAY: 0x8, DAMAGE: 0x10,
    FACE_COORD: 0x20, CHAT: 0x40, BIG_UPDATE: 0x80, SPOTANIM: 0x100, EXACT_MOVE: 0x200
};

globalThis.NpcUpdate = {
    ANIM: 0x2, FACE_ENTITY: 0x4, SAY: 0x8, DAMAGE: 0x10,
    CHANGE_TYPE: 0x20, SPOTANIM: 0x40, FACE_COORD: 0x80
};

globalThis.localPlayer = { pid: -1 };
globalThis.mobs = new Array(8191);
globalThis.npcIds = new Array(8191);
globalThis.npcCount = 0;
globalThis.priorityScripts = [];