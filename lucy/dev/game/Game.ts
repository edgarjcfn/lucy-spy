/// <reference path="../../../bower_components/phaser/build/phaser.d.ts" />

module KodingSpy {

    export interface Subscribe {
        (msg :string, handler :(payload:any)=>any):void;
    }

    export interface Dispatch {
        (msg: string, payload :any):void;
    }

    export class Game extends Phaser.Game {

        currentLevelIndex :number;
        collisionController :KodingSpy.Controller.CollisionController;
        uiController: KodingSpy.Controller.UIController;
        allLevels :Array<string>;
        subscribe :Subscribe;
        dispatch :Dispatch;

        constructor(container :string, subscribe: Subscribe, dispatch :Dispatch, levels :Array<string>) {
            super(800, 600, Phaser.AUTO, container, null);

            this.subscribe = subscribe;
            this.dispatch = dispatch;
            this.allLevels = levels;

            this.collisionController = new KodingSpy.Controller.CollisionController(this);
            this.uiController = new KodingSpy.Controller.UIController(this);

            this.currentLevelIndex = -1;

            // Subscribe to Angular Notifications
            this.subscribe('EnableSound', this.setSoundEnabled.bind(this));
            this.subscribe('ResetLevel', this.resetLevel.bind(this));
            this.subscribe('StartLevelFromName', this.startLevelFromName.bind(this));
            this.subscribe('SuccessAlertClosed', this.gotoNextLevel.bind(this));

            // Initialize states
            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('Gameplay', Gameplay, false);
        }

        boot() {
            super.boot();
            this.state.start('Boot');
        }

        gotoNextLevel() {
            console.debug('snl');
            this.currentLevelIndex++;
            this.startCurrentLevel();
        }

        startCurrentLevel() {
            console.log('Starting level ' + this.currentLevel());

            this.state.start('Gameplay', true, false);
            this.dispatch('StartLevel', this.currentLevel());
        }

        startLevelFromName(level :string) {
            this.currentLevelIndex = this.allLevels.indexOf(level);
            this.startCurrentLevel();
        }

        levelCompleted(diamonds :number) {
            this.dispatch('ShowAlert', {message:'', diamonds:diamonds});
        }

        currentLevel() :string {
            return <string> this.allLevels[this.currentLevelIndex];
        }

        setSoundEnabled(enabled) :void {
            // TODO: Refactor sound to SoundController
            this.sound.pauseAll();
        }

        resetLevel() :void {
            this.state.start('Gameplay', true, false);
        }

    }
}
