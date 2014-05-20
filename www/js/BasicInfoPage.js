//set up the basic info page
function constructBasicInfoPage(){
	//set up events on basic page
	var inputs = document.getElementsByClassName('input-group');
	for (var i = inputs.length - 1; i >= 0; i--) {
		var lists = inputs[i].getElementsByClassName('lists');
		for (var k = lists.length - 1; k >= 0; k--) {
			//if the user clicks a list element, set the text component
			//to be the text of the list element
			lists[k].addEventListener('click',function(e){
				var inp = e.target.parentNode.parentNode.parentNode.parentNode.querySelector("input");
				inp.value = e.target.innerHTML;
			});
		};
	};

	//if we have already been here, repopulate fields
	if(visited[0]){
		document.getElementById("NameInput").value = Character.Name;
		document.getElementById("LevelInput").value = Character.Level;
		document.getElementById("ClassInput").value = Character.Class;
		document.getElementById("RaceInput").value = Character.Race;
		document.getElementById("GenderInput").value = Character.Gender;
		document.getElementById("AlignmentInput").value = Character.Alignment;
	}
}