module KodingSpy {
    declare var SkulptAnimator : KodingSpy.Interfaces.ICharacterController;
    declare var SkulptQueue : KodingSpy.Command.CommandQueue;

    export class Gameplay extends Phaser.State {
        characterController : KodingSpy.Controller.CharacterController;
        levelController : KodingSpy.Controller.LevelController;
        lucy : KodingSpy.Model.Character;

        create() {

            this.lucy = new KodingSpy.Model.Character(8, 6, KodingSpy.Model.Direction.N);
            var kodingSpyGame = <KodingSpy.Game> this.game;

            this.levelController = new KodingSpy.Controller.LevelController(kodingSpyGame, 'level01');
            this.levelController.create();

            this.characterController = new KodingSpy.Controller.CharacterController(kodingSpyGame);
            this.characterController.create(this.lucy);

            SkulptAnimator = this.characterController;
        }

        preload() {
        }
    }
}
