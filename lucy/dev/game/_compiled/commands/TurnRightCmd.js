define(["require", "exports"], function (require, exports) {
    var TurnRightCommand = (function () {
        function TurnRightCommand(controller) {
            this.characterController = controller;
        }
        TurnRightCommand.prototype.execute = function () {
            var newDirection = (this.characterController.character.direction + 1) % 4;
            this.characterController.character.direction = newDirection;
            this.characterController.rotateTo(newDirection, this.next);
        };
        return TurnRightCommand;
    })();
    return TurnRightCommand;
});
//# sourceMappingURL=TurnRightCmd.js.map