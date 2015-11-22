var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var KodingSpy;
(function (KodingSpy) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.atlasJSONHash('items', 'lucy/dev/game/assets/items.png', 'lucy/dev/game/assets/items.json');
            this.load.image('tilemap', 'lucy/dev/game/assets/tiles/TileSheet.png');
            this.load.image('doorTilemap', 'lucy/dev/game/assets/tiles/door.png');
            this.load.image('floor', 'lucy/dev/game/assets/tiles/tileFLOOR.png');
            this.load.image('empty', 'lucy/dev/game/assets/tiles/empty.png');
            this.load.atlasJSONHash('lucy', 'lucy/dev/game/assets/char/lucy.png', 'lucy/dev/game/assets/char/lucy.json');
            var myGame = this.game;
            for (var i = 0; i < myGame.allLevels.length; i++) {
                var level = myGame.allLevels[i];
                this.load.tilemap(level, 'lucy/dev/game/assets/levels/' + level + '/map.json', null, Phaser.Tilemap.TILED_JSON);
            }
            this.load.audio('bgm', 'lucy/dev/game/assets/sounds/soundtrack.ogg');
            this.load.audio('key', 'lucy/dev/game/assets/sounds/python.ogg');
            this.load.audio('diamond', 'lucy/dev/game/assets/sounds/diamond.ogg');
            this.load.audio('laser', 'lucy/dev/game/assets/sounds/laser.ogg');
            this.load.audio('scream', 'lucy/dev/game/assets/sounds/scream.ogg');
            this.load.image('speech', 'lucy/dev/game/assets/char/speechBubble.png');
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        Preloader.prototype.startGame = function () {
            var myGame = this.game;
            myGame.gotoNextLevel();
        };
        return Preloader;
    })(Phaser.State);
    KodingSpy.Preloader = Preloader;
})(KodingSpy || (KodingSpy = {}));
//# sourceMappingURL=Preloader.js.map