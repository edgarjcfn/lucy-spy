class ColliderData {
	name: string;
	sprite: Phaser.Sprite;

	constructor(name: string, sprite: Phaser.Sprite) {
		this.name = name;
		this.sprite = sprite;
	}
}

export = ColliderData;