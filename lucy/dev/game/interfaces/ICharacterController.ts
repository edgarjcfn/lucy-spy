module KodingSpy.Interfaces {
    export interface ICharacterController {
        character: KodingSpy.Model.Character;

        moveBy(x: number, y: number, next: KodingSpy.Controller.ControllerDelegate) : void;
        rotateTo(direction: KodingSpy.Model.Direction, next: KodingSpy.Controller.ControllerDelegate) : void;
    }
}
