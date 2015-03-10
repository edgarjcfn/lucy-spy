app.controller('HeaderController', function($scope, NotificationService) {

    $scope.muteSounds = function() {
        NotificationService.dispatch('EnableSound', false);
    }

});
