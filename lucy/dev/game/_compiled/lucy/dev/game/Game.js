///ts:ref=<phaser.d.ts>
/// No file or directory matched name "<phaser.d.ts>" ///ts:ref:generated
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "controllers/CollisionController", "controllers/UIController", "states/Boot", "states/Preloader", "states/Gameplay"], function (require, exports, CollisionController, UIController, BootState, PreloaderState, GameplayState) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(container, subscribe, dispatch, levels) {
            _super.call(this, 800, 600, Phaser.AUTO, container, null);
            this.subscribe = subscribe;
            this.dispatch = dispatch;
            this.allLevels = levels;
            this.collisionController = new CollisionController(this);
            this.uiController = new UIController(this);
            this.currentLevelIndex = -1;
            this.subscribe('EnableSound', this.setSoundEnabled.bind(this));
            this.subscribe('ResetLevel', this.resetLevel.bind(this));
            this.subscribe('StartLevelFromName', this.startLevelFromName.bind(this));
            this.subscribe('SuccessAlertClosed', this.gotoNextLevel.bind(this));
            this.state.add('Boot', BootState, false);
            this.state.add('Preloader', PreloaderState, false);
            this.state.add('Gameplay', GameplayState, false);
        }
        Game.prototype.boot = function () {
            _super.prototype.boot.call(this);
            this.state.start('Boot');
        };
        Game.prototype.gotoNextLevel = function () {
            this.currentLevelIndex++;
            this.startCurrentLevel();
        };
        Game.prototype.startCurrentLevel = function () {
            console.log('Starting level ' + this.currentLevel());
            this.state.start('Gameplay', true, false);
            this.dispatch('StartLevel', this.currentLevel());
        };
        Game.prototype.startLevelFromName = function (level) {
            this.currentLevelIndex = this.allLevels.indexOf(level);
            this.startCurrentLevel();
        };
        Game.prototype.levelCompleted = function (diamonds) {
            this.dispatch('ShowAlert', { message: '', diamonds: diamonds });
        };
        Game.prototype.currentLevel = function () {
            return this.allLevels[this.currentLevelIndex];
        };
        Game.prototype.setSoundEnabled = function (enabled) {
            this.sound.pauseAll();
        };
        Game.prototype.resetLevel = function () {
            this.state.start('Gameplay', true, false);
        };
        return Game;
    })(Phaser.Game);
    return Game;
});
//# sourceMappingURL=Game.js.map