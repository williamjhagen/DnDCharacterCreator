var pageNum = 0;
var pages = [ getFile("BasicInfo.html")];
var myApp = angular.module('ngBindHtml',['ngSanitize']);

myApp.controller('myCtrl', function myCtrl($sce) {
	myCtrl.explicitlyTrustedHtml = $sce.trustAsHtml(pages[pageNum]);
	console.log(myCtrl.explicitlyTrustedHtml.toString());
});

function getFile(nameOfFile){
	var request = new XMLHttpRequest();
	request.open("GET", nameOfFile, false);
	request.send(null);
	var ret = request.responseText;
	return ret;
}

