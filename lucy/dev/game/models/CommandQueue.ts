module KodingSpy.Command {

    interface ExecuteDelegate {
        (x: number):void;
    }

    class ExecutionListItem {
        command: ICommand;
        lineNumber: number;

        constructor(command, lineNumber) {
            this.command = command;
            this.lineNumber = lineNumber;
        }
    }

    export class CommandQueue {
        commands: Array<ExecutionListItem>;
        onExecute: ExecuteDelegate;

        private _currentIndex: number;

        constructor(onExecute: ExecuteDelegate) {
            this.commands = [];
            this.onExecute = onExecute;
            this._currentIndex = 0;
        }

        append(command: ICommand, lineNumber: number):void {
            command.next = this.proceed.bind(this);
            this.commands.push(new ExecutionListItem(command, lineNumber));
        }

        proceed() : void {
            this._currentIndex++;
            this.execute();
        }
        
        execute() : void {
            if (this._currentIndex < this.commands.length)
            {
                var executionListItem = this.commands[this._currentIndex];
                // Notify line number
                this.onExecute(executionListItem.lineNumber);
                // Execute command
                executionListItem.command.execute();
            }
            else
            {
                console.log('Command Queue finished');
                this.onExecute(-1);
            }
        }

        clear() : void {
            this.commands = [];
        }
    }
}
