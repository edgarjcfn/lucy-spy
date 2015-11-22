import Character = require("models/Character");
import Direction = require("models/Direction");
import Action = require("delegates/Action");

interface ICharacterController {
    character: Character;

    moveBy(x: number, y: number, next: Action): void;
    rotateTo(direction: Direction, next: Action): void;
    speak(text: String, next: Action): void;
}

export = ICharacterController;
