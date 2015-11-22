app.controller('GameController',
    function($scope,
             NotificationService,
             LevelsService,
             SkulptService,
             AceService) {

    // Injected services
    $scope.interpreter = SkulptService;
    $scope.notifications = NotificationService;
    $scope.codeEditor = AceService;

    // Local variables
    $scope.buttonState = null;
    $scope.game = null;

    // Local constants
    var ButtonStates = {
        RUN : {
            text:'Run',
            class: 'btn btn-success btn-lg',
            execute: 'onRunClick'
        },

        RESET : {
            text:'Reset',
            class: 'btn btn-danger btn-lg',
            execute: 'onResetClick'
        }
    };

    $scope.onButtonClicked = function() {
        var fnName = $scope.buttonState.execute;
        var fn = $scope[fnName];
        fn();
    }

    $scope.onLevelStart = function(level) {
        $scope.codeEditor.loadLevelCode(level, function() {
            $scope.buttonState = ButtonStates.RUN;
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
        $scope.buttonState = ButtonStates.RESET;
    }

    $scope.onResetClick = function() {
        $scope.notifications.dispatch('ResetLevel');
        $scope.buttonState = ButtonStates.RUN;
    }

    $scope.init = function() {
        // Subscribe to notifications
        $scope.notifications.subscribe('StartLevel', $scope.onLevelStart);

        // Initialize Python Interpreter
        var lineCallback = $scope.onLineExecuted.bind($scope);
        console.log(LucyGame);
        console.log(LucyGame.CommandQueue);
        var commandQueue = new LucyGame.CommandQueue(lineCallback);
        $scope.interpreter.initialize(commandQueue);

        // Initialize code window
        $scope.codeEditor.initialize('editor');

        // Initialize game
        var subscribe = $scope.notifications.subscribe;
        var dispatch = $scope.notifications.dispatch;
        var levels = LevelsService.levels;
        $scope.game = new LucyGame.Game('gameCanvas', subscribe, dispatch, levels);

    };

    $scope.init();

});
