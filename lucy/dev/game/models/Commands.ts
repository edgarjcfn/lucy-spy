import CharacterAnimator = KodingSpy.Interfaces.ICharacterController;

module KodingSpy.Command {

    export interface ICommand {
        next: KodingSpy.Controller.ControllerDelegate;
        execute():void;
    }

    //
    // Move
    //
    export class MoveCommand implements ICommand {
        next: KodingSpy.Controller.ControllerDelegate;
        amount: number;
        animator: CharacterAnimator;

        constructor(amount: number, controller: CharacterAnimator) {
            this.amount = amount;
            this.animator = controller;
        }

        execute():void {
            var character = this.animator.character;

            this.execute = function() {

                switch (character.direction) {
                    case (KodingSpy.Model.Direction.N) :
                        this.animator.moveBy(0, -(this.tiles), this.next);
                    break;
                    case (KodingSpy.Model.Direction.S) :
                        this.animator.moveBy(0, (this.tiles), this.next);
                    break;
                    case (KodingSpy.Model.Direction.E) :
                        this.animator.moveBy((this.tiles), 0, this.next);
                    break;
                    case (KodingSpy.Model.Direction.W) :
                        this.animator.moveBy(-(this.tiles), 0, this.next);
                    break;
                }
            }
        }
    }

    //
    // Turn Left
    //
    export class TurnLeftCommand implements ICommand {
        next: KodingSpy.Controller.ControllerDelegate;
        animator: CharacterAnimator;

        constructor(controller: CharacterAnimator) {
            this.animator = controller;
        }

        execute():void {
            var newDirection = this.animator.character.direction-1;
            if (newDirection < 0)
            {
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
        next: KodingSpy.Controller.ControllerDelegate;
        animator: CharacterAnimator;

        constructor(controller: CharacterAnimator) {
            this.animator = controller;
        }

        execute():void {
            var newDirection = (this.animator.character.direction+1) % 4;
            this.animator.character.direction = newDirection;
            this.animator.rotateTo(newDirection, this.next);

        }
    }

}
