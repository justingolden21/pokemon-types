<script>
</script>

<div class="modal-content">
	<div class="modal-header">
		<button class="btn sm close hover-fill">
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
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
		<h1>
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
			</svg> Settings
		</h1>
	</div>
	<div class="modal-body">
		<!-- <h2 class="my-3 border-b-2 border-gray-100">Display</h2> -->

		<!-- <h2 class="my-3 border-b-2 border-gray-100">Features</h2> -->

		<!-- todo: use local storage, read browser default -->
		<h3 class="my-3">Display</h3>

		<div class="toggle-container">
			<input type="checkbox" id="dark-mode-toggle" class="toggle-checkbox" />
			<label class="toggle-bg" />
		</div>
		<label for="dark-mode-toggle" class="toggle-label">Dark Mode</label>
		<br />
		<br />
		<div class="toggle-container">
			<input type="checkbox" id="pokemon-with-type-toggle" class="toggle-checkbox" />
			<label class="toggle-bg" />
		</div>
		<label for="pokemon-with-type-toggle" class="toggle-label"
			>Show Pokemon with Current Type Combination</label
		>

		<h3 class="my-3">Weather Boost</h3>

		<div class="toggle-container">
			<input type="checkbox" id="weather-boost-toggle" class="toggle-checkbox" />
			<label class="toggle-bg" />
		</div>
		<label for="weather-boost-toggle" class="toggle-label">Weather boost</label>

		<br />
		<div id="more-weather-settings" class="hidden">
			<br />
			<div class="toggle-container">
				<input type="checkbox" id="clear-weather-toggle" class="toggle-checkbox" />
				<label class="toggle-bg" />
			</div>
			<label for="clear-weather-toggle" class="toggle-label">Clear button clears weather</label>

			<br />
			<div class="toggle-container">
				<input checked type="checkbox" id="use-weather-boost-toggle" class="toggle-checkbox" />
				<label class="toggle-bg" />
			</div>
			<label for="use-weather-boost-toggle" class="toggle-label">Use weather boost multiplier</label
			>
		</div>

		<h3 class="my-3">Autocomplete</h3>
		<label>Show types as</label>

		<div class="relative inline-block">
			<button
				href="#type-display-options"
				class="dropdown-btn select-btn"
				aria-haspopup="true"
				aria-expanded="false"
			>
				<span class="select-title">Icons</span>
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

			<div id="type-display-options" class="dropdown-content select-content" role="menu">
				<a role="menuitem">Icons</a>
				<a role="menuitem">Words</a>
				<a role="menuitem">Nothing</a>
			</div>
		</div>
	</div>
</div>
