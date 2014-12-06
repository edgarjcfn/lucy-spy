module KodingSpy {
    export class Utils {
        static getDirectionAngle(direction:KodingSpy.Model.Direction) : number {
            switch (direction) {
                case KodingSpy.Model.Direction.N :
                    return 0;
                case KodingSpy.Model.Direction.E :
                    return Math.PI/2;
                case KodingSpy.Model.Direction.S :
                    return Math.PI;
                case KodingSpy.Model.Direction.W :
                    return 3*(Math.PI/2);
            }
        }

        static getWorldPosition(x :number, y :number) : Phaser.Point {
            return new Phaser.Point(x * 50, y * 50);
        }
    }
}
