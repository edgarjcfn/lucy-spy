module KodingSpy.Controller {

    export class UIController {

        game: KodingSpy.Game;
        speechDialog :Phaser.Sprite

        constructor(game: KodingSpy.Game) {
            this.game = game;
        }

        showSpeechDialog(character: string, content :string, next :ControllerDelegate) {
            this.speechDialog = this.game.add.sprite(122, 450, 'speech'); 
            var style = { font: "20px Arial", fill: "#ffffff", align: "left", wordWrap: true, wordWrapWidth: 450  };
            var text = this.game.add.text(450, 500, content.substr(0,40), style);
            text.anchor.set(0.5, 0.5)
        }

    }
}
