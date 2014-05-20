//create the review page
/*
* This page could use some prettying up
*/
function constructReviewPage(){
	document.getElementById('header').querySelector('h3').innerHTML = "Character Creator -- Review";
	document.getElementById("forwardButton").innerHTML = "Finish";

	document.getElementById("name").innerHTML = "Name: " + Character.Name;
	document.getElementById("level").innerHTML = "Level: " + Character.Level;
	document.getElementById("class").innerHTML = "Class: " + Character.Class;
	document.getElementById("race").innerHTML = "Race: " + Character.Race;
	document.getElementById("gender").innerHTML = "Gender: " + Character.Gender;
	document.getElementById("alignment").innerHTML = "Alignment: " + Character.Alignment;

	document.getElementById("str").innerHTML = "Strength: " + Character.Strength;
	document.getElementById("dex").innerHTML = "Dexterity: " + Character.Dexterity;
	document.getElementById("con").innerHTML = "Constitution: " + Character.Constitution;
	document.getElementById("int").innerHTML = "Intelligence: " + Character.Intelligence;
	document.getElementById("wis").innerHTML = "Wisdom: " + Character.Wisdom;
	document.getElementById("cha").innerHTML = "Charisma: " + Character.Charisma;

	var skillsDiv = document.getElementById("skills");
	var numSkills = Character.Skills.length;
	for(var i = 0; i < numSkills; ++i){
		var el = document.createElement("p");
		el.innerHTML = Character.Skills[i];
		skillsDiv.appendChild(el);
	};

	var featsDiv = document.getElementById("feats");
	var numFeats = Character.Feats.length;
	for(var i = 0; i < numFeats; ++i){
		var el = document.createElement("p");
		el.innerHTML = Character.Feats[i];
		featsDiv.appendChild(el);
	};

	if(Character.Spells != undefined && Character.Spells.length > 0)
	{
		var spellsDiv = document.getElementById("spells");
		var numSpells = Character.Spells.length;
		for(var i = 0; i < numSpells; ++i){
			var el = document.createElement("p");
			el.innerHTML = Character.Spells[i];
			spellsDiv.appendChild(el);
		};
	}
	else{
		document.getElementById("explicitlyTrustedHtml").removeChild(document.getElementById("spells"));
	}

	var backstory = Character.Backstory;
	var backstoryArticle = document.getElementById("backstory");

	if(Character.Backstory != ""){
		backstoryArticle.innerHTML = Character.Backstory;
	}
	else{
		backstoryArticle.innerHTML = "This character has no backstory.";
	}
}
