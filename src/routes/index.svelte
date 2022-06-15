<script>
	import { onMount } from 'svelte';

	import { fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import { settings } from '../stores/settings';
	import { state } from '../stores/state';

	import Autocomplete from '../components/Autocomplete.svelte';

	import { open } from '../util/modal';
	import { TYPE_DATA, getMatchup } from '../util/types';
	import { updateWeatherBoostDisplay, isBoosted, getWeather } from '../util/weatherboost';

	import pokedexJson from '../data/pokedex.json';

	const pokemonNames = pokedexJson.map((x) => x.name);

	$: types = $state.types;
	$: if (types && setURLParamTypes) setURLParamTypes();

	$: usingWeatherBoost =
		$settings.weatherBoost.weatherBoostEnabled && $settings.weatherBoost.useWeatherBoostMultiplier;
	$: matchups = TYPE_DATA.map((type) => {
		let matchup = getMatchup(type.name, types[0], types[1]);
		if (usingWeatherBoost && isBoosted([type.name, ''], getWeather())) matchup *= 1.2;
		return { name: type.name, matchup: matchup, color: type.color };
	}).sort((a, b) => b.matchup - a.matchup);

	$: pokemonWithCurrentType = types ? getPokemonWithCurrentType() : {};

	// ========

	let setURLParamTypes;

	onMount(() => {
		setURLParamTypes = () => {
			let typeStr;
			if (types[0] && types[1]) typeStr = types[0] + '+' + types[1];
			else if (types[0]) typeStr = types[0];
			else if (types[1]) typeStr = types[1];
			else typeStr = '';

			history?.replaceState({}, '', '?types=' + typeStr);
		};

		// read url param

		const url = new URL(window.location.href);
		const q = url.searchParams.get('q');
		if (q == 'typechart') {
			open('typeChartModal');
		} else if (q == 'weatherboost') {
			open('weatherBoostModal');
		}

		const typesParam = url.searchParams.get('types');
		const pokemonParam = url.searchParams.get('pokemon');
		if (typesParam && typesParam.indexOf(' ') != -1) {
			updateTypes(typesParam.split(' '));
		} else if (typesParam) {
			updateTypes([typesParam]);
		} else if ((pokemonParam && pokemonParam in pokedexJson) || pokemonParam === 0) {
			openPokemon(pokemonParam);
			document.getElementById('search').value = pokedexJson[pokemonParam].name;
		}
	});

	let threeDotMenuOpen = false;
	const toggleThreeDotMenu = () => {
		threeDotMenuOpen = !threeDotMenuOpen;
	};

	const autocompleteChange = (val) => {
		// openPokemon(pokedexJson.find(({ name }) => name === val).index);
		openPokemon(pokedexJson.map((o) => o.name).indexOf(val));
	};

	const shareApp = () => {
		if (navigator.share) {
			let shareTxt;
			// read url param
			const url = new URL(window.location.href);
			const typesParam = url.searchParams.get('types');
			const pokemonParam = url.searchParams.get('pokemon');
			if (typesParam && typesParam.indexOf(' ') != -1) {
				shareTxt = `See the type matchups for ${typesParam.split(' ').join(' and ')}`;
			} else if (typesParam) {
				shareTxt = `See the type matchups for ${typesParam}`;
			} else if ((pokemonParam && pokemonParam in pokedexJson) || pokemonParam === 0) {
				shareTxt = `See the type matchups for ${pokedexJson[pokemonParam].name}`;
			} else {
				shareTxt = 'View type matchups of all Pokémon in Pokémon Go in seconds';
			}

			navigator
				.share({
					title: 'Pokémon Types',
					text: shareTxt,
					url: window.location.href
				})
				.then(() => {
					console.log('Share successful');
				})
				.catch(console.error);
		} else {
			console.log('Share not supported'); // TODO?
		}
	};

	const capitalize = (str) => str.charAt(0).toUpperCase() + str.substring(1);

	let recentlyChangedType = -1;

	function getPokemonWithCurrentType() {
		let pokemonWithType = '';
		let countPokemonOfType = 0;
		let pokemonWithTypePartial = '';
		let countPokemonOfTypePartial = 0;
		for (let i = 0; pokedexJson && i < pokedexJson.length; i++) {
			// set up variables
			let currentTypes;
			let pokemonTypes;
			let isMatch = false;
			let isMatchPartial = false;
			if (types[1] === '') {
				currentTypes = [types[0]];
			} else if (types[0] === '') {
				currentTypes = [types[1]];
			} else {
				currentTypes = [types[0], types[1]];
			}
			if (pokedexJson[i].type.length === 1) {
				pokemonTypes = [pokedexJson[i].type[0].toLowerCase()];
			} else {
				pokemonTypes = [pokedexJson[i].type[0].toLowerCase(), pokedexJson[i].type[1].toLowerCase()];
			}

			// logic for matching type combination
			if (pokemonTypes.length === currentTypes.length) {
				if (pokemonTypes.length === 1) {
					if (pokemonTypes[0] === currentTypes[0]) {
						isMatch = true;
					}
				}
				if (pokemonTypes.length === 2) {
					if (
						(pokemonTypes[0] === currentTypes[0] && pokemonTypes[1] === currentTypes[1]) ||
						(pokemonTypes[0] === currentTypes[1] && pokemonTypes[1] === currentTypes[0])
					) {
						isMatch = true;
					}
				}
			}

			// logic for partial match (pokemon has 2 types but 1 type selected)
			if (
				pokemonTypes.length === 2 &&
				currentTypes.length === 1 &&
				(currentTypes[0] === pokemonTypes[0] || currentTypes[0] === pokemonTypes[1])
			) {
				isMatchPartial = true;
			}

			// if match
			if (isMatch) {
				countPokemonOfType++;
				pokemonWithType += pokedexJson[i].name + ', ';
			}
			if (isMatchPartial) {
				countPokemonOfTypePartial++;
				pokemonWithTypePartial += pokedexJson[i].name + ', ';
			}
		}

		return {
			pokemonWithType,
			countPokemonOfType,
			pokemonWithTypePartial,
			countPokemonOfTypePartial
		};
	}

	function handleClick(type) {
		if (types[0] == type) {
			types[0] = '';
		} else if (types[1] == type) {
			types[1] = '';
		} else {
			if (!types[0]) {
				changeType(1, type);
			} else if (!types[1]) {
				changeType(2, type);
			} else {
				if (recentlyChangedType == 1) {
					changeType(2, type);
				} else {
					changeType(1, type);
				}
			}
		}

		document.getElementById('search').value = '';

		if ($settings.weatherBoost.weatherBoostEnabled) updateWeatherBoostDisplay(types);
	}

	function changeType(num, type) {
		if (num == 1) {
			types[0] = type;
		} else {
			types[1] = type;
		}
		recentlyChangedType = num;
	}

	function clearTypes() {
		types[0] = '';
		types[1] = '';

		if ($settings.weatherBoost.clearButtonClearsWeather)
			document.getElementById('weather-none').click();
		document.getElementById('search').value = '';
		if ($settings.weatherBoost.weatherBoostEnabled) updateWeatherBoostDisplay(types);
	}

	// ================================

	function updateTypes(newTypes) {
		types[0] = '';
		types[1] = '';

		if (newTypes[0]) changeType(1, newTypes[0].toLowerCase());
		if (newTypes[1]) changeType(2, newTypes[1].toLowerCase());

		if ($settings.weatherBoost.weatherBoostEnabled) updateWeatherBoostDisplay(types);
	}

	function openPokemon(id) {
		updateTypes(pokedexJson[id].type);

		// update url param
		history?.replaceState({}, '', '?pokemon=' + id);
	}
</script>

<!-- on spacebar, focus autocomplete -->
<svelte:window
	on:onkeyup={(e) => {
		if (e.code == 'Space' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
			document.getElementById('search').select();
		}
	}}
/>

<section class="text-center m-4 text-gray-900">
	<button
		class="btn hover-fill modal-btn float-left ml-2"
		on:click={() => open('settingsModal')}
		name="Settings"
	>
		<svg
			class="w-6 h-6"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
			/>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
			/>
		</svg>
	</button>
	<button on:click={clearTypes} class="btn hover-fill" name="Clear">
		<svg
			class="w-6 h-6"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
			/>
		</svg>
	</button>
	<div id="dropdown" class="dropdown float-right ml-2" aria-haspopup="true" aria-expanded="false">
		<button class="btn hover-fill" name="More" on:click={toggleThreeDotMenu}>
			<svg
				class="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
				/>
			</svg>
		</button>
		<div id="dropdown-content" class="dropdown-content text-left {threeDotMenuOpen && 'show'}">
			<a class="modal-btn" on:click={() => open('weatherBoostModal')} role="menuitem"
				>Weather Boost</a
			>
			<a class="modal-btn" on:click={() => open('searchStringModal')} role="menuitem"
				>Search Strings</a
			>
			<a class="modal-btn" on:click={() => open('infoModal')} role="menuitem">App Info</a>
			<a class="modal-btn" on:click={() => open('typeChartModal')} role="menuitem">Type Chart</a>
			<!--  				<a role="menuitem">Coming soon...</a>
				<a role="menuitem">App Info / Help</a>
				<a role="menuitem">Multipliers</a>
				<a role="menuitem">Type Chart</a>
				<a role="menuitem">Type Quiz</a> -->
		</div>
	</div>

	<h1 class="my-2 tracking-wider">
		<button on:click={shareApp} class="btn hover-fill" name="Share">
			<svg
				class="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
				/>
			</svg>
		</button>
		Pokémon Types
	</h1>

	<div class="my-2">
		<Autocomplete
			id="search"
			placeholder="Search for a Pokémon..."
			options={pokemonNames}
			maxResults={50}
			selectOnFocus={true}
			selectOnClick={true}
			onChange={autocompleteChange}
		/>
	</div>

	{#if $settings.weatherBoost.weatherBoostEnabled}
		<div
			id="weather-boost-select"
			class="relative inline-block ml-2"
			on:change={() => updateWeatherBoostDisplay(types)}
		>
			<select id="weather-boost-options" class="relative inline-block">
				{#each ['None', 'Sunny/Clear', 'Rainy', 'Partly Cloudy', 'Windy', 'Snow', 'Fog'] as val}
					<option value={val.toString()}>{val}</option>
				{/each}
			</select>
		</div>
	{/if}

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

	<div id="type-btns" class="grid grid-cols-3 md:grid-cols-6 xl:grid-cols-9 my-2">
		{#each TYPE_DATA as type}
			<button
				class="btn {type.name} {types.includes(type.name) ? 'active' : ''}"
				name={type.name}
				on:click={() => handleClick(type.name)}
			>
				<img class="type-icon" src="/img/types/{type.name}.svg" alt={type.name} />
				<span>{capitalize(type.name)}</span>
			</button>
		{/each}
	</div>

	{#if types[0] !== '' || types[1] !== ''}
		<div id="matchups" class="grid grid-cols-2 my-2">
			<div id="type-weak" class="mr-2 md:mr-4">
				<h3>Weak to:</h3>
				{#each matchups as mu (mu.name)}
					{@const strong = mu.matchup < 0.625 || mu.matchup > 1.6}
					<div animate:flip={{ duration: 250 }} in:scale out:fade>
						{#if mu.matchup > 1}
							<div class="matchup-item" style="background-color: #{mu.color}">
								{#if strong}
									<strong>{mu.matchup}x</strong> {capitalize(mu.name)}
								{:else}
									{mu.matchup}x {capitalize(mu.name)}
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<div id="type-resist" class="mr-2 md:ml-4">
				<h3>Resists:</h3>
				{#each matchups as mu (mu.name)}
					{@const strong = mu.matchup < 0.625 || mu.matchup > 1.6}
					<div animate:flip={{ duration: 250 }} in:scale out:fade>
						{#if mu.matchup < 1}
							<div class="matchup-item" style="background-color: #{mu.color}">
								{#if strong}
									<strong>{mu.matchup}x</strong> {capitalize(mu.name)}
								{:else}
									{mu.matchup}x {capitalize(mu.name)}
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<div id="snackbar" />

	{#if $settings.display.showPokemonWithCurrentType}
		{@const {
			pokemonWithType,
			countPokemonOfType,
			pokemonWithTypePartial,
			countPokemonOfTypePartial
		} = pokemonWithCurrentType}
		<p class="mt-4">
			{countPokemonOfType} pokemon with this type combination {countPokemonOfType !== 0 ? ':' : ''}
			{pokemonWithType.slice(0, -2)}
			{#if countPokemonOfTypePartial !== 0}
				<br /><br />
				{countPokemonOfTypePartial} pokemon with this type and another type:
				{pokemonWithTypePartial.slice(0, -2)}
			{/if}
		</p>
	{/if}
</section>
