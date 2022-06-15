<script>
	import { updateUrlParam, copyUrlParam } from '../../util/urlparam';
	import printElm from '../../util/printElm';
	import showSnackbar from '../../util/snackbar';
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
	<svg
		class="w-6 h-6 inline"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
		/>
	</svg>
	Copy Link
</button>
<button
	on:click={() => printElm('weather-boost', 'Weather Boost in Pokemon Go')}
	class="btn sm hover-fill my-3 mr-3"
>
	<svg
		class="w-6 h-6 inline"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
		/>
	</svg>
	Print
</button>
