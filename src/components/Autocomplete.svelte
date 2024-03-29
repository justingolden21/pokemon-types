<script>
	// Copied from Desktop Clock

	/// UTILS ///
	import clickOutside from '../util/clickOutside';
	import { TYPE_DATA } from '../util/types';

	import { settings } from '../stores/settings';

	import pokedexJson from '../data/pokedex.json';

	/// STATE ///
	export let options;
	export let placeholder = '';
	export let value = '';
	export let disabled = false;
	export let closeOnClickAway = true;
	export let id = '';
	export let selectOnClick = false;
	export let selectOnFocus = false;
	export let onChange = (val) => {};

	// min characters in input for autocomplete to appear
	export let minChars = 2;
	// max results to show at a time
	export let maxResults = 20;

	// filter options based on input
	let filteredOptions = [];

	/**
	 * inputValue is the value used for the component
	 * we export a value back to the consumer only if it's valid (if it's included in the given options)
	 *
	 * make new variable for inputValue and on inputValue change set value to it only if it's one of the options
	 */
	let inputValue = value;
	$: if (options.includes(inputValue)) {
		value = inputValue;
		onChange(value);
	}

	const splitStringThree = (str, idx0, idx1, idx2) => [
		str.substring(idx0, idx1),
		str.substring(idx1, idx2),
		str.substring(idx2)
	];

	const removeBold = (str) => str?.replace(/<(strong)>/g, '').replace(/<\/(strong)>/g, '');

	const filterOptions = () => {
		if (!inputValue || inputValue.length < minChars) {
			filteredOptions = [];
			highlightIdx = null;
			return;
		}
		let newOptions = [];
		let numResults = 0;
		for (const option of options) {
			const foundIdx = option
				.replace(/ /g, '_')
				.toLowerCase()
				.indexOf(inputValue.replace(/ /g, '_').toLowerCase());
			if (foundIdx !== -1) {
				const splitString = splitStringThree(option, 0, foundIdx, foundIdx + inputValue.length);
				const boldString = `${splitString[0]}<strong>${splitString[1]}</strong>${splitString[2]}`;
				newOptions.push(boldString);

				numResults++;
				if (maxResults && numResults >= maxResults) {
					break;
				}
			}
		}
		filteredOptions = newOptions;
	};

	// handle user input

	let searchInput;

	const setInputVal = (optionName) => {
		inputValue = removeBold(optionName);
		filteredOptions = [];
		highlightIdx = null;
		searchInput.focus();
	};

	// use keyboard to navigate and highlight options

	let highlightIdx = null;

	const navigateList = (e) => {
		// if autocomplete input is not focused, return
		if (document.activeElement !== searchInput) return;

		if (e.key === 'ArrowDown') {
			if (highlightIdx === null) {
				highlightIdx = 0;
			} else {
				highlightIdx++;
			}
		} else if (e.key === 'ArrowUp') {
			if (highlightIdx === null) {
				highlightIdx = filteredOptions.length - 1;
			} else {
				highlightIdx--;
			}
		} else if (e.key === 'Enter' && filteredOptions.length > 0) {
			if (highlightIdx !== null) {
				setInputVal(filteredOptions[highlightIdx]);
			} else if (filterOptions) {
				setInputVal(filteredOptions[0]);
			}
		} else if (e.key === 'Escape') {
			filteredOptions = [];
		}
		if (highlightIdx >= filteredOptions.length) highlightIdx = 0;
		if (highlightIdx < 0) highlightIdx = filteredOptions.length - 1;

		if (highlightIdx !== null) {
			document.querySelectorAll('.autocomplete-item')[highlightIdx]?.scrollIntoView();
		}
	};
</script>

<svelte:window on:keydown={navigateList} />

<div class="relative inline-block w-64 md:w-96 my-2">
	<input
		{id}
		spellcheck="false"
		autocomplete="off"
		type="text"
		class="bg-gray-100 w-full px-4 py-2"
		{disabled}
		{placeholder}
		bind:this={searchInput}
		bind:value={inputValue}
		on:input={filterOptions}
		on:focus={(event) => selectOnFocus && event.target.select()}
		on:click={(event) => selectOnClick && event.target.select()}
	/>
	{#if filteredOptions.length > 0}
		<ul
			class="border border-gray-200 border-t-0 border-b-0 absolute left-0 right-0 z-10 max-h-96 overflow-y-auto min-w-full"
			use:clickOutside
			on:click_outside={() => {
				if (closeOnClickAway) filteredOptions = [];
			}}
		>
			{#each filteredOptions as option, idx}
				<!-- Now this is what I call code... -->
				{@const pokemonTypes =
					pokedexJson[
						pokedexJson
							.map((o) => o.name)
							.indexOf(option.replace('<strong>', '').replace('</strong>', ''))
					].type}

				<li
					class="bg-white border-2 border-t-0 border-gray-200 whitespace-nowrap overflow-x-hidden block autocomplete-item p-2 cursor-pointer dark:border-gray-800 hover:dark:bg-gray-700 hover:bg-accent hover:text-white dark:text-white {idx ===
					highlightIdx
						? 'bg-accent text-white'
						: 'bg-gray-50 dark:bg-gray-900'}"
					on:click={() => setInputVal(option)}
				>
					{@html option}

					{#if $settings.autocomplete.showTypesAs === 'words'}
						<small>({pokemonTypes.join(', ')})</small>
					{:else if $settings.autocomplete.showTypesAs === 'icons'}
						<img
							alt=""
							class="type-icon"
							src="/img/types/{pokemonTypes[0].toLowerCase()}.svg"
							style="background-color: #{TYPE_DATA.find(
								(x) => x.name == pokemonTypes[0].toLowerCase()
							).color}"
						/>

						{#if pokemonTypes[1]}
							<img
								alt=""
								class="type-icon"
								src={`img/types/${pokemonTypes[1].toLowerCase()}.svg`}
								style={`background-color: #${
									TYPE_DATA.find((x) => x.name == pokemonTypes[1].toLowerCase()).color
								}`}
							/>
						{/if}
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="postcss">
	.type-icon {
		width: 1.25rem;
		display: inline;
		padding: 0.25rem;
		margin-left: 0.25rem;
		border-radius: 50%;
	}
	.type-icon[src*='undefined'] {
		display: none;
	}
</style>
