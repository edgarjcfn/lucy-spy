 import Direction = require("models/Direction");
 import TileCoordinate = require("models/TileCoordinate");
 
 class Character {
    position: TileCoordinate;
    direction: Direction;

    constructor(x: number, y: number, direction:Direction) {
        this.position = new TileCoordinate(x, y);
        this.direction = direction;
    }

    moveBy(x: number, y: number) : void {
        this.position.x += x;
        this.position.y += y;
    }

    moveTo(coord:TileCoordinate) : void {
        this.position = coord;
    }
}

export = Character;