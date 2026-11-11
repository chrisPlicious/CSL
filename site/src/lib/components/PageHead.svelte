<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '#lib/motion.js';

	type Props = { lines: string[]; lede?: string; aside?: Snippet };
	let { lines, lede, aside }: Props = $props();
</script>

<header class="ph wrap grid">
	<h1 class="display title" data-reveal="lines" {@attach reveal}>
		{#each lines as line, i (i)}
			<span class="ln" style:--i={i}><span>{line}</span></span>
		{/each}
	</h1>
	{#if lede}
		<p class="lede body" data-reveal="fade" style:--d="300ms" {@attach reveal}>{lede}</p>
	{/if}
	{#if aside}
		<div class="aside" data-reveal="fade" style:--d="400ms" {@attach reveal}>{@render aside()}</div>
	{/if}
</header>

<style>
	.ph {
		padding-top: clamp(40px, 6vw, 96px);
		padding-bottom: clamp(48px, 6vw, 96px);
		row-gap: clamp(28px, 3.4vw, 48px);
		align-items: end;
	}
	.title {
		grid-column: 1 / -1;
		max-width: 13em;
	}
	.body {
		grid-column: 1 / span 5;
	}
	.aside {
		grid-column: 8 / span 5;
	}
	@media (max-width: 960px) {
		.body,
		.aside {
			grid-column: 1 / -1;
		}
	}
</style>
