window.addEventListener('load', ()=> {

	// display types and update search string
	document.querySelector('a[href="#search-string-modal"]').addEventListener('click', ()=> {
		let typeHTML = '';
		if(currentType1) typeHTML += `${getTypeIcon(currentType1)} ${capitalize(currentType1)}`;
		if(currentType1 && currentType2) typeHTML += ' &nbsp; ';
		if(currentType2) typeHTML += `${getTypeIcon(currentType2)} ${capitalize(currentType2)}`;
		document.getElementById('search-string-type-display').innerHTML = typeHTML;
		updateSearchString();
	});

	// update search string
	document.querySelectorAll('#search-string-modal .toggle-checkbox').forEach(
		elm => elm.addEventListener('change', updateSearchString)
	);


	document.getElementById('multiplier-threshold-select').onchange = updateSearchString;

	// maintain toggle states such that if any is checked, fast and charge aren't
	// and if fast or charge are checked, any isn't
	document.getElementById('has-any-move-toggle').addEventListener('change', ()=> {
		if(document.getElementById('has-any-move-toggle').checked) {
			document.getElementById('has-fast-move-toggle').checked = false;
			document.getElementById('has-charge-move-toggle').checked = false;
		}
	});
	document.getElementById('has-fast-move-toggle').addEventListener('change', ()=> {
		if(document.getElementById('has-fast-move-toggle').checked) {
			document.getElementById('has-any-move-toggle').checked = false;
		}
	});
	document.getElementById('has-charge-move-toggle').addEventListener('change', ()=> {
		if(document.getElementById('has-charge-move-toggle').checked) {
			document.getElementById('has-any-move-toggle').checked = false;
		}
	});

	// hide / show option if applicable

	document.getElementById('super-against-toggle').addEventListener('change', ()=> {
		document.getElementById('multiplier-threshold-div').style.display = document.getElementById('super-against-toggle').checked ? 'block' : 'none';
	});

	// copy btn
	document.getElementById('copy-searchstring-btn').onclick = ()=> {
		document.getElementById('searchstring-output').select();
		document.execCommand('copy');
	};

});

function updateSearchString() {
	if(currentType1 == '' && currentType2 == '') {
		document.getElementById('searchstring-output').value = '';
		return;
	}

	const superAgainst = document.getElementById('super-against-toggle').checked;
	const hasType = document.getElementById('has-type-toggle').checked;
	const hasFast = document.getElementById('has-fast-move-toggle').checked;
	const hasCharge = document.getElementById('has-charge-move-toggle').checked;
	const hasAny = document.getElementById('has-any-move-toggle').checked;
	let str = '';

	if(!superAgainst) {
		if(currentType1 == '' || currentType2 == '') {
			let type = currentType1 ? currentType1 : currentType2;
			if(hasType) str += `${type}`;
			if(hasType && (hasAny || hasFast || hasCharge) ) str += '&';
			if(hasAny) str += `@${type}`;
			if(hasFast) str += `@1${type}`;
			if(hasFast && hasCharge) str += '&';
			if(hasCharge) str += `@2${type},@3${type}`;
		} else {
			if(hasType) str += `${currentType1},${currentType2}`;
			if(hasType && (hasAny || hasFast || hasCharge) ) str += '&';
			if(hasAny) str += `@${currentType1},@${currentType2}`;
			if(hasFast) str += `@1${currentType1},@1${currentType2}`;
			if(hasFast && hasCharge) str += '&';
			if(hasCharge) str += `@2${currentType1},@2${currentType2},@3${currentType1},@3${currentType2}`;
		}
	} else {
		let matchups = [];

		let minMultiplier = parseFloat(selectVal('multiplier-threshold-options'));

		const usingWeatherBoost = document.getElementById('weather-boost-toggle').checked 
			&& document.getElementById('use-weather-boost-toggle').checked;
		const currentWeather = getWeather();

		for(let type of TYPE_NAMES) {
			let matchup = getMatchup(type, currentType1, currentType2);
			if(usingWeatherBoost && isBoosted([type, ''], currentWeather)) matchup *= 1.2;
			if(matchup < minMultiplier) continue;
			matchups.push({name: type, matchup: matchup});
		}

		matchups = matchups.sort((a, b) => b.matchup - a.matchup);

		let typeNames = matchups.map(a => a.name);
		if(typeNames.length != 0) {
			if(hasType) str += typeNames.join(',');
			if(hasType && (hasAny || hasFast || hasCharge) ) str += '&';
			if(hasAny) typeNames.forEach( (elm,idx) => str += '@' + elm + (idx == typeNames.length-1 ? '' : ',') );
			if(hasFast) typeNames.forEach( (elm,idx) => str += '@1' + elm + (idx == typeNames.length-1 ? '' : ',') );
			if(hasFast && hasCharge) str += '&';
			if(hasCharge) typeNames.forEach( (elm,idx) => str += '@2' + elm + ',@3' + elm + (idx == typeNames.length-1 ? '' : ',') );
		}
	}

	document.getElementById('searchstring-output').value = str;
}