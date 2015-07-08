module KodingSpy.Controller {

    export interface ControllerDelegate {
        (): void;
    }

    export class CharacterController implements KodingSpy.Interfaces.ICharacterController {
        character: KodingSpy.Model.Character;
        game: KodingSpy.Game;
        sprite: Phaser.Sprite;
        isHoldingKey: Boolean;

        sndDiamond: Phaser.Sound;
        sndKey: Phaser.Sound;
        sndDeath: Phaser.Sound;

        diamondCount: number;

        constructor(game: KodingSpy.Game) {
            this.game = game;
            this.isHoldingKey = false;
            this.diamondCount = 0;
        }

        create(lucy: KodingSpy.Model.Character) {
            this.character = lucy;
            var lucyPosition = KodingSpy.Utils.getWorldPosition(this.character.position.x, this.character.position.y);
            this.sprite = this.game.add.sprite(lucyPosition.x, lucyPosition.y, 'lucy');

            this.sprite.animations.add('walk0', Phaser.Animation.generateFrameNames('walkN', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('walk1', Phaser.Animation.generateFrameNames('walkE', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('walk2', Phaser.Animation.generateFrameNames('walkS', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('walk3', Phaser.Animation.generateFrameNames('walkW', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('itemKey', Phaser.Animation.generateFrameNames('itemKey', 1, 16, '', 4), 24, false, false);
            this.sprite.animations.add('itemDiamond', Phaser.Animation.generateFrameNames('itemDiamond', 1, 16, '', 4), 24, false, false);
            this.sprite.animations.add('burn', Phaser.Animation.generateFrameNames('burn', 1, 30, '', 4), 24, false, false);

            this.game.collisionController.enableCharacter(this);
            this.updateDirection();

            this.sndDiamond = this.game.add.audio('diamond', 0.5, false);
            this.sndKey = this.game.add.audio('key', 0.5, false);
            this.sndDeath = this.game.add.audio('laser', 0.5, false);
        }

        moveBy(x: number, y: number, next: ControllerDelegate): void {

            var currentPos = this.character.position;
            var newPos = new KodingSpy.Model.TileCoordinate(currentPos.x + x, currentPos.y + y);
            var worldPos = KodingSpy.Utils.getWorldPosition(newPos.x, newPos.y);
            var delta = Math.abs(x || y);

            var animationName = 'walk' + this.character.direction;
            var animation = this.sprite.animations.play(animationName);

            var moveTween = this.game.add.tween(this.sprite).to({
                'x': worldPos.x,
                'y': worldPos.y
            },
                delta * 500);
            moveTween.onComplete.add(() => {
                this.character.position = newPos;
                var collision = this.game.collisionController.checkCollisions();
                if (collision) {
                    this.onCollision(collision, next);
                }
                else {
                    next();
                }
            });
            moveTween.start();
        }

        rotateTo(direction: KodingSpy.Model.Direction, next: ControllerDelegate): void {
            this.updateDirection();
            var waitTween = this.game.add.tween(this.sprite).to({}, 500);
            waitTween.onComplete.add(next);
            waitTween.start();
        }

        speak(text: string, next: ControllerDelegate): void {

            this.game.uiController.showSpeechDialog('lucy', text, next);
        }

        updateDirection() {
            var animationName = 'walk' + this.character.direction;
            this.sprite.animations.stop(animationName, true);

        }

        update() {

        }

        respawn(newPos: KodingSpy.Model.TileCoordinate) {
            var worldPos = KodingSpy.Utils.getWorldPosition(newPos.x, newPos.y);

            this.character.position = newPos;
            this.sprite.position.set(worldPos.x, worldPos.y);

        }

        onCollision(data: ColliderData, next: ControllerDelegate) {
            switch (data.name) {
                case "diamond":
                    this.diamondCount++;
                    this.sndDiamond.play();
                    this.game.collisionController.disableCollider(data.sprite, data.name);
                    data.sprite.destroy();
                    var diamondAnim = this.sprite.animations.play("itemDiamond");
                    var waitTween = this.game.add.tween(this.sprite).to({}, 1000);
                    waitTween.onComplete.add(next);
                    waitTween.start();
                    break;
                case "key":
                    this.isHoldingKey = true;
                    this.sndKey.play();
                    this.game.collisionController.disableCollider(data.sprite, data.name);
                    data.sprite.destroy();
                    var keyAnim = this.sprite.animations.play("itemKey");
                    var waitTween = this.game.add.tween(this.sprite).to({}, 1000);
                    waitTween.onComplete.add(next);
                    waitTween.start();
                    break;
                case "cannon":
                case "laserH":
                case "laserV":
                    this.sndDeath.play();
                    var burnanim = this.sprite.animations.play("burn");
                    break;
                case "door":
                    if (this.isHoldingKey) {
                        this.game.levelCompleted(this.diamondCount);
                    }
                    break;
            }
        }

    }
}
