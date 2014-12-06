var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvas', { preload: preload, create: create, update: update });

var characterAnimator;
var isoGroup;
var mainChar;

function preload() {
    game.load.image('ship', 'mygame/dev/game/assets/ship.png');
    game.load.image('background', 'mygame/dev/game/assets/background.png');

    game.time.advancedTiming = true;
}

function create() {
    // Create a group for our tiles.
    isoGroup = game.add.group();
    game.add.tileSprite(0,0, 800, 600, 'background');
    mainChar = game.add.sprite(400,300,'ship',0);
    mainChar.anchor.set(0.5, 0.5);
    characterAnimator = new CharacterAnimator(game, mainChar);
}

function update() {
    characterAnimator.update();
}