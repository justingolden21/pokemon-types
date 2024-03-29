// https://www.w3schools.com/howto/howto_js_autocomplete.asp

// @bug (UX): using arrow keys to change focus doesn't scroll autocomplete div to location of focused item
// @steps: type "pi" in search box, use arrows to scroll past "piplup" to "pignite"
// @expected behavior: autocomplete div moves down

// inp: text field
// options: array of possible autocompleted values
function autocomplete(inp, options) {
	let currentFocus;
	// when user edits the text field
	inp.addEventListener('input', function (e) {
		let val = this.value;
		// close any already open lists
		closeAllLists();
		// requires at least 1 character
		if (!val || val.length < 1) return;
		currentFocus = -1;
		// create a div to contain autocomplete results
		let listDiv = document.createElement('DIV');
		listDiv.setAttribute('id', this.id + 'autocomplete-list');
		listDiv.setAttribute('class', 'autocomplete-items');
		// append the div as a child of the autocomplete container
		this.parentNode.appendChild(listDiv);
		let numResults = 0;
		for (let idx in options) {
			// check if the option contains the same letters as the text field value
			const foundIdx = options[idx]
				.toUpperCase()
				.indexOf(val.toUpperCase());
			if (foundIdx !== -1) {
				// create a div for each matching element
				let optionDiv = document.createElement('DIV');
				// make matching letters bold, input field holds the option's value
				const splitString = SplitStringThree(
					options[idx],
					0,
					foundIdx,
					foundIdx + val.length
				);
				optionDiv.innerHTML = `${splitString[0]}<strong>${splitString[1]}</strong>${splitString[2]}`;

				switch (selectVal('type-display-options')) {
					case 'Icons':
						optionDiv.innerHTML += `<img class="type-icon" src="img/types/${pokedexJson[
							idx
						].type[0].toLowerCase()}.svg" style="background-color: #${
							TYPE_DATA.find(
								(x) =>
									x.name ==
									pokedexJson[idx].type[0].toLowerCase()
							).color
						}">`;
						if (pokedexJson[idx].type[1]) {
							optionDiv.innerHTML += `<img class="type-icon" src="img/types/${pokedexJson[
								idx
							].type[1].toLowerCase()}.svg" style="background-color: #${
								TYPE_DATA.find(
									(x) =>
										x.name ==
										pokedexJson[idx].type[1].toLowerCase()
								).color
							}">`;
						}
						break;
					case 'Words':
						optionDiv.innerHTML += ` <small>(${pokedexJson[
							idx
						].type.join(', ')})</small>`;
						break;
					default:
				}

				optionDiv.innerHTML += `<input type="hidden" value="${options[idx]}" data-index="${idx}">`;
				// when user clicks on the option
				optionDiv.addEventListener('click', function (e) {
					// insert the selected value into the text field
					inp.value = this.getElementsByTagName('input')[0].value;
					// close the list since an item has been selected
					closeAllLists();

					// pokemon specific: "open" the pokemon based off of index
					let idx =
						this.getElementsByTagName('input')[0].getAttribute(
							'data-index'
						);
					openPokemon(idx);
				});
				listDiv.appendChild(optionDiv);

				numResults++;
				if (numResults >= 50) break; // max 50 results
			}
		}
	});
	// when user presses a key while focusing the input
	inp.addEventListener('keydown', function (e) {
		let items = document.getElementById(this.id + 'autocomplete-list');
		if (items) items = items.getElementsByTagName('div');
		if (e.keyCode == 40) {
			// down key
			currentFocus++;
			setActive(items);
		} else if (e.keyCode == 38) {
			// up key
			currentFocus--;
			setActive(items);
		} else if (e.keyCode == 13) {
			// enter
			// prevent form from being submitted
			e.preventDefault();
			if (currentFocus > -1) {
				// simulate a click on the active item
				if (items) items[currentFocus].click();
			} else if (items) {
				// check that list exists
				// select the top option
				items[0].click();
			}
		}
	});
	// set only the currentFocus item to active
	function setActive(items) {
		if (!items) return;

		// remove the active class from all items
		for (let item of items) {
			item.classList.remove('autocomplete-active');
		}

		if (currentFocus >= items.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = items.length - 1;

		// add the class to the currently focused item
		items[currentFocus].classList.add('autocomplete-active');
	}
	// close all autocomplete lists except elm
	function closeAllLists(elm) {
		let items = document.getElementsByClassName('autocomplete-items');
		for (let item of items) {
			// don't close if the element clicked is the input or autocomplete item
			if (elm != item && elm != inp) {
				item.parentNode.removeChild(item);
			}
		}
	}
	// when the user clicks away, close the autocomplete list
	document.addEventListener('click', function (e) {
		closeAllLists(e.target);
	});
}

function SplitStringThree(str, idx0, idx1, idx2) {
	return [
		str.substring(idx0, idx1),
		str.substring(idx1, idx2),
		str.substring(idx2),
	];
}
