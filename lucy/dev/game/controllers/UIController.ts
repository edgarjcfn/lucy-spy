import Game = require("Game");
import Action = require("delegates/Action");

class UIController {

    game: Game;
    speechDialog: Phaser.Sprite
    text: Phaser.Text

    constructor(game: Game) {
        this.game = game;
    }

    showSpeechDialog(character: string, content: string, next: Action) {
        this.speechDialog = this.game.add.sprite(122, 450, 'speech');
        var style = {
            font: "20px Arial",
            fill: "#ffffff",
            align: "left",
            wordWrap: true,
            wordWrapWidth: 400
        };
        this.text = this.game.add.text(475, 500, content, style);
        this.text.anchor.set(0.5, 0.5)

        var onTimerFinished = function() {
            this.speechDialog.destroy(true);
            this.text.destroy(true);
            next();
        }

        var waitTween = this.game.add.tween(this.speechDialog).to({}, 500);
        waitTween.onComplete.add(onTimerFinished.bind(this));
        waitTween.start();
    }

}

export = UIController;