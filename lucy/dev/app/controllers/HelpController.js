app.controller('HelpController',
    function($scope,
             $http,
             NotificationService) {

    // TODO: Refactor hacking of Swal
    // TODO: Enable help modal to show tutorial texts

    $scope.notifications = null;
    $scope.levelHelp = null;
    $scope.levelName = null;

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

    $scope.loadHelp = function(levelName) {
        $scope.levelHelp = 'lucy/dev/game/assets/levels/'+levelName+'.html'
        $scope.levelName = levelName;
        $('#helpModal').modal('show');
    }

    $scope.init = function() {
        $scope.notifications = NotificationService;
        $scope.notifications.subscribe('ShowAlert', $scope.showAlert);
        $scope.notifications.subscribe('HideAlert', $scope.hideAlert);
        $scope.notifications.subscribe('StartLevel', $scope.loadHelp);
    }

    $scope.init();
});
