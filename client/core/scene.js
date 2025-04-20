globalThis.scene = {
    sceneCenterX: -1,
    sceneCenterZ: -1,
    sceneBaseTileX: -1,
    sceneBaseTileZ: -1,
    mapItems: new Array(4),
    setScene: function(x, z) {
        this.sceneCenterX = x;
        this.sceneCenterZ = z;
        this.sceneBaseTileX = (x - 6) * 8;
        this.sceneBaseTileZ = (z - 6) * 8;
    }
};