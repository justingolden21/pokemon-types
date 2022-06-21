<script>
	import { settings } from '../stores/settings';
	import { state } from '../stores/state';

	import { isBoosted, weatherBoostData } from '../util/weatherboost';

	$: validTypes = $state.types.filter((t) => t !== '');

	const getWeatherImg = (weather) =>
		'<img class="weather-icon" src="/img/weather/' + weather.replace(' ', '_') + '.png">';

	const getWeatherSpan = (types) => {
		if (types.length === 0) return '';

		types = types.map((s) => s.toLowerCase());
		let txt, img;

		if (types.length === 2 && weatherBoostData[types[0]] !== weatherBoostData[types[1]]) {
			txt = weatherBoostData[types[0]] + ' or ' + weatherBoostData[types[1]];
			img = getWeatherImg(weatherBoostData[types[0]]) + getWeatherImg(weatherBoostData[types[1]]);
		} else {
			txt = weatherBoostData[types[0]];
			img = getWeatherImg(weatherBoostData[types[0]]);
		}

		if (txt.indexOf('sunny') !== -1) {
			img += getWeatherImg('clear');
		}

		return 'Boosted in ' + txt + ' weather ' + img;
	};
</script>

<p>
	{#if $settings.weatherBoost.weatherBoostEnabled}
		{#if isBoosted(validTypes, $state.weather)}
			<svg
				class="w-4 h-4 inline-block"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
			</svg>
		{/if}
		<small>
			{@html getWeatherSpan(validTypes)}
		</small>
	{/if}
</p>
