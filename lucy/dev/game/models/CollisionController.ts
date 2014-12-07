module KodingSpy.Controller {

    export class CollisionController {

        game:KodingSpy.Game;
        characterController : KodingSpy.Controller.CharacterController;
        colliders: { [name:string]:Array<Phaser.Sprite>; }

        constructor(game :KodingSpy.Game) {
            this.game = game;
            this.colliders = {};
        }

        startPhysics() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
        }

        enableCharacter(controller :KodingSpy.Controller.CharacterController) :void {
            var characterSprite = controller.sprite;
            this.game.physics.enable(characterSprite);
            this.characterController = controller;
            characterSprite.body.width = 40;
            characterSprite.body.height = 40;
            characterSprite.body.offset = new Phaser.Point(5, 55);
        }

        enableCollider(sprite :Phaser.Sprite, name :string) :void {
            this.game.physics.enable(sprite);
            if (!(this.colliders[name])) {
                this.colliders[name] = [];
            }
            this.colliders[name].push(sprite);
        }

        checkCollisions() :string{
            var player = this.characterController.sprite.body;

            for (var colliderName in this.colliders) {
                var colliderArray = this.colliders[colliderName];
                for (var i=0; i < colliderArray.length; i++) {
                    var collider = colliderArray[i].body;
                    if (this.game.physics.arcade.intersects(player, collider)) {
                        return colliderName;
                    }
                }

            }

            return null;
        }

        update() {
            this.game.debug.bodyInfo(this.characterController.sprite, 32, 320);
            this.game.debug.body(this.characterController.sprite);
            for (var colliderName in this.colliders) {
                var colliderArray = this.colliders[colliderName];
                for (var i=0; i < colliderArray.length; i++) {
                    var collider = colliderArray[i];
                    this.game.debug.body(collider);
                }

            }
        }
    }
}
