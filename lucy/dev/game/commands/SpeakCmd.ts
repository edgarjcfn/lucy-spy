import ICommand = require("commands/ICommand");
import ICharacterController = require("controllers/ICharacterController");
import Action = require("delegates/Action");

class SpeakCommand implements ICommand {
	next: Action;
	controller: ICharacterController;
	content: string;

	constructor(say: string, controller: ICharacterController) {
		this.controller = controller;
		this.content = say;
	}

	execute(): void {
		this.controller.speak(this.content, this.next);
	}
}

export = SpeakCommand;