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
	'': '',
};

const getWeatherImg = (weather) =>
	'<img class="weather-icon" src="img/weather/' +
	weather.replace(' ', '_') +
	'.png">';

const getWeatherSpan = (types) => {
	types = types.map((s) => s.toLowerCase());
	let txt, img;

	if (types.length == 2 && weatherBoost[types[0]] != weatherBoost[types[1]]) {
		txt = weatherBoost[types[0]] + ' or ' + weatherBoost[types[1]];
		img =
			getWeatherImg(weatherBoost[types[0]]) +
			getWeatherImg(weatherBoost[types[1]]);
	} else {
		txt = weatherBoost[types[0]];
		img = getWeatherImg(weatherBoost[types[0]]);
	}

	if (txt.indexOf('sunny') != -1) {
		img += getWeatherImg('clear');
	}

	return 'Boosted in ' + txt + ' weather ' + img;
};

function updateWeatherBoostDisplay() {
	if (!document.getElementById('weather-boost-toggle').checked) return;

	let types = [];
	if (currentType1 != '') types.push(currentType1);
	if (currentType2 != '') types.push(currentType2);
	if (!types.length) {
		document.getElementById('weather-boost-text').innerText = '';
		document.getElementById('weather-boost-check').style.display = 'none';
		return;
	}

	// replace img tag: https://stackoverflow.com/a/11025465/4907950
	// remove text after '/' to handle 'Sunny/Clear'
	const weather = getWeather();
	document.getElementById('weather-boost-check').style.display = isBoosted(
		types,
		weather
	)
		? 'inline-block'
		: 'none';

	document.getElementById('weather-boost-text').innerHTML =
		getWeatherSpan(types);
}

const isBoosted = (types, weather) =>
	weatherBoost[types[0]] == weather || weatherBoost[types[1]] == weather;

const getWeather = () =>
	selectVal('weather-boost-options')
		.replace(/<img[^>]*>/g, '')
		.toLowerCase()
		.trim()
		.split('/')[0];

const getTypeIcon = (type) =>
	`<img src="img/types/${type}.svg" class="type-icon-big" style="background-color: #${getColor(
		type
	)};">`;

window.addEventListener('load', () => {
	const boosts = {
		sunny: ['grass', 'fire', 'ground'],
		rainy: ['water', 'electric', 'bug'],
		partly_cloudy: ['normal', 'rock'],
		cloudy: ['fairy', 'fighting', 'poison'],
		windy: ['flying', 'dragon', 'psychic'],
		snow: ['ice', 'steel'],
		fog: ['dark', 'ghost'],
	};
	let html = '';
	for (let weather in boosts) {
		html += `<div class="md:border-b-2 md:border-gray-100 flex flex-col md:flex-row md:justify-between p-2 space-y-2 md:space-y-0">
			<div class="flex space-x-2">`;
		if (weather == 'sunny')
			html +=
				'<img src="img/weather/clear.png" class="weather-icon-big"> Clear &nbsp; ';
		html += `<img src="img/weather/${weather}.png" class="weather-icon-big">
			${capitalize(weather).replace('_', ' ')}
			</div>
			<div class="flex flex-wrap justify-center flex-col space-y-2 sm:flex-row sm:space-y-0">`;
		for (let type of boosts[weather]) {
			html += `<div class="flex items-center space-x-2 mx-4">
				${getTypeIcon(type)}
				${capitalize(type)}
				</div>`;
		}
		html += '</div></div>';
	}
	document.getElementById('weather-boost').innerHTML = html;
});
