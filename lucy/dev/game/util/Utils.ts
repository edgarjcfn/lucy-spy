import Direction = require("models/Direction");

class Utils {
    static getDirectionAngle(direction: Direction): number {
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
    }

    static getWorldPosition(x: number, y: number): Phaser.Point {
        return new Phaser.Point(x * 50, y * 50);
    }
}

export = Utils;