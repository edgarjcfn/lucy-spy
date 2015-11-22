import ActionNumber = require("delegates/ActionNumber");
import ICommand = require("commands/ICommand");

class CommandQueue {
    commands: Array<CommandQueue.ExecutionListItem>;
    onExecute: ActionNumber;

    private _currentIndex: number;

    constructor(onExecute: ActionNumber) {
        this.commands = [];
        this.onExecute = onExecute;
        this._currentIndex = 0;
    }

    append(command: ICommand, lineNumber: number): void {
        command.next = this.proceed.bind(this);
        this.commands.push(new CommandQueue.ExecutionListItem(command, lineNumber));
    }

    proceed(): void {
        this._currentIndex++;
        this.execute();
    }

    execute(): void {
        if (this._currentIndex < this.commands.length) {
            var executionListItem = this.commands[this._currentIndex];
            // Notify line number
            this.onExecute(executionListItem.lineNumber);
            // Execute command
            executionListItem.command.execute();
        }
        else {
            console.log('Command Queue finished');
            this.onExecute(-1);
        }
    }

    clear(): void {
        this.commands = [];
    }
}

module CommandQueue {
    export class ExecutionListItem {
        command: ICommand;
        lineNumber: number;

        constructor(command, lineNumber) {
            this.command = command;
            this.lineNumber = lineNumber;
        }
    }
}


export = CommandQueue;
