import { getColor } from './types';

const weatherBoost = {
	'grass': 'sunny',
	'fire': 'sunny',
	'ground': 'sunny',
	'water': 'rainy',
	'electric': 'rainy',
	'bug': 'rainy',
	'normal': 'partly cloudy',
	'rock': 'partly cloudy',
	'fairy': 'cloudy',
	'fighting': 'cloudy',
	'poison': 'cloudy',
	'flying': 'windy',
	'dragon': 'windy',
	'psychic': 'windy',
	'ice': 'snow',
	'steel': 'snow',
	'dark': 'fog',
	'ghost': 'fog',
	'': ''
};

const getWeatherImg = (weather) =>
	'<img class="weather-icon" src="img/weather/' + weather.replace(' ', '_') + '.png">';

const getWeatherSpan = (types) => {
	types = types.map((s) => s.toLowerCase());
	let txt, img;

	if (types.length == 2 && weatherBoost[types[0]] != weatherBoost[types[1]]) {
		txt = weatherBoost[types[0]] + ' or ' + weatherBoost[types[1]];
		img = getWeatherImg(weatherBoost[types[0]]) + getWeatherImg(weatherBoost[types[1]]);
	} else {
		txt = weatherBoost[types[0]];
		img = getWeatherImg(weatherBoost[types[0]]);
	}

	if (txt.indexOf('sunny') != -1) {
		img += getWeatherImg('clear');
	}

	return 'Boosted in ' + txt + ' weather ' + img;
};

function updateWeatherBoostDisplay(types) {
	const validTypes = types.filter((t) => t !== '');
	if (!validTypes.length) {
		document.getElementById('weather-boost-text').innerText = '';
		document.getElementById('weather-boost-check').style.display = 'none';
		return;
	}

	// remove text after '/' to handle 'Sunny/Clear'
	const weather = getWeather();
	document.getElementById('weather-boost-check').style.display = isBoosted(validTypes, weather)
		? 'inline-block'
		: 'none';

	document.getElementById('weather-boost-text').innerHTML = getWeatherSpan(validTypes);
}

const isBoosted = (types, weather) =>
	weatherBoost[types[0]] == weather || weatherBoost[types[1]] == weather;

const getWeather = () =>
	document.getElementById('weather-boost-options')?.value.toLowerCase().trim().split('/')[0];

const getTypeIcon = (type) =>
	`<img src="/img/types/${type}.svg" class="type-icon-big" style="background-color: #${getColor(
		type
	)};">`;

export { updateWeatherBoostDisplay, isBoosted, getWeather, getTypeIcon };
