<script lang="ts">
	import { page } from '$app/state';
	import { cta } from '#lib/data/site.js';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} | CSL Interiors & Construction Services</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="wrap err">
	<p class="meta">{page.status}</p>
	<h1 class="display">{page.status === 404 ? 'This page is not here.' : 'Something went wrong.'}</h1>
	<p class="lede">
		{page.status === 404
			? 'The address may have changed when the site moved. Try one of these instead.'
			: 'Please try again in a moment.'}
	</p>
	<div class="actions">
		<a class="btn" href="/">Home</a>
		<a class="btn btn--ghost" href={cta.work.href}>{cta.work.label}</a>
	</div>
</section>

<style>
	.err {
		min-height: 70dvh;
		display: grid;
		align-content: center;
		gap: 28px;
		padding-block: 80px;
	}
	.display {
		max-width: 12em;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}
</style>
