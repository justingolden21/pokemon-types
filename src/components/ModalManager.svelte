<script>
	// Copied from Desktop Clock

	import { open, close, modal } from '../util/modal';

	import Icon from './Icon.svelte';
	import SettingsModal from '../components/modals/SettingsModal.svelte';
	import InfoModal from '../components/modals/InfoModal.svelte';
	import WeatherBoostModal from '../components/modals/WeatherBoostModal.svelte';
	import SearchStringModal from '../components/modals/SearchStringModal.svelte';
	import TypeChartModal from '../components/modals/TypeChartModal.svelte';

	/// STATE ///
	const modalData = {
		settingsModal: {
			title: 'Settings',
			icon: 'settings',
			component: SettingsModal
		},

		infoModal: {
			title: 'Info',
			component: InfoModal
		},
		weatherBoostModal: {
			title: 'Weather Boost',
			component: WeatherBoostModal
		},
		searchStringModal: {
			title: 'Search Strings',
			component: SearchStringModal
		},
		typeChartModal: {
			title: 'Type Chart',
			component: TypeChartModal
		}
	};

	let component, title, icon, data;
	$: {
		const modalName = $modal?.name;
		if (modalName) {
			({ component, title, icon, data } = modalData[modalName]);
		} else {
			({ component, title, icon, data } = {});
		}
	}
	$: data = $modal?.data || {};

	/// EVENT HANDLERS ///
	function onWindowKeyDown(e) {
		if (e.key !== 'Escape') return;

		close();
	}
</script>

<svelte:window on:keydown={onWindowKeyDown} />

{#if component}
	<div class="modal" on:mousedown={close}>
		<div class="modal-content surface rounded" on:mousedown|stopPropagation>
			<div class="modal-header">
				<button
					class="icon-btn float-right btn sm close hover-fill"
					on:click={close}
					aria-label="Close"
				>
					<Icon name="close" class="w-6 h-6" />
				</button>
				<h1>
					{#if icon}
						<Icon name={icon} class="w-6 h-6 inline mr-2" />
					{/if}
					{title}
				</h1>
			</div>
			<div class="modal-body">
				<svelte:component this={component} {data} />
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.modal {
		@apply sm:p-6 md:p-12 fixed left-0 top-0 w-full h-full bg-gray-700 bg-opacity-50 z-20 overflow-auto;
	}
	.modal-content {
		@apply rounded border-2 border-gray-300 bg-white p-6 pt-3 relative m-auto w-full md:w-3/4;
		animation: animateTop 0.25s;
		-webkit-animation: animateTop 0.25s;
	}
	.modal-header button {
		@apply z-30 mt-2;
	}
	.modal h1 {
		@apply text-left mt-3;
	}
	.modal-header {
		@apply border-b-2 border-gray-300 pb-4;
	}
	.modal-body {
		@apply text-left relative flex-1 overflow-auto;
	}

	:global(html.dark) .modal {
		@apply bg-gray-900 bg-opacity-50;
	}
	:global(html.dark) .modal-content {
		@apply bg-gray-800 text-white;
	}
	:global(html.dark) .modal-content,
	:global(html.dark) .modal-header {
		@apply border-gray-700;
	}

	@keyframes animateTop {
		from {
			top: -240px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
	@-webkit-keyframes animateTop {
		from {
			top: -240px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
</style>
