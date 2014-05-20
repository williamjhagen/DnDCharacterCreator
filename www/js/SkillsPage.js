//construct the skill selection tool
function constructSkillsPage(){
	document.getElementById('header').querySelector('h3').innerHTML = "Character Creator -- Skills";
	document.getElementById('container').style.overflow = "hidden";
	document.usedSkills = [];
	var skillMod = classData.classes[Character.Class].skillMod;
	var intMod = Math.max(((Character.Intelligence - 10) >> 1), 1);
	var pointsLeft = Math.floor((Character.Level + 3) * (skillMod + (intMod)));
	//humans get extra skills
	if(Character.Race == "Human") pointsLeft += Character.Level;

	document.getElementById("pointsRemaining").innerHTML = "Points Left: " + pointsLeft.toString();
	
	document.getElementById('plusBtn').addEventListener("click", function(e){
		var pointsLeftElement = document.getElementById("pointsRemaining");
		var hundreds =  parseInt(pointsLeftElement.innerHTML[13]);
		var tens =  parseInt(pointsLeftElement.innerHTML[14]);
		var ones =  parseInt(pointsLeftElement.innerHTML[15]);

		var numInt;
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

		var isClassSkill = classData.classes[Character.Class].skills.indexOf(selected.innerHTML) == -1 ? false : true;

		var list = document.getElementById("chosenSkillList");
		//check if they already have points in the skill
		var skillIndex = document.usedSkills.indexOf(selected.innerHTML);
		//new skill
		if(skillIndex == -1){
			document.usedSkills.push(selected.innerHTML);
			var item = document.createElement("article");
			item.className = "currentSkills";
			if(!isClassSkill)
				item.innerHTML = selected.innerHTML + ": 1";
			else
				item.innerHTML = selected.innerHTML + ": 4";
			list.appendChild(item);

			var pBar = document.querySelector("#pBar");
			var oh = pBar.outerHTML;
			var maxIndex = oh.indexOf("aria-valuemax") + 15;
			var rep = oh[maxIndex];
			for(var i = maxIndex+1; oh[i] != '\"'; ++i) oh.slice(i,1);
			//oh[maxIndex] = (Character.Level + isClassSkill ? 3 : 0).toString();
			oh = oh.replace("aria-valuemax=\""+rep+"\"", "aria-valuemax=\""+(isClassSkill ? 4:1)+"\"");
			pBar.outerHTML = oh;
			var max = (Character.Level + (isClassSkill ? 3 : 0));
			var temp = (((isClassSkill?4:1)/max)*100);
			document.getElementById("pBar").style.width = temp.toString()+"%";
		}
		//already have points in this skill
		else{
			var currentSkills = document.getElementsByClassName("currentSkills");
			//find the correct skill
			var len = currentSkills.length;
			for (var i = 0; i < len; i++) {
				//search for the correct skill
				if(currentSkills[i].innerHTML.indexOf(selected.innerHTML) != -1){
					//we found the skill, update its number
					//length of the string
					var strLen = currentSkills[i].innerHTML.length;
					var num = currentSkills[i].innerHTML.slice(strLen - 2, strLen);
					num = num.replace(' ', '');
					var start = currentSkills[i].innerHTML.slice(0, strLen - num.length);
					numInt = parseInt(num);

					if(numInt + 1 >= Character.Level + isClassSkill ? 3 : 0){ 
						this.disabled = true;
					}
					if(numInt >= Character.Level + isClassSkill ? 3 : 0){ 
						return;
					}
					//javscript is nonsense.
					var replaced = currentSkills[i].innerHTML.slice(strLen - num.length, strLen);
					var newIHTML;
					newIHTML = (numInt + 1).toString();
					currentSkills[i].innerHTML = start + newIHTML;

					//update the progress bar
					var pBar = document.querySelector("#pBar");
					pBar.innerHTML = numInt + 1;
					var oh = pBar.outerHTML;
					var maxIndex = oh.indexOf("aria-valuemax") + 15;
					for(var i = maxIndex+1; oh[i] != '\"'; ++i) oh.slice(i,1);
					//oh[maxIndex] = (Character.Level + isClassSkill ? 3 : 0).toString();
					var rep = oh[maxIndex];s
					oh = oh.replace("aria-valuemax=\""+rep+"\"", "aria-valuemax=\""+(numInt+1)+"\"");
					pBar.outerHTML = oh;
					var max = (Character.Level + (isClassSkill ? 3 : 0));
					var temp = (((numInt+1)/max)*100);
					document.getElementById("pBar").style.width = temp.toString()+"%";
					break;
				}
			};
		}

		//update the entry
		var oldStr = pointsLeft.toString();
		pointsLeft -= 1;
		pointsLeft = pointsLeft.toString().replace(' ', '');
		var newIHTML = pointsLeftElement.innerHTML.slice(0, pointsLeftElement.innerHTML.length - oldStr.length)
		pointsLeftElement.innerHTML = newIHTML + pointsLeft;
	});

	document.getElementById('minusBtn').addEventListener("click", function(e){
		document.getElementById("plusBtn").disabled = false;
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
					var delThresh = classData.classes[Character.Class].skills.indexOf(selected.innerHTML) == -1 ? 1 : 4;
					//remove the item, and return
					if(numInt == delThresh){
						document.usedSkills.splice(skillIndex, 1);
						list.removeChild(currentSkills[i]);
						break;
					}
					//update the progress bar
					var pBar = document.querySelector("#pBar");
					pBar.innerHTML = numInt - delThresh;
					var oh = pBar.outerHTML;
					var maxIndex = oh.indexOf("aria-valuemax") + 15;
					for(var i = maxIndex+1; oh[i] != '\"'; ++i) oh.slice(i,1);
					var isClassSkill = classData.classes[Character.Class].skills.indexOf(selected.innerHTML) == -1 ? false : true;
					//oh[maxIndex] = (Character.Level + isClassSkill ? 3 : 0).toString();
					var rep = (Character.Level + isClassSkill ? 3 : 0).toString();
					oh = oh.replace("aria-valuemax=\""+rep+"\"", "aria-valuemax=\""+(numInt-1)+"\"");
					pBar.outerHTML = oh;
					var max =(Character.Level + (isClassSkill ? 3 : 0));
					var temp = ((numInt-1/max)*100);
					document.getElementById("pBar").style.width = temp.toString()+"%";
					//javscript is nonsense.
					var replaced = currentSkills[i].innerHTML.slice(strLen - num.length, strLen);
					var newIHTML = (numInt - 1).toString();
					currentSkills[i].innerHTML = start + newIHTML;
				}
			};
		}
		var oldStr = pointsLeft.toString();
		pointsLeft += 1;
		pointsLeft = pointsLeft.toString().replace(' ', '');
		var newIHTML = pointsLeftElement.innerHTML.slice(0, pointsLeftElement.innerHTML.length - oldStr.length)
		pointsLeftElement.innerHTML = newIHTML + pointsLeft;
	});
	var len = skillsData.skills.length;
	var tabs = document.getElementsByClassName("tab-pane");
	var access = {"class":tabs[0], "Str":tabs[1], "Dex":tabs[2], "Con":tabs[3], "Int":tabs[4], "Wis":tabs[5], "Cha":tabs[6], "None":tabs[7]};
	var skillClick = function(e){
		document.querySelector("#plusBtn").disabled = false;
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

	if(visited[2]){
		var len = Character.Skills.length;
		var sList = document.getElementById("chosenSkillList");
		for (var i = 0; i < len; i++) {
			pointsLeft -= Character.Skills[i][1];
			var el = document.createElement("article");
			el.className = "currentSkills";
			el.innerHTML = Character.Skills[i][0] + ": " + Character.Skills[i][1];
			sList.appendChild(el);
		};
	}
}