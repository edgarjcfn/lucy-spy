/// <reference path="../../../bower_components/phaser/build/phaser.d.ts" />

module KodingSpy {

    declare var AceLoader : (level :string)=>void;
    declare var ShowMessage : (msg :string, type :string)=>void;
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
                'Level04'
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
            ShowMessage('Well Done', '3');
            this.currentLevelIndex++;
            this.startCurrentLevel();
        }

        startCurrentLevel() {
            this.state.start('Gameplay', true, false);
            HideMessage();
            AceLoader(this.currentLevel());
        }

        startLevelFromName(level :string) {
            this.currentLevelIndex = this.allLevels.indexOf(level);
            this.startCurrentLevel();
        }

        currentLevel() :string {
            return this.allLevels[this.currentLevelIndex];
        }

    }
}
