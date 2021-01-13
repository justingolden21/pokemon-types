if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js')
		.then(reg => console.log('service worker registered'))
		.catch(err => console.log('service worker not registered', err));
}

window.onload = ()=> {
	document.getElementById('clear-btn').onclick = clearTypes;

	const search = document.getElementById('search');
	search.onchange = ()=> {
		console.log('a');
		if(!pokedexJson) return;
		// linear search, could be optimized...
		for(let pokemon of pokedexJson) {
			// could use .trim(), would take longer
			if(pokemon.name.toUpperCase() == search.value.toUpperCase() ) {
				console.log(pokemon.type);
				return;
			}
		}
	}
}

const capitalize = (str)=> str.charAt(0).toUpperCase() + str.substring(1);

let typeJson, pokedexJson;

fetch('data/types.json')
	.then(response => response.json())
	.then(json => {
		for(let type of json) {
			let btn = document.createElement('button');
			btn.innerText = capitalize(type.name);
			btn.classList = `btn ${type.name}`;
			document.getElementById('type-btns').appendChild(btn);
			btn.onclick = ()=> {
				handleClick(btn.classList[1]);
			};
		}
		typeJson = json;
	});

let currentType1, currentType2;
let recentlyChangedType;

function updateTypeDisplay() {
	let weakHtml = '';
	let resistHtml = '';
	for(let type of typeJson) {
		let matchup = getMatchup(type.name, currentType1, currentType2);
		if(matchup == 1) continue;
		const html = `<div class="matchup-item" style="background-color: #${type.color};">${matchup}x ${capitalize(type.name)}</div>`;
		if(matchup > 1) {
			weakHtml += html;
		} else {
			resistHtml += html;
		}
	}
	document.getElementById('type-weak').innerHTML = weakHtml;
	document.getElementById('type-resist').innerHTML = resistHtml;
}

function handleClick(type) {
	if(currentType1 == type) {
		currentType1 = '';
		removeActive(type);
	} else if (currentType2 == type) {
		currentType2 = '';
		removeActive(type);
	} else {
		if(!currentType1) {
			changeType(1, type);
		} else if(!currentType2) {
			changeType(2, type);
		} else {
			if(recentlyChangedType == 1) {
				removeActive(currentType2);
				changeType(2, type);
			} else {
				removeActive(currentType1);
				changeType(1, type);
			}
		}
	}

	updateTypeDisplay();
}

function changeType(num, type) {
	if(num == 1) {
		currentType1 = type;
	} else {
		currentType2 = type;
	}
	recentlyChangedType = num;

	addActive(type);
}

function addActive(type) {
	document.querySelector(`.${type}`).classList.add('active');
}
function removeActive(type) {
	document.querySelector(`.${type}`).classList.remove('active');
}

function clearTypes() {
	if(currentType2 != '') {
		removeActive(currentType2);
		currentType2 = '';
	}
	if(currentType1 != '') {
		removeActive(currentType1);
		currentType1 = '';
	}

	updateTypeDisplay();
}

// ================================

fetch('../data/pokedex.json')
	.then(response => response.json())
	.then(json => {
		let names = [];
		for(let pokemon of json) {
			names.push(pokemon.name);
		}
		// console.log(names);
		autocomplete(document.getElementById('search'), names);

		pokedexJson = json;
	});