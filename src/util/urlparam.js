window.addEventListener('load', () => {
	const url = new URL(window.location.href);
	const q = url.searchParams.get('q');
	if (q == 'typechart') {
		document.getElementById('type-chart-modal').style.display = 'block';
	} else if (q == 'weatherboost') {
		document.getElementById('weather-boost-modal').style.display = 'block';
	}
});

function updateUrlParam(q) {
	history.replaceState({}, '', '?q=' + q);
}

const copyText = (str) => {
	const elm = document.createElement('textarea');
	elm.value = str;
	document.body.appendChild(elm);
	elm.select();
	document.execCommand('copy');
	document.body.removeChild(elm);
};

function copyUrlParam() {
	copyText(window.location.href);
}
