// make settings modal not re-animate when animation toggle becomes checked
let enableAnimationsOnClose = false;

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
		if(document.getElementById('animations-toggle').checked) {
			enableAnimationsOnClose = true;
		} else {
			document.body.classList.toggle('animations');
		}
	}

});

function checkSetAnimationsOnClose() {
	if(enableAnimationsOnClose) {
		document.body.classList.add('animations');
		enableAnimationsOnClose = false;
	}
}