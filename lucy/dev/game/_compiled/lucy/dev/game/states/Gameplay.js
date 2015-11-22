var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "controllers/CharacterController", "controllers/LevelController", "models/Character", "models/Direction"], function (require, exports, CharacterController, LevelController, Character, Direction) {
    var Gameplay = (function (_super) {
        __extends(Gameplay, _super);
        function Gameplay() {
            _super.apply(this, arguments);
        }
        Gameplay.prototype.create = function () {
            this.lucy = new Character(0, 0, Direction.N);
            var theGame = this.game;
            var levelToPlay = theGame.currentLevel();
            this.levelController = new LevelController(theGame, levelToPlay);
            this.levelController.create();
            this.characterController = new CharacterController(theGame);
            this.characterController.create(this.lucy);
            this.characterController.respawn(this.levelController.spawnPosition);
            theGame.characterController = this.characterController;
            this.game.sound.pauseAll();
            var music = this.game.add.audio('bgm', 0.3, true);
        };
        Gameplay.prototype.preload = function () {
        };
        Gameplay.prototype.update = function () {
        };
        Gameplay.prototype.render = function () {
            var kodingSpyGame = this.game;
            kodingSpyGame.collisionController.update();
        };
        return Gameplay;
    })(Phaser.State);
});
//# sourceMappingURL=Gameplay.js.map