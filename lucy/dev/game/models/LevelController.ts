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

            this.map.createLayer('Floor');
        }
    }
}
