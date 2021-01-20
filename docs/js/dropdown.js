window.addEventListener('load', ()=> {

	// button toggles dropdown
	document.getElementById('dropdown-btn').onclick = (event)=> {
		document.getElementById('dropdown-content').classList.toggle('show');
	}

	// close the dropdown if the user clicks outside of it
	window.addEventListener('click', function(event) {
		if(!document.getElementById('dropdown-btn').contains(event.target)) {
			let content = document.getElementById('dropdown-content');
			if(content.classList.contains('show')) {
				content.classList.remove('show');
			}
		}
	});

});