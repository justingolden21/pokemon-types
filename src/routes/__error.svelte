<script context="module">
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
		<h2>The resource could not be found</h2>
	{/if}
	<h2 class="my-4">{error.name} {status}</h2>

	<p>{error.message}</p>

	<a href="/" class="btn block mt-8 hover:no-underline">Go back to the homepage</a>
</div>
