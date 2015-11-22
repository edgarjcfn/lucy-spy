import Game = require("Game");
import CharacterController = require("controllers/CharacterController");
import LevelController = require("controllers/LevelController");
import UIController = require("controllers/UIController");
import Character = require("models/Character");
import Direction = require("models/Direction");

class Gameplay extends Phaser.State {
    characterController: CharacterController;
    levelController: LevelController;
    uiController: UIController;
    lucy: Character;

    create() {

        this.lucy = new Character(0, 0, Direction.N);
        var theGame = <Game>this.game;
        var levelToPlay = theGame.currentLevel();

        this.levelController = new LevelController(theGame, levelToPlay);
        this.levelController.create();

        this.characterController = new CharacterController(theGame);
        this.characterController.create(this.lucy);
        this.characterController.respawn(this.levelController.spawnPosition);

        theGame.characterController = this.characterController;

        this.game.sound.pauseAll();
        var music = this.game.add.audio('bgm', 0.3, true);
        // music.play();
    }

    preload() {

    }

    update() {

    }

    render() {
        var kodingSpyGame = <Game>this.game;
        kodingSpyGame.collisionController.update();
    }
}

