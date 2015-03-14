app.service('SkulptService', function() {

    var skulpt = {};

    skulpt.builtinRead = function(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
    }

    skulpt.initialize = function(commandQueue) {

        Sk.externalLibraries = {
            lucy : {
              path : 'lucy/dist/lucy.lang.js',
              dependencies : []
            },
        };
        Sk.commandChain = commandQueue;
        Sk.configure({read:skulpt.builtinRead});
    }

    skulpt.runCode = function(code) {
        try {
            eval(Sk.importMainWithBody("<stdin>",false,code));
            Sk.commandChain.execute();
        }
        catch(e) {
            console.debug('error', e);
            throw e;
        }
    }

    return skulpt;

});
