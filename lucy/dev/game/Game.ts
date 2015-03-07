/// <reference path="../../../bower_components/phaser/build/phaser.d.ts" />

module KodingSpy {

    declare var Subscribe : (msg :string, handler :(payload:any)=>any)=>void;
    declare var Dispatch : (msg: string, payload :any)=>void;

    declare var AceLoader : (level :string)=>void;
    declare var ShowMessage : (msg :string, diamonds :number)=>void;
    declare var HideMessage : ()=>void;

    export interface ExecutionUpdateDelegate {
        (line: number):void;
    }

    export class Game extends Phaser.Game {

        currentLevelIndex :number;
        collisionController : KodingSpy.Controller.CollisionController;
        allLevels :Array<string>;

        constructor() {
            super(800, 600, Phaser.AUTO, 'gameCanvas', null);

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
            AceLoader(this.currentLevel());
        }

        startLevelFromName(level :string) {
            this.currentLevelIndex = this.allLevels.indexOf(level);
            this.startCurrentLevel();
        }

        levelCompleted(diamonds :number) {
            ShowMessage('', diamonds);
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
