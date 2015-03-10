//
// lucy/dev/app/module.js
//
angular.module('lucy', []);
var app = angular.module('lucy');

//
// lucy/dev/app/NotificationService.js
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
// lucy/dev/app/controllers/AppController.js
//
app.controller('AppController', function($scope) {

});

//
// lucy/dev/app/controllers/GameController.js
//
app.controller('GameController', function($scope, NotificationService) {

    $scope.buttonState = null;
    $scope.game = null;

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

    $scope.initCodeEditor = function() {

        var editor = ace.edit("editor");
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
    };

    $scope.initGameCanvas = function() {
        var subscribe = NotificationService.subscribe;
        var dispatch = NotificationService.dispatch;
        $scope.game = new KodingSpy.Game(subscribe, dispatch);
    }

    $scope.onButtonClicked = function() {
        var fnName = $scope.buttonState.execute;
        var fn = $scope[fnName];
        fn();
    }

    $scope.onLevelStart = function(level) {
        console.log('Loading level code: ' + level);
        var editor = ace.edit('editor');
        var AceRange = ace.require('ace/range').Range;
        editor.setValue('');
        $.ajax({
            url: 'lucy/dev/game/assets/levels/' + level + '.txt',
            success: function(data) {
                  editor.setValue(data, 1);
                  editor.session.addFold("", new AceRange(0,0,1,100));
                  $scope.buttonState = $scope.runState;
                  $scope.$apply();
                }
        });
    }

    //
    // Start SweetAlert
    //
    $scope.showAlert = function (message, diamonds) {
        var msg = {};
        msg.title = message;

        if (diamonds > -1) {
            msg.imageUrl = 'lucy/dev/game/assets/result/resultscreen0'+diamonds+'.png';
        }
        swal(msg);

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

    //
    // End SweetAlert
    //

    $scope.onRunClick = function() {
        console.log('clicked run');
        $scope.runCode();
        $scope.buttonState = $scope.resetState;
    }

    $scope.onResetClick = function() {
        console.log('clicked reset');
        NotificationService.dispatch('ResetLevel');
        $scope.buttonState = $scope.runState;
    }

    //
    // Start SKULPT
    //
    $scope.runCode = function() {
        var prog = ace.edit("editor").getValue();

        Sk.externalLibraries = {
            lucy : {
              path : 'lucy/dist/lucy.lang.js',
              dependencies : []
            },
        };
        Sk.commandChain = new KodingSpy.Command.CommandQueue($scope.onLineExecuted);
        Sk.configure({read:$scope.builtinRead});

        try {
            eval(Sk.importMainWithBody("<stdin>",false,prog));
            Sk.commandChain.execute();
        }
        catch(e) {
            //console.debug('error', e);
            SkulptRunning = false;
            throw e
        }
    }

    $scope.onLineExecuted = function(lineNumber) {
        if (lineNumber > 0) {
            var editor = ace.edit("editor");
            editor.gotoLine(lineNumber);
        }
    }

    $scope.builtinRed = function(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
    }
    //
    // End SKULPT
    //

    $scope.init = function() {
        NotificationService.subscribe('StartLevel', $scope.onLevelStart);
        NotificationService.subscribe('ShowMessage', $scope.showAlert);
        NotificationService.subscribe('HideMessage', $scope.hideAlert);
    };

    $scope.init();

});

//
// lucy/dev/app/controllers/HeaderController.js
//
app.controller('HeaderController', function($scope, NotificationService) {

    $scope.muteSounds = function() {
        NotificationService.dispatch('EnableSound', false);
    }

});

//
// lucy/dev/app/controllers/HelpController.js
//
app.controller('HelpController', function($scope) {

});

//
// lucy/dev/app/services/NotificationService.js
//
app.factory('NotificationService', function() {
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
