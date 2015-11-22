//
// lucy/dev/game/_compiled/CommandQueue.js
//
define(["require", "exports"], function (require, exports) {
    var CommandQueue = (function () {
        function CommandQueue(onExecute) {
            this.commands = [];
            this.onExecute = onExecute;
            this._currentIndex = 0;
        }
        CommandQueue.prototype.append = function (command, lineNumber) {
            command.next = this.proceed.bind(this);
            this.commands.push(new CommandQueue.ExecutionListItem(command, lineNumber));
        };
        CommandQueue.prototype.proceed = function () {
            this._currentIndex++;
            this.execute();
        };
        CommandQueue.prototype.execute = function () {
            if (this._currentIndex < this.commands.length) {
                var executionListItem = this.commands[this._currentIndex];
                this.onExecute(executionListItem.lineNumber);
                executionListItem.command.execute();
            }
            else {
                console.log('Command Queue finished');
                this.onExecute(-1);
            }
        };
        CommandQueue.prototype.clear = function () {
            this.commands = [];
        };
        return CommandQueue;
    })();
    var CommandQueue;
    (function (CommandQueue) {
        var ExecutionListItem = (function () {
            function ExecutionListItem(command, lineNumber) {
                this.command = command;
                this.lineNumber = lineNumber;
            }
            return ExecutionListItem;
        })();
        CommandQueue.ExecutionListItem = ExecutionListItem;
    })(CommandQueue || (CommandQueue = {}));
    return CommandQueue;
});
//# sourceMappingURL=CommandQueue.js.map
//
// lucy/dev/game/_compiled/Game.js
//
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "controllers/CollisionController", "controllers/UIController", "states/Boot", "states/Preloader", "states/Gameplay"], function (require, exports, CollisionController, UIController, BootState, PreloaderState, GameplayState) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(container, subscribe, dispatch, levels) {
            _super.call(this, 800, 600, Phaser.AUTO, container, null);
            this.subscribe = subscribe;
            this.dispatch = dispatch;
            this.allLevels = levels;
            this.collisionController = new CollisionController(this);
            this.uiController = new UIController(this);
            this.currentLevelIndex = -1;
            this.subscribe('EnableSound', this.setSoundEnabled.bind(this));
            this.subscribe('ResetLevel', this.resetLevel.bind(this));
            this.subscribe('StartLevelFromName', this.startLevelFromName.bind(this));
            this.subscribe('SuccessAlertClosed', this.gotoNextLevel.bind(this));
            this.state.add('Boot', BootState, false);
            this.state.add('Preloader', PreloaderState, false);
            this.state.add('Gameplay', GameplayState, false);
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
            console.log('Starting level ' + this.currentLevel());
            this.state.start('Gameplay', true, false);
            this.dispatch('StartLevel', this.currentLevel());
        };
        Game.prototype.startLevelFromName = function (level) {
            this.currentLevelIndex = this.allLevels.indexOf(level);
            this.startCurrentLevel();
        };
        Game.prototype.levelCompleted = function (diamonds) {
            this.dispatch('ShowAlert', { message: '', diamonds: diamonds });
        };
        Game.prototype.currentLevel = function () {
            return this.allLevels[this.currentLevelIndex];
        };
        Game.prototype.setSoundEnabled = function (enabled) {
            this.sound.pauseAll();
        };
        Game.prototype.resetLevel = function () {
            this.state.start('Gameplay', true, false);
        };
        return Game;
    })(Phaser.Game);
    return Game;
});
//# sourceMappingURL=Game.js.map
//
// lucy/dev/game/_compiled/commands/Commands.js
//
//# sourceMappingURL=Commands.js.map
//
// lucy/dev/game/_compiled/commands/ICommand.js
//
define(["require", "exports"], function (require, exports) {
});
//# sourceMappingURL=ICommand.js.map
//
// lucy/dev/game/_compiled/commands/MoveCmd.js
//
define(["require", "exports", "models/Direction"], function (require, exports, Direction) {
    var MoveCommand = (function () {
        function MoveCommand(amount, controller) {
            this.amount = amount;
            this.controller = controller;
        }
        MoveCommand.prototype.execute = function () {
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
        };
        return MoveCommand;
    })();
    return MoveCommand;
});
//# sourceMappingURL=MoveCmd.js.map
//
// lucy/dev/game/_compiled/commands/SpeakCmd.js
//
define(["require", "exports"], function (require, exports) {
    var SpeakCommand = (function () {
        function SpeakCommand(say, controller) {
            this.controller = controller;
            this.content = say;
        }
        SpeakCommand.prototype.execute = function () {
            this.controller.speak(this.content, this.next);
        };
        return SpeakCommand;
    })();
    return SpeakCommand;
});
//# sourceMappingURL=SpeakCmd.js.map
//
// lucy/dev/game/_compiled/commands/TurnLeftCmd.js
//
define(["require", "exports"], function (require, exports) {
    var TurnLeftCommand = (function () {
        function TurnLeftCommand(controller) {
            this.characterController = controller;
        }
        TurnLeftCommand.prototype.execute = function () {
            var newDirection = this.characterController.character.direction - 1;
            if (newDirection < 0) {
                newDirection = 3;
            }
            this.characterController.character.direction = newDirection;
            this.characterController.rotateTo(newDirection, this.next);
        };
        return TurnLeftCommand;
    })();
    return TurnLeftCommand;
});
//# sourceMappingURL=TurnLeftCmd.js.map
//
// lucy/dev/game/_compiled/commands/TurnRightCmd.js
//
define(["require", "exports"], function (require, exports) {
    var TurnRightCommand = (function () {
        function TurnRightCommand(controller) {
            this.characterController = controller;
        }
        TurnRightCommand.prototype.execute = function () {
            var newDirection = (this.characterController.character.direction + 1) % 4;
            this.characterController.character.direction = newDirection;
            this.characterController.rotateTo(newDirection, this.next);
        };
        return TurnRightCommand;
    })();
    return TurnRightCommand;
});
//# sourceMappingURL=TurnRightCmd.js.map
//
// lucy/dev/game/_compiled/controllers/CharacterController.js
//
define(["require", "exports", "models/TileCoordinate", "util/Utils"], function (require, exports, TileCoordinate, Utils) {
    var CharacterController = (function () {
        function CharacterController(game) {
            this.game = game;
            this.isHoldingKey = false;
            this.diamondCount = 0;
        }
        CharacterController.prototype.create = function (lucy) {
            this.character = lucy;
            var lucyPosition = Utils.getWorldPosition(this.character.position.x, this.character.position.y);
            this.sprite = this.game.add.sprite(lucyPosition.x, lucyPosition.y, 'lucy');
            this.sprite.animations.add('walk0', Phaser.Animation.generateFrameNames('walkN', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('walk1', Phaser.Animation.generateFrameNames('walkE', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('walk2', Phaser.Animation.generateFrameNames('walkS', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('walk3', Phaser.Animation.generateFrameNames('walkW', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('itemKey', Phaser.Animation.generateFrameNames('itemKey', 1, 16, '', 4), 24, false, false);
            this.sprite.animations.add('itemDiamond', Phaser.Animation.generateFrameNames('itemDiamond', 1, 16, '', 4), 24, false, false);
            this.sprite.animations.add('burn', Phaser.Animation.generateFrameNames('burn', 1, 30, '', 4), 24, false, false);
            this.game.collisionController.enableCharacter(this, this.sprite);
            this.updateDirection();
            this.sndDiamond = this.game.add.audio('diamond', 0.5, false);
            this.sndKey = this.game.add.audio('key', 0.5, false);
            this.sndDeath = this.game.add.audio('laser', 0.5, false);
        };
        CharacterController.prototype.moveBy = function (x, y, next) {
            var _this = this;
            var currentPos = this.character.position;
            var newPos = new TileCoordinate(currentPos.x + x, currentPos.y + y);
            var worldPos = Utils.getWorldPosition(newPos.x, newPos.y);
            var delta = Math.abs(x || y);
            var animationName = 'walk' + this.character.direction;
            var animation = this.sprite.animations.play(animationName);
            var moveTween = this.game.add.tween(this.sprite).to({
                'x': worldPos.x,
                'y': worldPos.y
            }, delta * 500);
            moveTween.onComplete.add(function () {
                _this.character.position = newPos;
                var collision = _this.game.collisionController.checkCollisions(_this.sprite);
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
        CharacterController.prototype.speak = function (text, next) {
            this.game.uiController.showSpeechDialog('lucy', text, next);
        };
        CharacterController.prototype.updateDirection = function () {
            var animationName = 'walk' + this.character.direction;
            this.sprite.animations.stop(animationName, true);
        };
        CharacterController.prototype.update = function () {
        };
        CharacterController.prototype.respawn = function (newPos) {
            var worldPos = Utils.getWorldPosition(newPos.x, newPos.y);
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
                case "key":
                    this.isHoldingKey = true;
                    this.sndKey.play();
                    this.game.collisionController.disableCollider(data.sprite, data.name);
                    data.sprite.destroy();
                    var keyAnim = this.sprite.animations.play("itemKey");
                    var waitTween = this.game.add.tween(this.sprite).to({}, 1000);
                    waitTween.onComplete.add(next);
                    waitTween.start();
                    break;
                case "cannon":
                case "laserH":
                case "laserV":
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
    return CharacterController;
});
//# sourceMappingURL=CharacterController.js.map
//
// lucy/dev/game/_compiled/controllers/CollisionController.js
//
define(["require", "exports", "models/ColliderData"], function (require, exports, ColliderData) {
    var CollisionController = (function () {
        function CollisionController(game) {
            this.game = game;
            this.colliders = {};
        }
        CollisionController.prototype.startPhysics = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
        };
        CollisionController.prototype.enableCharacter = function (controller, sprite) {
            var characterSprite = sprite;
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
        CollisionController.prototype.checkCollisions = function (sprite) {
            var player = sprite.body;
            for (var colliderName in this.colliders) {
                var colliderArray = this.colliders[colliderName];
                for (var i = 0; i < colliderArray.length; i++) {
                    var collider = colliderArray[i].body;
                    if (collider && collider.position) {
                        if (this.game.physics.arcade.intersects(player, collider)) {
                            return new ColliderData(colliderName, colliderArray[i]);
                        }
                    }
                }
            }
            return null;
        };
        CollisionController.prototype.update = function () {
            // this.game.debug.bodyInfo(this.characterController.sprite, 32, 320);
            // this.game.debug.body(this.characterController.sprite);
            // for (var colliderName in this.colliders) {
            //     var colliderArray = this.colliders[colliderName];
            //     for (var i=0; i < colliderArray.length; i++) {
            //         var collider = colliderArray[i];
            //         this.game.debug.body(collider);
            //     }
        };
        return CollisionController;
    })();
    return CollisionController;
});
//# sourceMappingURL=CollisionController.js.map
//
// lucy/dev/game/_compiled/controllers/ICharacterController.js
//
define(["require", "exports"], function (require, exports) {
});
//# sourceMappingURL=ICharacterController.js.map
//
// lucy/dev/game/_compiled/controllers/LevelController.js
//
define(["require", "exports", "models/TileCoordinate", "models/Tiles"], function (require, exports, TileCoordinate, Tiles) {
    var LevelController = (function () {
        function LevelController(game, levelName) {
            this.game = game;
            this.levelName = levelName;
            this.spawnPosition = new TileCoordinate(8, 9);
        }
        LevelController.prototype.create = function () {
            this.map = this.game.add.tilemap(this.levelName);
            this.map.addTilesetImage('floor_walls', 'tilemap');
            this.map.addTilesetImage('door', 'doorTilemap');
            var floor = this.map.createLayer('Floor');
            var collision = this.map.createLayer('Collision');
            this.map.setCollisionByExclusion([], true, 'Collision');
            this.buildItems();
        };
        LevelController.prototype.buildItems = function () {
            var itemSet = new Tiles().items;
            for (var y = 0; y < 12; y++) {
                for (var x = 0; x < 16; x++) {
                    var tile = this.map.getTile(x, y, 'Collision', true);
                    if (tile.properties.type) {
                        var tileType = tile.properties.type;
                        if (tileType != "door" && tileType != "wall") {
                            this.game.add.sprite(tile.worldX, tile.worldY, 'floor');
                        }
                        if (tileType == "spawn") {
                            this.spawnPosition = new TileCoordinate(x, y);
                        }
                        else {
                            var sprite;
                            if (tileType == "wall") {
                                sprite = this.game.add.sprite(tile.worldX, tile.worldY, 'empty');
                                this.game.collisionController.enableCollider(sprite, tileType);
                            }
                            else {
                                sprite = this.game.add.sprite(tile.worldX, tile.worldY, 'items');
                                var itemData = itemSet[tileType];
                                console.log(tileType);
                                console.log(itemData);
                                sprite.animations.add(itemData.name, Phaser.Animation.generateFrameNames(itemData.name, 0, itemData.frames - 1, '', 4), 24, true, false);
                                sprite.animations.play(itemData.name);
                                this.game.collisionController.enableCollider(sprite, tileType);
                            }
                        }
                    }
                }
            }
        };
        return LevelController;
    })();
    return LevelController;
});
//# sourceMappingURL=LevelController.js.map
//
// lucy/dev/game/_compiled/controllers/UIController.js
//
define(["require", "exports"], function (require, exports) {
    var UIController = (function () {
        function UIController(game) {
            this.game = game;
        }
        UIController.prototype.showSpeechDialog = function (character, content, next) {
            this.speechDialog = this.game.add.sprite(122, 450, 'speech');
            var style = {
                font: "20px Arial",
                fill: "#ffffff",
                align: "left",
                wordWrap: true,
                wordWrapWidth: 400
            };
            this.text = this.game.add.text(475, 500, content, style);
            this.text.anchor.set(0.5, 0.5);
            var onTimerFinished = function () {
                this.speechDialog.destroy(true);
                this.text.destroy(true);
                next();
            };
            var waitTween = this.game.add.tween(this.speechDialog).to({}, 500);
            waitTween.onComplete.add(onTimerFinished.bind(this));
            waitTween.start();
        };
        return UIController;
    })();
    return UIController;
});
//# sourceMappingURL=UIController.js.map
//
// lucy/dev/game/_compiled/delegates/Action.js
//
define(["require", "exports"], function (require, exports) {
});
//# sourceMappingURL=Action.js.map
//
// lucy/dev/game/_compiled/delegates/ActionNumber.js
//
define(["require", "exports"], function (require, exports) {
});
//# sourceMappingURL=ActionNumber.js.map
//
// lucy/dev/game/_compiled/delegates/Dispatch.js
//
define(["require", "exports"], function (require, exports) {
});
//# sourceMappingURL=Dispatch.js.map
//
// lucy/dev/game/_compiled/delegates/Subscribe.js
//
define(["require", "exports"], function (require, exports) {
});
//# sourceMappingURL=Subscribe.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/CommandQueue.js
//
define(["require", "exports"], function (require, exports) {
    var CommandQueue = (function () {
        function CommandQueue(onExecute) {
            this.commands = [];
            this.onExecute = onExecute;
            this._currentIndex = 0;
        }
        CommandQueue.prototype.append = function (command, lineNumber) {
            command.next = this.proceed.bind(this);
            this.commands.push(new CommandQueue.ExecutionListItem(command, lineNumber));
        };
        CommandQueue.prototype.proceed = function () {
            this._currentIndex++;
            this.execute();
        };
        CommandQueue.prototype.execute = function () {
            if (this._currentIndex < this.commands.length) {
                var executionListItem = this.commands[this._currentIndex];
                this.onExecute(executionListItem.lineNumber);
                executionListItem.command.execute();
            }
            else {
                console.log('Command Queue finished');
                this.onExecute(-1);
            }
        };
        CommandQueue.prototype.clear = function () {
            this.commands = [];
        };
        return CommandQueue;
    })();
    var CommandQueue;
    (function (CommandQueue) {
        var ExecutionListItem = (function () {
            function ExecutionListItem(command, lineNumber) {
                this.command = command;
                this.lineNumber = lineNumber;
            }
            return ExecutionListItem;
        })();
        CommandQueue.ExecutionListItem = ExecutionListItem;
    })(CommandQueue || (CommandQueue = {}));
    return CommandQueue;
});
//# sourceMappingURL=CommandQueue.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/Game.js
//
///ts:ref=<phaser.d.ts>
/// No file or directory matched name "<phaser.d.ts>" ///ts:ref:generated
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "controllers/CollisionController", "controllers/UIController", "states/Boot", "states/Preloader", "states/Gameplay", "commands/CommandQueue"], function (require, exports, CollisionController, UIController, BootState, PreloaderState, GameplayState, CommandQueue) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(container, subscribe, dispatch, levels, onLineExecuted) {
            _super.call(this, 800, 600, Phaser.AUTO, container, null);
            this.subscribe = subscribe;
            this.dispatch = dispatch;
            this.allLevels = levels;
            this.collisionController = new CollisionController(this);
            this.uiController = new UIController(this);
            this.currentLevelIndex = -1;
            this.subscribe('EnableSound', this.setSoundEnabled.bind(this));
            this.subscribe('ResetLevel', this.resetLevel.bind(this));
            this.subscribe('StartLevelFromName', this.startLevelFromName.bind(this));
            this.subscribe('SuccessAlertClosed', this.gotoNextLevel.bind(this));
            this.state.add('Boot', BootState, false);
            this.state.add('Preloader', PreloaderState, false);
            this.state.add('Gameplay', GameplayState, false);
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
            console.log('Starting level ' + this.currentLevel());
            this.commandQueue = new CommandQueue(this.onLineExecuted);
            this.state.start('Gameplay', true, false);
            this.dispatch('StartLevel', this.currentLevel());
        };
        Game.prototype.startLevelFromName = function (level) {
            this.currentLevelIndex = this.allLevels.indexOf(level);
            this.startCurrentLevel();
        };
        Game.prototype.levelCompleted = function (diamonds) {
            this.dispatch('ShowAlert', { message: '', diamonds: diamonds });
        };
        Game.prototype.currentLevel = function () {
            return this.allLevels[this.currentLevelIndex];
        };
        Game.prototype.setSoundEnabled = function (enabled) {
            this.sound.pauseAll();
        };
        Game.prototype.resetLevel = function () {
            this.state.start('Gameplay', true, false);
        };
        return Game;
    })(Phaser.Game);
    return Game;
});
//# sourceMappingURL=Game.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/commands/CommandQueue.js
//
define(["require", "exports"], function (require, exports) {
    var CommandQueue = (function () {
        function CommandQueue(onExecute) {
            this.commands = [];
            this.onExecute = onExecute;
            this._currentIndex = 0;
        }
        CommandQueue.prototype.append = function (command, lineNumber) {
            command.next = this.proceed.bind(this);
            this.commands.push(new CommandQueue.ExecutionListItem(command, lineNumber));
        };
        CommandQueue.prototype.proceed = function () {
            this._currentIndex++;
            this.execute();
        };
        CommandQueue.prototype.execute = function () {
            if (this._currentIndex < this.commands.length) {
                var executionListItem = this.commands[this._currentIndex];
                this.onExecute(executionListItem.lineNumber);
                executionListItem.command.execute();
            }
            else {
                console.log('Command Queue finished');
                this.onExecute(-1);
            }
        };
        CommandQueue.prototype.clear = function () {
            this.commands = [];
        };
        return CommandQueue;
    })();
    var CommandQueue;
    (function (CommandQueue) {
        var ExecutionListItem = (function () {
            function ExecutionListItem(command, lineNumber) {
                this.command = command;
                this.lineNumber = lineNumber;
            }
            return ExecutionListItem;
        })();
        CommandQueue.ExecutionListItem = ExecutionListItem;
    })(CommandQueue || (CommandQueue = {}));
    return CommandQueue;
});
//# sourceMappingURL=CommandQueue.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/commands/ICommand.js
//
define(["require", "exports"], function (require, exports) {
});
//# sourceMappingURL=ICommand.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/commands/MoveCmd.js
//
define(["require", "exports", "models/Direction"], function (require, exports, Direction) {
    var MoveCommand = (function () {
        function MoveCommand(amount, controller) {
            this.amount = amount;
            this.controller = controller;
        }
        MoveCommand.prototype.execute = function () {
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
        };
        return MoveCommand;
    })();
    return MoveCommand;
});
//# sourceMappingURL=MoveCmd.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/commands/SpeakCmd.js
//
define(["require", "exports"], function (require, exports) {
    var SpeakCommand = (function () {
        function SpeakCommand(say, controller) {
            this.controller = controller;
            this.content = say;
        }
        SpeakCommand.prototype.execute = function () {
            this.controller.speak(this.content, this.next);
        };
        return SpeakCommand;
    })();
    return SpeakCommand;
});
//# sourceMappingURL=SpeakCmd.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/commands/TurnLeftCmd.js
//
define(["require", "exports"], function (require, exports) {
    var TurnLeftCommand = (function () {
        function TurnLeftCommand(controller) {
            this.characterController = controller;
        }
        TurnLeftCommand.prototype.execute = function () {
            var newDirection = this.characterController.character.direction - 1;
            if (newDirection < 0) {
                newDirection = 3;
            }
            this.characterController.character.direction = newDirection;
            this.characterController.rotateTo(newDirection, this.next);
        };
        return TurnLeftCommand;
    })();
    return TurnLeftCommand;
});
//# sourceMappingURL=TurnLeftCmd.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/commands/TurnRightCmd.js
//
define(["require", "exports"], function (require, exports) {
    var TurnRightCommand = (function () {
        function TurnRightCommand(controller) {
            this.characterController = controller;
        }
        TurnRightCommand.prototype.execute = function () {
            var newDirection = (this.characterController.character.direction + 1) % 4;
            this.characterController.character.direction = newDirection;
            this.characterController.rotateTo(newDirection, this.next);
        };
        return TurnRightCommand;
    })();
    return TurnRightCommand;
});
//# sourceMappingURL=TurnRightCmd.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/controllers/CharacterController.js
//
define(["require", "exports", "models/TileCoordinate", "util/Utils"], function (require, exports, TileCoordinate, Utils) {
    var CharacterController = (function () {
        function CharacterController(game) {
            this.game = game;
            this.isHoldingKey = false;
            this.diamondCount = 0;
        }
        CharacterController.prototype.create = function (lucy) {
            this.character = lucy;
            var lucyPosition = Utils.getWorldPosition(this.character.position.x, this.character.position.y);
            this.sprite = this.game.add.sprite(lucyPosition.x, lucyPosition.y, 'lucy');
            this.sprite.animations.add('walk0', Phaser.Animation.generateFrameNames('walkN', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('walk1', Phaser.Animation.generateFrameNames('walkE', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('walk2', Phaser.Animation.generateFrameNames('walkS', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('walk3', Phaser.Animation.generateFrameNames('walkW', 1, 16, '', 4), 24, true, false);
            this.sprite.animations.add('itemKey', Phaser.Animation.generateFrameNames('itemKey', 1, 16, '', 4), 24, false, false);
            this.sprite.animations.add('itemDiamond', Phaser.Animation.generateFrameNames('itemDiamond', 1, 16, '', 4), 24, false, false);
            this.sprite.animations.add('burn', Phaser.Animation.generateFrameNames('burn', 1, 30, '', 4), 24, false, false);
            this.game.collisionController.enableCharacter(this, this.sprite);
            this.updateDirection();
            this.sndDiamond = this.game.add.audio('diamond', 0.5, false);
            this.sndKey = this.game.add.audio('key', 0.5, false);
            this.sndDeath = this.game.add.audio('laser', 0.5, false);
        };
        CharacterController.prototype.moveBy = function (x, y, next) {
            var _this = this;
            var currentPos = this.character.position;
            var newPos = new TileCoordinate(currentPos.x + x, currentPos.y + y);
            var worldPos = Utils.getWorldPosition(newPos.x, newPos.y);
            var delta = Math.abs(x || y);
            var animationName = 'walk' + this.character.direction;
            var animation = this.sprite.animations.play(animationName);
            var moveTween = this.game.add.tween(this.sprite).to({
                'x': worldPos.x,
                'y': worldPos.y
            }, delta * 500);
            moveTween.onComplete.add(function () {
                _this.character.position = newPos;
                var collision = _this.game.collisionController.checkCollisions(_this.sprite);
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
        CharacterController.prototype.speak = function (text, next) {
            this.game.uiController.showSpeechDialog('lucy', text, next);
        };
        CharacterController.prototype.updateDirection = function () {
            var animationName = 'walk' + this.character.direction;
            this.sprite.animations.stop(animationName, true);
        };
        CharacterController.prototype.update = function () {
        };
        CharacterController.prototype.respawn = function (newPos) {
            var worldPos = Utils.getWorldPosition(newPos.x, newPos.y);
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
                case "key":
                    this.isHoldingKey = true;
                    this.sndKey.play();
                    this.game.collisionController.disableCollider(data.sprite, data.name);
                    data.sprite.destroy();
                    var keyAnim = this.sprite.animations.play("itemKey");
                    var waitTween = this.game.add.tween(this.sprite).to({}, 1000);
                    waitTween.onComplete.add(next);
                    waitTween.start();
                    break;
                case "cannon":
                case "laserH":
                case "laserV":
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
    return CharacterController;
});
//# sourceMappingURL=CharacterController.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/controllers/CollisionController.js
//
define(["require", "exports", "models/ColliderData"], function (require, exports, ColliderData) {
    var CollisionController = (function () {
        function CollisionController(game) {
            this.game = game;
            this.colliders = {};
        }
        CollisionController.prototype.startPhysics = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
        };
        CollisionController.prototype.enableCharacter = function (controller, sprite) {
            var characterSprite = sprite;
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
        CollisionController.prototype.checkCollisions = function (sprite) {
            var player = sprite.body;
            for (var colliderName in this.colliders) {
                var colliderArray = this.colliders[colliderName];
                for (var i = 0; i < colliderArray.length; i++) {
                    var collider = colliderArray[i].body;
                    if (collider && collider.position) {
                        if (this.game.physics.arcade.intersects(player, collider)) {
                            return new ColliderData(colliderName, colliderArray[i]);
                        }
                    }
                }
            }
            return null;
        };
        CollisionController.prototype.update = function () {
            // this.game.debug.bodyInfo(this.characterController.sprite, 32, 320);
            // this.game.debug.body(this.characterController.sprite);
            // for (var colliderName in this.colliders) {
            //     var colliderArray = this.colliders[colliderName];
            //     for (var i=0; i < colliderArray.length; i++) {
            //         var collider = colliderArray[i];
            //         this.game.debug.body(collider);
            //     }
        };
        return CollisionController;
    })();
    return CollisionController;
});
//# sourceMappingURL=CollisionController.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/controllers/ICharacterController.js
//
define(["require", "exports"], function (require, exports) {
});
//# sourceMappingURL=ICharacterController.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/controllers/LevelController.js
//
define(["require", "exports", "models/TileCoordinate", "models/Tiles"], function (require, exports, TileCoordinate, Tiles) {
    var LevelController = (function () {
        function LevelController(game, levelName) {
            this.game = game;
            this.levelName = levelName;
            this.spawnPosition = new TileCoordinate(8, 9);
        }
        LevelController.prototype.create = function () {
            this.map = this.game.add.tilemap(this.levelName);
            this.map.addTilesetImage('floor_walls', 'tilemap');
            this.map.addTilesetImage('door', 'doorTilemap');
            var floor = this.map.createLayer('Floor');
            var collision = this.map.createLayer('Collision');
            this.map.setCollisionByExclusion([], true, 'Collision');
            this.buildItems();
        };
        LevelController.prototype.buildItems = function () {
            var itemSet = new Tiles().items;
            for (var y = 0; y < 12; y++) {
                for (var x = 0; x < 16; x++) {
                    var tile = this.map.getTile(x, y, 'Collision', true);
                    if (tile.properties.type) {
                        var tileType = tile.properties.type;
                        if (tileType != "door" && tileType != "wall") {
                            this.game.add.sprite(tile.worldX, tile.worldY, 'floor');
                        }
                        if (tileType == "spawn") {
                            this.spawnPosition = new TileCoordinate(x, y);
                        }
                        else {
                            var sprite;
                            if (tileType == "wall") {
                                sprite = this.game.add.sprite(tile.worldX, tile.worldY, 'empty');
                                this.game.collisionController.enableCollider(sprite, tileType);
                            }
                            else {
                                sprite = this.game.add.sprite(tile.worldX, tile.worldY, 'items');
                                var itemData = itemSet[tileType];
                                console.log(tileType);
                                console.log(itemData);
                                sprite.animations.add(itemData.name, Phaser.Animation.generateFrameNames(itemData.name, 0, itemData.frames - 1, '', 4), 24, true, false);
                                sprite.animations.play(itemData.name);
                                this.game.collisionController.enableCollider(sprite, tileType);
                            }
                        }
                    }
                }
            }
        };
        return LevelController;
    })();
    return LevelController;
});
//# sourceMappingURL=LevelController.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/controllers/UIController.js
//
define(["require", "exports"], function (require, exports) {
    var UIController = (function () {
        function UIController(game) {
            this.game = game;
        }
        UIController.prototype.showSpeechDialog = function (character, content, next) {
            this.speechDialog = this.game.add.sprite(122, 450, 'speech');
            var style = {
                font: "20px Arial",
                fill: "#ffffff",
                align: "left",
                wordWrap: true,
                wordWrapWidth: 400
            };
            this.text = this.game.add.text(475, 500, content, style);
            this.text.anchor.set(0.5, 0.5);
            var onTimerFinished = function () {
                this.speechDialog.destroy(true);
                this.text.destroy(true);
                next();
            };
            var waitTween = this.game.add.tween(this.speechDialog).to({}, 500);
            waitTween.onComplete.add(onTimerFinished.bind(this));
            waitTween.start();
        };
        return UIController;
    })();
    return UIController;
});
//# sourceMappingURL=UIController.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/delegates/Action.js
//
define(["require", "exports"], function (require, exports) {
});
//# sourceMappingURL=Action.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/delegates/ActionNumber.js
//
define(["require", "exports"], function (require, exports) {
});
//# sourceMappingURL=ActionNumber.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/delegates/Dispatch.js
//
define(["require", "exports"], function (require, exports) {
});
//# sourceMappingURL=Dispatch.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/delegates/Subscribe.js
//
define(["require", "exports"], function (require, exports) {
});
//# sourceMappingURL=Subscribe.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/models/Character.js
//
define(["require", "exports", "models/TileCoordinate"], function (require, exports, TileCoordinate) {
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
    return Character;
});
//# sourceMappingURL=Character.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/models/ColliderData.js
//
define(["require", "exports"], function (require, exports) {
    var ColliderData = (function () {
        function ColliderData(name, sprite) {
            this.name = name;
            this.sprite = sprite;
        }
        return ColliderData;
    })();
    return ColliderData;
});
//# sourceMappingURL=ColliderData.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/models/Direction.js
//
define(["require", "exports"], function (require, exports) {
    var Direction;
    (function (Direction) {
        Direction[Direction["N"] = 0] = "N";
        Direction[Direction["E"] = 1] = "E";
        Direction[Direction["S"] = 2] = "S";
        Direction[Direction["W"] = 3] = "W";
    })(Direction || (Direction = {}));
    return Direction;
});
//# sourceMappingURL=Direction.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/models/TileCoordinate.js
//
define(["require", "exports"], function (require, exports) {
    var TileCoordinate = (function () {
        function TileCoordinate(x, y) {
            this.x = x;
            this.y = y;
        }
        return TileCoordinate;
    })();
    return TileCoordinate;
});
//# sourceMappingURL=TileCoordinate.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/models/TileData.js
//
define(["require", "exports"], function (require, exports) {
    var TileData = (function () {
        function TileData(name, frames, collidable) {
            this.name = name;
            this.frames = frames;
            this.collidable = collidable;
        }
        return TileData;
    })();
    return TileData;
});
//# sourceMappingURL=TileData.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/models/Tiles.js
//
define(["require", "exports", "models/TileData"], function (require, exports, TileData) {
    var Tiles = (function () {
        function Tiles() {
            var tiles = {};
            tiles['box'] = new TileData('box', 1, true);
            tiles['boxLeft'] = new TileData('boxLeft', 40, true);
            tiles['boxRight'] = new TileData('boxRight', 40, true);
            tiles['diamond'] = new TileData('diamond', 30, true);
            tiles['door'] = new TileData('door', 1, true);
            tiles['laserH'] = new TileData('laserBeamHorizontal', 14, true);
            tiles['laserV'] = new TileData('laserBeamVertical', 14, true);
            tiles['key'] = new TileData('python', 30, true);
            tiles['cannon'] = new TileData('cannon', 1, true);
            tiles['buttonOn'] = new TileData('buttonUp', 1, true);
            tiles['buttonOff'] = new TileData('buttonDown', 1, true);
            tiles['doorTop'] = new TileData('doorTop', 1, true);
            this.items = tiles;
        }
        return Tiles;
    })();
    return Tiles;
});
//# sourceMappingURL=Tiles.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/states/Boot.js
//
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
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
    return Boot;
});
//# sourceMappingURL=Boot.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/states/Gameplay.js
//
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "controllers/CharacterController", "controllers/LevelController", "models/Character", "models/Direction"], function (require, exports, CharacterController, LevelController, Character, Direction) {
    var Gameplay = (function (_super) {
        __extends(Gameplay, _super);
        function Gameplay() {
            _super.apply(this, arguments);
        }
        Gameplay.prototype.create = function () {
            this.lucy = new Character(0, 0, Direction.N);
            var theGame = this.game;
            var levelToPlay = theGame.currentLevel();
            this.levelController = new LevelController(theGame, levelToPlay);
            this.levelController.create();
            this.characterController = new CharacterController(theGame);
            this.characterController.create(this.lucy);
            this.characterController.respawn(this.levelController.spawnPosition);
            theGame.characterController = this.characterController;
            this.game.sound.pauseAll();
            var music = this.game.add.audio('bgm', 0.3, true);
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
});
//# sourceMappingURL=Gameplay.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/states/Preloader.js
//
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
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
                this.load.tilemap(level, 'lucy/dev/game/assets/levels/' + level + '/map.json', null, Phaser.Tilemap.TILED_JSON);
            }
            this.load.audio('bgm', 'lucy/dev/game/assets/sounds/soundtrack.ogg');
            this.load.audio('key', 'lucy/dev/game/assets/sounds/python.ogg');
            this.load.audio('diamond', 'lucy/dev/game/assets/sounds/diamond.ogg');
            this.load.audio('laser', 'lucy/dev/game/assets/sounds/laser.ogg');
            this.load.audio('scream', 'lucy/dev/game/assets/sounds/scream.ogg');
            this.load.image('speech', 'lucy/dev/game/assets/char/speechBubble.png');
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
    return Preloader;
});
//# sourceMappingURL=Preloader.js.map
//
// lucy/dev/game/_compiled/lucy/dev/game/util/Utils.js
//
define(["require", "exports", "models/Direction"], function (require, exports, Direction) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.getDirectionAngle = function (direction) {
            switch (direction) {
                case Direction.N:
                    return 0;
                case Direction.E:
                    return Math.PI / 2;
                case Direction.S:
                    return Math.PI;
                case Direction.W:
                    return 3 * (Math.PI / 2);
            }
        };
        Utils.getWorldPosition = function (x, y) {
            return new Phaser.Point(x * 50, y * 50);
        };
        return Utils;
    })();
    return Utils;
});
//# sourceMappingURL=Utils.js.map
//
// lucy/dev/game/_compiled/models/Character.js
//
define(["require", "exports", "models/TileCoordinate"], function (require, exports, TileCoordinate) {
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
    return Character;
});
//# sourceMappingURL=Character.js.map
//
// lucy/dev/game/_compiled/models/ColliderData.js
//
define(["require", "exports"], function (require, exports) {
    var ColliderData = (function () {
        function ColliderData(name, sprite) {
            this.name = name;
            this.sprite = sprite;
        }
        return ColliderData;
    })();
    return ColliderData;
});
//# sourceMappingURL=ColliderData.js.map
//
// lucy/dev/game/_compiled/models/Direction.js
//
define(["require", "exports"], function (require, exports) {
    var Direction;
    (function (Direction) {
        Direction[Direction["N"] = 0] = "N";
        Direction[Direction["E"] = 1] = "E";
        Direction[Direction["S"] = 2] = "S";
        Direction[Direction["W"] = 3] = "W";
    })(Direction || (Direction = {}));
    return Direction;
});
//# sourceMappingURL=Direction.js.map
//
// lucy/dev/game/_compiled/models/TileCoordinate.js
//
define(["require", "exports"], function (require, exports) {
    var TileCoordinate = (function () {
        function TileCoordinate(x, y) {
            this.x = x;
            this.y = y;
        }
        return TileCoordinate;
    })();
    return TileCoordinate;
});
//# sourceMappingURL=TileCoordinate.js.map
//
// lucy/dev/game/_compiled/models/TileData.js
//
define(["require", "exports"], function (require, exports) {
    var TileData = (function () {
        function TileData(name, frames, collidable) {
            this.name = name;
            this.frames = frames;
            this.collidable = collidable;
        }
        return TileData;
    })();
    return TileData;
});
//# sourceMappingURL=TileData.js.map
//
// lucy/dev/game/_compiled/models/Tiles.js
//
define(["require", "exports", "models/TileData"], function (require, exports, TileData) {
    var Tiles = (function () {
        function Tiles() {
            var tiles = {};
            tiles['box'] = new TileData('box', 1, true);
            tiles['boxLeft'] = new TileData('boxLeft', 40, true);
            tiles['boxRight'] = new TileData('boxRight', 40, true);
            tiles['diamond'] = new TileData('diamond', 30, true);
            tiles['door'] = new TileData('door', 1, true);
            tiles['laserH'] = new TileData('laserBeamHorizontal', 14, true);
            tiles['laserV'] = new TileData('laserBeamVertical', 14, true);
            tiles['key'] = new TileData('python', 30, true);
            tiles['cannon'] = new TileData('cannon', 1, true);
            tiles['buttonOn'] = new TileData('buttonUp', 1, true);
            tiles['buttonOff'] = new TileData('buttonDown', 1, true);
            tiles['doorTop'] = new TileData('doorTop', 1, true);
            this.items = tiles;
        }
        return Tiles;
    })();
    return Tiles;
});
//# sourceMappingURL=Tiles.js.map
//
// lucy/dev/game/_compiled/states/Boot.js
//
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
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
    return Boot;
});
//# sourceMappingURL=Boot.js.map
//
// lucy/dev/game/_compiled/states/Gameplay.js
//
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "controllers/CharacterController", "controllers/LevelController", "models/Character", "models/Direction"], function (require, exports, CharacterController, LevelController, Character, Direction) {
    var Gameplay = (function (_super) {
        __extends(Gameplay, _super);
        function Gameplay() {
            _super.apply(this, arguments);
        }
        Gameplay.prototype.create = function () {
            this.lucy = new Character(0, 0, Direction.N);
            var theGame = this.game;
            var levelToPlay = theGame.currentLevel();
            this.levelController = new LevelController(theGame, levelToPlay);
            this.levelController.create();
            this.characterController = new CharacterController(theGame);
            this.characterController.create(this.lucy);
            this.characterController.respawn(this.levelController.spawnPosition);
            theGame.characterController = this.characterController;
            this.game.sound.pauseAll();
            var music = this.game.add.audio('bgm', 0.3, true);
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
});
//# sourceMappingURL=Gameplay.js.map
//
// lucy/dev/game/_compiled/states/Preloader.js
//
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
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
                this.load.tilemap(level, 'lucy/dev/game/assets/levels/' + level + '/map.json', null, Phaser.Tilemap.TILED_JSON);
            }
            this.load.audio('bgm', 'lucy/dev/game/assets/sounds/soundtrack.ogg');
            this.load.audio('key', 'lucy/dev/game/assets/sounds/python.ogg');
            this.load.audio('diamond', 'lucy/dev/game/assets/sounds/diamond.ogg');
            this.load.audio('laser', 'lucy/dev/game/assets/sounds/laser.ogg');
            this.load.audio('scream', 'lucy/dev/game/assets/sounds/scream.ogg');
            this.load.image('speech', 'lucy/dev/game/assets/char/speechBubble.png');
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
    return Preloader;
});
//# sourceMappingURL=Preloader.js.map
//
// lucy/dev/game/_compiled/util/Utils.js
//
define(["require", "exports", "models/Direction"], function (require, exports, Direction) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.getDirectionAngle = function (direction) {
            switch (direction) {
                case Direction.N:
                    return 0;
                case Direction.E:
                    return Math.PI / 2;
                case Direction.S:
                    return Math.PI;
                case Direction.W:
                    return 3 * (Math.PI / 2);
            }
        };
        Utils.getWorldPosition = function (x, y) {
            return new Phaser.Point(x * 50, y * 50);
        };
        return Utils;
    })();
    return Utils;
});
//# sourceMappingURL=Utils.js.map