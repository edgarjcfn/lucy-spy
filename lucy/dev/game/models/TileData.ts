class TileData {
	name: string;
	frames: number;
	collidable: boolean;

	constructor(name: string, frames: number, collidable: boolean) {
		this.name = name;
		this.frames = frames;
		this.collidable = collidable;
	}
}

export = TileData;