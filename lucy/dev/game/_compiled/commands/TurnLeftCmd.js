define(["require", "exports"], function (require, exports) {
    var TurnLeftCommand = (function () {
        function TurnLeftCommand(controller) {
            this.characterController = controller;
        }
        TurnLeftCommand.prototype.execute = function () {
            var newDirection = this.characterController.character.direction - 1;
            if (newDirection < 0) {
                newDirection = 3;
            }
            this.characterController.character.direction = newDirection;
            this.characterController.rotateTo(newDirection, this.next);
        };
        return TurnLeftCommand;
    })();
    return TurnLeftCommand;
});
//# sourceMappingURL=TurnLeftCmd.js.map