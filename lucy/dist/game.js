var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var KodingSpy;
(function (KodingSpy) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'gameCanvas', null);
            this.allLevels = [
                'Level01',
                'Level02',
                'Level03',
                'Level04',
                'Level05',
                'Level06',
                'Level07',
                'Level08'
            ];
            this.currentLevelIndex = -1;
            this.state.add('Boot', KodingSpy.Boot, false);
            this.state.add('Preloader', KodingSpy.Preloader, false);
            this.state.add('Gameplay', KodingSpy.Gameplay, false);
        }
        Game.prototype.boot = function () {
            _super.prototype.boot.call(this);
            this.state.start('Boot');
        };
        Game.prototype.gotoNextLevel = function () {
            this.currentLevelIndex++;
            this.startCurrentLevel();
        };
        Game.prototype.startCurrentLevel = function () {
            this.state.start('Gameplay', true, false);
            AceLoader(this.currentLevel());
        };
        Game.prototype.startLevelFromName = function (level) {
            this.currentLevelIndex = this.allLevels.indexOf(level);
            this.startCurrentLevel();
        };
        Game.prototype.levelCompleted = function (diamonds) {
            ShowMessage('', diamonds);
            this.gotoNextLevel();
        };
        Game.prototype.currentLevel = function () {
            return this.allLevels[this.currentLevelIndex];
        };
        Game.prototype.setSoundEnabled = function (enabled) {
            this.sound.pauseAll();
        };
        return Game;
    })(Phaser.Game);
    KodingSpy.Game = Game;
})(KodingSpy || (KodingSpy = {}));
var KodingSpy;
(function (KodingSpy) {
    var Model;
    (function (Model) {
        (function (Direction) {
            Direction[Direction["N"] = 0] = "N";
            Direction[Direction["E"] = 1] = "E";
            Direction[Direction["S"] = 2] = "S";
            Direction[Direction["W"] = 3] = "W";
        })(Model.Direction || (Model.Direction = {}));
        var Direction = Model.Direction;
        var TileCoordinate = (function () {
            function TileCoordinate(x, y) {
                this.x = x;
                this.y = y;
            }
            return TileCoordinate;
        })();
        Model.TileCoordinate = TileCoordinate;
        var Character = (function () {
            function Character(x, y, direction) {
                this.position = new TileCoordinate(x, y);
                this.direction = direction;
            }
            Character.prototype.moveBy = function (x, y) {
                this.position.x += x;
                this.position.y += y;
            };
            Character.prototype.moveTo = function (coord) {
                this.position = coord;
            };
            return Character;
        })();
        Model.Character = Character;
    })(Model = KodingSpy.Model || (KodingSpy.Model = {}));
})(KodingSpy || (KodingSpy = {}));
var KodingSpy;
(function (KodingSpy) {
    var Controller;
    (function (Controller) {
        var CharacterController = (function () {
            function CharacterController(game) {
                this.game = game;
                this.isHoldingKey = false;
                this.diamondCount = 0;
            }
            CharacterController.prototype.create = function (lucy) {
                this.character = lucy;
                var lucyPosition = KodingSpy.Utils.getWorldPosition(this.character.position.x, this.character.position.y);
                this.sprite = this.game.add.sprite(lucyPosition.x, lucyPosition.y, 'lucy');
                this.sprite.animations.add('walk0', Phaser.Animation.generateFrameNames('walkN', 1, 16, '', 4), 24, true, false);
                this.sprite.animations.add('walk1', Phaser.Animation.generateFrameNames('walkE', 1, 16, '', 4), 24, true, false);
                this.sprite.animations.add('walk2', Phaser.Animation.generateFrameNames('walkS', 1, 16, '', 4), 24, true, false);
                this.sprite.animations.add('walk3', Phaser.Animation.generateFrameNames('walkW', 1, 16, '', 4), 24, true, false);
                this.sprite.animations.add('itemPython', Phaser.Animation.generateFrameNames('itemPython', 1, 16, '', 4), 24, false, false);
                this.sprite.animations.add('itemDiamond', Phaser.Animation.generateFrameNames('itemDiamond', 1, 16, '', 4), 24, false, false);
                this.sprite.animations.add('burn', Phaser.Animation.generateFrameNames('burn', 1, 30, '', 4), 24, false, false);
                this.game.collisionController.enableCharacter(this);
                this.updateDirection();
                this.sndDiamond = this.game.add.audio('diamond', 0.5, false);
                this.sndPython = this.game.add.audio('python', 0.5, false);
                this.sndDeath = this.game.add.audio('laser', 0.5, false);
            };
            CharacterController.prototype.moveBy = function (x, y, next) {
                var _this = this;
                var currentPos = this.character.position;
                var newPos = new KodingSpy.Model.TileCoordinate(currentPos.x + x, currentPos.y + y);
                var worldPos = KodingSpy.Utils.getWorldPosition(newPos.x, newPos.y);
                var delta = Math.abs(x || y);
                var animationName = 'walk' + this.character.direction;
                var animation = this.sprite.animations.play(animationName);
                var moveTween = this.game.add.tween(this.sprite).to({
                    'x': worldPos.x,
                    'y': worldPos.y
                }, delta * 500);
                moveTween.onComplete.add(function () {
                    _this.character.position = newPos;
                    var collision = _this.game.collisionController.checkCollisions();
                    if (collision) {
                        _this.onCollision(collision, next);
                    }
                    else {
                        next();
                    }
                });
                moveTween.start();
            };
            CharacterController.prototype.rotateTo = function (direction, next) {
                this.updateDirection();
                var waitTween = this.game.add.tween(this.sprite).to({}, 500);
                waitTween.onComplete.add(next);
                waitTween.start();
            };
            CharacterController.prototype.updateDirection = function () {
                var animationName = 'walk' + this.character.direction;
                this.sprite.animations.stop(animationName, true);
            };
            CharacterController.prototype.update = function () {
            };
            CharacterController.prototype.respawn = function (newPos) {
                var worldPos = KodingSpy.Utils.getWorldPosition(newPos.x, newPos.y);
                this.character.position = newPos;
                this.sprite.position.set(worldPos.x, worldPos.y);
            };
            CharacterController.prototype.onCollision = function (data, next) {
                switch (data.name) {
                    case "diamond":
                        this.diamondCount++;
                        this.sndDiamond.play();
                        this.game.collisionController.disableCollider(data.sprite, data.name);
                        data.sprite.destroy();
                        var diamondAnim = this.sprite.animations.play("itemDiamond");
                        var waitTween = this.game.add.tween(this.sprite).to({}, 1000);
                        waitTween.onComplete.add(next);
                        waitTween.start();
                        break;
                    case "python":
                        this.isHoldingKey = true;
                        this.sndPython.play();
                        this.game.collisionController.disableCollider(data.sprite, data.name);
                        data.sprite.destroy();
                        var pythonAnim = this.sprite.animations.play("itemPython");
                        var waitTween = this.game.add.tween(this.sprite).to({}, 1000);
                        waitTween.onComplete.add(next);
                        waitTween.start();
                        break;
                    case "laserCannon":
                    case "laserBeamHorizontal":
                    case "laserBeamVertical":
                        this.sndDeath.play();
                        var burnanim = this.sprite.animations.play("burn");
                        break;
                    case "door":
                        if (this.isHoldingKey) {
                            this.game.levelCompleted(this.diamondCount);
                        }
                        break;
                }
            };
            return CharacterController;
        })();
        Controller.CharacterController = CharacterController;
    })(Controller = KodingSpy.Controller || (KodingSpy.Controller = {}));
})(KodingSpy || (KodingSpy = {}));
var KodingSpy;
(function (KodingSpy) {
    var Controller;
    (function (Controller) {
        var ColliderData = (function () {
            function ColliderData(name, sprite) {
                this.name = name;
                this.sprite = sprite;
            }
            return ColliderData;
        })();
        Controller.ColliderData = ColliderData;
        var CollisionController = (function () {
            function CollisionController(game) {
                this.game = game;
                this.colliders = {};
            }
            CollisionController.prototype.startPhysics = function () {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
            };
            CollisionController.prototype.enableCharacter = function (controller) {
                var characterSprite = controller.sprite;
                this.game.physics.enable(characterSprite);
                this.characterController = controller;
                characterSprite.body.width = 40;
                characterSprite.body.height = 40;
                characterSprite.body.offset = new Phaser.Point(5, 55);
            };
            CollisionController.prototype.enableCollider = function (sprite, name) {
                this.game.physics.enable(sprite);
                if (!(this.colliders[name])) {
                    this.colliders[name] = [];
                }
                this.colliders[name].push(sprite);
            };
            CollisionController.prototype.disableCollider = function (sprite, name) {
                sprite.body.destroy();
                var sameTypeColliders = this.colliders[name];
                sameTypeColliders.splice(sameTypeColliders.indexOf(sprite), 1);
            };
            CollisionController.prototype.checkCollisions = function () {
                var player = this.characterController.sprite.body;
                for (var colliderName in this.colliders) {
                    var colliderArray = this.colliders[colliderName];
                    for (var i = 0; i < colliderArray.length; i++) {
                        var collider = colliderArray[i].body;
                        if (this.game.physics.arcade.intersects(player, collider)) {
                            return new ColliderData(colliderName, colliderArray[i]);
                        }
                    }
                }
                return null;
            };
            CollisionController.prototype.update = function () {
                this.game.debug.bodyInfo(this.characterController.sprite, 32, 320);
                this.game.debug.body(this.characterController.sprite);
                for (var colliderName in this.colliders) {
                    var colliderArray = this.colliders[colliderName];
                    for (var i = 0; i < colliderArray.length; i++) {
                        var collider = colliderArray[i];
                        this.game.debug.body(collider);
                    }
                }
            };
            return CollisionController;
        })();
        Controller.CollisionController = CollisionController;
    })(Controller = KodingSpy.Controller || (KodingSpy.Controller = {}));
})(KodingSpy || (KodingSpy = {}));
var KodingSpy;
(function (KodingSpy) {
    var Command;
    (function (Command) {
        var ExecutionListItem = (function () {
            function ExecutionListItem(command, lineNumber) {
                this.command = command;
                this.lineNumber = lineNumber;
            }
            return ExecutionListItem;
        })();
        var CommandQueue = (function () {
            function CommandQueue(onExecute) {
                this.commands = [];
                this.onExecute = onExecute;
                this._currentIndex = 0;
            }
            CommandQueue.prototype.append = function (command, lineNumber) {
                command.next = this.proceed.bind(this);
                this.commands.push(new ExecutionListItem(command, lineNumber));
            };
            CommandQueue.prototype.proceed = function () {
                this._currentIndex++;
                this.execute();
            };
            CommandQueue.prototype.execute = function () {
                if (this._currentIndex < this.commands.length) {
                    SkulptRunning = true;
                    var executionListItem = this.commands[this._currentIndex];
                    this.onExecute(executionListItem.lineNumber);
                    executionListItem.command.execute();
                }
                else {
                    SkulptRunning = false;
                    console.log('Command Queue finished');
                    this.onExecute(-1);
                }
            };
            CommandQueue.prototype.clear = function () {
                this.commands = [];
            };
            return CommandQueue;
        })();
        Command.CommandQueue = CommandQueue;
    })(Command = KodingSpy.Command || (KodingSpy.Command = {}));
})(KodingSpy || (KodingSpy = {}));
var KodingSpy;
(function (KodingSpy) {
    var Command;
    (function (Command) {
        var MoveCommand = (function () {
            function MoveCommand(amount, controller) {
                this.amount = amount;
                this.animator = controller;
            }
            MoveCommand.prototype.execute = function () {
                var character = this.animator.character;
                switch (character.direction) {
                    case (0 /* N */):
                        this.animator.moveBy(0, -(this.amount), this.next);
                        break;
                    case (2 /* S */):
                        this.animator.moveBy(0, (this.amount), this.next);
                        break;
                    case (1 /* E */):
                        this.animator.moveBy((this.amount), 0, this.next);
                        break;
                    case (3 /* W */):
                        this.animator.moveBy(-(this.amount), 0, this.next);
                        break;
                    default:
                        console.log('Invalid direction');
                        break;
                }
            };
            return MoveCommand;
        })();
        Command.MoveCommand = MoveCommand;
        var TurnLeftCommand = (function () {
            function TurnLeftCommand(controller) {
                this.animator = controller;
            }
            TurnLeftCommand.prototype.execute = function () {
                var newDirection = this.animator.character.direction - 1;
                if (newDirection < 0) {
                    newDirection = 3;
                }
                this.animator.character.direction = newDirection;
                this.animator.rotateTo(newDirection, this.next);
            };
            return TurnLeftCommand;
        })();
        Command.TurnLeftCommand = TurnLeftCommand;
        var TurnRightCommand = (function () {
            function TurnRightCommand(controller) {
                this.animator = controller;
            }
            TurnRightCommand.prototype.execute = function () {
                var newDirection = (this.animator.character.direction + 1) % 4;
                this.animator.character.direction = newDirection;
                this.animator.rotateTo(newDirection, this.next);
            };
            return TurnRightCommand;
        })();
        Command.TurnRightCommand = TurnRightCommand;
    })(Command = KodingSpy.Command || (KodingSpy.Command = {}));
})(KodingSpy || (KodingSpy = {}));
var KodingSpy;
(function (KodingSpy) {
    var Controller;
    (function (Controller) {
        var LevelController = (function () {
            function LevelController(game, levelName) {
                this.game = game;
                this.levelName = levelName;
                this.spawnPosition = new KodingSpy.Model.TileCoordinate(8, 9);
            }
            LevelController.prototype.create = function () {
                this.map = this.game.add.tilemap(this.levelName);
                this.map.addTilesetImage('floor_walls', 'tilemap');
                this.map.addTilesetImage('door', 'doorTilemap');
                var floor = this.map.createLayer('Floor');
                console.log(floor);
                var collision = this.map.createLayer('Collision');
                this.map.setCollisionByExclusion([], true, 'Collision');
                this.buildItems();
            };
            LevelController.prototype.buildItems = function () {
                for (var y = 0; y < 12; y++) {
                    for (var x = 0; x < 16; x++) {
                        var tile = this.map.getTile(x, y, 'Collision', true);
                        if (tile.properties.type) {
                            var tileType = tile.properties.type;
                            var frames = tile.properties.frames;
                            if (tileType != "door" && tileType != "wall") {
                                this.game.add.sprite(tile.worldX, tile.worldY, 'floor');
                            }
                            if (tileType == "spawn") {
                                this.spawnPosition = new KodingSpy.Model.TileCoordinate(x, y);
                            }
                            else {
                                var sprite;
                                if (tileType == "wall") {
                                    sprite = this.game.add.sprite(tile.worldX, tile.worldY, 'empty');
                                }
                                else {
                                    sprite = this.game.add.sprite(tile.worldX, tile.worldY, 'items');
                                    sprite.animations.add(tileType, Phaser.Animation.generateFrameNames(tileType, 0, frames - 1, '', 4), 24, true, false);
                                    sprite.animations.play(tileType);
                                }
                                this.game.collisionController.enableCollider(sprite, tileType);
                            }
                        }
                    }
                }
            };
            return LevelController;
        })();
        Controller.LevelController = LevelController;
    })(Controller = KodingSpy.Controller || (KodingSpy.Controller = {}));
})(KodingSpy || (KodingSpy = {}));
var KodingSpy;
(function (KodingSpy) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'lucy/dev/game/assets/loader.png');
        };
        Boot.prototype.create = function () {
            this.game.time.advancedTiming = true;
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    KodingSpy.Boot = Boot;
})(KodingSpy || (KodingSpy = {}));
var KodingSpy;
(function (KodingSpy) {
    var Gameplay = (function (_super) {
        __extends(Gameplay, _super);
        function Gameplay() {
            _super.apply(this, arguments);
        }
        Gameplay.prototype.create = function () {
            this.lucy = new KodingSpy.Model.Character(0, 0, 0 /* N */);
            var kodingSpyGame = this.game;
            var levelToPlay = kodingSpyGame.currentLevel();
            kodingSpyGame.collisionController = new KodingSpy.Controller.CollisionController(kodingSpyGame);
            this.levelController = new KodingSpy.Controller.LevelController(kodingSpyGame, levelToPlay);
            this.levelController.create();
            this.characterController = new KodingSpy.Controller.CharacterController(kodingSpyGame);
            this.characterController.create(this.lucy);
            this.characterController.respawn(this.levelController.spawnPosition);
            SkulptAnimator = this.characterController;
            this.game.sound.pauseAll();
            var music = this.game.add.audio('bgm', 0.3, true);
            music.play();
        };
        Gameplay.prototype.preload = function () {
        };
        Gameplay.prototype.update = function () {
        };
        Gameplay.prototype.render = function () {
            var kodingSpyGame = this.game;
            kodingSpyGame.collisionController.update();
        };
        return Gameplay;
    })(Phaser.State);
    KodingSpy.Gameplay = Gameplay;
})(KodingSpy || (KodingSpy = {}));
var KodingSpy;
(function (KodingSpy) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.atlasJSONHash('items', 'lucy/dev/game/assets/items.png', 'lucy/dev/game/assets/items.json');
            this.load.image('tilemap', 'lucy/dev/game/assets/tiles/TileSheet.png');
            this.load.image('doorTilemap', 'lucy/dev/game/assets/tiles/door.png');
            this.load.image('floor', 'lucy/dev/game/assets/tiles/tileFLOOR.png');
            this.load.image('empty', 'lucy/dev/game/assets/tiles/empty.png');
            this.load.atlasJSONHash('lucy', 'lucy/dev/game/assets/char/lucy.png', 'lucy/dev/game/assets/char/lucy.json');
            var myGame = this.game;
            for (var i = 0; i < myGame.allLevels.length; i++) {
                var level = myGame.allLevels[i];
                this.load.tilemap(level, 'lucy/dev/game/assets/levels/' + level + '.json', null, Phaser.Tilemap.TILED_JSON);
            }
            this.load.audio('bgm', 'lucy/dev/game/assets/sounds/soundtrack.ogg');
            this.load.audio('python', 'lucy/dev/game/assets/sounds/python.ogg');
            this.load.audio('diamond', 'lucy/dev/game/assets/sounds/diamond.ogg');
            this.load.audio('laser', 'lucy/dev/game/assets/sounds/laser.ogg');
            this.load.audio('scream', 'lucy/dev/game/assets/sounds/scream.ogg');
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        Preloader.prototype.startGame = function () {
            var myGame = this.game;
            myGame.gotoNextLevel();
        };
        return Preloader;
    })(Phaser.State);
    KodingSpy.Preloader = Preloader;
})(KodingSpy || (KodingSpy = {}));
var KodingSpy;
(function (KodingSpy) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.getDirectionAngle = function (direction) {
            switch (direction) {
                case 0 /* N */:
                    return 0;
                case 1 /* E */:
                    return Math.PI / 2;
                case 2 /* S */:
                    return Math.PI;
                case 3 /* W */:
                    return 3 * (Math.PI / 2);
            }
        };
        Utils.getWorldPosition = function (x, y) {
            return new Phaser.Point(x * 50, y * 50);
        };
        return Utils;
    })();
    KodingSpy.Utils = Utils;
})(KodingSpy || (KodingSpy = {}));
//# sourceMappingURL=game.js.map