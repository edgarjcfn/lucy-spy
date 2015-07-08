import LucyGame = KodingSpy.Game;

module KodingSpy.Controller {

    export class LevelController {

        game: LucyGame;
        levelName: string;
        map: Phaser.Tilemap;
        spawnPosition: KodingSpy.Model.TileCoordinate;

        constructor(game: LucyGame, levelName: string) {
            this.game = game;
            this.levelName = levelName;
            this.spawnPosition = new KodingSpy.Model.TileCoordinate(8, 9);
        }

        create() {
            this.map = this.game.add.tilemap(this.levelName);
            this.map.addTilesetImage('floor_walls', 'tilemap');
            this.map.addTilesetImage('door', 'doorTilemap');

            var floor = this.map.createLayer('Floor');
            var collision = this.map.createLayer('Collision');

            this.map.setCollisionByExclusion([], true, 'Collision');

            this.buildItems();
        }

        buildItems(): void {
            var itemSet = new KodingSpy.Model.Tiles().items;

            for (var y = 0; y < 12; y++) {
                for (var x = 0; x < 16; x++) {
                    var tile = this.map.getTile(x, y, 'Collision', true);
                    if (tile.properties.type) {
                        var tileType = <string> tile.properties.type;
                        if (tileType != "door" && tileType != "wall") {
                            this.game.add.sprite(tile.worldX, tile.worldY, 'floor');
                        }
                        if (tileType == "spawn") {
                            this.spawnPosition = new KodingSpy.Model.TileCoordinate(x, y);
                        }
                        else {
                            var sprite;
                            if (tileType == "wall") {
                                sprite = this.game.add.sprite(tile.worldX, tile.worldY, 'empty');
                                this.game.collisionController.enableCollider(sprite, tileType);
                            }
                            else {
                                sprite = this.game.add.sprite(tile.worldX, tile.worldY, 'items');
                                var itemData = itemSet[tileType];

                                console.log(tileType)
                                console.log(itemData);

                                sprite.animations.add(itemData.name, Phaser.Animation.generateFrameNames(itemData.name, 0, itemData.frames - 1, '', 4), 24, true, false);
                                sprite.animations.play(itemData.name);
                                this.game.collisionController.enableCollider(sprite, tileType);
                            }

                        }
                    }
                }
            }
        }
    }
}
