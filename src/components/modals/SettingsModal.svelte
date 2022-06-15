<script>
	import { settings } from '../../stores/settings';

	import Toggle from '../Toggle.svelte';
</script>

<h3 class="my-3">Display</h3>

<Toggle
	id="dark-mode-toggle"
	bind:checked={$settings.display.darkMode}
	on:change={() => {
		if ($settings.display.darkMode) document.body.classList.add('dark');
		else document.body.classList.remove('dark');
	}}
	labelText="Dark Mode"
/>

<Toggle
	id="pokemon-with-type-toggle"
	bind:checked={$settings.display.showPokemonWithCurrentType}
	labelText="Show Pokemon with Current Type Combination"
/>

<h3 class="my-3">Weather Boost</h3>

<!-- on:change={() => updateWeatherBoostDisplay(types)} -->
<Toggle
	id="weather-boost-toggle"
	bind:checked={$settings.weatherBoost.weatherBoostEnabled}
	labelText="Weather boost"
/>

{#if $settings.weatherBoost.weatherBoostEnabled}
	<Toggle
		id="clear-weather-toggle"
		bind:checked={$settings.weatherBoost.clearButtonClearsWeather}
		labelText="Clear button clears weather"
	/>

	<Toggle
		id="use-weather-boost-toggle"
		bind:checked={$settings.weatherBoost.useWeatherBoostMultiplier}
		labelText="Use weather boost multiplier"
	/>
{/if}

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
