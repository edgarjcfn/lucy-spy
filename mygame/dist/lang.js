var $builtinmodule = function(name)
{
    'use strict';

    /**
    * SKULPT module definition
    */
    var mod = {};

    // 
    // functions
    // 
    mod.alert = new Sk.builtin.func(function(a) {
        alert(a.v);
    });

    // x
    // classes
    // 
    mod.Character = Sk.misceval.buildClass(mod, function($gbl, $loc) {
         $loc.__init__ = new Sk.builtin.func(function(self) {
            self.character = new Character();
         });

         $loc.moveForward = new Sk.builtin.func(function(self,x) {
            var moveCmd = new MoveCommand({'tiles':x.v, 'character': self.character}, Sk.animator);
            Sk.commandChain.append(moveCmd, Sk.currLineNo);
         });
         $loc.turnLeft = new Sk.builtin.func(function(self) {
            var turnCmd = new TurnLeftCommand(self.character, Sk.animator);
            Sk.commandChain.append(turnCmd, Sk.currLineNo);
         });
         $loc.turnRight = new Sk.builtin.func(function(self) {
            var turnCmd = new TurnRightCommand(self.character, Sk.animator);
            Sk.commandChain.append(turnCmd, Sk.currLineNo);
         });
         $loc.position = new Sk.builtin.func(function(self) {
            var pos = self.character.position();

            return new Sk.builtin.tuple([
                    Sk.builtin.assk$(pos.x, Sk.builtin.nmber.float$),
                    Sk.builtin.assk$(pos.y, Sk.builtin.nmber.float$)
                ]);
         });

    },
    'Character', []);


    return mod;
}