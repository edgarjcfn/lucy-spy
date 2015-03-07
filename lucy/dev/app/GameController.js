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
      NotificationService.subscribe('aceDone', function(pl) {
        alert('aceDone');
      });
      NotificationService.dispatch('aceDone');
    };

    $scope.initGameCanvas = function() {
        $scope.game = new KodingSpy.Game();
    }

    $scope.onButtonClicked = function() {
        $scope.buttonState.execute();
    }

    var init = function() {
    };

    init();

});
