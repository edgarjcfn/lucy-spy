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

    $scope.onRunClick = function() {
        console.log('clicked run');
        $scope.buttonState = $scope.resetState;
    }

    $scope.onResetClick = function() {
        console.log('clicked reset')
        $scope.buttonState = $scope.runState;
    }

    var init = function() {
        NotificationService.subscribe('StartLevel', $scope.onLevelStart);
        NotificationService.subscribe('ShowMessage', $scope.showAlert);
        NotificationService.subscribe('HideMessage', $scope.hideAlert);
    };

    init();

});
