<script>
	import Icon from '../Icon.svelte';
	import { updateUrlParam, copyUrlParam } from '../../util/urlparam';
	import printElm from '../../util/printElm';
	import showSnackbar from '../../util/snackbar';
</script>

<div id="type-chart" />

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

<a href="img/typechart.png" download>
	<button class="btn sm hover-fill my-3 mr-3">
		<Icon name="download" class="w-6 h-6 inline" />
		Download PNG
	</button>
</a>
<a href="img/typechart.pdf" download>
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

<a href="img/typechartattack.png" download>
	<button class="btn sm hover-fill my-3 mr-3">
		<Icon name="download" class="w-6 h-6 inline" />
		Download PNG
	</button>
</a>
<a href="img/typechartattack.pdf" download>
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
