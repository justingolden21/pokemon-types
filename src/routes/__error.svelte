<script context="module">
	// Copied from Desktop Clock

	export const load = ({ error, status }) => {
		return {
			props: {
				error,
				status
			}
		};
	};
</script>

<script>
	export let error;
	export let status;
</script>

<svelte:head>
	<title>Error {status === 404 ? ' 404' : ''}</title>
</svelte:head>

<div class="m-16 text-center">
	{#if status === 404}
		<h1>The resource could not be found</h1>
	{/if}

	<p class="my-4">{error.name} {status}</p>

	<p>{error.message}</p>

	<a href="/" class="btn block mt-8 hover:no-underline text-accent">Go back to the homepage</a>
</div>
