//
// Character Animator
// 
var CharacterAnimator = function(scene, character) {
    this._sprite = character
    this._game = scene;
    this._direction = Direction.N;
}

CharacterAnimator.prototype.moveBy = function (x, y, next) {
    var worldPos = getWorldPos(this._sprite, x, y);
    var moveTween = this._game.add.tween(this._sprite).to(worldPos, 1000);
    moveTween.onComplete.add(next);
    moveTween.start();
}

CharacterAnimator.prototype.rotateTo = function(direction, next) {
    var angle = getDirectionAngle(direction);
    console.debug(angle);
    this._direction = direction;
    this._sprite.rotation = angle;
    next();
}

CharacterAnimator.prototype.update = function(sprite) {

}

// 
// Helper functions
//
function getDirectionAngle(dir) {
    switch (dir) 
    {
        case Direction.N :
            return 0;
        case Direction.E : 
            return Math.PI/2;
        case Direction.S :
            return Math.PI;
        case Direction.W : 
            return 3*(Math.PI/2);
    }

    return 0;
}

function getWorldPos(sprite, x, y) {
    return {
        'x' : (x * 110) + sprite.x  , 
        'y' : (y * 110) + sprite.y
    };
}