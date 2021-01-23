window.addEventListener('load', ()=> {

	// button toggles dropdown
	let dropdownBtn = document.getElementById('dropdown-btn');
	dropdownBtn.onclick = function(event) {
		let elm = document.getElementById('dropdown-content');
		elm.classList.toggle('show');
		dropdownBtn.setAttribute('aria-expanded', elm.classList.contains('show'));
	};

	// custom select buttons
	let selectBtns = document.getElementsByClassName('select-btn');
	for(let selectBtn of selectBtns) {
		selectBtn.onclick = function(event) {
			let elm = document.querySelector(selectBtn.getAttribute('href'));
			elm.classList.toggle('show');
			selectBtn.setAttribute('aria-expanded', elm.classList.contains('show'));
		};
	}

	// close the dropdown / select if the user clicks outside of it
	window.addEventListener('click', function(event) {
		// dropdown
		if(!dropdownBtn.contains(event.target)) {
			let content = document.getElementById('dropdown-content');
			if(content.classList.contains('show')) {
				content.classList.remove('show');
				dropdownBtn.setAttribute('aria-expanded', false);
			}
		}

		// custom selects
		for(let selectBtn of selectBtns) {
			if(!selectBtn.contains(event.target)) {
				let content = document.querySelector(selectBtn.getAttribute('href'));
				if(content.classList.contains('show')) {
					content.classList.remove('show');
					selectBtn.setAttribute('aria-expanded', false);
				}
			}
		}
	});

	// update the display of the select with the selected option
	for(let selectBtn of selectBtns) {
		let options = document.querySelector(selectBtn.getAttribute('href')).querySelectorAll('a');
		for(let option of options) {
			option.onclick = function(event) {
				option.parentNode.parentNode.querySelector('.select-title').innerText = event.target.innerText;
				option.parentNode.parentNode.onchange();
			};
		}
	}

});

// get value of the custom select
const selectVal = selectName =>
	document.querySelector(`.select-btn[href="#${selectName}"] .select-title`).innerText;
