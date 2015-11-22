define(["require", "exports", "models/TileCoordinate"], function (require, exports, TileCoordinate) {
    var Character = (function () {
        function Character(x, y, direction) {
            this.position = new TileCoordinate(x, y);
            this.direction = direction;
        }
        Character.prototype.moveBy = function (x, y) {
            this.position.x += x;
            this.position.y += y;
        };
        Character.prototype.moveTo = function (coord) {
            this.position = coord;
        };
        return Character;
    })();
    return Character;
});
//# sourceMappingURL=Character.js.map