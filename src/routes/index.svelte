<script>
	import Autocomplete from '../components/Autocomplete.svelte';

	import pokemonJson from '../data/pokedex.json';

	$: year = new Date().getFullYear();

	const pokemonNames = pokemonJson.map((x) => x.name);
</script>

<body class="text-center m-4 text-gray-900">
	<section>
		<button class="btn hover-fill modal-btn float-left ml-2" href="#settings-modal" name="Settings">
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
		<button id="clear-btn" class="btn hover-fill" name="Clear">
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
				<a class="modal-btn" href="#weather-boost-modal" role="menuitem">Weather Boost</a>
				<a class="modal-btn" href="#search-string-modal" role="menuitem">Search Strings</a>
				<a class="modal-btn" href="#info-modal" role="menuitem">App Info</a>
				<a class="modal-btn" href="#type-chart-modal" role="menuitem">Type Chart</a>
				<!--  				<a role="menuitem">Coming soon...</a>
				<a role="menuitem">App Info / Help</a>
				<a role="menuitem">Multipliers</a>
				<a role="menuitem">Type Chart</a>
				<a role="menuitem">Type Quiz</a> -->
			</div>
		</div>

		<h1 class="my-2 tracking-wider">
			<button id="share-btn" class="btn hover-fill" name="Share">
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

			<div id="weather-boost-options" class="dropdown-content select-content" role="menu">
				<a id="weather-none" role="menuitem">None</a>
				<a role="menuitem"
					><img class="weather-icon" src="img/weather/sunny.png" /><img
						class="weather-icon"
						src="img/weather/clear.png"
					/> Sunny/Clear</a
				>
				<a role="menuitem"><img class="weather-icon" src="img/weather/rainy.png" /> Rainy</a>
				<a role="menuitem"
					><img class="weather-icon" src="img/weather/partly_cloudy.png" /> Partly Cloudy</a
				>
				<a role="menuitem"><img class="weather-icon" src="img/weather/cloudy.png" /> Cloudy</a>
				<a role="menuitem"><img class="weather-icon" src="img/weather/windy.png" /> Windy</a>
				<a role="menuitem"><img class="weather-icon" src="img/weather/snow.png" /> Snow</a>
				<a role="menuitem"><img class="weather-icon" src="img/weather/fog.png" /> Fog</a>
			</div>
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

	<div id="settings-modal" class="modal">
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
					<label for="use-weather-boost-toggle" class="toggle-label"
						>Use weather boost multiplier</label
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
	</div>

	<div id="weather-boost-modal" class="modal">
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
				<h1>Weather Boost</h1>
			</div>
			<div class="modal-body">
				<div id="weather-boost" />

				<br />
				<p>
					Weather boost causes Pokémon of the boosted types to spawn more frequently, reward more
					stardust when caught, and at spawn higher levels with better stats.
				</p>
				<br />
				<p>
					You can view the weather in app on the top right of the map, and click it for details.
					Weather boosted Pokémon will have a weather icon above them briefly after clicking on
					them.
				</p>
				<br />
				<p>Moves of a weather boosted type will deal <b>1.2x</b> damage.</p>
				<a
					href="https://niantic.helpshift.com/a/pokemon-go/?s=finding-evolving-hatching&f=weather-boosts"
					target="_blank">Learn more</a
				>

				<br />
				<button id="copy-weather-boost-link-btn" class="btn sm hover-fill my-3 mr-3">
					<svg
						class="w-6 h-6 inline"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
						/>
					</svg>
					Copy Link
				</button>
				<button id="print-weather-boost-btn" class="btn sm hover-fill my-3 mr-3">
					<svg
						class="w-6 h-6 inline"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
						/>
					</svg>
					Print
				</button>
			</div>
		</div>
	</div>

	<div id="search-string-modal" class="modal">
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
				<h1>Search Strings</h1>
			</div>
			<div class="modal-body">
				<div id="search-string-type-display" class="mb-2" />

				<div class="toggle-container">
					<input type="checkbox" id="super-against-toggle" class="toggle-checkbox" />
					<label class="toggle-bg" />
				</div>
				<label for="super-against-toggle" class="toggle-label">Super Effective Against</label>

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
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>

						<div
							id="multiplier-threshold-options"
							class="dropdown-content select-content"
							role="menu"
						>
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

				<div class="toggle-container">
					<input checked type="checkbox" id="has-type-toggle" class="toggle-checkbox" />
					<label class="toggle-bg" />
				</div>
				<label for="has-type-toggle" class="toggle-label">Has type</label>

				<br />

				<div class="toggle-container">
					<input checked type="checkbox" id="has-fast-move-toggle" class="toggle-checkbox" />
					<label class="toggle-bg" />
				</div>
				<label for="has-fast-move-toggle" class="toggle-label">Has fast move of type</label>

				<br />

				<div class="toggle-container">
					<input checked type="checkbox" id="has-charge-move-toggle" class="toggle-checkbox" />
					<label class="toggle-bg" />
				</div>
				<label for="has-charge-move-toggle" class="toggle-label">Has charge move of type</label>

				<br />

				<div class="toggle-container">
					<input type="checkbox" id="has-any-move-toggle" class="toggle-checkbox" />
					<label class="toggle-bg" />
				</div>
				<label for="has-any-move-toggle" class="toggle-label">Has any move of type</label>

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
			</div>
		</div>
	</div>

	<div id="info-modal" class="modal">
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
				<h1>App Info</h1>
			</div>
			<div class="modal-body">
				<h3 class="my-3">About</h3>
				<p>
					This website is for quickly computing type matchups for Pokémon in Pokémon Go. You can
					view matchups, search for pokemon, view weather boost, copy search strings, and more.
				</p>
				<p>Hit <kbd>space</kbd> to focus the search input</p>
				<!-- <p>Made with <a href="https://tailwindcss.com/docs" target="_blank">Tailwind CSS</a> and <a href="https://heroicons.dev/" target="_blank">Hero Icons</a></p> -->
				<!-- <p>Version 1.0.0</p> -->
				<h3 class="my-3">Contact</h3>
				<p>
					Feel free to contact me with any questions, mistakes, or suggestions at <a
						href="mailto:contact@justingolden.me"
						target="_blank">contact@justingolden.me</a
					>.
				</p>
				<h3 class="my-3">Legal</h3>
				<small>
					<p>© {year} Justin Golden - All Rights Reserved</p>
					<hr class="my-2" />
					<p>
						Pokémon are trademarks of Nintendo, Game Freak, and The Pokémon Company. Pokémon And All
						Respective Names are Trademark & © of Nintendo, Pokémon GO is Trademark & © of Niantic,
						Inc. This website is not affiliated with Niantic Inc., The Pokemon Company, or Nintendo.
					</p>
				</small>
			</div>
		</div>
	</div>

	<div id="type-chart-modal" class="modal">
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
				<h1>Type Chart</h1>
			</div>
			<div class="modal-body overflow-x-scroll">
				<div id="type-chart" />

				<button id="copy-type-chart-link-btn" class="btn sm hover-fill my-3 mr-3">
					<svg
						class="w-6 h-6 inline"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
						/>
					</svg>
					Copy Link
				</button>

				<a href="img/typechart.png" download>
					<button class="btn sm hover-fill my-3 mr-3">
						<svg
							class="w-6 h-6 inline"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
							/>
						</svg>
						Download PNG
					</button>
				</a>
				<a href="img/typechart.pdf" download>
					<button class="btn sm hover-fill my-3 mr-3">
						<svg
							class="w-6 h-6 inline"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
							/>
						</svg>
						Download PDF
					</button>
				</a>
				<button id="print-type-chart-btn" class="btn sm hover-fill my-3 mr-3">
					<svg
						class="w-6 h-6 inline"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
						/>
					</svg>
					Print
				</button>

				<hr />

				<div id="type-attack-chart" class="w-max mx-auto" />

				<a href="img/typechartattack.png" download>
					<button class="btn sm hover-fill my-3 mr-3">
						<svg
							class="w-6 h-6 inline"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
							/>
						</svg>
						Download PNG
					</button>
				</a>
				<a href="img/typechartattack.pdf" download>
					<button class="btn sm hover-fill my-3 mr-3">
						<svg
							class="w-6 h-6 inline"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
							/>
						</svg>
						Download PDF
					</button>
				</a>
				<button id="print-type-attack-chart-btn" class="btn sm hover-fill my-3 mr-3">
					<svg
						class="w-6 h-6 inline"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
						/>
					</svg>
					Print
				</button>
			</div>
		</div>
	</div>

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
