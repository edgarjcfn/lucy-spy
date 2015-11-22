define(["require", "exports", "models/ColliderData"], function (require, exports, ColliderData) {
    var CollisionController = (function () {
        function CollisionController(game) {
            this.game = game;
            this.colliders = {};
        }
        CollisionController.prototype.startPhysics = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
        };
        CollisionController.prototype.enableCharacter = function (controller, sprite) {
            var characterSprite = sprite;
            this.game.physics.enable(characterSprite);
            this.characterController = controller;
            characterSprite.body.width = 40;
            characterSprite.body.height = 40;
            characterSprite.body.offset = new Phaser.Point(5, 55);
        };
        CollisionController.prototype.enableCollider = function (sprite, name) {
            this.game.physics.enable(sprite);
            if (!(this.colliders[name])) {
                this.colliders[name] = [];
            }
            this.colliders[name].push(sprite);
        };
        CollisionController.prototype.disableCollider = function (sprite, name) {
            sprite.body.destroy();
            var sameTypeColliders = this.colliders[name];
            sameTypeColliders.splice(sameTypeColliders.indexOf(sprite), 1);
        };
        CollisionController.prototype.checkCollisions = function (sprite) {
            var player = sprite.body;
            for (var colliderName in this.colliders) {
                var colliderArray = this.colliders[colliderName];
                for (var i = 0; i < colliderArray.length; i++) {
                    var collider = colliderArray[i].body;
                    if (collider && collider.position) {
                        if (this.game.physics.arcade.intersects(player, collider)) {
                            return new ColliderData(colliderName, colliderArray[i]);
                        }
                    }
                }
            }
            return null;
        };
        CollisionController.prototype.update = function () {
            // this.game.debug.bodyInfo(this.characterController.sprite, 32, 320);
            // this.game.debug.body(this.characterController.sprite);
            // for (var colliderName in this.colliders) {
            //     var colliderArray = this.colliders[colliderName];
            //     for (var i=0; i < colliderArray.length; i++) {
            //         var collider = colliderArray[i];
            //         this.game.debug.body(collider);
            //     }
        };
        return CollisionController;
    })();
    return CollisionController;
});
//# sourceMappingURL=CollisionController.js.map