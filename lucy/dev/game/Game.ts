/// <reference path="../../../bower_components/phaser/build/phaser.d.ts" />

module KodingSpy {

    export interface ExecutionUpdateDelegate {
        (line: number):void;
    }

    export class Game extends Phaser.Game {
        constructor() {
            super(800, 600, Phaser.AUTO, 'gameCanvas', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('Gameplay', Gameplay, false);
        }

        boot() {
            super.boot();
            this.state.start('Boot');
        }

    }
}
