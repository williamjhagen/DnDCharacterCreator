var pageNum = 0;
var page;
var visited = [];
var pages = [ getFile("BasicInfo.html"), getFile("Stats.html"),getFile("Skills.html"), getFile("Feats.html"),getFile("Spells.html"), getFile("Backstory.html"), getFile("Review.html")];
var Character = {};
var classData = eval("("+getFile("JSON/Classes.json")+")");
var skillsData = eval("("+getFile("JSON/Skills.json")+")");
window.onload = function(){
	for (var i = 0; i < pages.length; i++) {
		visited[i] = false;
	};
	page = document.getElementById("explicitlyTrustedHtml");
	page.innerHTML = pages[pageNum];
	var nextBtn = document.getElementById("forwardButton");
	var backbtn = document.getElementById("backButton");
	nextBtn.addEventListener("click", nextPage);
	backbtn.addEventListener("click", backPage);
	constructBasicInfoPage();
}

function getFile(nameOfFile){
	var request = new XMLHttpRequest();
	request.open("GET", nameOfFile, false);
	request.send(null);
	var ret = request.responseText;
	return ret;
}

//when next button is pressed
function nextPage(){
	var canContinue = true;
	//store data or preprocess
	//basic info
	if(pageNum == 0){
		var nameInput = document.getElementById("NameInput");
		var levelInput = document.getElementById("LevelInput");
		var classInput = document.getElementById("ClassInput");
		var raceInput = document.getElementById("RaceInput");
		var alignmentInput = document.getElementById("AlignmentInput");
		var genderInput = document.getElementById("GenderInput");
		Character.Name = nameInput.value;
		Character.Level = parseInt(levelInput.value);
		Character.Class = classInput.value;
		Character.Race = raceInput.value;
		Character.Alignment = alignmentInput.value;
		Character.Gender = genderInput.value;

		if(Character.Name.length < 1){
			nameInput.style.border = "2px solid #F00";
			canContinue = false;
		}
		else{
			nameInput.style.border = "";
		} 
		if(isNaN(Character.Level) || Character.Level < 1 || Character.Level > 20){
			levelInput.style.border = "2px solid #F00";
			canContinue = false;
		}
		else{
			levelInput.style.border = "";
		}
		if(Character.Class.length < 1){
			classInput.style.border = "2px solid #F00";
			canContinue = false;
		}
		else{
			classInput.style.border = "";
		}
		if(Character.Race.length < 1){
			raceInput.style.border = "2px solid #F00";
			canContinue = false;
		}
		else{
			raceInput.style.border = "";
		}
		if(Character.Alignment.length < 1){
			alignmentInput.style.border = "2px solid #F00";
			canContinue = false;
		}
		else{
			alignmentInput.style.border = "";
		}
		if(Character.Gender.length < 1){
			genderInput.style.border = "2px solid #F00";
			canContinue = false;
		}
		else{
			genderInput.style.border = "";
		}
	}
	//stats page
	else if(pageNum == 1){
		var stat = [];
		var types = document.getElementsByClassName("btn btn-default dropdown-toggle");
		var values = document.getElementsByClassName("input-group-addon");
		for (var i = types.length - 1; i >= 0; i--) {
			stat[i] = [types[i].innerHTML, values[i].innerHTML];
		};
		document.stats = stat;

		for (var i = stat.length - 1; i >= 0; i--) {
			if(stat[i][0] == "Strength "){
				types[i].style.border = "";
				Character.Strength = stat[i][1];
			}
			else if(stat[i][0] == "Dexterity "){
				types[i].style.border = "";
				Character.Dexterity = stat[i][1];
			}
			else if(stat[i][0] == "Constitution "){
				types[i].style.border = "";
				Character.Constitution = stat[i][1];
			}
			else if(stat[i][0] == "Intelligence "){
				types[i].style.border = "";
				Character.Intelligence = stat[i][1];
			}
			else if(stat[i][0] == "Wisdom "){
				types[i].style.border = "";
				Character.Wisdom = stat[i][1];
			}
			else if(stat[i][0] == "Charisma "){
				types[i].style.border = "";
				Character.Charisma = stat[i][1];
			}
			else if(stat[i][0] == "Dropped "){
				types[i].style.border = "";
			}
			//the user forgot to assign all stats
			else{
				types[i].style.border = "2px solid #F00";
				canContinue = false;
			}
		};

		if(canContinue){
			if(Character.Race == "Dwarf"){
				Character.Constitution += 2;
				Character.Wisdom += 2;
				Character.Charisma -= 2;
			}
			if(Character.Race == "Elf"){
				Character.Dexterity += 2;
				Character.Intelligence += 2;
				Character.Constitution -= 2;
			}
			if(Character.Race == "Gnome"){

			}
			if(Character.Race == "Halfing"){
				Character.Dexterity += 2;
				Character.Charisma += 2;
				Character.Strength -= 2;
			}
			if(Character.Race == "Half-Orc"){

			}
			if(Character.Race == "Human"){

			}
		}
	}
	//skills page
	else if(pageNum == 2){
		var skillList = document.getElementsByClassName("currentSkills");
		Character.Skills = [];
		var len = skillList.length;
		for (var i = 0; i < len; i++) {
			var split = skillList[i].innerHTML.split(":");
			split[0] = split[0].trim();
			split[1] = split[1].trim();
			Character.Skills.push(split);
		};
	}
	//feats page
	else if(pageNum == 3){
		var featList = document.getElementsByClassName("featInputs");
		var fighterFeats;
		Character.Feats = [];
		if(Character.Class == "Fighter")
			fighterFeats = document.getElementsByClassName("fighterFeatInputs");

		for (var i = 0; i < featList.length; i++) {
			if(featList[i].value.length < 1){
				canContinue = false;
				featList[i].style.border = "2px solid #F00";
			}
			else{
				featList[i].style.border = "";
				Character.Feats.push(featList[i].value);
			}
		};
		if(fighterFeats != undefined){
			for (var i = 0; i < fighterFeats.length; i++) {
				if(fighterFeats[i].value.length < 1){
					canContinue = false;
					fighterFeats[i].style.border = "2px solid #F00";
				}
				else{
					fighterFeats[i].style.border = "";
					Character.Feats.push(featList[i].value);
				}
			};
		}

		if(canContinue && classData.classes[Character.Class].spellsKnown == undefined) ++pageNum;
	}
	//spells page
	else if(pageNum == 4){
		var spellList = document.getElementsByClassName("spellInputs");
		if(spellList.length > 0)
		{		
			Character.Spells = [];

			for (var i = 0; i < spellList.length; i++) {
				if(spellList[i].value.length < 1){
					canContinue = false;
					spellList[i].style.border = "2px solid #F00";
				}
				else{
					spellList[i].style.border = "";
					Character.Spells.push(spellList[i].value);
				}
			};
		}
	}
	//backstory page
	else if(pageNum == 5){
		var backstory = document.getElementById("BackstoryForm").value;
		if(backstory == undefined || backstory.length < 1) backstory = "";

		Character.Backstory = backstory;
	}
	//review page
	else if(pageNum == 6){
		canContinue = false;
		//PUSH TO DATA TO SERVER
		//AKA MAGICAL NONSENSE
	}

	if(!canContinue) return;
	console.log(Character);
	visited[pageNum] = true;
	page.innerHTML = pages[++pageNum];
	console.log(visited)
	if(pageNum == 1){
		constructStatsPage();
	}
	else if(pageNum == 2){
		constructSkillsPage();
	}
	else if(pageNum == 3){
		constructFeatsPage();
	}
	else if(pageNum == 4){
		constructSpellsPage();
	}
	else if(pageNum == 5){
		document.getElementById('header').querySelector('h3').innerHTML = "Character Creator -- Back Story";
	}
	else if(pageNum == 6){
		constructReviewPage();
	}
}

//when back button is pressed
function backPage(){

	if(pageNum == 0) return;

	visited[pageNum] = true;

	if(pageNum == 1){
		var stat = [];
		var types = document.getElementsByClassName("btn btn-default dropdown-toggle");
		var values = document.getElementsByClassName("input-group-addon");
		for (var i = types.length - 1; i >= 0; i--) {
			stat[i] = [types[i].innerHTML, values[i].innerHTML];
		};
		document.stats = stat;
	}
	page.innerHTML = pages[pageNum - 1];

	//stats page to basicinfo
	if(pageNum == 1){
		constructBasicInfoPage();
	}
	//skills page to stats page
	else if(pageNum == 2){
		constructStatsPage();
	}
	//feats to skills
	else if(pageNum == 3){
		constructSkillsPage();
	}
	//spells to feats
	else if(pageNum == 4){
		constructFeatsPage();
	}
	//backstory to spells OR feats
	else if(pageNum == 5){
		if(classData.classes[Character.Class].spellsKnown == undefined){
			page.innerHTML = pages[--pageNum - 1]
			constructFeatsPage();
		}
		else{
			constructSpellsPage();
		}
	}
	//review to backstory
	else if(pageNum == 6){
		document.getElementById('header').querySelector('h3').innerHTML = "Character Creator -- Back Story";
		document.getElementById('forwardButton').innerHTML = "Next";
		if(visited[5]){
			document.getElementById("BackstoryForm").value = Character.Backstory;
		}
	}
	--pageNum;
}