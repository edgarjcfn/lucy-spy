import ICommand = require("commands/ICommand");
import ICharacterController = require("controllers/ICharacterController");
import Action = require("delegates/Action");
import Character = require("models/Character");
import Direction = require("models/Direction");

class MoveCommand implements ICommand {
	next: Action;
	amount: number;
	controller: ICharacterController;

	constructor(amount: number, controller: ICharacterController) {
		this.amount = amount;
		this.controller = controller;
	}

	execute(): void {
		var character = this.controller.character;

		switch (character.direction) {
			case (Direction.N):
				this.controller.moveBy(0, -(this.amount), this.next);
				break;
			case (Direction.S):
				this.controller.moveBy(0, (this.amount), this.next);
				break;
			case (Direction.E):
				this.controller.moveBy((this.amount), 0, this.next);
				break;
			case (Direction.W):
				this.controller.moveBy(-(this.amount), 0, this.next);
				break;
			default:
				console.log('Invalid direction');
				break;
		}
	}
}

export = MoveCommand;