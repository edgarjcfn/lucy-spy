///ts:ref=<phaser.d.ts>
/// No file or directory matched name "<phaser.d.ts>" ///ts:ref:generated

import CollisionController = require("controllers/CollisionController");
import Subscribe = require("delegates/Subscribe");
import Dispatch = require("delegates/Dispatch");
import ICharacterController = require("controllers/ICharacterController");
import UIController = require("controllers/UIController");
import BootState = require("states/Boot");
import PreloaderState = require("states/Preloader");
import GameplayState = require("states/Gameplay");

class Game extends Phaser.Game {

    characterController: ICharacterController;    
    currentLevelIndex: number;
    collisionController: CollisionController;
    uiController: UIController;
    allLevels: Array<string>;
    subscribe: Subscribe;
    dispatch: Dispatch;

    constructor(container :string, subscribe: Subscribe, dispatch :Dispatch, levels :Array<string>) {
        super(800, 600, Phaser.AUTO, container, null);

        this.subscribe = subscribe;
        this.dispatch = dispatch;
        this.allLevels = levels;

        this.collisionController = new CollisionController(this);
        this.uiController = new UIController(this);

        this.currentLevelIndex = -1;

        // Subscribe to Angular Notifications
        this.subscribe('EnableSound', this.setSoundEnabled.bind(this));
        this.subscribe('ResetLevel', this.resetLevel.bind(this));
        this.subscribe('StartLevelFromName', this.startLevelFromName.bind(this));
        this.subscribe('SuccessAlertClosed', this.gotoNextLevel.bind(this));

        // Initialize states
        this.state.add('Boot', BootState, false);
        this.state.add('Preloader', PreloaderState, false);
        this.state.add('Gameplay', GameplayState, false);
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


export = Game;
