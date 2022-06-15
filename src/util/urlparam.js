import { open } from './modal';

const onloadReadURLParam = () => {
	const url = new URL(window.location.href);
	const q = url.searchParams.get('q');
	if (q == 'typechart') {
		open('typeChartModal');
	} else if (q == 'weatherboost') {
		open('weatherBoostModal');
	}
};

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

export { onloadReadURLParam, updateUrlParam, copyUrlParam };
