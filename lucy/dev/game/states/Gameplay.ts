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
            for (var x = 0; x <= columns; x++) {
                for (var y = 0; y <= rows; y++) {
                    var position = KodingSpy.Utils.getWorldPosition(x, y);
                    this.game.add.sprite(position.x, position.y, 'tileFLOOR');
                }
            }

            // Top and Bottom walls
            for (var x = 0; x <= columns; x++) {
                var position = KodingSpy.Utils.getWorldPosition(x, 0);
                this.game.add.sprite(position.x, position.y, 'tileWALL_TOP');
                position = KodingSpy.Utils.getWorldPosition(x, rows-1);
                this.game.add.sprite(position.x, position.y, 'tileWALL_BACK');
            }

            // Left and Right walls
            for (var y = 0; y <= rows; y++) {
                var position = KodingSpy.Utils.getWorldPosition(0, y);
                this.game.add.sprite(position.x, position.y, 'tileWALL_SIDE');
                position = KodingSpy.Utils.getWorldPosition(columns, y);
                var rightSprite = this.game.add.sprite(position.x, position.y, 'tileWALL_SIDE');
                rightSprite.scale.x = -1;
            }
        }
    }
}
