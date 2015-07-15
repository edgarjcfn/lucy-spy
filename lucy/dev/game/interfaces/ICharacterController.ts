module KodingSpy.Interfaces {
    export interface ICharacterController {
        character: KodingSpy.Model.Character;

        moveBy(x: number, y: number, next: KodingSpy.Controller.ControllerDelegate) : void;
        rotateTo(direction: KodingSpy.Model.Direction, next: KodingSpy.Controller.ControllerDelegate) : void;
        speak(text: String, next: KodingSpy.Controller.ControllerDelegate): void;
        open(direction: String, next: KodingSpy.Controller.ControllerDelegate): void;
    }
}
