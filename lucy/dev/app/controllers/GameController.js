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
