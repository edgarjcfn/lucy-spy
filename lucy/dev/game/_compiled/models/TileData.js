define(["require", "exports"], function (require, exports) {
    var TileData = (function () {
        function TileData(name, frames, collidable) {
            this.name = name;
            this.frames = frames;
            this.collidable = collidable;
        }
        return TileData;
    })();
    return TileData;
});
//# sourceMappingURL=TileData.js.map