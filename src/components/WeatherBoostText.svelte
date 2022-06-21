<script>
	import { settings } from '../stores/settings';
	import { state } from '../stores/state';

	function updateWeatherBoostDisplay(types) {
		const validTypes = types.filter((t) => t !== '');
		if (!validTypes.length) {
			document.getElementById('weather-boost-text').innerText = '';
			document.getElementById('weather-boost-check').style.display = 'none';
			return;
		}

		document.getElementById('weather-boost-check').style.display = isBoosted(
			validTypes,
			$state.weather
		)
			? 'inline-block'
			: 'none';

		document.getElementById('weather-boost-text').innerHTML = getWeatherSpan(validTypes);
	}

	const getWeatherImg = (weather) =>
		'<img class="weather-icon" src="/img/weather/' + weather.replace(' ', '_') + '.png">';

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
</script>

<p>
	{#if $settings.weatherBoost.weatherBoostEnabled}
		<svg
			id="weather-boost-check"
			class="w-4 h-4 hidden"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
		</svg>
		<small id="weather-boost-text" class="hidden" />
	{/if}
</p>
