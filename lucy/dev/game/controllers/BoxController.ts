module KodingSpy.Controller { 

	export class BoxController {
		boxes: Array<KodingSpy.Model.TileCoordinate>
		game: KodingSpy.Game

		constructor(game: KodingSpy.Game) {
			this.game = game
			this.boxes = []
		}

		addBox(coords: KodingSpy.Model.TileCoordinate) {
			this.boxes.push(coords);
		}

		locateBoxAround(coord: KodingSpy.Model.TileCoordinate): KodingSpy.Model.TileCoordinate {
			for (var i = 0; i < this.boxes.length; i++) {
				var box = this.boxes[i];
				if (box.isNeighbour(coord)) {
					return box;
				}

			}

			return null;
		}

		openBox(coord: KodingSpy.Model.TileCoordinate, direction: string, next: KodingSpy.Controller.ControllerDelegate) {
			// console.log(this.boxes)
			console.log('found box is: ' + coord);
			console.log('direction is: ' + direction);
		}
	}
	
}