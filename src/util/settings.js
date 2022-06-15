// TODO: delte this file once confirmed that everything updates with state correctly

// import { updateWeatherBoostDisplay } from '../util/weatherboost';

window.addEventListener('load', () => {
	// turn on / off weather boost text
	document.getElementById('weather-boost-toggle').onchange = () => {
		const checked = document.getElementById('weather-boost-toggle').checked;

		if (checked) updateWeatherBoostDisplay($types);

		storeSettingToggle('weather-boost-toggle');
	};

	document.getElementById('weather-boost-select').onchange = () => {
		updateWeatherBoostDisplay($types);

		// not storing selected weather boost or current pokemon or types for now
	};

	document.getElementById('use-weather-boost-toggle').onchange = () => {
		storeSettingToggle('use-weather-boost-toggle');
	};

	document.getElementById('dark-mode-toggle').onchange = () => {
		storeSettingToggle('dark-mode-toggle');
	};

	document.getElementById('pokemon-with-type-toggle').onchange = () => {
		storeSettingToggle('pokemon-with-type-toggle');
	};

	document.getElementById('clear-weather-toggle').onchange = () => {
		storeSettingToggle('clear-weather-toggle');
	};

	document.getElementById('type-display-options').onclick = () => {
		storeSetting('type-display-options', document.getElementById('type-display-options').value);
	};

	// read local storage
	loadSettings();
});

function loadSettings() {
	const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	if (localStorage.getItem('dark-mode-toggle') === null) {
		storeSetting('dark-mode-toggle', preferDark);
	}

	const toggles = [
		'weather-boost',
		'use-weather-boost',
		'dark-mode',
		'pokemon-with-type',
		'clear-weather'
	];
	for (let toggle of toggles) {
		const name = toggle + '-toggle';
		const val = localStorage.getItem(name) === 'true';
		const elm = document.getElementById(name);

		if (elm.checked == val) {
			elm.onchange();
		}
		elm.checked = val;
		elm.onchange();
	}

	const val = localStorage.getItem('type-display-options');
	document.getElementById('type-display-options').value = val;
}

function storeSettingToggle(name) {
	const key = name;
	const val = document.getElementById(name).checked;
	storeSetting(key, val);
}

function storeSetting(key, val) {
	localStorage.setItem(key, val);
}
