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

const isBoosted = (types, weather) =>
	weatherBoost[types[0]] == weather || weatherBoost[types[1]] == weather;

const getTypeIcon = (type) =>
	`<img src="/img/types/${type}.svg" class="type-icon-big" style="background-color: #${getColor(
		type
	)};">`;

export { isBoosted, getTypeIcon };
