<script>
	import { settings, defaultSettings } from '../../stores/settings';

	import Icon from '../Icon.svelte';
	import Toggle from '../Toggle.svelte';
</script>

<h3 class="my-3">Display</h3>

<Toggle id="dark-mode-toggle" bind:checked={$settings.display.darkMode} labelText="Dark Mode" />

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

<h3 class="my-3">Settings</h3>

<button
	on:click={() => ($settings = JSON.parse(JSON.stringify(defaultSettings)))}
	class="btn sm hover-fill my-3 mr-3"
>
	<Icon name="undo" class="w-6 h-6 inline" />
	Reset settings
</button>
