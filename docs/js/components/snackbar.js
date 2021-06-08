let timeout;

function showSnackbar(html, ms=2500) {
	let s = document.getElementById('snackbar');

	s.innerHTML = html;
	s.classList.add('show');

	clearTimeout(timeout);
	timeout = setTimeout(()=> s.classList.remove('show'), ms);
}