module KodingSpy.Controller {
    export interface ControllerDelegate {
        ():void;
    }

    export class CharacterController implements KodingSpy.Interfaces.ICharacterController{
        character: KodingSpy.Model.Character;
        game: KodingSpy.Game;
        sprite: Phaser.Sprite;

        constructor(game:KodingSpy.Game) {
            this.game = game;
        }

        create(lucy:KodingSpy.Model.Character) {
            this.character = lucy;
        }

        moveBy(x :number , y: number, next: ControllerDelegate) : void {
            var worldPos = KodingSpy.Utils.getWorldPosition(x, y);

            var animationName = 'walk'+ this.character.direction;
            var animation = this.sprite.animations.play(animationName);

            var moveTween = this.game.add.tween(this.sprite).to({'x':worldPos.x, 'y':worldPos.y}, 1000);
            moveTween.onComplete.add(next);
            moveTween.start();
        }

        rotateTo(direction: KodingSpy.Model.Direction, next: ControllerDelegate) : void {
            next();
        }

    }
}
