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
'use strict'; 

var Direction = {
    N: 'N',
    S: 'S',
    E: 'E',
    W: 'W',
}

var Character = function() {
    this.x = 0;
    this.y = 0;
    this.direction = Direction.N;
};

Character.prototype.moveTo = function (x, y) {
    this.x = x;
    this.y = y;
};

Character.prototype.moveBy = function (x, y) {
    this.x += x;
    this.y += y;
};

Character.prototype.get_position = function() {
    var pos = {'x':this.x, 'y':this.y};
    return pos;
};

Character.prototype.get_direction = function() {
    return this.direction;
}

Character.prototype.set_direction = function(dir) {
    this.direction = dir;
};

'use strict';

var CommandChain = function(executeHandler) {
    this.commands = [];
    this.currentIndex = 0;
    this.executeHandler = executeHandler;
};

CommandChain.prototype.append = function(command, lineNumber) {

    var _this = this;
    command.next = function() {
        _this.proceed();
    };

    this.commands.push({lineNumber:lineNumber, command:command});
};

CommandChain.prototype.proceed = function() {
    this.currentIndex++;
    this.execute();
};

CommandChain.prototype.execute = function() {
    if (this.currentIndex < this.commands.length)
    {
        var toExecute = this.commands[this.currentIndex];
        // Notify line number
        this.executeHandler(toExecute.lineNumber);
        // Execute command
        toExecute.command.execute();
    }
    else
    {
        console.log('command chain finished')
    }
};

CommandChain.prototype.clear = function () {
    this.commands = [];
};
'use strict';

var MoveCommand = function(argv, animator) {
    this.next = null;
    this.tiles = argv.tiles || 1;
    this.character = argv.character;

    this.execute = function() {

        switch (this.character.get_direction()) {
            case (Direction.N) :
                animator.moveBy(0, -(this.tiles), this.next);
            break;
            case (Direction.S) :
                animator.moveBy(0, (this.tiles), this.next);
            break;
            case (Direction.E) :
                animator.moveBy((this.tiles), 0, this.next);
            break;
            case (Direction.W) :
                animator.moveBy(-(this.tiles), 0, this.next);
            break;
        }
    }
}

var TurnLeftCommand = function(character, animator) {
    this.next = null;

    this.execute = function() {
        switch (character.get_direction()) {
            case (Direction.N) :
                character.set_direction(Direction.W);
                break;
            case (Direction.S) :
                character.set_direction(Direction.E);
                break;
            case (Direction.E) :
                character.set_direction(Direction.N);
                break;
            case (Direction.W) :
                character.set_direction(Direction.S);
                break;
        }

        var newDirection = character.get_direction();
        animator.rotateTo(newDirection, this.next);
    }
}

var TurnRightCommand = function(character, animator) {
    this.next = null;

    this.execute = function() {
        switch (character.get_direction()) {
            case (Direction.N) :
                character.set_direction(Direction.E);
                break;
            case (Direction.S) :
                character.set_direction(Direction.W);
                break;
            case (Direction.E) :
                character.set_direction(Direction.S);
                break;
            case (Direction.W) :
                character.set_direction(Direction.N);
                break;
        }

        var newDirection = character.get_direction();
        animator.rotateTo(newDirection, this.next);
    }
}


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvas', { preload: preload, create: create, update: update });

var characterAnimator;
var isoGroup;
var mainChar;

function preload() {
    game.load.image('ship', 'mygame/dev/game/assets/ship.png');
    game.load.image('background', 'mygame/dev/game/assets/background.png');

    game.time.advancedTiming = true;
}

function create() {
    // Create a group for our tiles.
    isoGroup = game.add.group();
    game.add.tileSprite(0,0, 800, 600, 'background');
    mainChar = game.add.sprite(400,300,'ship',0);
    mainChar.anchor.set(0.5, 0.5);
    characterAnimator = new CharacterAnimator(game, mainChar);
}

function update() {
    characterAnimator.update();
}