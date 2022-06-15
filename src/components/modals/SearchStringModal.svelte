<script>
	import Toggle from '../Toggle.svelte';
</script>

<div id="search-string-type-display" class="mb-2" />

<Toggle id="super-against-toggle" checked={false} labelText="Super Effective Against" />

<br />
<div id="multiplier-threshold-div" style="display:none">
	<label for="multiplier-threshold-select">Minimum Effectiveness Multiplier</label>
	<select id="multiplier-threshold-select" class="relative inline-block">
		{#each [1.2, 1.6, 1.92, 2.56, 3.07] as val}
			<option value={val.toString()}>val</option>
		{/each}
	</select>
</div>

<br />
<hr />
<br />

<Toggle id="has-type-toggle" checked={false} labelText="Has type" />

<br />

<Toggle id="has-fast-move-toggle" checked={false} labelText="Has fast move of type" />

<br />

<Toggle id="has-charge-move-toggle" checked={false} labelText="Has charge move of type" />

<br />

<Toggle id="has-any-move-toggle" checked={false} labelText="Has any move of type" />

<textarea
	id="searchstring-output"
	class="border-2 border-gray-300 p-1 mt-4 w-full"
	spellcheck="false"
	rows="3"
/>

<button id="copy-searchstring-btn" class="btn sm hover-fill mt-2" name="Copy">
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
