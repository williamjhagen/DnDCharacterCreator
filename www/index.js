
window.onload = function(){
	var CreateCharacterButton = document.getElementById("CreatorButton");
	console.log(CreateCharacterButton);
	CreateCharacterButton.addEventListener("mouseover", function(){
		CreateCharacterButton.src = "assets/CreateCharacterButtonHover.png";
	});
	CreateCharacterButton.addEventListener("mouseout", function(){
		CreateCharacterButton.src = "assets/CreateCharacterButton.png";	
	});
	var AnalyticsButton = document.getElementById("AnalyticsButton");
	AnalyticsButton.addEventListener("mouseover", function(){
		AnalyticsButton.src = "assets/AnalyticsButtonHover.png";
	});
	AnalyticsButton.addEventListener("mouseout", function(){
		AnalyticsButton.src = "assets/AnalyticsButton.png";	
	});
	var AboutButton = document.getElementById("AboutButton");
	AboutButton.addEventListener("mouseover", function(){
		AboutButton.src = "assets/AboutButtonHover.png";
	});
	AboutButton.addEventListener("mouseout", function(){
		AboutButton.src = "assets/AboutButton.png";	
	});
}