window.addEventListener('load', () => {
	// turn on / off weather boost text
	document.getElementById('weather-boost-toggle').onchange = () => {
		const checked = document.getElementById('weather-boost-toggle').checked;
		const display = checked ? 'inline-block' : 'none';
		document.getElementById('weather-boost-text').style.display = display;
		document.getElementById('weather-boost-select').style.display = display;
		document.getElementById('weather-boost-check').style.display = display;

		document.getElementById('more-weather-settings').style.display =
			display;

		if (checked) updateWeatherBoostDisplay();
		updateTypeDisplay();

		storeSettingToggle('weather-boost-toggle');
	};

	document.getElementById('weather-boost-select').onchange = () => {
		updateWeatherBoostDisplay();
		updateTypeDisplay();

		// not storing selected weather boost or current pokemon or types for now
	};

	document.getElementById('use-weather-boost-toggle').onchange = () => {
		updateTypeDisplay();

		storeSettingToggle('use-weather-boost-toggle');
	};

	document.getElementById('dark-mode-toggle').onchange = () => {
		const checked = document.getElementById('dark-mode-toggle').checked;
		const display = checked ? 'dark' : 'light';
		document.body.classList.toggle('dark-mode');

		storeSettingToggle('dark-mode-toggle');
	};

	document.getElementById('clear-weather-toggle').onchange = () => {
		const checked = document.getElementById('clear-weather-toggle').checked;

		storeSettingToggle('clear-weather-toggle');
	};

	document.getElementById('type-display-options').onclick = () => {
		storeSetting('type-display-options', selectVal('type-display-options'));
		console.log('type-display-options', selectVal('type-display-options'));
	};

	// read local storage
	loadSettings();
});

function loadSettings() {
	const toggles = [
		'weather-boost',
		'use-weather-boost',
		'dark-mode',
		'clear-weather',
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
	setSelectVal('type-display-options', val);
}

function storeSettingToggle(name) {
	const key = name;
	const val = document.getElementById(name).checked;
	storeSetting(key, val);
}

function storeSetting(key, val) {
	localStorage.setItem(key, val);
}
