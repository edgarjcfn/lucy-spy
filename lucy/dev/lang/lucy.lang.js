var $builtinmodule = function(name)
{
    'use strict';

    /**
    * SKULPT module definition
    */
    var mod = { };


    //
    // functions
    //
    mod.alert = new Sk.builtin.func(function(a) {
        alert(a.v);
    });

    mod.moveForward = new Sk.builtin.func(function(x) {
        var moveCmd = new KodingSpy.Command.MoveCommand(x.v, SkulptAnimator);
        Sk.commandChain.append(moveCmd, Sk.currLineNo);
    });

    mod.turnLeft = new Sk.builtin.func(function() {
        var turnCmd = new KodingSpy.Command.TurnLeftCommand(SkulptAnimator);
        Sk.commandChain.append(turnCmd, Sk.currLineNo);
    });

    mod.turnRight = new Sk.builtin.func(function() {
        var turnCmd = new KodingSpy.Command.TurnRightCommand(SkulptAnimator);
        Sk.commandChain.append(turnCmd, Sk.currLineNo);
    });

    //
    // classes
    //
    mod.Character = Sk.misceval.buildClass(mod, function($gbl, $loc) {
         $loc.__init__ = new Sk.builtin.func(function(self) {
            // self.character = new Character();
         });

    },
    'Character', []);


    return mod;
}
