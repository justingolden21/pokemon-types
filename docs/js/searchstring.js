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

	let typeToggle = document.getElementById('has-type-toggle');
	let fastToggle = document.getElementById('has-fast-move-toggle');
	let chargeToggle = document.getElementById('has-charge-move-toggle');
	let anyToggle = document.getElementById('has-any-move-toggle');

	let hasType = typeToggle.checked;
	let hasFast = fastToggle.checked;
	let hasCharge = chargeToggle.checked;
	let hasAny = anyToggle.checked;

	// if(hasAny) {
	// 	fastToggle.checked = false;
	// 	chargeToggle.checked = false;
	// 	hasFast = false;
	// 	hasCharge = false;
	// } else if(hasFast || hasCharge) {
	// 	anyToggle.checked = false;
	// 	hasAny = false;
	// }


	let str = '';

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

	document.getElementById('searchstring-output').value = str;
}