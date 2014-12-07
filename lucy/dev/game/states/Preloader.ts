module KodingSpy {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //  Tiles
            this.load.atlasJSONHash('items', 'lucy/dev/game/assets/items.png', 'lucy/dev/game/assets/items.json');
            this.load.image('tilemap', 'lucy/dev/game/assets/tiles/TileSheet.png');
            this.load.image('doorTilemap', 'lucy/dev/game/assets/tiles/door.png');
            this.load.image('emptyTile', 'lucy/dev/game/assets/tiles/tileFLOOR.png');

            // Character
            this.load.atlasJSONHash('lucy', 'lucy/dev/game/assets/char/lucy.png', 'lucy/dev/game/assets/char/lucy.json');

            // Levels
            this.load.tilemap('Level01', 'lucy/dev/game/assets/levels/Level01.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('Level02', 'lucy/dev/game/assets/levels/Level02.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('Level03', 'lucy/dev/game/assets/levels/Level03.json', null, Phaser.Tilemap.TILED_JSON);

            // Sounds
            this.load.audio('bgm', 'lucy/dev/game/assets/sounds/soundtrack.ogg');
            this.load.audio('python', 'lucy/dev/game/assets/sounds/python.ogg');
            this.load.audio('diamond', 'lucy/dev/game/assets/sounds/diamond.ogg');
            this.load.audio('laser', 'lucy/dev/game/assets/sounds/laser.ogg');
            this.load.audio('scream', 'lucy/dev/game/assets/sounds/scream.ogg');
        }

        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        }

        startGame() {
            var myGame = <KodingSpy.Game> this.game;
            myGame.gotoNextLevel();
         }

    }

}
