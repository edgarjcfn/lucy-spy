module KodingSpy.Controller {
    export class LevelController {

        game :KodingSpy.Game;
        levelName :String;

        constructor(game: KodingSpy.Game, levelName :string) {
            this.game = game;
            this.levelName = levelName;
        }

        create() {
            var rows = 12;
            var columns = 16;

            // Floor
            for (var x = 0; x < columns; x++) {
                for (var y = 0; y < rows; y++) {
                    this.placeTileAt(x, y, 'tileFLOOR');
                }
            }

            // Top and Bottom walls
            for (var x = 0; x < columns; x++) {
                this.placeTileAt(x, 0, 'tileWALL_TOP');
                this.placeTileAt(x, 1, 'tileWALL_FACE');
                this.placeTileAt(x, rows-1, 'tileWALL_BACK');
            }

            // Left and Right walls
            for (var y = 0; y < rows-1; y++) {
                this.placeTileAt(0, y, 'tileWALL_SIDE');
                this.placeTileAt(columns, y, 'tileWALL_SIDE').scale.x = -1;
            }

            // Corner tiles
            this.placeTileAt(0, rows-1, 'tileWALL_CORNER');
            this.placeTileAt(columns, rows-1, 'tileWALL_CORNER').scale.x = -1;

            // Door
            this.placeTileAt(8, 1, 'tileWALL_DOOR');
        }

        placeTileAt(x: number, y: number, tile :String): Phaser.Sprite {
            var position = KodingSpy.Utils.getWorldPosition(x, y);
            return this.game.add.sprite(position.x, position.y, tile);
        }
    }
}
