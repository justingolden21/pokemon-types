const weatherBoost = {
	grass: 'sunny',
	fire: 'sunny',
	ground: 'sunny',
	water: 'rainy',
	electric: 'rainy',
	bug: 'rainy',
	normal: 'partly cloudy',
	rock: 'partly cloudy',
	fairy: 'cloudy',
	fighting: 'cloudy',
	poison: 'cloudy',
	flying: 'windy',
	dragon: 'windy',
	psychic: 'windy',
	ice: 'snow',
	steel: 'snow',
	dark: 'fog',
	ghost: 'fog',
	'': ''
};

const getWeatherImg = weather => '<img class="weather-icon" src="img/weather/' + weather.replace(' ','_') + '.png">';

const getWeatherSpan = types => {
	types = types.map(s => s.toLowerCase());
	let txt, img;

	if(types.length == 2 && weatherBoost[types[0]] != weatherBoost[types[1]]) {
		txt = weatherBoost[types[0]] + ' or ' + weatherBoost[types[1]];
		img = getWeatherImg(weatherBoost[types[0]]) + getWeatherImg(weatherBoost[types[1]]);
	} else {
		txt = weatherBoost[types[0]];
		img = getWeatherImg(weatherBoost[types[0]]);
	}

	return 'Boosted in ' + txt + ' weather ' + img;
}

function updateWeatherBoostDisplay() {
	let types = [];
	if(currentType1 != '') types.push(currentType1);
	if(currentType2 != '') types.push(currentType2);
	if(!types.length) {
		document.getElementById('weather-boost-text').innerText = '';
		document.getElementById('weather-boost-check').style.display = 'none';
		return;
	}

	const weather = selectVal('weather-boost-options').toLowerCase();
	document.getElementById('weather-boost-check').style.display = isBoosted(types, weather) ? 'inline-block' : 'none';

	document.getElementById('weather-boost-text').innerHTML = getWeatherSpan(types);
}

const isBoosted = (types, weather) => weatherBoost[types[0]] == weather || weatherBoost[types[1]] == weather;