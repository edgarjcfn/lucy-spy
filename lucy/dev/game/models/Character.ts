module KodingSpy.Model {
    export enum Direction {N, E, S, W}

    export class TileCoordinate {
        x: number;
        y: number;

        constructor (x :number, y :number) {
            this.x = x;
            this.y = y;
        }
    }

    export class Character {

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
}
