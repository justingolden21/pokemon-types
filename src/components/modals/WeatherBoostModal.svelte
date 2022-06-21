<script>
	import { onMount } from 'svelte';

	import Icon from '../Icon.svelte';
	import { updateUrlParam, copyUrlParam } from '../../util/urlparam';
	import printElm from '../../util/printElm';
	import showSnackbar from '../../util/snackbar';
	import { getTypeIcon } from '../../util/weatherboost';
	import capitalize from '../../util/capitalize';

	onMount(() => {
		const boosts = {
			sunny: ['grass', 'fire', 'ground'],
			rainy: ['water', 'electric', 'bug'],
			partly_cloudy: ['normal', 'rock'],
			cloudy: ['fairy', 'fighting', 'poison'],
			windy: ['flying', 'dragon', 'psychic'],
			snow: ['ice', 'steel'],
			fog: ['dark', 'ghost']
		};
		let html = '';
		for (let weather in boosts) {
			html += `<div class="md:border-b-2 md:border-gray-100 flex flex-col md:flex-row md:justify-between p-2 space-y-2 md:space-y-0">
			<div class="flex space-x-2">`;
			if (weather == 'sunny')
				html += '<img src="img/weather/clear.png" class="weather-icon-big"> Clear &nbsp; ';
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
</script>

<div id="weather-boost" />

<br />
<p>
	Weather boost causes Pokémon of the boosted types to spawn more frequently, reward more stardust
	when caught, and at spawn higher levels with better stats.
</p>
<br />
<p>
	You can view the weather in app on the top right of the map, and click it for details. Weather
	boosted Pokémon will have a weather icon above them briefly after clicking on them.
</p>
<br />
<p>Moves of a weather boosted type will deal <b>1.2x</b> damage.</p>
<a
	href="https://niantic.helpshift.com/a/pokemon-go/?s=finding-evolving-hatching&f=weather-boosts"
	target="_blank">Learn more</a
>

<br />
<button
	on:click={() => {
		updateUrlParam('weatherboost');
		copyUrlParam();
		const check =
			'<svg class="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>';
		showSnackbar(check + ' Copied link to weather boost');
	}}
	class="btn sm hover-fill my-3 mr-3"
>
	<Icon name="link" class="w-6 h-6 inline" />
	Copy Link
</button>
<button
	on:click={() => printElm('weather-boost', 'Weather Boost in Pokemon Go')}
	class="btn sm hover-fill my-3 mr-3"
>
	<Icon name="print" class="w-6 h-6 inline" />
	Print
</button>
