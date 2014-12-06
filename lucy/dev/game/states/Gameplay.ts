module KodingSpy {
    declare var SkulptAnimator : KodingSpy.Interfaces.ICharacterController;

    export class Gameplay extends Phaser.State {
        characterController : KodingSpy.Controller.CharacterController;

        create() {

            var lucy = new KodingSpy.Model.Character(0,0, KodingSpy.Model.Direction.N);
            var kodingSpyGame = <KodingSpy.Game> this.game;

            this.characterController = new KodingSpy.Controller.CharacterController(kodingSpyGame);
            this.characterController.create(lucy);

            SkulptAnimator = this.characterController;
        }
    }
}
