define(["require", "exports", "models/TileData"], function (require, exports, TileData) {
    var Tiles = (function () {
        function Tiles() {
            var tiles = {};
            tiles['box'] = new TileData('box', 1, true);
            tiles['boxLeft'] = new TileData('boxLeft', 40, true);
            tiles['boxRight'] = new TileData('boxRight', 40, true);
            tiles['diamond'] = new TileData('diamond', 30, true);
            tiles['door'] = new TileData('door', 1, true);
            tiles['laserH'] = new TileData('laserBeamHorizontal', 14, true);
            tiles['laserV'] = new TileData('laserBeamVertical', 14, true);
            tiles['key'] = new TileData('python', 30, true);
            tiles['cannon'] = new TileData('cannon', 1, true);
            tiles['buttonOn'] = new TileData('buttonUp', 1, true);
            tiles['buttonOff'] = new TileData('buttonDown', 1, true);
            tiles['doorTop'] = new TileData('doorTop', 1, true);
            this.items = tiles;
        }
        return Tiles;
    })();
    return Tiles;
});
//# sourceMappingURL=Tiles.js.map