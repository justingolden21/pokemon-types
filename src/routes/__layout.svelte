<script>
	import { session } from '$app/stores';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';

	import '../app.css';
	import { settings } from '../stores/settings';
	import ModalManager from '../components/ModalManager.svelte';
	import { setupInstall } from '../util/install';

	// // Copied from Desktop Clock
	// // check when session changes
	// // also check that browser exists so we can reference document
	// // toggle dark class based on setting
	$: if ($session && browser)
		$settings.display.darkMode
			? document.body.parentNode.classList.add('dark')
			: document.body.parentNode.classList.remove('dark');

	onMount(() => {
		setupInstall();
	});
</script>

<ModalManager />

<slot />
