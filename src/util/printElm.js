const printElm = (elm, title = '', height, width) => {
	let win = window.open('', 'PRINT', height ? `height=${height},width=${width}` : '');

	win.document.write(
		'<html><head><link rel="stylesheet" href="css/styles.css"><title>' +
			document.title +
			'</title></head><body onload="window.print();window.close()">' +
			(title != '' ? `<h1>${title}</h1><br>` : '') +
			document.getElementById(elm).outerHTML +
			'</body></html>'
	);

	// necessary for IE
	win.document.close();
	win.focus();
};

export default printElm;
