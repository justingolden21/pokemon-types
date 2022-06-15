<script>
	import { settings } from '../../stores/settings';

	import Toggle from '../Toggle.svelte';
</script>

<!-- <h2 class="my-3 border-b-2 border-gray-100">Display</h2> -->

<!-- <h2 class="my-3 border-b-2 border-gray-100">Features</h2> -->

<!-- todo: use local storage, read browser default -->
<h3 class="my-3">Display</h3>

<Toggle id="dark-mode-toggle" bind:checked={$settings.display.darkMode} labelText="Dark Mode" />

<br />
<br />

<Toggle
	id="pokemon-with-type-toggle"
	bind:checked={$settings.display.showPokemonWithCurrentType}
	labelText="Show Pokemon with Current Type Combination"
/>

<h3 class="my-3">Weather Boost</h3>

<Toggle
	id="weather-boost-toggle"
	bind:checked={$settings.weatherBoost.weatherBoostEnabled}
	labelText="Weather boost"
/>

<br />
<div id="more-weather-settings" class="hidden">
	<br />

	<Toggle
		id="clear-weather-toggle"
		bind:checked={$settings.weatherBoost.clearButtonClearsWeather}
		labelText="Clear button clears weather"
	/>

	<br />

	<Toggle
		id="use-weather-boost-toggle"
		bind:checked={$settings.weatherBoost.useWeatherBoostMultiplier}
		labelText="Use weather boost multiplier"
	/>
</div>

<h3 class="my-3">Autocomplete</h3>
<label for="type-display-options">Show types as</label>
<select
	id="type-display-options"
	class="relative inline-block"
	bind:value={$settings.autocomplete.showTypesAs}
>
	<option value="icons">Icons</option>
	<option value="words">Words</option>
	<option value="nothing">Nothing</option>
</select>
