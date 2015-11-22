define(["require", "exports", "models/Direction"], function (require, exports, Direction) {
    var MoveCommand = (function () {
        function MoveCommand(amount, controller) {
            this.amount = amount;
            this.controller = controller;
        }
        MoveCommand.prototype.execute = function () {
            var character = this.controller.character;
            switch (character.direction) {
                case (Direction.N):
                    this.controller.moveBy(0, -(this.amount), this.next);
                    break;
                case (Direction.S):
                    this.controller.moveBy(0, (this.amount), this.next);
                    break;
                case (Direction.E):
                    this.controller.moveBy((this.amount), 0, this.next);
                    break;
                case (Direction.W):
                    this.controller.moveBy(-(this.amount), 0, this.next);
                    break;
                default:
                    console.log('Invalid direction');
                    break;
            }
        };
        return MoveCommand;
    })();
    return MoveCommand;
});
//# sourceMappingURL=MoveCmd.js.map