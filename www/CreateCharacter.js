var pageNum = 0;
var scope;
var pages = [ getFile("BasicInfo.html"), getFile("Stats.html")];
var myApp = angular.module('ngBindHtml',['ngSanitize'])

myApp.controller('myCtrl', function myCtrl($sce, $scope) {
	$scope.explicitlyTrustedHtml = $sce.trustAsHtml(pages[pageNum]);
});

function getFile(nameOfFile){
	var request = new XMLHttpRequest();
	request.open("GET", nameOfFile, false);
	request.send(null);
	var ret = request.responseText;
	return ret;
}