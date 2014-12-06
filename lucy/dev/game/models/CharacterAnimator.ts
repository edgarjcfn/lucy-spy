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
            var lucyPosition = KodingSpy.Utils.getWorldPosition(this.character.position.x, this.character.position.y);
            this.sprite = this.game.add.sprite(lucyPosition.x, lucyPosition.y, 'lucy');
        }

        moveBy(x :number , y: number, next: ControllerDelegate) : void {

            var currentPos = this.character.position;
            var newPos = new KodingSpy.Model.TileCoordinate(currentPos.x + x, currentPos.y + y);
            var worldPos = KodingSpy.Utils.getWorldPosition(newPos.x, newPos.y);
            var delta = Math.abs(x || y);

            console.log(delta);

            // var animationName = 'walk'+ this.character.direction;
            // var animation = this.sprite.animations.play(animationName);

            var moveTween = this.game.add.tween(this.sprite).to({
                'x':worldPos.x,
                'y':worldPos.y},
                delta * 1000);
            moveTween.onComplete.add(next);
            moveTween.start();

            this.character.position = newPos;
        }

        rotateTo(direction: KodingSpy.Model.Direction, next: ControllerDelegate) : void {
            next();
        }

    }
}
