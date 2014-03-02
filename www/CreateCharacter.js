var pageNum = 1;
var scope;
var pages = [ getFile("BasicInfo.html"), getFile("Stats.html"), getFile("Backstory.html")];
var currentPage = pages[pageNum];
var myApp = angular.module('ngBindHtml',['ngSanitize'])

myApp.controller('myCtrl', function myCtrl($sce, $scope) {
	$scope.explicitlyTrustedHtml = $sce.trustAsHtml(currentPage);
});

function getFile(nameOfFile){
	var request = new XMLHttpRequest();
	request.open("GET", nameOfFile, false);
	request.send(null);
	var ret = request.responseText;
	return ret;
}

function nextPage(){
	console.log("here");
	++pageNum;
	currentPage = pages[pageNum];
}