// Copied from Desktop Clock

import localStore from '../util/localStore';

export const defaultSettings = {
	display: {
		darkMode: false,
		showPokemonWithCurrentType: false
	},
	weatherBoost: {
		weatherBoostEnabled: false,
		clearButtonClearsWeather: true,
		useWeatherBoostMultiplier: true
	},
	autocomplete: {
		showTypesAs: 'icons'
	}
};

// deep copy to preserve original defaultSettings
export const settings = localStore('settings', JSON.parse(JSON.stringify(defaultSettings)));
