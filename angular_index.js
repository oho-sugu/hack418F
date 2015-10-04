/**
 * Created by Cheol on 15. 10. 3..
 */
angular.module('index', [])
    .controller('AppCtrl', function ($scope, $http) {
        $scope.showSide = true;
        $scope.toggle = function() {
            $scope.showSide = !$scope.showSide;
            console.log($scope.showSide);
        };
        var num = 0;
        $http.get('/get')
            .success(function (data) {
                $scope.item = data;
                $scope.view = $scope.item[num].text;
                $scope.sentaku = $scope.item[num].sentaku;
            });
        var click_sentaku = function (index) {
            console.log(index);
            $http.get('/index')
                .success(function (data) {
                });
            num++;
            $scope.view = $scope.item[num].text;
            $scope.sentaku = $scope.item[num].sentaku;
        }
    });
