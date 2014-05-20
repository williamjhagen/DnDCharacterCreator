
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

	if(visited[4]){
		var list = document.getElementsByClassName("spellInputs");
		var len = list.length;
		for(var i = 0; i < len; ++i){
			list[i].value = Character.Spells[i];
		}
	}
}
