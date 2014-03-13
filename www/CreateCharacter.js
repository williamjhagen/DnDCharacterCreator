var pageNum = 0;
var page;
var pages = [ getFile("BasicInfo.html"), getFile("Stats.html"),undefined, undefined, getFile("Backstory.html")];
window.onload = function(){
	page = document.getElementById("explicitlyTrustedHtml");
	page.innerHTML = pages[pageNum];
	var nextBtn = document.getElementById("forwardButton");
	var backbtn = document.getElementById("backButton");
	nextBtn.addEventListener("click", nextPage);
	backbtn.addEventListener("click", backPage);
	pages[2] = constructSpellsPage();
	pages[3] = constructFeatsPage();
}

function getFile(nameOfFile){
	var request = new XMLHttpRequest();
	request.open("GET", nameOfFile, false);
	request.send(null);
	var ret = request.responseText;
	return ret;
}

function nextPage(){
	page.innerHTML = pages[++pageNum];
}

function backPage(){
	page.innerHTML = pages[--pageNum];
}

function constructSkillsPage(){
	var l
}

function constructFeatsPage(){

}

function constructSpellsPage(){

}