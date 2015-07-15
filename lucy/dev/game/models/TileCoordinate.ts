module KodingSpy.Model {
    export class TileCoordinate {
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        isNeighbour(coord: TileCoordinate): boolean {

			console.log('comparing ' + this.x + ',' + this.y)
			console.log('with' + coord.x + ',' + coord.y)
			
			var dX = coord.x - this.x;
			var dY = coord.y - this.y;

			var isSameLine = ( (Math.abs(dX) == 1) && (dY == 0) )
			var isSameColumn = ( (Math.abs(dY) == 1) && (dX == 0) )

			return isSameLine || isSameColumn;

		}
    }
}