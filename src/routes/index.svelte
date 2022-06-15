<script>
	import { onMount } from 'svelte';

	import { settings } from '../stores/settings';

	import Autocomplete from '../components/Autocomplete.svelte';

	import { open } from '../util/modal';
	import { TYPE_DATA, getMatchup } from '../util/types';
	import { onloadReadURLParam } from '../util/urlparam';
	import { updateWeatherBoostDisplay, isBoosted, getWeather } from '../util/weatherboost';

	import { currentType1, currentType2 } from '../stores/stores';

	import pokemonJson from '../data/pokedex.json';

	const pokemonNames = pokemonJson.map((x) => x.name);

	// ========

	onMount(() => {
		// create type buttons
		for (let type of TYPE_DATA) {
			let btn = document.createElement('button');
			btn.innerHTML =
				`<img class="type-icon" src="img/types/${type.name}.svg"> ` + capitalize(type.name);
			btn.classList = `btn ${type.name}`;
			btn.name = capitalize(type.name);
			document.getElementById('type-btns').appendChild(btn);
			btn.onclick = () => handleClick(btn.classList[1]);
		}

		// on spacebar, focus autocomplete
		document.onkeyup = (e) => {
			if (e.code == 'Space' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
				document.getElementById('search').select();
			}
		};

		// read url param

		onloadReadURLParam();

		const url = new URL(window.location.href);
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

	let currentType1Value, currentType2Value;
	currentType1.subscribe((value) => {
		currentType1Value = value;
	});
	currentType2.subscribe((value) => {
		currentType2Value = value;
	});

	let recentlyChangedType = -1;

	function updateTypeDisplay() {
		let weakHtml = '<h3>Weak to:</h3>';
		let resistHtml = '<h3>Resists:</h3>';
		if (currentType1Value == '' && currentType2Value == '') (weakHtml = ''), (resistHtml = '');

		const usingWeatherBoost =
			$settings.weatherBoost.weatherBoostEnabled &&
			$settings.weatherBoost.useWeatherBoostMultiplier;

		let matchups = [];

		for (let type of TYPE_DATA) {
			let matchup = getMatchup(type.name, currentType1Value, currentType2Value);
			if (usingWeatherBoost && isBoosted([type.name, ''], getWeather())) matchup *= 1.2;
			if (matchup == 1) continue;

			matchups.push({ name: type.name, matchup: matchup, color: type.color });
		}

		matchups = matchups.sort((a, b) => b.matchup - a.matchup);

		for (let mu of matchups) {
			const strong = mu.matchup < 0.625 || mu.matchup > 1.6;
			const html = `<div class="matchup-item" style="background-color: #${mu.color};">${
				strong ? '<strong>' : ''
			}${mu.matchup}${strong ? '</strong>' : ''}x ${capitalize(mu.name)}</div>`;
			if (mu.matchup > 1) {
				weakHtml += html;
			} else {
				resistHtml += html;
			}
		}

		document.getElementById('type-weak').innerHTML = weakHtml;
		document.getElementById('type-resist').innerHTML = resistHtml;

		const matchupsDiv = document.getElementById('matchups');
		matchupsDiv.classList.remove('leave', 'enter');
		matchupsDiv.classList.add('enter');
		matchupsDiv.addEventListener('animationend', () => matchupsDiv.classList.remove('enter'));

		// update url param
		let typeStr;
		if (currentType1Value && currentType2Value)
			typeStr = currentType1Value + '+' + currentType2Value;
		else if (currentType1Value) typeStr = currentType1Value;
		else if (currentType2Value) typeStr = currentType2Value;
		else typeStr = '';

		history.replaceState({}, '', '?types=' + typeStr);

		// pokemon with type combination
		if ($settings.display.showPokemonWithCurrentType) {
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
				if (currentType2Value === '') {
					currentTypes = [currentType1Value];
				} else if (currentType1Value === '') {
					currentTypes = [currentType2Value];
				} else {
					currentTypes = [currentType1Value, currentType2Value];
				}
				if (pokedexJson[i].type.length === 1) {
					pokemonTypes = [pokedexJson[i].type[0].toLowerCase()];
				} else {
					pokemonTypes = [
						pokedexJson[i].type[0].toLowerCase(),
						pokedexJson[i].type[1].toLowerCase()
					];
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
			let html = `${countPokemonOfType} pokemon with this type combination ${
				countPokemonOfType !== 0 ? ':' : ''
			} ${pokemonWithType.slice(0, -2)}`;
			if (countPokemonOfTypePartial !== 0) {
				html += `<br><br>${countPokemonOfTypePartial} pokemon with this type and another type: ${pokemonWithTypePartial.slice(
					0,
					-2
				)}`;
			}
			document.getElementById('pokemon-with-type').innerHTML = html;
		} else {
			document.getElementById('pokemon-with-type').innerHTML = '';
		}
	}

	function handleClick(type) {
		if (currentType1Value == type) {
			currentType1.set('');
			removeActive(type);
		} else if (currentType2Value == type) {
			currentType2.set('');
			removeActive(type);
		} else {
			if (!currentType1Value) {
				changeType(1, type);
			} else if (!currentType2Value) {
				changeType(2, type);
			} else {
				if (recentlyChangedType == 1) {
					removeActive(currentType2Value);
					changeType(2, type);
				} else {
					removeActive(currentType1Value);
					changeType(1, type);
				}
			}
		}

		updateTypeDisplay();
		document.getElementById('search').value = '';
		updateWeatherBoostDisplay();
	}

	function changeType(num, type) {
		if (num == 1) {
			currentType1.set(type);
		} else {
			currentType2.set(type);
		}
		recentlyChangedType = num;

		addActive(type);
	}

	function addActive(type) {
		document.querySelector(`.${type}`).classList.add('active');
	}
	function removeActive(type) {
		document.querySelector(`.${type}`).classList.remove('active');
	}

	function clearTypes(skipUpdate = false) {
		if (currentType2Value != '') {
			removeActive(currentType2Value);
			currentType2.set('');
		}
		if (currentType1Value != '') {
			removeActive(currentType1Value);
			currentType1.set('');
		}

		if (!skipUpdate) {
			if ($settings.weatherBoost.clearButtonClearsWeather)
				document.getElementById('weather-none').click();
			document.getElementById('search').value = '';
			updateWeatherBoostDisplay();

			const matchupsDiv = document.getElementById('matchups');
			matchupsDiv.classList.add('leave');
			matchupsDiv.addEventListener('animationend', updateTypeDisplay);
		}
	}

	// ================================

	function updateTypes(types) {
		clearTypes(true);
		if (types[0]) changeType(1, types[0].toLowerCase());
		if (types[1]) changeType(2, types[1].toLowerCase());

		updateTypeDisplay();
		updateWeatherBoostDisplay();
	}

	function openPokemon(id) {
		updateTypes(pokedexJson[id].type);

		// update url param
		history.replaceState({}, '', '?pokemon=' + id);
	}
</script>

<body class="text-center m-4 text-gray-900">
	<section>
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
			<button id="dropdown-btn" class="btn dropdown-btn hover-fill" name="More">
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
			<div id="dropdown-content" class="dropdown-content text-left">
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
			/>
		</div>

		<div id="weather-boost-select" class="relative inline-block hidden ml-2">
			<button
				href="#weather-boost-options"
				class="dropdown-btn select-btn"
				aria-haspopup="true"
				aria-expanded="false"
			>
				<span class="select-title">None</span>
				<svg
					class="absolute right-0 mr-2 w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>

			<div id="weather-boost-options" class="dropdown-content select-content" role="menu" />

			<select id="weather-boost-options" class="relative inline-block">
				{#each ['None', 'Sunny/Clear', 'Rainy', 'Partly Cloudy', 'Windy', 'Snow', 'Fog'] as val}
					<option value={val.toString()}>val</option>
				{/each}
			</select>
		</div>

		<p>
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
		</p>

		<div id="type-btns" class="grid grid-cols-3 md:grid-cols-6 xl:grid-cols-9 my-2" />

		<div id="matchups" class="grid grid-cols-2 my-2">
			<div>
				<div id="type-weak" class="mr-2 md:mr-4" />
			</div>
			<div>
				<div id="type-resist" class="mr-2 md:ml-4" />
			</div>
		</div>
	</section>

	<div id="snackbar" />

	<p id="pokemon-with-type" class="mt-4" />

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-JDML9CJTDG"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-JDML9CJTDG');
	</script>
</body>
