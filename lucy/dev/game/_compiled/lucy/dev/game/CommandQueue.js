define(["require", "exports"], function (require, exports) {
    var CommandQueue = (function () {
        function CommandQueue(onExecute) {
            this.commands = [];
            this.onExecute = onExecute;
            this._currentIndex = 0;
        }
        CommandQueue.prototype.append = function (command, lineNumber) {
            command.next = this.proceed.bind(this);
            this.commands.push(new CommandQueue.ExecutionListItem(command, lineNumber));
        };
        CommandQueue.prototype.proceed = function () {
            this._currentIndex++;
            this.execute();
        };
        CommandQueue.prototype.execute = function () {
            if (this._currentIndex < this.commands.length) {
                var executionListItem = this.commands[this._currentIndex];
                this.onExecute(executionListItem.lineNumber);
                executionListItem.command.execute();
            }
            else {
                console.log('Command Queue finished');
                this.onExecute(-1);
            }
        };
        CommandQueue.prototype.clear = function () {
            this.commands = [];
        };
        return CommandQueue;
    })();
    var CommandQueue;
    (function (CommandQueue) {
        var ExecutionListItem = (function () {
            function ExecutionListItem(command, lineNumber) {
                this.command = command;
                this.lineNumber = lineNumber;
            }
            return ExecutionListItem;
        })();
        CommandQueue.ExecutionListItem = ExecutionListItem;
    })(CommandQueue || (CommandQueue = {}));
    return CommandQueue;
});
//# sourceMappingURL=CommandQueue.js.map