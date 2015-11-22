define(["require", "exports"], function (require, exports) {
    var SpeakCommand = (function () {
        function SpeakCommand(say, controller) {
            this.controller = controller;
            this.content = say;
        }
        SpeakCommand.prototype.execute = function () {
            this.controller.speak(this.content, this.next);
        };
        return SpeakCommand;
    })();
    return SpeakCommand;
});
//# sourceMappingURL=SpeakCmd.js.map