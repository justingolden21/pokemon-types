<script>
	import Toggle from '../Toggle.svelte';
	import { TYPE_NAMES, getMatchup } from '../../util/types';
	import { isBoosted, getWeather, getTypeIcon } from '../../util/weatherboost';
	import { state } from '../../stores/state';
	import { settings } from '../../stores/settings';

	window.addEventListener('load', () => {
		// display types and update search string
		document.querySelector('a[href="#search-string-modal"]').addEventListener('click', () => {
			let typeHTML = '';
			if ($state.types[0])
				typeHTML += `${getTypeIcon($state.types[0])} ${capitalize($state.types[0])}`;
			if ($state.types[0] && $state.types[1]) typeHTML += ' &nbsp; ';
			if ($state.types[1])
				typeHTML += `${getTypeIcon($state.types[1])} ${capitalize($state.types[1])}`;
			document.getElementById('search-string-type-display').innerHTML = typeHTML;
			updateSearchString();
		});

		// update search string
		document
			.querySelectorAll('#search-string-modal .toggle-checkbox')
			.forEach((elm) => elm.addEventListener('change', updateSearchString));

		document.getElementById('multiplier-threshold-select').onchange = updateSearchString;
	});
	const copySearchString = () => {
		searchstringOutput.select();
		document.execCommand('copy');
	};

	$: searchstring =
		$state.types[0] === '' && $state.types[1] === ''
			? ''
			: getSearchString(superAgainst, hasType, hasFast, hasCharge, hasAny);

	let superAgainst = false,
		hasType = true,
		hasFast = true,
		hasCharge = true,
		hasAny = false;

	let searchstringOutput;

	function getSearchString(superAgainst, hasType, hasFast, hasCharge, hasAny) {
		let str = '';

		if (!superAgainst) {
			if ($state.types[0] == '' || $state.types[1] == '') {
				let type = $state.types[0] ? $state.types[0] : $state.types[1];
				if (hasType) str += `${type}`;
				if (hasType && (hasAny || hasFast || hasCharge)) str += '&';
				if (hasAny) str += `@${type}`;
				if (hasFast) str += `@1${type}`;
				if (hasFast && hasCharge) str += '&';
				if (hasCharge) str += `@2${type},@3${type}`;
			} else {
				if (hasType) str += `${$state.types[0]},${$state.types[1]}`;
				if (hasType && (hasAny || hasFast || hasCharge)) str += '&';
				if (hasAny) str += `@${$state.types[0]},@${$state.types[1]}`;
				if (hasFast) str += `@1${$state.types[0]},@1${$state.types[1]}`;
				if (hasFast && hasCharge) str += '&';
				if (hasCharge)
					str += `@2${$state.types[0]},@2${$state.types[1]},@3${$state.types[0]},@3${$state.types[1]}`;
			}
		} else {
			let matchups = [];

			let minMultiplier = parseFloat(document.getElementById('multiplier-threshold-options').value);

			//TODO: fix $settings usage
			const usingWeatherBoost =
				$settings.weatherBoost.weatherBoostEnabled &&
				$settings.weatherBoost.useWeatherBoostMultiplier;
			const currentWeather = getWeather();

			for (let type of TYPE_NAMES) {
				let matchup = getMatchup(type, $state.types[0], $state.types[1]);
				if (usingWeatherBoost && isBoosted([type, ''], currentWeather)) matchup *= 1.2;
				if (matchup < minMultiplier) continue;
				matchups.push({ name: type, matchup: matchup });
			}

			matchups = matchups.sort((a, b) => b.matchup - a.matchup);

			let typeNames = matchups.map((a) => a.name);
			if (typeNames.length != 0) {
				if (hasType) str += typeNames.join(',');
				if (hasType && (hasAny || hasFast || hasCharge)) str += '&';
				if (hasAny)
					typeNames.forEach(
						(elm, idx) => (str += '@' + elm + (idx == typeNames.length - 1 ? '' : ','))
					);
				if (hasFast)
					typeNames.forEach(
						(elm, idx) => (str += '@1' + elm + (idx == typeNames.length - 1 ? '' : ','))
					);
				if (hasFast && hasCharge) str += '&';
				if (hasCharge)
					typeNames.forEach(
						(elm, idx) =>
							(str += '@2' + elm + ',@3' + elm + (idx == typeNames.length - 1 ? '' : ','))
					);
			}
		}

		return str;
	}
</script>

<div id="search-string-type-display" class="mb-2" />

<Toggle checked={superAgainst} labelText="Super Effective Against" />

<br />
<div class={superAgainst ? '' : 'hidden'}>
	<label for="multiplier-threshold-select">Minimum Effectiveness Multiplier</label>
	<select id="multiplier-threshold-select" class="relative inline-block">
		{#each [1.2, 1.6, 1.92, 2.56, 3.07] as val}
			<option value={val.toString()}>{val}</option>
		{/each}
	</select>
</div>

<hr />

<Toggle checked={hasType} labelText="Has type" />

<Toggle
	checked={hasFast}
	on:change={() => {
		if (hasFast) hasAny = false;
	}}
	labelText="Has fast move of type"
/>

<Toggle
	checked={hasCharge}
	on:change={() => {
		if (hasCharge) hasAny = false;
	}}
	labelText="Has charge move of type"
/>

<Toggle
	checked={hasAny}
	on:change={() => {
		if (hasAny) {
			hasFast = false;
			hasCharge = false;
		}
	}}
	labelText="Has any move of type"
/>

<textarea
	bind:this={searchstringOutput}
	value={searchstring}
	class="border-2 border-gray-300 p-1 mt-4 w-full"
	spellcheck="false"
	rows="3"
/>

<button on:click={copySearchString} class="btn sm hover-fill mt-2" name="Copy">
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
			d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
		/>
	</svg>
</button>
