//create the stat creation page
function constructStatsPage(){
	document.statDropdown = document.querySelector(".dropdown-menu").innerHTML;
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

					var s = document.getElementsByClassName("statList");
					for (var i = 0; i < s.length; i++) {
						if(s[i].innerHTML == e.target.innerHTML){
							s[i].parentNode.removeChild(s[i]);
						}
					};
				}
			});
		};
	};
	document.getElementById("rollBtn").addEventListener("click", function(e){
		if(document.rollBtnClicked != undefined){
			 //reset stat collections
			var stats = document.getElementsByClassName("btn btn-default dropdown-toggle");
			for (var i = stats.length - 1; i >= 0; i--) {
				stats[i].innerHTML = "Unnassigned ";
				var caret = document.createElement("span");
				caret.className = "caret";
				stats[i].appendChild(caret);
				stats[i].style.border = "";
			};
			var drops = document.getElementsByClassName("input-group-btn");
			for (var i = 0; i < drops.length; i++) {
				var rem = drops[i].querySelector(".dropdown-menu");
				drops[i].removeChild(rem);
				var newDrop = document.createElement("ul");
				newDrop.className = "dropdown-menu";
				newDrop.innerHTML = document.statDropdown;
				drops[i].appendChild(newDrop);
			};
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
							
							var s = document.getElementsByClassName("statList");
							for (var i = 0; i < s.length; i++) {
								if(s[i].innerHTML == e.target.innerHTML){
									s[i].parentNode.removeChild(s[i]);
								}
							};
						}
					});
				};
			};
			return;
		}
		document.rollBtnClicked = true;
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

	if(visited[1]){
		var types = document.getElementsByClassName("btn btn-default dropdown-toggle");
		var values = document.getElementsByClassName("input-group-addon");
		for (var i = document.stats.length - 1; i >= 0; i--) {
			types[i].innerHTML = document.stats[i][0];
			values[i].innerHTML = document.stats[i][1];
		};
	}
}
