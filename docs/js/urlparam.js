window.addEventListener('load', ()=> {
	const url = new URL(window.location.href);
	const q = url.searchParams.get('q');
    if(q=='typechart') {
    	document.getElementById('type-chart-modal').style.display = 'block';
    }

});

function updateUrlParam(q) {
	history.replaceState({}, '', '?q=' + q);
}

function copyUrlParam() {
    copyText(window.location.href);
}