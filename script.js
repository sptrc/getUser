var app = angular.module("searchApp",[])
    .decorator("$xhrFactory", [
        "$delegate", "$injector",
        function ($delegate, $injector) {
            return function (method, url) {
                var xhr = $delegate(method, url);
                var $http = $injector.get("$http");
                var callConfig = $http.pendingRequests[$http.pendingRequests.length - 1];
                if (angular.isFunction(callConfig.onProgress))
                    xhr.addEventListener("progress", callConfig.onProgress);
                return xhr;
            };
        }
    ])
.controller("searchCon", function ($scope,$http,$timeout) {
    
    $scope.load = 0;
    
    $http.get('https://data.cityofnewyork.us/resource/5scm-b38n.json').then(function(data) {
        var data = $scope.data = data.data;
    })
   
   
    $scope.submit = function() {
        var f = $scope.fname;
        var l = $scope.lname;
        $scope.load = 0;
        $scope.prog = true;
        
        if(f&&l){
            $http({
                method: "GET",
                url: 'https://data.cityofnewyork.us/resource/5scm-b38n.json?first_name=' + f.toUpperCase() + '&last_name=' + l.toUpperCase(),
                onProgress: function (event) {
                    // console.log("loaded " + ((event.loaded / event.total) * 100) + "%");
                    console.log(event);
                }
            }).then(function (data) {
                var data = $scope.data = data.data;
                $scope.load = 100;
            });

            
        }
        else{
            if(f){

                $http({
                    method: "GET",
                    url: 'https://data.cityofnewyork.us/resource/5scm-b38n.json?first_name=' + f.toUpperCase(),
                    onProgress: function (event) {
                        // console.log("loaded " + ((event.loaded / event.total) * 100) + "%");
                        console.log(event);
                    }
                }).then(function (data) {
                    var data = $scope.data = data.data;
                    $scope.load = 100;
                });
            }
            if(l) {
            $http({
                method: "GET",
                url: 'https://data.cityofnewyork.us/resource/5scm-b38n.json?last_name=' + l.toUpperCase(),
                onProgress: function (event) {
                    // console.log("loaded " + ((event.loaded / event.total) * 100) + "%");
                    console.log(event);
                }
            }).then(function (data) {
                var data = $scope.data = data.data;
                $scope.load = 100;
            });
        }
    }
        $scope.fname = $scope.lname = null;
        $timeout(function() {
            $scope.prog=false;
            $scope.load = 0;
        },2000);



        $scope.go = function() {
            alert('dwdwdd');
        }

   }
   
   
});