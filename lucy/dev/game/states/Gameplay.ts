module KodingSpy {
    declare var SkulptAnimator : KodingSpy.Interfaces.ICharacterController;

    export class Gameplay extends Phaser.State {
        characterController : KodingSpy.Controller.CharacterController;
        lucy : KodingSpy.Model.Character;

        create() {

            this.lucy = new KodingSpy.Model.Character(8, 6, KodingSpy.Model.Direction.N);
            var kodingSpyGame = <KodingSpy.Game> this.game;

            this.characterController = new KodingSpy.Controller.CharacterController(kodingSpyGame);
            this.characterController.create(this.lucy);
            var lucyPosition = KodingSpy.Utils.getWorldPosition(this.lucy.position.x, this.lucy.position.y);
            var lucySprite = this.game.add.sprite(lucyPosition.x, lucyPosition.y, 'lucy');

            SkulptAnimator = this.characterController;
        }

        preload() {

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
            // var position = KodingSpy.Utils.getWorldPosition(0, rows-1);
            // this.game.add.sprite(position.x, position.y, 'tileWALL_SIDE');
            // var position = KodingSpy.Utils.getWorldPosition(columns-1, rows-1);
            // this.game.add.sprite(position.x, position.y, 'tileWALL_SIDE');

            // Door
            this.placeTileAt(8, 1, 'tileWALL_DOOR');
        }

        placeTileAt(x: number, y: number, tile :String): Phaser.Sprite {
            var position = KodingSpy.Utils.getWorldPosition(x, y);
            return this.game.add.sprite(position.x, position.y, tile);
        }
    }
}
