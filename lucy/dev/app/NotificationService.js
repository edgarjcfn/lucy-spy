app.factory('NotificationService', function() {
    var subscribers = {};

    var service = {
        dispatch : function(msg, payload) {
            var dispatchTo = subscribers[msg];
            for (var i = 0; i < dispatchTo.length; i++) {
                var fn = dispatchTo[i]
                fn(payload);
            };
        },

        subscribe : function(msg, fn) {
            subscribers[msg] = subscribers[msg] || [];
            subscribers[msg].push(fn);
        }
    }

    return service;

});
