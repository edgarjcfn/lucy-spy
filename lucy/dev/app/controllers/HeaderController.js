app.controller('HeaderController', function($scope, NotificationService, LevelsService) {

    $scope.muteSounds = function() {
        NotificationService.dispatch('EnableSound', false);
    }

    $scope.allLevelNames = LevelsService.levels;

    $scope.onLevelSelected = function(level) {
        NotificationService.dispatch('StartLevelFromName', level);
    }

});
