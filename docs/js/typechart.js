window.addEventListener('load', ()=> {
	let tmpHTML = '<table><th>Def &gt; <br> Atk v</th>';
	for(let i=0; i<typeNames.length; i++) {
		tmpHTML += `<th><img class="type-icon" src="img/types/${typeNames[i]}.svg"> ${capitalize(typeNames[i])}</th>`;
	}
	for(let i=0; i<typeNames.length; i++) {
		tmpHTML += '<tr>';
		tmpHTML += `<th><img class="type-icon" src="img/types/${typeNames[i]}.svg"> ${capitalize(typeNames[i])}</th>`;
		for(let j=0; j<typeNames.length; j++) {
			let mu = typeData[i][j];
			mu = mu == 5 ? 0.5 : mu;
			tmpHTML += `<td class="${mu > 1 ? 'super' : mu == 0 ? 'immune' : mu < 1 ? 'resist' : ''}">${mu}</td>`;
		}
		tmpHTML += '</tr>';
	}
	tmpHTML += '</table>';
	document.getElementById('type-chart').innerHTML = tmpHTML;

	// DEV ONLY, COMMENT IN PROD
	document.getElementById('type-chart-modal').style.display = 'block';
});