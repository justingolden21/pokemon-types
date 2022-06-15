<script>
	import { open, close, modal } from '../util/modal';

	import Icon from './Icon.svelte';
	import SettingsModal from '../components/modals/SettingsModal.svelte';

	/// STATE ///
	const modalData = {
		'datetime-format': {
			title: 'Settings',
			icon: 'settings',
			component: SettingsModal
		}
	};

	let component, title, icon, previous, data;
	$: {
		const modalName = $modal?.name;
		if (modalName) {
			({ component, title, icon, previous, data } = modalData[modalName]);
		} else {
			({ component, title, icon, previous, data } = {});
		}
	}
	$: data = $modal?.data || {};

	/// EVENT HANDLERS ///
	function onWindowKeyDown(e) {
		if (e.key !== 'Escape') return;

		if (previous) {
			open(previous);
		} else {
			close();
		}
	}
</script>

<svelte:window on:keydown={onWindowKeyDown} />

{#if component}
	<div class="modal" on:mousedown={close}>
		<div class="modal-content surface rounded" on:mousedown|stopPropagation>
			<div class="modal-header">
				{#if previous}
					<button
						class="icon-btn float-left mr-8"
						on:click={() => open(previous)}
						aria-label="Go back"
					>
						<Icon name="arrow_left" class="w-6 h-6" />
					</button>
				{/if}
				<button class="icon-btn float-right" on:click={close} aria-label="Close">
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
		@apply sm:p-6 md:p-12 fixed left-0 top-0 w-full h-full bg-gray-700 bg-opacity-50 z-20;
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

	:global(.dark) .modal {
		@apply bg-gray-900 bg-opacity-50;
	}
	:global(.dark) .modal-content,
	:global(.dark) .modal-header {
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
