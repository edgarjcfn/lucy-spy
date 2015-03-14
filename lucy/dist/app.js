//
// lucy/dev/app/module.js
//
angular.module('lucy', []);
var app = angular.module('lucy');

//
// lucy/dev/app/controllers/AppController.js
//
app.controller('AppController', function($scope) {

});

//
// lucy/dev/app/controllers/GameController.js
//
app.controller('GameController',
    function($scope,
             NotificationService,
             LevelsService,
             SkulptService,
             AceService) {

    $scope.buttonState = null;
    $scope.game = null;
    $scope.commandQueue = null;
    $scope.editor = null;
    $scope.interpreter = null;
    $scope.notifications = null;
    $scope.codeEditor = null;

    $scope.runState = {
        text:'Run',
        class: 'btn btn-success btn-lg',
        execute: 'onRunClick'
    }

    $scope.resetState = {
        text:'Reset',
        class: 'btn btn-danger btn-lg',
        execute: 'onResetClick'
    }

    $scope.onButtonClicked = function() {
        var fnName = $scope.buttonState.execute;
        var fn = $scope[fnName];
        fn();
    }

    $scope.onLevelStart = function(level) {
        $scope.codeEditor.loadLevelCode(level, function() {
            $scope.buttonState = $scope.runState;
            $scope.$apply();
        });
    }

    $scope.runCode = function() {
        var code = $scope.codeEditor.content();
        $scope.interpreter.runCode(code);
    }

    $scope.onLineExecuted = function(lineNumber) {
        if (lineNumber > 0) {
           $scope.codeEditor.highlight(lineNumber);
        }
    }

    $scope.onRunClick = function() {
        $scope.runCode();
        $scope.buttonState = $scope.resetState;
    }

    $scope.onResetClick = function() {
        $scope.notifications.dispatch('ResetLevel');
        $scope.buttonState = $scope.runState;
    }

    $scope.initCodeEditor = function() {
        $scope.codeEditor = AceService;
        $scope.codeEditor.initialize('editor');
    };

    $scope.initGameCanvas = function() {
        var subscribe = $scope.notifications.subscribe;
        var dispatch = $scope.notifications.dispatch;
        var levels = LevelsService.levels;
        $scope.game = new KodingSpy.Game(subscribe, dispatch, levels);
    }

    $scope.init = function() {
        // Notifications
        $scope.notifications = NotificationService;
        $scope.notifications.subscribe('StartLevel', $scope.onLevelStart);

        // Code interpreter
        var lineCallback = $scope.onLineExecuted.bind($scope);
        $scope.commandQueue = new KodingSpy.Command.CommandQueue(lineCallback);
        $scope.interpreter = SkulptService;
        $scope.interpreter.initialize($scope.commandQueue);

    };

    $scope.init();

});

//
// lucy/dev/app/controllers/HeaderController.js
//
app.controller('HeaderController', function($scope, NotificationService, LevelsService) {

    $scope.muteSounds = function() {
        NotificationService.dispatch('EnableSound', false);
    }

    $scope.allLevelNames = LevelsService.levels;

    $scope.onLevelSelected = function(level) {
        NotificationService.dispatch('StartLevelFromName', level);
    }

});

//
// lucy/dev/app/controllers/HelpController.js
//
app.controller('HelpController',
    function($scope,
             NotificationService) {

    // TODO: Refactor hacking of Swal
    // TODO: Bring help modal to this controller
    // TODO: Enable help modal to show tutorial texts

    $scope.notifications = null;

    $scope.showAlert = function (payload) {
        var alert = {};
        alert.title = payload.message;

        if (payload.diamonds) {
            alert.imageUrl = 'lucy/dev/game/assets/result/resultscreen0'+payload.diamonds+'.png';
        }
        swal(alert);

        // Hacking Sweetalert. Refactor this!
        $('.icon.custom').css({
          'width': '300px',
          'height': '100px'
        });
    }

    $scope.hideAlert = function () {
        // Hacking Sweetalert. Refactor this!
        $('.sweet-alert').hide();
        $('.sweet-overlay').hide();
    }

    $scope.init = function() {
        $scope.notifications = NotificationService;
        $scope.notifications.subscribe('ShowAlert', $scope.showAlert);
        $scope.notifications.subscribe('HideAlert', $scope.hideAlert);
    }

    $scope.init();
});

//
// lucy/dev/app/services/AceService.js
//
app.service('AceService', function() {
    var aceService = {};
    var editor = null;

    aceService.initialize = function(container) {
        editor = ace.edit(container);
        var langTools = ace.require("ace/ext/language_tools");

        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/python");
        editor.setFontSize('12pt');
        editor.setHighlightActiveLine(true);

        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
        });
        var customCompleter = {
            getCompletions: function(editor, session, pos, prefix, callback) {
              if (prefix.length === 0) { callback(null, []); return }
              callback(null, [
                {name:"moveForward",value:"moveForward(1)",meta:"Move Forward"},
                {name:"turnLeft",value:"turnLeft()",meta:"Turn Left"},
                {name:"turnRight",value:"turnRight()",meta:"Turn Right"},
                ]);
          }
      }

      editor.completers = [customCompleter, langTools.snippetCompleter];
    }


    aceService.content = function() {
        return editor.getValue();
    }

    aceService.highlight = function(lineNumber) {
        editor.gotoLine(lineNumber);
    }

    aceService.loadLevelCode = function(levelName, callback) {
        var AceRange = ace.require('ace/range').Range;
        editor.setValue('');
        $.ajax({
            url: 'lucy/dev/game/assets/levels/' + levelName + '.txt',
            success: function(data) {
                  editor.setValue(data, 1);
                  editor.session.addFold("", new AceRange(0,0,1,100));
                  callback();
                }
        });
    }

    return aceService;
});

//
// lucy/dev/app/services/LevelsService.js
//
app.service('LevelsService', function() {
    var levels = [
        'Level01',
        'Level02',
        'Level03',
        'Level04',
        'Level05',
        'Level06',
        'Level07',
        'Level08'
    ];

    return {levels:levels};
});

//
// lucy/dev/app/services/NotificationService.js
//
app.service('NotificationService', function() {
    var subscribers = {};

    var service = {
        dispatch : function(msg, payload) {
            var dispatchTo = subscribers[msg];
            if (dispatchTo) {
                for (var i = 0; i < dispatchTo.length; i++) {
                    var fn = dispatchTo[i]
                    fn(payload);
                };
            }
        },

        subscribe : function(msg, fn) {
            subscribers[msg] = subscribers[msg] || [];
            subscribers[msg].push(fn);
        }
    }

    return service;

});

//
// lucy/dev/app/services/SkulptService.js
//
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
