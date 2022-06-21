<script>
	import Icon from '../Icon.svelte';
	import Toggle from '../Toggle.svelte';
	import { TYPE_NAMES, getMatchup } from '../../util/types';
	import capitalize from '../../util/capitalize';
	import showSnackbar from '../../util/snackbar';
	import { isBoosted, getTypeIcon } from '../../util/weatherboost';
	import { state } from '../../stores/state';
	import { settings } from '../../stores/settings';

	let superAgainst = false,
		hasType = true,
		hasFast = true,
		hasCharge = true,
		hasAny = false;

	let minimumMultiplier = 1.6;

	let searchstringOutput;

	$: typeHTML =
		($state.types[0] && `${getTypeIcon($state.types[0])} ${capitalize($state.types[0])}`) +
		($state.types[0] && $state.types[1] && ' &nbsp; ') +
		($state.types[1] && `${getTypeIcon($state.types[1])} ${capitalize($state.types[1])}`);

	$: searchstring = getSearchString(
		superAgainst,
		hasType,
		hasFast,
		hasCharge,
		hasAny,
		minimumMultiplier
	);

	// pass in params so `searchstring` updates reactively to changes in those values
	function getSearchString(superAgainst, hasType, hasFast, hasCharge, hasAny, minimumMultiplier) {
		if ($state.types[0] === '' && $state.types[1] === '') return '';

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

			const usingWeatherBoost =
				$settings.weatherBoost.weatherBoostEnabled &&
				$settings.weatherBoost.useWeatherBoostMultiplier;

			const multiplierThreshold = parseFloat(minimumMultiplier);

			for (let type of TYPE_NAMES) {
				let matchup = getMatchup(type, $state.types[0], $state.types[1]);
				if (usingWeatherBoost && isBoosted([type, ''], $state.weather)) matchup *= 1.2;
				if (matchup < multiplierThreshold) continue;
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

	const copySearchString = () => {
		searchstringOutput.select();
		document.execCommand('copy');

		const check =
			'<svg class="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>';
		showSnackbar(check + ' Copied searchstring');
	};
</script>

<div class="my-4">{@html typeHTML}</div>

<Toggle id="super-against-toggle" bind:checked={superAgainst} labelText="Super Effective Against" />

<br />
<div class={superAgainst ? '' : 'opacity-0'}>
	<label for="multiplier-threshold-select">Minimum Effectiveness Multiplier</label>
	<select
		id="multiplier-threshold-select"
		class="relative inline-block"
		bind:value={minimumMultiplier}
	>
		{#each [1.2, 1.6, 1.92, 2.56, 3.07] as val}
			<option value={val}>{val}</option>
		{/each}
	</select>
</div>

<hr />

<Toggle id="has-type-toggle" bind:checked={hasType} labelText="Has type" />

<Toggle
	id="has-fast-toggle"
	bind:checked={hasFast}
	on:change={() => {
		if (hasFast) hasAny = false;
	}}
	labelText="Has fast move of type"
/>

<Toggle
	id="has-charge-toggle"
	bind:checked={hasCharge}
	on:change={() => {
		if (hasCharge) hasAny = false;
	}}
	labelText="Has charge move of type"
/>

<Toggle
	id="has-any-toggle"
	bind:checked={hasAny}
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
	<Icon name="copy" class="w-6 h-6" />
</button>
