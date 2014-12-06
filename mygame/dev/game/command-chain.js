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