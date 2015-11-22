var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var KodingSpy;
(function (KodingSpy) {
    var Gameplay = (function (_super) {
        __extends(Gameplay, _super);
        function Gameplay() {
            _super.apply(this, arguments);
        }
        Gameplay.prototype.create = function () {
            this.lucy = new KodingSpy.Model.Character(0, 0, KodingSpy.Model.Direction.N);
            var kodingSpyGame = this.game;
            var levelToPlay = kodingSpyGame.currentLevel();
            this.levelController = new KodingSpy.Controller.LevelController(kodingSpyGame, levelToPlay);
            this.levelController.create();
            this.characterController = new KodingSpy.Controller.CharacterController(kodingSpyGame);
            this.characterController.create(this.lucy);
            this.characterController.respawn(this.levelController.spawnPosition);
            SkulptAnimator = this.characterController;
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
    KodingSpy.Gameplay = Gameplay;
})(KodingSpy || (KodingSpy = {}));
//# sourceMappingURL=Gameplay.js.map