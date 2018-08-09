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
.controller("searchCon", function ($scope,$http) {
   
    $http.get('https://data.cityofnewyork.us/resource/5scm-b38n.json').then(function(data) {
        var data = $scope.data = data.data;
    })
   
   
    $scope.submit = function() {
        var f = $scope.fname;
        var l = $scope.lname;
        
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
            });
        }
    }
        $scope.fname = $scope.lname = null;

        $scope.go = function() {
            alert('dwdwdd');
        }

   }
   
   
});