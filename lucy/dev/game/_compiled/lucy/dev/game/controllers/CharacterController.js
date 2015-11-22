define(["require", "exports", "models/TileCoordinate", "util/Utils"], function (require, exports, TileCoordinate, Utils) {
    var CharacterController = (function () {
        function CharacterController(game) {
            this.game = game;
            this.isHoldingKey = false;
            this.diamondCount = 0;
        }
        CharacterController.prototype.create = function (lucy) {
            this.character = lucy;
            var lucyPosition = Utils.getWorldPosition(this.character.position.x, this.character.position.y);
            this.sprite = this.game.add.sprite(lucyPosition.x, lucyPosition.y, 'lucy');
            this.sprite.animations.add('walk0', Phaser.Animation.generateFrameNames('walkN', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('walk1', Phaser.Animation.generateFrameNames('walkE', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('walk2', Phaser.Animation.generateFrameNames('walkS', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('walk3', Phaser.Animation.generateFrameNames('walkW', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('itemKey', Phaser.Animation.generateFrameNames('itemKey', 1, 16, '', 4), 24, false, false);
            this.sprite.animations.add('itemDiamond', Phaser.Animation.generateFrameNames('itemDiamond', 1, 16, '', 4), 24, false, false);
            this.sprite.animations.add('burn', Phaser.Animation.generateFrameNames('burn', 1, 30, '', 4), 24, false, false);
            this.game.collisionController.enableCharacter(this, this.sprite);
            this.updateDirection();
            this.sndDiamond = this.game.add.audio('diamond', 0.5, false);
            this.sndKey = this.game.add.audio('key', 0.5, false);
            this.sndDeath = this.game.add.audio('laser', 0.5, false);
        };
        CharacterController.prototype.moveBy = function (x, y, next) {
            var _this = this;
            var currentPos = this.character.position;
            var newPos = new TileCoordinate(currentPos.x + x, currentPos.y + y);
            var worldPos = Utils.getWorldPosition(newPos.x, newPos.y);
            var delta = Math.abs(x || y);
            var animationName = 'walk' + this.character.direction;
            var animation = this.sprite.animations.play(animationName);
            var moveTween = this.game.add.tween(this.sprite).to({
                'x': worldPos.x,
                'y': worldPos.y
            }, delta * 500);
            moveTween.onComplete.add(function () {
                _this.character.position = newPos;
                var collision = _this.game.collisionController.checkCollisions(_this.sprite);
                if (collision) {
                    _this.onCollision(collision, next);
                }
                else {
                    next();
                }
            });
            moveTween.start();
        };
        CharacterController.prototype.rotateTo = function (direction, next) {
            this.updateDirection();
            var waitTween = this.game.add.tween(this.sprite).to({}, 500);
            waitTween.onComplete.add(next);
            waitTween.start();
        };
        CharacterController.prototype.speak = function (text, next) {
            this.game.uiController.showSpeechDialog('lucy', text, next);
        };
        CharacterController.prototype.updateDirection = function () {
            var animationName = 'walk' + this.character.direction;
            this.sprite.animations.stop(animationName, true);
        };
        CharacterController.prototype.update = function () {
        };
        CharacterController.prototype.respawn = function (newPos) {
            var worldPos = Utils.getWorldPosition(newPos.x, newPos.y);
            this.character.position = newPos;
            this.sprite.position.set(worldPos.x, worldPos.y);
        };
        CharacterController.prototype.onCollision = function (data, next) {
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
        };
        return CharacterController;
    })();
    return CharacterController;
});
//# sourceMappingURL=CharacterController.js.map