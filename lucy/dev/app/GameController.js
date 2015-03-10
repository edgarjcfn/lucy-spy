app.controller('GameController', function($scope, NotificationService) {

    $scope.buttonState = _runState;
    $scope.game = null;

    var _runState = {
        text:'Run',
        class: 'btn btn-success btn-lg',
        execute: function() {
            $scope.buttonState = _resetState;
        }
    }

    var _resetState = {
        text:'Reset',
        class: 'btn btn-danger btn-lg',
        execute: function() {
            $scope.buttonState = _runState;
        }
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
        $scope.buttonState.execute();
    }

    $scope.onLevelStart = function(level) {
        console.log('Loading level code: ' + level);
        $scope.buttonState = _runState;
        var editor = ace.edit("editor");
        var AceRange = ace.require('ace/range').Range;
        editor.setValue('');
        $.ajax({
            url: 'lucy/dev/game/assets/levels/' + level + '.txt',
            success: function(data) {
                  editor.setValue(data, 1);
                  editor.session.addFold("", new AceRange(0,0,1,100));
                }
        });
    }

    var init = function() {
        NotificationService.subscribe('StartLevel', $scope.onLevelStart);
    };

    init();

});
