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

