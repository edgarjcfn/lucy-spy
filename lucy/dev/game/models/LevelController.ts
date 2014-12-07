module KodingSpy.Controller {
    export class LevelController {

        game :KodingSpy.Game;
        levelName :string;
        map :Phaser.Tilemap;

        constructor(game: KodingSpy.Game, levelName :string) {
            this.game = game;
            this.levelName = levelName;
        }

        create() {
            this.map = this.game.add.tilemap(this.levelName);
            this.map.addTilesetImage('floor_walls', 'tilemap');
            this.map.addTilesetImage('door', 'doorTilemap');

            this.map.createLayer('Floor');
            var collision = this.map.createLayer('Collision');

            this.map.setCollisionByExclusion([], true, 'Collision');

            this.buildItems();
        }

        buildItems() :void {

            for (var y=0; y<12; y++) {
                for (var x=0; x<16; x++) {
                    var tile = this.map.getTile(x, y, 'Collision', true);
                    if (tile.properties.type) {
                        var tileType = <string> tile.properties.type;
                        var frames = <number> tile.properties.frames;
                        if (tileType != "door") {
                            this.game.add.sprite(tile.worldX, tile.worldY, 'emptyTile');
                        }
                        var sprite = this.game.add.sprite(tile.worldX, tile.worldY, 'items');
                        sprite.animations.add(tileType, Phaser.Animation.generateFrameNames(tileType, 0, frames-1, '', 4), 24, true, false);
                        sprite.animations.play(tileType);
                        this.game.collisionController.enableCollider(sprite, tileType);
                    }
                }
            }
        }
    }
}
