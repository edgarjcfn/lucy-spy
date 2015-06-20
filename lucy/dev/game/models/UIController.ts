module KodingSpy.Controller {

    export class UIController {

        game: KodingSpy.Game;
        speechDialog :Phaser.Sprite

        constructor(game: KodingSpy.Game) {
            this.game = game;
        }

        showSpeechDialog(character :String, content :String, next :ControllerDelegate) {
            this.speechDialog = this.game.add.sprite(200, 200, 'speech');
            console.debug('speaking:' + content)
        }

    }
}
