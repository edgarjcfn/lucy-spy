/// <reference path="../../../bower_components/phaser/build/phaser.d.ts" />

module KodingSpy {

    export interface Subscribe {
        (msg :string, handler :(payload:any)=>any):void;
    }

    export interface Dispatch {
        (msg: string, payload :any):void;
    }

    export interface ExecutionUpdateDelegate {
        (line: number):void;
    }

    export class Game extends Phaser.Game {

        currentLevelIndex :number;
        collisionController :KodingSpy.Controller.CollisionController;
        allLevels :Array<string>;
        subscribe :Subscribe;
        dispatch :Dispatch;

        constructor(subscribe: Subscribe, dispatch :Dispatch) {
            super(800, 600, Phaser.AUTO, 'gameCanvas', null);

            this.subscribe = subscribe;
            this.dispatch = dispatch;

            this.allLevels = [
                'Level01',
                'Level02',
                'Level03',
                'Level04',
                'Level05',
                'Level06',
                'Level07',
                'Level08'
            ];

            this.currentLevelIndex = -1;

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
            this.sound.pauseAll();
        }

    }
}
