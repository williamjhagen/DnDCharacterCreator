//create the feat selection page
function constructFeatsPage(){
	document.getElementById('header').querySelector('h3').innerHTML = "Character Creator -- Feats";
	document.getElementById('container').style.overflow = "auto";

	var numFeats = 1 + (Math.floor(Character.Level >> 1));
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

	if(visited[3]){
		if(Character.Class == "Fighter"){
			var l = document.getElementsByClassName("fighterFeatInputs");
			var len = l.length;
			for(var i = 0; i < len; ++i){
				l[i].value = Character.BonusFeats[i];
			}
		}

		var list = document.getElementsByClassName("featInputs");
		var leng = list.length;
		for(var i = 0; i < leng; ++i){
			list[i].value = Character.Feats[i];
		}
	}
}
