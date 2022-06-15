export async function get() {
	// https://web.dev/app-shortcuts/
	// `?utm_source=manifest_shortcut` is for analytics
	return {
		status: 200,
		body: {
			name: 'Pokémon Types',
			short_name: 'Pokémon Types',
			description: 'A simple tool for type matchups in Pokémon Go',
			start_url: '/',
			display: 'standalone',
			background_color: '#B8B8D0',
			theme_color: '#B8B8D0',
			orientation: 'portrait-primary',
			icons: [
				{
					src: 'img/icons/icon-192x192.png',
					sizes: '192x192',
					type: 'image/png',
					purpose: 'maskable any'
				},
				{
					src: 'img/icons/icon-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'maskable any'
				}
			]
		}
	};
}
