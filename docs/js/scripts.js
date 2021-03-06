if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js')
		.then(reg => console.log('service worker registered'))
		.catch(err => console.log('service worker not registered', err));
}

window.addEventListener('load', ()=> {

	// create type buttons

	for(let type of TYPE_DATA) {
		let btn = document.createElement('button');
		btn.innerHTML = `<img class="type-icon" src="img/types/${type.name}.svg"> ` + capitalize(type.name);
		btn.classList = `btn ${type.name}`;
		btn.name = capitalize(type.name);
		document.getElementById('type-btns').appendChild(btn);
		btn.onclick = ()=> handleClick(btn.classList[1]);
	}

	// event listeners

	document.getElementById('clear-btn').onclick = ()=> clearTypes();

	document.onkeyup = (e)=> {
		if(e.code=='Space' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
			document.getElementById('search').select();
		}
	};

	document.getElementById('copy-weather-boost-link-btn').onclick = ()=> {
		updateUrlParam('weatherboost');
		copyUrlParam();
		const check = '<svg class="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>';
		showSnackbar(check + ' Copied link to weather boost');
	};

	document.getElementById('print-weather-boost-btn').onclick = ()=> printElm('weather-boost', 'Weather Boost in Pokemon Go');

	document.getElementById('copy-type-chart-link-btn').onclick = ()=> {
		updateUrlParam('typechart');
		copyUrlParam();
		const check = '<svg class="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>';
		showSnackbar(check + ' Copied link to type chart');
	};

	document.getElementById('print-type-chart-btn').onclick = ()=> printElm('type-chart', 'Type Effectiveness in Pokemon Go');

	document.getElementById('print-type-attack-chart-btn').onclick = ()=> printElm('type-attack-chart', 'Attacking Type Effectiveness in Pokemon Go');

});

const capitalize = str => str.charAt(0).toUpperCase() + str.substring(1);

const copyText = str => {
	const elm = document.createElement('textarea');
	elm.value = str;
	document.body.appendChild(elm);
	elm.select();
	document.execCommand('copy');
	document.body.removeChild(elm);
}

const printElm = (elm, title='', height, width) => {
	let win = window.open('', 'PRINT', height ? `height=${height},width=${width}` : '');

	win.document.write('<html><head><link rel="stylesheet" href="css/styles.css"><title>'
		+ document.title + '</title></head><body onload="window.print();window.close()">'
		+ (title != '' ? `<h1>${title}</h1><br>` : '')
		+ document.getElementById(elm).outerHTML + '</body></html>');

	// necessary for IE
	win.document.close();
	win.focus();
}

let currentType1 = '', currentType2 = '';
let recentlyChangedType = -1;

function updateTypeDisplay() {
	let weakHtml = '<h3>Weak to:</h3>';
	let resistHtml = '<h3>Resists:</h3>';
	if(currentType1 == '' && currentType2 == '') weakHtml = '', resistHtml = '';

	const usingWeatherBoost = document.getElementById('weather-boost-toggle').checked 
		&& document.getElementById('use-weather-boost-toggle').checked;
	const currentWeather = getWeather();

	let matchups = [];

	for(let type of TYPE_DATA) {
		let matchup = getMatchup(type.name, currentType1, currentType2);
		if(usingWeatherBoost && isBoosted([type.name, ''], currentWeather)) matchup *= 1.2;
		if(matchup == 1) continue;

		matchups.push({name: type.name, matchup: matchup, color: type.color});
	}

	matchups = matchups.sort((a, b) => b.matchup - a.matchup);

	for(let mu of matchups) {
		const strong = (mu.matchup < 0.625 || mu.matchup > 1.6);
		const html = `<div class="matchup-item" style="background-color: #${mu.color};">${strong?'<strong>':''}${mu.matchup}${strong?'</strong>':''}x ${capitalize(mu.name)}</div>`;
		if(mu.matchup > 1) {
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
		if(document.getElementById('clear-weather-toggle').checked) document.getElementById('weather-none').click();
		document.getElementById('search').value = '';
		updateWeatherBoostDisplay();

		const matchupsDiv = document.getElementById('matchups');
		matchupsDiv.classList.add('leave');
		matchupsDiv.addEventListener('animationend', updateTypeDisplay);
	}
}

// ================================

let pokedexJson;

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