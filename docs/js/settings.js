window.addEventListener('load', ()=> {

	// make clicking the background of the toggle still toggle it
	let toggle_bgs = document.getElementsByClassName('toggle-bg');
	for(toggle_bg of toggle_bgs) {
		toggle_bg.onclick = function(event) {
			toggle_bg.previousElementSibling.click();
		}
	}

	// turn on / off animations
	document.getElementById('animations-toggle').onchange = ()=> {
		document.body.classList.toggle('animations');
	}

});