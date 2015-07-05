module KodingSpy.Controller {

    export class ColliderData {
        name :string;
        sprite :Phaser.Sprite;

        constructor(name :string, sprite:Phaser.Sprite){
            this.name = name;
            this.sprite = sprite;
        }
    }

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

        disableCollider(sprite :Phaser.Sprite, name :string) :void {
            sprite.body.destroy();
            var sameTypeColliders = this.colliders[name];
            sameTypeColliders.splice(sameTypeColliders.indexOf(sprite), 1);
        }

        checkCollisions() :ColliderData{
            var player = this.characterController.sprite.body;

            for (var colliderName in this.colliders) {
                var colliderArray = this.colliders[colliderName];
                for (var i=0; i < colliderArray.length; i++) {
                    var collider = colliderArray[i].body;
                    if (collider && collider.position) {
                        if (this.game.physics.arcade.intersects(player, collider)) {
                            return new ColliderData(colliderName, colliderArray[i]);
                        }
                    }
                }

            }

            return null;
        }

        update() {
            // this.game.debug.bodyInfo(this.characterController.sprite, 32, 320);
            // this.game.debug.body(this.characterController.sprite);
            // for (var colliderName in this.colliders) {
            //     var colliderArray = this.colliders[colliderName];
            //     for (var i=0; i < colliderArray.length; i++) {
            //         var collider = colliderArray[i];
            //         this.game.debug.body(collider);
            //     }

            // }
        }
    }
}
