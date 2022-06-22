const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				accent: '#7038F8'
			},
			screens: {
				xs: '360px'
			}
		}
	},

	plugins: []
};

module.exports = config;
