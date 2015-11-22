import ICommand = require("commands/ICommand");
import ICharacterController = require("controllers/ICharacterController");
import Action = require("delegates/Action");

class TurnRightCommand implements ICommand {
	next: Action;
	characterController: ICharacterController;

	constructor(controller: ICharacterController) {
		this.characterController = controller;
	}

	execute(): void {
		var newDirection = (this.characterController.character.direction + 1) % 4;
		this.characterController.character.direction = newDirection;
		this.characterController.rotateTo(newDirection, this.next);

	}
}

export = TurnRightCommand;