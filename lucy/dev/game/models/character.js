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
