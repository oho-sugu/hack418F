/**
 * Created by Cheol on 15. 10. 3..
 */
angular.module('index', [])
    .controller('AppCtrl', function ($scope, $http) {
        $scope.showSide = true;
        $scope.toggle = function() {
            $scope.showSide = !$scope.showSide;
        };
        var num = 0;
        var socket = io();
        $scope.chat = [];
        $scope.guled = true;
        socket.on('sentaku', function (sentaku) {
            console.log(sentaku);
            $scope.sentaku = sentaku;
            $scope.$apply();
        });
        $scope.click_sentaku = function (index) {
            console.log(index);
            $http.get('/sentaku/'+index)
                .success(function (data) {
                });
            num++;
        }

    });
