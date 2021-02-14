window.addEventListener('load', ()=> {

	// turn on / off weather boost text
	document.getElementById('weather-boost-toggle').onchange = ()=> {
		const checked = document.getElementById('weather-boost-toggle').checked;
		const display = checked ? 'inline-block' : 'none';
		document.getElementById('weather-boost-text').style.display = display;
		document.getElementById('weather-boost-select').style.display = display;
		document.getElementById('weather-boost-check').style.display = display;
		
		document.getElementById('more-weather-settings').style.display = display;

		if(checked) updateWeatherBoostDisplay();
		updateTypeDisplay();
	}

	document.getElementById('weather-boost-select').onchange = ()=> {
		updateWeatherBoostDisplay();
		updateTypeDisplay();
	}

	document.getElementById('use-weather-boost-toggle').onchange = ()=> {
		updateTypeDisplay();
	}

});