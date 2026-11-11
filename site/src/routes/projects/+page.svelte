<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHead from '#lib/components/PageHead.svelte';
	import Img from '#lib/components/Img.svelte';
	import ContactBand from '#lib/components/ContactBand.svelte';
	import { projects, sectors, photoCount, type Sector } from '#lib/data/projects.js';
	import { morphFrom } from '#lib/motion.js';

	let filter = $state<Sector | 'All'>('All');

	const options = $derived([
		{ value: 'All' as const, count: projects.length },
		...sectors.map((s) => ({ value: s, count: projects.filter((p) => p.sector === s).length }))
	]);
	const shown = $derived(filter === 'All' ? projects : projects.filter((p) => p.sector === filter));

	/** Five-step editorial rhythm, repeated down the list. */
	const layout = [
		{ cls: 't-a', ratio: '4 / 3', sizes: '(min-width: 961px) 56vw, 100vw' },
		{ cls: 't-b', ratio: '4 / 5', sizes: '(min-width: 961px) 32vw, 100vw' },
		{ cls: 't-c', ratio: '4 / 5', sizes: '(min-width: 961px) 40vw, 100vw' },
		{ cls: 't-d', ratio: '4 / 3', sizes: '(min-width: 961px) 40vw, 100vw' },
		{ cls: 't-e', ratio: '16 / 9', sizes: '(min-width: 961px) 66vw, 100vw' }
	];
</script>

<Seo
	title="Projects"
	description="Hospital fit-outs, production floors, offices, resorts, schools and homes completed by CSL Interiors & Construction Services across Cebu."
/>

<PageHead
	lines={['Built and', 'handed over.']}
	lede="{projects.length} projects across Cebu, documented with {photoCount} site photos. Hospitals, factories, call centers, resorts, schools and homes."
/>

<section class="wrap" aria-label="Project list">
	<div class="filters" role="group" aria-label="Filter by sector">
		{#each options as o (o.value)}
			<button
				type="button"
				class="chip"
				aria-pressed={filter === o.value}
				disabled={o.count === 0}
				onclick={() => (filter = o.value)}
			>
				{o.value}
				<span class="meta">{o.count}</span>
			</button>
		{/each}
	</div>

	{#key filter}
		<ul class="tiles grid">
			{#each shown as p, i (p.slug)}
				{@const t = layout[i % layout.length]}
				<li class="tile {t.cls}">
					<a href="/projects/{p.slug}/" onclick={(e) => morphFrom(e.currentTarget.querySelector('.frame'), p.slug)}>
						<Img photo={p.cover} ratio={t.ratio} sizes={t.sizes} eager={i < 2} />
						<span class="tile-text">
							<span class="h3 name">{p.name}</span>
							<span class="meta">{p.sector}<span class="sep" aria-hidden="true"></span>{p.location}</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	{/key}
</section>

<ContactBand heading="Planning something similar?" />

<style>
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding-bottom: clamp(40px, 5vw, 72px);
	}
	.chip {
		display: inline-flex;
		align-items: baseline;
		gap: 10px;
		height: 40px;
		align-items: center;
		padding-inline: 16px;
		border: 1px solid var(--line-strong);
		font-size: 0.92rem;
		transition:
			background-color 0.3s var(--ease-out),
			color 0.3s var(--ease-out),
			border-color 0.3s var(--ease-out);
	}
	.chip .meta {
		color: inherit;
		opacity: 0.6;
	}
	.chip[aria-pressed='true'] {
		background: var(--ink);
		border-color: var(--ink);
		color: var(--on-ink);
	}
	.chip:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}
	@media (hover: hover) {
		.chip:not([aria-pressed='true']):not(:disabled):hover {
			border-color: var(--ink);
		}
	}

	.tiles {
		row-gap: clamp(56px, 7vw, 120px);
		align-items: start;
	}
	.tile a {
		display: grid;
		gap: 18px;
	}
	.tile :global(.frame img) {
		transition: transform 1.4s var(--ease-out);
	}
	@media (hover: hover) {
		.tile a:hover :global(.frame img) {
			transform: scale(1.035);
		}
		.tile a:hover .name {
			color: var(--accent);
		}
	}
	.tile-text {
		display: grid;
		gap: 6px;
	}
	.name {
		transition: color 0.4s var(--ease-out);
	}
	.sep {
		display: inline-block;
		width: 18px;
		height: 1px;
		margin-inline: 10px;
		vertical-align: middle;
		background: currentColor;
		opacity: 0.6;
	}

	.t-a {
		grid-column: 1 / span 7;
	}
	.t-b {
		grid-column: 9 / span 4;
		margin-top: clamp(0px, 14vw, 240px);
	}
	.t-c {
		grid-column: 2 / span 5;
	}
	.t-d {
		grid-column: 8 / span 5;
		margin-top: clamp(0px, 8vw, 140px);
	}
	.t-e {
		grid-column: 3 / span 8;
	}

	@media (max-width: 960px) {
		.tile {
			grid-column: 1 / -1 !important;
			margin-top: 0 !important;
		}
	}
</style>
