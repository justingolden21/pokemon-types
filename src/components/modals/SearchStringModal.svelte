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
