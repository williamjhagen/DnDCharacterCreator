var pageNum = 0;
var page;
var pages = [ getFile("BasicInfo.html"), getFile("Stats.html"),getFile("Skills.html"), getFile("Feats.html"),getFile("Spells.html"), getFile("Backstory.html"), getFile("Review.html")];
var Character = {};
var classData = eval("("+getFile("JSON/Classes.json")+")");
var skillsData = eval("("+getFile("JSON/Skills.json")+")");
window.onload = function(){
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
	request.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
	request.send(null);
	var ret = request.responseText;
	return ret;
}

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
	page.innerHTML = pages[++pageNum];
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

function backPage(){
	if(pageNum > 0){
		pageNum -= 2;
		nextPage();
	}
}

function constructBasicInfoPage(){
	//set up events on basic page
	var inputs = document.getElementsByClassName('input-group');
	for (var i = inputs.length - 1; i >= 0; i--) {
		var lists = inputs[i].getElementsByClassName('lists');
		for (var k = lists.length - 1; k >= 0; k--) {
			lists[k].addEventListener('click',function(e){
				var inp = e.target.parentNode.parentNode.parentNode.parentNode.querySelector("input");
				inp.value = e.target.innerHTML;
			});
		};
	};
}

function constructStatsPage(){
	document.getElementById('header').querySelector('h3').innerHTML = "Character Creator -- Stats";
	var inputs = document.getElementsByClassName('input-group-btn');
	for (var i = inputs.length - 1; i >= 0; i--) {
		var lists = inputs[i].getElementsByClassName('statList');
		for (var k = lists.length - 1; k >= 0; k--) {
			lists[k].addEventListener('click',function(e){
				var stats = document.getElementsByClassName("btn btn-default dropdown-toggle");
				var statsIHTML = [];
				for (var i = stats.length - 1; i >= 0; i--) {
					statsIHTML[i] = stats[i].innerHTML;
				};
				if($.inArray(e.target.innerHTML, statsIHTML) == -1){
					var inp = e.target.parentNode.parentNode.parentNode.querySelector("button");
					inp.innerHTML = e.target.innerHTML;
				}
			});
		};
	};
	document.getElementById("rollBtn").addEventListener("click", function(e){
		if(this.rollBtnClicked != undefined){ //reset stat collections
			var stats = document.getElementsByClassName("btn btn-default dropdown-toggle");
			for (var i = stats.length - 1; i >= 0; i--) {
				stats[i].innerHTML = "Unnassigned ";
				var caret = document.createElement("span");
				caret.className = "caret";
				stats[i].appendChild(caret);
				stats[i].style.border = "";

			};
			return;
		}
		this.rollBtnClicked = true;
		var stats = document.getElementsByClassName("input-group-addon");
		for (var i = stats.length - 1; i >= 0; i--) {
			//set each value to a sum of the highest 3 elements of 4 rolls
			var values = [Math.floor(Math.random() * 6 + 1),
						  Math.floor(Math.random() * 6 + 1),
						  Math.floor(Math.random() * 6 + 1),
						  Math.floor(Math.random() * 6 + 1)];
			values.sort();
			var stat = values[3] + values[1] + values[2];
			stats[i].innerHTML = values[3] + values[1] + values[2];
			if(stat < 10){
				stats[i].innerHTML = stats[i].innerHTML + ' ';
			}
		};
		document.getElementById("rollBtn").innerHTML = "Reset Stats";
	});
}

function constructSkillsPage(){
	document.getElementById('header').querySelector('h3').innerHTML = "Character Creator -- Skills";
	document.getElementById('container').style.overflow = "hidden";
	document.usedSkills = [];
	var skillMod = Math.max(classData.classes[Character.Class].skillMod, 0)
	var pointsLeft = Math.floor((Character.Level + 3) * (skillMod + ((Character.Intelligence - 10) / 2)));
	document.getElementById("pointsRemaining").innerHTML = "Points Left: " + pointsLeft.toString();
	
	document.getElementById('plusBtn').addEventListener("click", function(e){
		var pointsLeftElement = document.getElementById("pointsRemaining");
		var hundreds =  parseInt(pointsLeftElement.innerHTML[13]);
		var tens =  parseInt(pointsLeftElement.innerHTML[14]);
		var ones =  parseInt(pointsLeftElement.innerHTML[15]);

		var pointsLeft = hundreds * 100 + tens * 10 + ones;	
		if(isNaN(tens)){
			pointsLeft = hundreds;
		}
		else if(isNaN(ones)){
			pointsLeft = hundreds * 10 + tens
		}
		//if they have no points remaining, do nothing
		if(pointsLeft <= 0) return;

		var selected = document.getElementById("selectedInput");
		//if no skills was selected, return
		if(selected.innerHTML.length < 1) return;

		//they don't have enough points
		if(classData.classes[Character.Class].skills.indexOf(selected.innerHTML) == -1){
			if(pointsLeft < 2) return;
		}
		var list = document.getElementById("chosenSkillList");
		//check if they already have points in the skill
		var skillIndex = document.usedSkills.indexOf(selected.innerHTML);
		//new skill
		if(skillIndex == -1){
			document.usedSkills.push(selected.innerHTML);
			var item = document.createElement("article");
			item.className = "currentSkills";
			item.innerHTML = selected.innerHTML + ": 1";;
			list.appendChild(item);
		}
		//already have points in this skill
		else{
			var currentSkills = document.getElementsByClassName("currentSkills");
			//find the correct skill
			var len = currentSkills.length;
			for (var i = 0; i < len; i++) {
				if(currentSkills[i].innerHTML.indexOf(selected.innerHTML) != -1){
					//we found the skill, update its number
					//length of the string
					var strLen = currentSkills[i].innerHTML.length;
					var num = currentSkills[i].innerHTML.slice(strLen - 2, strLen);
					num = num.replace(' ', '');
					var start = currentSkills[i].innerHTML.slice(0, strLen - num.length);
					var numInt = parseInt(num);

					//make sure they aren't going above the max they can have for the stat
					var controlStat;
					var controlMod = 0;
					for (var k = 0; k < skillsData.skills.length; k++) {
						if(skillsData.skills[k].name == selected.innerHTML){
							controlStat = skillsData.skills[k].stat;
							break;
						}
					};
					if(controlStat == "Int"){
						controlMod = Math.floor((Character.Intelligence - 10) / 2)
					}else if(controlStat == "Str"){
						controlMod = Math.floor((Character.Strength - 10) / 2)
					}else if(controlStat == "Dex"){
						controlMod = Math.floor((Character.Dexterity - 10) / 2)
					}else if(controlStat == "Con"){
						controlMod = Math.floor((Character.Constitution - 10) / 2)
					}else if(controlStat == "Wis"){
						controlMod = Math.floor((Character.Wisdom - 10) / 2)
					}else if(controlStat == "Cha"){
						controlMod = Math.floor((Character.Charisma - 10) / 2)
					}
					if(numInt >= Character.Level + controlMod) return;
					//javscript is nonsense.
					var replaced = currentSkills[i].innerHTML.slice(strLen - num.length, strLen);
					var newIHTML;
					newIHTML = (numInt + 1).toString();
					currentSkills[i].innerHTML = start + newIHTML;
					break;
				}
			};
		}
		var oldStr = pointsLeft.toString();
		if(classData.classes[Character.Class].skills.indexOf(selected.innerHTML) != -1)
			pointsLeft -= 1;
		else{
			pointsLeft -= 2;
		}
		pointsLeft = pointsLeft.toString().replace(' ', '');
		var newIHTML = pointsLeftElement.innerHTML.slice(0, pointsLeftElement.innerHTML.length - oldStr.length)
		pointsLeftElement.innerHTML = newIHTML + pointsLeft;
	});
	document.getElementById('minusBtn').addEventListener("click", function(e){
		var pointsLeftElement = document.getElementById("pointsRemaining");
		var hundreds =  parseInt(pointsLeftElement.innerHTML[13]);
		var tens =  parseInt(pointsLeftElement.innerHTML[14]);
		var ones =  parseInt(pointsLeftElement.innerHTML[15]);

		var pointsLeft = hundreds * 100 + tens * 10 + ones;	
		if(isNaN(tens)){
			pointsLeft = hundreds;
		}
		else if(isNaN(ones)){
			pointsLeft = hundreds * 10 + tens
		}
		var selected = document.getElementById("selectedInput");
		//if no skills was selected, return
		if(selected.innerHTML.length < 1) return;
		var list = document.getElementById("chosenSkillList");
		//check if they already have points in the skill
		var skillIndex = document.usedSkills.indexOf(selected.innerHTML);
		//we don't have that skill, return
		if(skillIndex == -1) return;
		//already have points in this skill
		else{
			var currentSkills = document.getElementsByClassName("currentSkills");
			//find the correct skill
			var len = currentSkills.length;
			for (var i = 0; i < len; i++) {
				if(currentSkills[i].innerHTML.indexOf(selected.innerHTML) != -1){
					//we found the skill, update its number
					//length of the string
					var strLen = currentSkills[i].innerHTML.length;
					var num = currentSkills[i].innerHTML.slice(strLen - 2, strLen);
					num = num.replace(' ', '');
					var start = currentSkills[i].innerHTML.slice(0, strLen - num.length);
					var numInt = parseInt(num);
					//remove the item, and return
					if(numInt == 1){
						document.usedSkills.splice(skillIndex, 1);
						list.removeChild(currentSkills[i]);
						break;
					}
					//javscript is nonsense.
					var replaced = currentSkills[i].innerHTML.slice(strLen - num.length, strLen);
					var newIHTML = (numInt - 1).toString();
					currentSkills[i].innerHTML = start + newIHTML;
				}
			};
		}
		var oldStr = pointsLeft.toString();
		if(classData.classes[Character.Class].skills.indexOf(selected.innerHTML) != -1)
			pointsLeft += 1;
		else
			pointsLeft += 2;
		pointsLeft = pointsLeft.toString().replace(' ', '');
		var newIHTML = pointsLeftElement.innerHTML.slice(0, pointsLeftElement.innerHTML.length - oldStr.length)
		pointsLeftElement.innerHTML = newIHTML + pointsLeft;
	});

	var len = skillsData.skills.length;
	var tabs = document.getElementsByClassName("tab-pane");
	var access = {"class":tabs[0], "Str":tabs[1], "Dex":tabs[2], "Con":tabs[3], "Int":tabs[4], "Wis":tabs[5], "Cha":tabs[6], "None":tabs[7]};
	var skillClick = function(e){
		var selected = document.getElementById("selectedInput");
		selected.innerHTML = e.target.text;
	}
	for (var i = 0; i < len; ++i) {
		var item = document.createElement("a");
		item.className = "skillItem";
		item.innerHTML = skillsData.skills[i].name;
		item.addEventListener("click", skillClick);
		access[skillsData.skills[i].stat].appendChild(item);
		access[skillsData.skills[i].stat].appendChild(document.createElement('br'));
	};
	len = classData.classes[Character.Class].skills.length;
	for (var i = 0; i < len; i++) {
		var item = document.createElement("a");
		item.className = "skillItem";
		item.innerHTML = classData.classes[Character.Class].skills[i];
		item.addEventListener("click", skillClick);
		access["class"].appendChild(item);
		access["class"].appendChild(document.createElement('br'));
	};
}

function constructFeatsPage(){
	document.getElementById('header').querySelector('h3').innerHTML = "Character Creator -- Feats";
	document.getElementById('container').style.overflow = "auto";

	var numFeats = 1 + (Math.floor(Character.Level / 3));
	var numFighterFeats = 0;
	if(Character.Race == "Human") ++numFeats;

	var container = document.getElementById("featInputsContainer");
	for (var i = 0; i < numFeats; i++) {
		var group = document.createElement("div");
		group.className = "featInputsGroup"
		var label = document.createElement("span")
		label.className = "input-group-addon";
		label.innerHTML = "Feat " + (i + 1) + ": ";

		var el = document.createElement("input");
		el.className = "form-control featInputs";

		group.appendChild(label);
		group.appendChild(el);

		container.appendChild(group);
	};

	if(Character.Class == "Fighter"){
		var fighterColContainer = document.createElement("div");
		fighterColContainer.id = "fighterColumnContainer";
		var fighterCol = document.createElement("div");
		fighterCol.id = "fighterColumn";
		fighterColContainer.appendChild(fighterCol);
		document.getElementById("featsCSS").href = "css/bonusFeats.css";
		var fighterContainer = document.createElement("div");
		fighterContainer.id = "fighterFeatsContainer";
		document.getElementById("explicitlyTrustedHtml").appendChild(fighterContainer);

		for (var i = 0; i < Character.Level; i++) {
			numFighterFeats += classData.classes["Fighter"].bonusFeats[i];	
		};

		for (var i = 0; i < numFighterFeats; i++) {
			var group = document.createElement("div");
			group.className = "fighterFeatInputsGroup";
			var label = document.createElement("label")
			label.className = "input-group-addon";
			label.innerHTML = "Fighter Feat " + (i + 1) + ": ";

			var el = document.createElement("input");
			el.className = "form-control fighterFeatInputs";
			el.type = "text";

			group.appendChild(label);
			group.appendChild(el);

			fighterContainer.appendChild(group);
		};
	}
}

function constructSpellsPage(){
	if(classData.classes[Character.Class].spellsKnown == undefined) nextPage();
	
	document.getElementById('header').querySelector('h3').innerHTML = "Character Creator -- Spells";
	document.getElementById('container').style.overflow = "auto";

	var numSpells = classData.classes[Character.Class].spellsKnown[Character.Level];
	var container = document.getElementById("spellsInputsContainer");
	var spellLevel = numSpells.length;
	for(var k = 0; k < spellLevel; ++k){
		var groupLabel = document.createElement("label");
		groupLabel.innerHTML = "Level " + k + " Spells";
		groupLabel.className = "grouplabel";
		container.appendChild(groupLabel);
		for (var i = 0; i < numSpells[k]; i++) {
			var group = document.createElement("div");
			group.className = "spellInputsGroup"
			var label = document.createElement("span")
			label.className = "input-group-addon";
			label.innerHTML = "Spell " + (i + 1) + ": ";
	
			var el = document.createElement("input");
			el.className = "form-control spellInputs";
	
			group.appendChild(label);
			group.appendChild(el);
	
			container.appendChild(group);
		};
	};
}

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