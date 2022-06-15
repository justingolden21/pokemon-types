<script>
	$: year = new Date().getFullYear();
</script>

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
				This website is for quickly computing type matchups for Pokémon in Pokémon Go. You can view
				matchups, search for pokemon, view weather boost, copy search strings, and more.
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
