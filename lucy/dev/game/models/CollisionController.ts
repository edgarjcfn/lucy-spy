module KodingSpy.Controller {

    export class CollisionController {

        game:KodingSpy.Game;
        layers:Array<Phaser.TilemapLayer>;
        character:Phaser.Sprite;

        constructor(game :KodingSpy.Game) {
            this.game = game;
            this.layers = [];
        }

        // TODO:  try this http://www.gamedevacademy.org/html5-phaser-tutorial-top-down-games-with-tiled/
        startPhysics() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
        }

        enableCharacter(sprite :Phaser.Sprite) :void {
            this.game.physics.enable(sprite);
            this.character = sprite;
        }

        enableLayer(layer :Phaser.TilemapLayer) :void {
            this.layers.push(layer);
        }

        update(){
            for (var i=0; i < this.layers.length; i++) {
                if (this.game.physics.arcade.collide(this.character, this.layers[i])) {
                    console.log("collision!!!");
                }
            }
        }
    }
}
