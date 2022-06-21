<script>
	import Icon from '../Icon.svelte';
	import { updateUrlParam, copyUrlParam } from '../../util/urlparam';
	import printElm from '../../util/printElm';
	import showSnackbar from '../../util/snackbar';

	import { TYPE_NAMES, getColor, getMatchup } from '../../util/types';
	import { getTypeIcon } from '../../util/weatherboost';
	import { onMount } from 'svelte';
	import capitalize from '../../util/capitalize';

	// TODO use #each loop instead of this old crap
	onMount(() => {
		// create type chart

		const getTypeTD = (typeName) =>
			`<th style="color: #${getColor(typeName)}">
			<img class="type-icon" style="background-color: #${getColor(
				typeName
			)}" src="/img/types/${typeName}.svg"> 
			${typeName.substring(0, 3).toUpperCase()}
		</th>`;

		let tmpHTML = '<table><th>Def &gt; <br> Atk v</th>';
		for (let i = 0; i < TYPE_NAMES.length; i++) {
			tmpHTML += getTypeTD(TYPE_NAMES[i]);
		}
		for (let i = 0; i < TYPE_NAMES.length; i++) {
			tmpHTML += '<tr>';
			tmpHTML += getTypeTD(TYPE_NAMES[i]);
			for (let j = 0; j < TYPE_NAMES.length; j++) {
				let mu = getMatchup(TYPE_NAMES[i], TYPE_NAMES[j]);
				mu = mu == 5 ? 0.5 : mu;
				tmpHTML += `<td class="${
					mu > 1 ? 'super' : mu < 0.625 ? 'immune' : mu < 1 ? 'resist' : ''
				}">
				${mu < 1 ? mu.toString().substring(1) : mu}
				</td>`; // substring to remove leading zero from float
			}
			tmpHTML += '</tr>';
		}
		tmpHTML += '</table>';
		document.getElementById('type-chart').innerHTML = tmpHTML;

		// create type line chart
		// maybe todo: vertically center arrows

		const divClassesCSS = 'inline-block py-1 m-1 w-16 sm:w-20';

		const getTypeDiv = (typeName, isMain = false) =>
			typeName == ''
				? `<div class="${divClassesCSS}"></div>`
				: `<div class="${divClassesCSS} ${
						isMain ? 'bg-black text-white rounded' : ''
				  }">${getTypeIcon(typeName)} <br> ${isMain ? '<b>' : ''} ${capitalize(typeName)} ${
						isMain ? '</b>' : ''
				  }</div>`;

		const rightArrow =
			'<svg class="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>';

		// top row
		tmpHTML = '';
		for (let i = 0; i < 4; i++) tmpHTML += `<div class="${divClassesCSS}"></div>`;
		tmpHTML +=
			`<div class="${divClassesCSS}"><b>Weak To</b></div>` +
			rightArrow.replace('currentColor', 'transparent') +
			`<div class="${divClassesCSS}"></div>` +
			rightArrow.replace('currentColor', 'transparent') +
			`<div class="${divClassesCSS}"><b>Strong Against</b></div>`;
		for (let i = 0; i < 4; i++) tmpHTML += `<div class="${divClassesCSS}"></div>`;
		tmpHTML += '<br>';

		let matchups = [];

		for (let i = 0; i < TYPE_NAMES.length; i++) {
			// defending
			let count = 0;
			let defHTML = '';
			for (let j = 0; j < TYPE_NAMES.length; j++) {
				let mu = getMatchup(TYPE_NAMES[j], TYPE_NAMES[i]);
				if (mu > 1) {
					defHTML += getTypeDiv(TYPE_NAMES[j]);
					count++;
				}
			}
			for (let k = 0; k < 5 - count; k++) tmpHTML += getTypeDiv(''); // blank types for equal spacing
			tmpHTML += defHTML; // add blanks *before* types

			// the type itself
			tmpHTML += rightArrow + getTypeDiv(TYPE_NAMES[i], true) + rightArrow;

			// / attacking
			count = 0;
			for (let j = 0; j < TYPE_NAMES.length; j++) {
				let mu = getMatchup(TYPE_NAMES[i], TYPE_NAMES[j]);
				if (mu > 1) {
					tmpHTML += getTypeDiv(TYPE_NAMES[j]);
					count++;
				}
			}
			for (let k = 0; k < 5 - count; k++) tmpHTML += getTypeDiv(''); // blank types for equal spacing

			tmpHTML += '<br>';
		}

		document.getElementById('type-attack-chart').innerHTML =
			'<div style="text-align:center">' + tmpHTML + '</div>';
	});
</script>

<div id="type-chart" class="overflow-x-auto" />

<button
	on:click={() => {
		updateUrlParam('typechart');
		copyUrlParam();
		const check =
			'<svg class="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>';
		showSnackbar(check + ' Copied link to type chart');
	}}
	class="btn sm hover-fill my-3 mr-3"
>
	<Icon name="copy" class="w-6 h-6 inline" />
	Copy Link
</button>

<a href="/img/typechart.png" download>
	<button class="btn sm hover-fill my-3 mr-3">
		<Icon name="download" class="w-6 h-6 inline" />
		Download PNG
	</button>
</a>
<a href="/img/typechart.pdf" download>
	<button class="btn sm hover-fill my-3 mr-3">
		<Icon name="download" class="w-6 h-6 inline" />
		Download PDF
	</button>
</a>
<button
	on:click={() => printElm('type-chart', 'Type Effectiveness in Pokemon Go')}
	class="btn sm hover-fill my-3 mr-3"
>
	<Icon name="print" class="w-6 h-6 inline" />
	Print
</button>

<hr />

<div id="type-attack-chart" class="w-max mx-auto" />

<a href="/img/typechartattack.png" download>
	<button class="btn sm hover-fill my-3 mr-3">
		<Icon name="download" class="w-6 h-6 inline" />
		Download PNG
	</button>
</a>
<a href="/img/typechartattack.pdf" download>
	<button class="btn sm hover-fill my-3 mr-3">
		<Icon name="download" class="w-6 h-6 inline" />
		Download PDF
	</button>
</a>
<button
	on:click={() => printElm('type-attack-chart', 'Attacking Type Effectiveness in Pokemon Go')}
	class="btn sm hover-fill my-3 mr-3"
>
	<Icon name="print" class="w-6 h-6 inline" />
	Print
</button>
