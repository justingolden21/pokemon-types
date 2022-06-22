<script>
	import { onMount } from 'svelte';

	import { fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import { settings } from '../stores/settings';
	import { state } from '../stores/state';

	import Autocomplete from '../components/Autocomplete.svelte';

	import { open } from '../util/modal';
	import capitalize from '../util/capitalize';
	import { TYPE_DATA, getMatchup } from '../util/types';
	import { isBoosted } from '../util/weatherboost';
	import clickOutside from '../util/clickOutside';
	import { showInstallButton, installButtonClick } from '../util/install';

	import pokedexJson from '../data/pokedex.json';
	import WeatherBoostText from '../components/WeatherBoostText.svelte';
	import Icon from '../components/Icon.svelte';

	const pokemonNames = pokedexJson.map((x) => x.name);

	$: if ($state.types && setURLParamTypes) setURLParamTypes();

	$: usingWeatherBoost =
		$settings.weatherBoost.weatherBoostEnabled && $settings.weatherBoost.useWeatherBoostMultiplier;
	$: matchups = TYPE_DATA.map((type) => {
		let matchup = getMatchup(type.name, $state.types[0], $state.types[1]);
		if (usingWeatherBoost && isBoosted([type.name, ''], $state.weather)) matchup *= 1.2;
		return { name: type.name, matchup: matchup, color: type.color };
	}).sort((a, b) => b.matchup - a.matchup);

	$: pokemonWithCurrentType = $state.types ? getPokemonWithCurrentType() : {};

	// ========

	let setURLParamTypes;

	onMount(() => {
		setURLParamTypes = () => {
			let typeStr;
			if ($state.types[0] && $state.types[1]) typeStr = $state.types[0] + '+' + $state.types[1];
			else if ($state.types[0]) typeStr = $state.types[0];
			else if ($state.types[1]) typeStr = $state.types[1];
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
			if ($state.types[1] === '') {
				currentTypes = [$state.types[0]];
			} else if ($state.types[0] === '') {
				currentTypes = [$state.types[1]];
			} else {
				currentTypes = [$state.types[0], $state.types[1]];
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
		if ($state.types[0] == type) {
			$state.types[0] = '';
		} else if ($state.types[1] == type) {
			$state.types[1] = '';
		} else {
			if (!$state.types[0]) {
				changeType(1, type);
			} else if (!$state.types[1]) {
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
	}

	function changeType(num, type) {
		if (num == 1) {
			$state.types[0] = type;
		} else {
			$state.types[1] = type;
		}
		recentlyChangedType = num;
	}

	function clearTypes() {
		$state.types[0] = '';
		$state.types[1] = '';

		if ($settings.weatherBoost.clearButtonClearsWeather) $state.weather = 'none';
		document.getElementById('search').value = '';
	}

	// ================================

	function updateTypes(newTypes) {
		$state.types[0] = '';
		$state.types[1] = '';

		if (newTypes[0]) changeType(1, newTypes[0].toLowerCase());
		if (newTypes[1]) changeType(2, newTypes[1].toLowerCase());
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
		<Icon name="settings" class="w-6 h-6 inline" />
	</button>
	<button on:click={clearTypes} class="btn hover-fill" name="Clear">
		<Icon name="trash" class="w-6 h-6 inline" />
	</button>
	<div id="dropdown" class="dropdown float-right ml-2" aria-haspopup="true" aria-expanded="false">
		<button class="btn hover-fill" name="More" on:click={toggleThreeDotMenu}>
			<Icon name="dots_vertical" class="w-6 h-6 inline" />
		</button>
		<div
			id="dropdown-content"
			class="dropdown-content text-left {threeDotMenuOpen && 'show'}"
			use:clickOutside
			on:click_outside={() => (threeDotMenuOpen = false)}
		>
			<button class="modal-btn" on:click={() => open('weatherBoostModal')} role="menuitem"
				>Weather Boost</button
			>
			<button class="modal-btn" on:click={() => open('searchStringModal')} role="menuitem"
				>Search Strings</button
			>
			<button class="modal-btn" on:click={() => open('infoModal')} role="menuitem">App Info</button>
			<button class="modal-btn" on:click={() => open('typeChartModal')} role="menuitem"
				>Type Chart</button
			>
			<!--  				<a role="menuitem">Coming soon...</a>
				<a role="menuitem">App Info / Help</a>
				<a role="menuitem">Multipliers</a>
				<a role="menuitem">Type Chart</a>
				<a role="menuitem">Type Quiz</a> -->
		</div>
	</div>

	<h1 class="my-2 tracking-wider">
		<button on:click={shareApp} class="btn hover-fill" name="Share">
			<Icon name="share" class="w-6 h-6 inline" />
		</button>
		Pokémon Types
		{#if $showInstallButton}
			<button on:click={installButtonClick} class="btn hover-fill">
				<Icon name="download" class="w-6 h-6 inline" />
			</button>
		{/if}
	</h1>

	<Autocomplete
		id="search"
		placeholder="Search for a Pokémon..."
		options={pokemonNames}
		maxResults={50}
		selectOnFocus={true}
		selectOnClick={true}
		onChange={autocompleteChange}
	/>

	{#if $settings.weatherBoost.weatherBoostEnabled}
		<select class=" ml-2 relative inline-block" bind:value={$state.weather}>
			{#each ['None', 'Sunny/Clear', 'Rainy', 'Partly Cloudy', 'Windy', 'Snow', 'Fog'] as val}
				<option value={val.toLowerCase().trim().split('/')[0].replace(' ', '_')}>{val}</option>
			{/each}
		</select>
	{/if}

	<WeatherBoostText />

	<div id="type-btns" class="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 xl:grid-cols-9 my-2">
		{#each TYPE_DATA as type}
			<button
				class="btn {type.name} {$state.types.includes(type.name) ? 'active' : ''}"
				name={type.name}
				on:click={() => handleClick(type.name)}
			>
				<img class="type-icon" src="/img/types/{type.name}.svg" alt={type.name} />
				<span>{capitalize(type.name)}</span>
			</button>
		{/each}
	</div>

	{#if $state.types[0] !== '' || $state.types[1] !== ''}
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
