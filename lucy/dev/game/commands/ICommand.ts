import Action = require("delegates/Action");

interface ICommand {
	next: Action;
	execute(): void;
}

export = ICommand;