if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js')
		.then(reg => console.log('service worker registered'))
		.catch(err => console.log('service worker not registered', err));
}

window.onload = ()=> {
	document.getElementById('clear-btn').onclick = ()=> clearTypes();
}

const capitalize = (str)=> str.charAt(0).toUpperCase() + str.substring(1);

let typeJson, pokedexJson;

fetch('data/types.json')
	.then(response => response.json())
	.then(json => {
		for(let type of json) {
			let btn = document.createElement('button');
			btn.innerHTML = `<img class="type-icon" src="img/types/${type.name}.svg"> ` + capitalize(type.name);
			btn.classList = `btn ${type.name}`;
			btn.name = capitalize(type.name);
			document.getElementById('type-btns').appendChild(btn);
			btn.onclick = ()=> handleClick(btn.classList[1]);
		}
		typeJson = json;
	});

let currentType1 = '', currentType2 = '';
let recentlyChangedType = -1;

function updateTypeDisplay() {
	let weakHtml = '<h3>Weak to:</h3>';
	let resistHtml = '<h3>Resists:</h3>';
	if(currentType1 == '' && currentType2 == '') weakHtml = '', resistHtml = '';

	for(let type of typeJson) {
		let matchup = getMatchup(type.name, currentType1, currentType2);
		if(matchup == 1) continue;
		const strong = (matchup != 0.625 && matchup != 1.6);
		const html = `<div class="matchup-item" style="background-color: #${type.color};">${strong?'<strong>':''}${matchup}${strong?'</strong>':''}x ${capitalize(type.name)}</div>`;
		if(matchup > 1) {
			weakHtml += html;
		} else {
			resistHtml += html;
		}
	}
	document.getElementById('type-weak').innerHTML = weakHtml;
	document.getElementById('type-resist').innerHTML = resistHtml;

	const matchupsDiv = document.getElementById('matchups');
	matchupsDiv.classList.remove('leave', 'enter');
	matchupsDiv.classList.add('enter');
	matchupsDiv.addEventListener('animationend', () => matchupsDiv.classList.remove('enter'));
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
	document.getElementById('search').value = '';
	updateWeatherBoostDisplay();
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

function clearTypes(skipUpdate = false) {
	if(currentType2 != '') {
		removeActive(currentType2);
		currentType2 = '';
	}
	if(currentType1 != '') {
		removeActive(currentType1);
		currentType1 = '';
	}

	if(!skipUpdate) {
		document.getElementById('search').value = '';
		updateWeatherBoostDisplay();

		const matchupsDiv = document.getElementById('matchups');
		matchupsDiv.classList.add('leave');
		matchupsDiv.addEventListener('animationend', updateTypeDisplay);
	}
}

// ================================

fetch('data/pokedex.json')
	.then(response => response.json())
	.then(json => {
		autocomplete(document.getElementById('search'), json.map(x => x.name));

		pokedexJson = json;
	});

function openPokemon(id) {
	clearTypes(true);
	let types = pokedexJson[id].type;
	changeType(1, types[0].toLowerCase());
	if(types[1]) changeType(2, types[1].toLowerCase());

	updateTypeDisplay();
	updateWeatherBoostDisplay();
}