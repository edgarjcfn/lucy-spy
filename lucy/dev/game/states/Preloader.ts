module KodingSpy {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets

            this.load.image('tileFLOOR', 'lucy/dev/game/assets/tiles/tileFLOOR.png');
            this.load.image('tileWALL_BACK', 'lucy/dev/game/assets/tiles/tileWALL_BACK.png');
            this.load.image('tileWALL_CORNER', 'lucy/dev/game/assets/tiles/tileWALL_CORNER.png');
            this.load.image('tileWALL_DOOR', 'lucy/dev/game/assets/tiles/tileWALL_DOOR.png');
            this.load.image('tileWALL_FACE', 'lucy/dev/game/assets/tiles/tileWALL_FACE.png');
            this.load.image('tileWALL_SIDE', 'lucy/dev/game/assets/tiles/tileWALL_SIDE.png');
            this.load.image('tileWALL_TOP', 'lucy/dev/game/assets/tiles/tileWALL_TOP.png');
            this.load.image('lucy', 'lucy/dev/game/assets/lucy.png');
        }

        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        }

        startGame() {
            this.game.state.start('Gameplay', true, false);

         }

    }

}
