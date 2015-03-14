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
