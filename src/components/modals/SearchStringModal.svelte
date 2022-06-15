<script>
	import Toggle from '../Toggle.svelte';
</script>

<div id="search-string-type-display" class="mb-2" />

<Toggle id="super-against-toggle" checked={false} labelText="Super Effective Against" />

<br />
<div id="multiplier-threshold-div" style="display:none">
	<label>Minimum Effectiveness Multiplier</label>
	<div id="multiplier-threshold-select" class="relative inline-block ml-2">
		<button
			href="#multiplier-threshold-options"
			class="dropdown-btn select-btn"
			aria-haspopup="true"
			aria-expanded="false"
		>
			<span class="select-title">1.6</span>
			<svg
				class="absolute right-0 mr-2 w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		<div id="multiplier-threshold-options" class="dropdown-content select-content" role="menu">
			<a role="menuitem">1.2</a>
			<a role="menuitem">1.6</a>
			<a role="menuitem">1.92</a>
			<a role="menuitem">2.56</a>
			<a role="menuitem">3.07</a>
		</div>
	</div>
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
