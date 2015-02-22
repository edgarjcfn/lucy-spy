module KodingSpy {
    declare var SkulptAnimator : KodingSpy.Interfaces.ICharacterController;
    declare var SkulptQueue : KodingSpy.Command.CommandQueue;
    declare var ShowMessage : (msg :string, diamonds :number)=>void;


    export class Gameplay extends Phaser.State {
        characterController : KodingSpy.Controller.CharacterController;
        levelController : KodingSpy.Controller.LevelController;
        lucy : KodingSpy.Model.Character;

        create() {

            this.lucy = new KodingSpy.Model.Character(0, 0, KodingSpy.Model.Direction.N);
            var kodingSpyGame = <KodingSpy.Game> this.game;
            var levelToPlay = kodingSpyGame.currentLevel();

            kodingSpyGame.collisionController = new KodingSpy.Controller.CollisionController(kodingSpyGame);

            this.levelController = new KodingSpy.Controller.LevelController(kodingSpyGame, levelToPlay);
            this.levelController.create();

            this.characterController = new KodingSpy.Controller.CharacterController(kodingSpyGame);
            this.characterController.create(this.lucy);
            this.characterController.respawn(this.levelController.spawnPosition);

            SkulptAnimator = this.characterController;

            this.game.sound.pauseAll();
            var music = this.game.add.audio('bgm', 0.3, true);
            // music.play();
        }

        preload() {

        }

        update() {

        }

        render() {
            var kodingSpyGame = <KodingSpy.Game> this.game;
            kodingSpyGame.collisionController.update();
        }
    }
}
