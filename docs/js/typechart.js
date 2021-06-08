window.addEventListener('load', ()=> {

	// create type chart

	const getTypeTD = typeName => 
		`<th style="color: #${getColor(typeName)}">
			<img class="type-icon" style="background-color: #${getColor(typeName)}" src="img/types/${typeName}.svg"> 
			${typeName.substring(0,3).toUpperCase()}
		</th>`;
	// 	${capitalize(typeName)}

	let tmpHTML = '<table><th>Def &gt; <br> Atk v</th>';
	for(let i=0; i<TYPE_NAMES.length; i++) {
		tmpHTML += getTypeTD(TYPE_NAMES[i]);
	}
	for(let i=0; i<TYPE_NAMES.length; i++) {
		tmpHTML += '<tr>';
		tmpHTML += getTypeTD(TYPE_NAMES[i]);
		for(let j=0; j<TYPE_NAMES.length; j++) {
			let mu = getMatchup(TYPE_NAMES[i], TYPE_NAMES[j]);
			mu = mu == 5 ? 0.5 : mu;
			tmpHTML += 
				`<td class="${mu > 1 ? 'super' : mu < 0.625 ? 'immune' : mu < 1 ? 'resist' : ''}">
				${mu < 1 ? mu.toString().substring(1) : mu}
				</td>`; // substring to remove leading zero from float
		}
		tmpHTML += '</tr>';
	}
	tmpHTML += '</table>';
	document.getElementById('type-chart').innerHTML = tmpHTML;

	// btn listeners

	document.getElementById('copy-type-chart-link-btn').onclick = ()=> {
        updateUrlParam('typechart');
        copyUrlParam();
        // TODO: add toast component, show "Copied!" toast for 2.5s
    };

    document.getElementById('print-type-chart-btn').onclick = ()=> printElm('type-chart');

});

function printElm(elm) {
	let win = window.open('', 'PRINT', 'height=480,width=640');

	win.document.write('<html><head><link rel="stylesheet" href="css/styles.css"><title>'
		+ document.title + '</title></head><body onload="window.print();window.close()">'
		+ document.getElementById(elm).outerHTML + '</body></html>');

	// necessary for IE
	win.document.close();
	win.focus();
}