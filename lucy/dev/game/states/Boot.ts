class Boot extends Phaser.State {

    preload() {
        this.load.image('preloadBar', 'lucy/dev/game/assets/loader.png');
    }

    create() {

        this.game.time.advancedTiming = true;
        this.game.state.start('Preloader', true, false);
    }
}

export = Boot;