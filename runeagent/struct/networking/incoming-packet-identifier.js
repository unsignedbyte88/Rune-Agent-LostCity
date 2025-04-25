const IncomingOpcodes = Object.freeze({
    REBUILD_NORMAL: 237,
    CHAT_FILTER_SETTINGS: 32,
    SET_PID: 139,
    PLAYER_INFO: 184,
    MOB_INFO: 1,
    RESET_CLIENT_VARCACHE: 193,
    VARP_SMALL: 150,
    UPDATE_ZONE_FULL_FOLLOWS: 135,
    INTERFACE_CLOSE: 129,
    CAMERA_RESET: 239,
    INTERFACE_OPEN_SIDE_OVERLAY: 167,
    HINT_ARROW: 25,
    INTERFACE_SET_TEXT: 201,
    MESSAGE_GAME: 4,
    LOC_MERGE: 23,
    LOC_ANIM: 42,
    OBJ_DEL: 49,
    OBJ_REVEAL: 50,
    LOC_ADD_CHANGE: 59,
    MAP_PROJANIM: 69,
    LOC_DEL: 76,
    OBJ_COUNT: 151,
    MAP_ANIM: 191,
    OBJ_ADD: 223
});

const IncomingOpcodeNames = Object.freeze(
    Object.fromEntries(Object.entries(IncomingOpcodes).map(([k, v]) => [v, k]))
);