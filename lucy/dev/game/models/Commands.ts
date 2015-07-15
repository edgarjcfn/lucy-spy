import CharacterAnimator = KodingSpy.Interfaces.ICharacterController;
import ControllerDelegate = KodingSpy.Controller.ControllerDelegate;

module KodingSpy.Command {

    export interface ICommand {
        next: ControllerDelegate;
        execute(): void;
    }

    //
    // Move
    //
    export class MoveCommand implements ICommand {
        next: ControllerDelegate;
        amount: number;
        animator: CharacterAnimator;

        constructor(amount: number, controller: CharacterAnimator) {
            this.amount = amount;
            this.animator = controller;
        }

        execute(): void {
            var character = this.animator.character;

            switch (character.direction) {
                case (KodingSpy.Model.Direction.N):
                    this.animator.moveBy(0, -(this.amount), this.next);
                    break;
                case (KodingSpy.Model.Direction.S):
                    this.animator.moveBy(0, (this.amount), this.next);
                    break;
                case (KodingSpy.Model.Direction.E):
                    this.animator.moveBy((this.amount), 0, this.next);
                    break;
                case (KodingSpy.Model.Direction.W):
                    this.animator.moveBy(-(this.amount), 0, this.next);
                    break;
                default:
                    console.log('Invalid direction');
                    break;
            }
        }
    }

    //
    // Turn Left
    //
    export class TurnLeftCommand implements ICommand {
        next: ControllerDelegate;
        animator: CharacterAnimator;

        constructor(controller: CharacterAnimator) {
            this.animator = controller;
        }

        execute(): void {
            var newDirection = this.animator.character.direction - 1;
            if (newDirection < 0) {
                newDirection = 3;
            }
            this.animator.character.direction = newDirection;
            this.animator.rotateTo(newDirection, this.next);
        }
    }

    //
    // Turn Right
    //
    export class TurnRightCommand implements ICommand {
        next: ControllerDelegate;
        animator: CharacterAnimator;

        constructor(controller: CharacterAnimator) {
            this.animator = controller;
        }

        execute(): void {
            var newDirection = (this.animator.character.direction + 1) % 4;
            this.animator.character.direction = newDirection;
            this.animator.rotateTo(newDirection, this.next);

        }
    }

    //
    // Speak
    //
    export class SpeakCommand implements ICommand {
        next: ControllerDelegate;
        controller: CharacterAnimator;
        content: string;

        constructor(say: string, controller: CharacterAnimator) {
            this.controller = controller;
            this.content = say;
        }

        execute(): void {
            this.controller.speak(this.content, this.next);
        }
    }

    //
    // Open Box 
    // 
    export class OpenCommand implements ICommand {
        next: ControllerDelegate;
        controller: CharacterAnimator;
        direction: string;

        constructor(controller: CharacterAnimator) {
            this.controller = controller;
            var directions = ['left','right']
            var random = Math.floor(Math.random() * 10)
            this.direction = directions[random % 2];
        }

        execute():void {
            this.controller.open(this.direction, this.next);
        }


    }

}
