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
        allLevels :Array<string>;
        subscribe :Subscribe;
        dispatch :Dispatch;

        constructor(container :string, subscribe: Subscribe, dispatch :Dispatch, levels :Array<string>) {
            super(800, 600, Phaser.AUTO, container, null);

            this.subscribe = subscribe;
            this.dispatch = dispatch;
            this.allLevels = levels;

            this.currentLevelIndex = -1;

            // Subscribe to Angular Notifications
            this.subscribe('EnableSound', this.setSoundEnabled.bind(this));
            this.subscribe('ResetLevel', this.resetLevel.bind(this));
            this.subscribe('StartLevelFromName', this.startLevelFromName.bind(this));

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
            this.gotoNextLevel();
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
