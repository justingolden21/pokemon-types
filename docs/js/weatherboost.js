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

const getWeatherBoost = (types) => {
	types = types.map(s => s.toLowerCase());
	if(types.length == 2 && weatherBoost[types[0]] != weatherBoost[types[1]])
		return weatherBoost[types[0]] + ' or ' + weatherBoost[types[1]];
	return weatherBoost[types[0]];
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
	
	const txt = (types[0] != '' || types[1] != '') ? 'Boosted in ' + getWeatherBoost(types) + ' weather' : '';
	document.getElementById('weather-boost-text').innerText = txt;

	const weather = selectVal('weather-boost-options').toLowerCase();
	document.getElementById('weather-boost-check').style.display = isBoosted(types, weather) ? 'inline-block' : 'none';
}

const isBoosted = (types, weather) => weatherBoost[types[0]] == weather || weatherBoost[types[1]] == weather;