define(["require", "exports", "models/Direction"], function (require, exports, Direction) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.getDirectionAngle = function (direction) {
            switch (direction) {
                case Direction.N:
                    return 0;
                case Direction.E:
                    return Math.PI / 2;
                case Direction.S:
                    return Math.PI;
                case Direction.W:
                    return 3 * (Math.PI / 2);
            }
        };
        Utils.getWorldPosition = function (x, y) {
            return new Phaser.Point(x * 50, y * 50);
        };
        return Utils;
    })();
    return Utils;
});
//# sourceMappingURL=Utils.js.map