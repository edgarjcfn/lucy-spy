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
            this.load.image('floor', 'lucy/dev/game/assets/tiles/tileFLOOR.png');
            this.load.image('empty', 'lucy/dev/game/assets/tiles/empty.png');

            // Character
            this.load.atlasJSONHash('lucy', 'lucy/dev/game/assets/char/lucy.png', 'lucy/dev/game/assets/char/lucy.json');

            // Levels
            var myGame = <KodingSpy.Game> this.game;
            for (var i=0; i < myGame.allLevels.length; i++) {
                var level = myGame.allLevels[i];
                this.load.tilemap(level, 'lucy/dev/game/assets/levels/'+level+'/map.json', null, Phaser.Tilemap.TILED_JSON);
            }

            // Sounds
            this.load.audio('bgm', 'lucy/dev/game/assets/sounds/soundtrack.ogg');
            this.load.audio('python', 'lucy/dev/game/assets/sounds/python.ogg');
            this.load.audio('diamond', 'lucy/dev/game/assets/sounds/diamond.ogg');
            this.load.audio('laser', 'lucy/dev/game/assets/sounds/laser.ogg');
            this.load.audio('scream', 'lucy/dev/game/assets/sounds/scream.ogg');

            // UI
            this.load.image('speech', 'lucy/dev/game/assets/char/speechBubble.png');
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
