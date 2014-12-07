module KodingSpy {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets

            this.load.atlasJSONHash('items', 'lucy/dev/game/assets/items.png', 'lucy/dev/game/assets/items.json');
            this.load.image('tilemap', 'lucy/dev/game/assets/tiles/TileSheet.png');
            this.load.image('emptyTile', 'lucy/dev/game/assets/tiles/tileFLOOR.png');
            this.load.atlasJSONHash('lucy', 'lucy/dev/game/assets/char/lucy.png', 'lucy/dev/game/assets/char/lucy.json');

            // Levels
            this.load.tilemap('Level01', 'lucy/dev/game/assets/levels/Level01.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('Level02', 'lucy/dev/game/assets/levels/Level02.json', null, Phaser.Tilemap.TILED_JSON);
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
