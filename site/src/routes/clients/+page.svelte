<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHead from '#lib/components/PageHead.svelte';
	import Img from '#lib/components/Img.svelte';
	import ContactBand from '#lib/components/ContactBand.svelte';
	import { reveal } from '#lib/motion.js';
	import { clientGroups, clientCount } from '#lib/data/clients.js';
	import { stills } from '#lib/data/projects.js';
</script>

<Seo
	title="Clients"
	description="Hospitals, universities, resorts, developers and companies that have worked with CSL Interiors & Construction Services."
/>

<PageHead
	lines={['Who we', 'build for.']}
	lede="{clientCount} clients across healthcare, education, hospitality, property development and industry, from Cebu to Tacloban, Bayawan and Surigao."
/>

<div class="wrap grid">
	<Img class="clients-img" photo={stills.lounge} ratio="21 / 9" parallax eager sizes="(min-width: 961px) 83vw, 100vw" caption="Maayo Stay Argao. Restaurant fit-out." />
</div>

<section class="section wrap" aria-label="Client list">
	{#each clientGroups as g (g.sector)}
		<div class="group grid">
			<h2 class="h2 sector" data-reveal="fade" {@attach reveal}>
				{g.sector}
				<span class="meta count">{g.names.length}</span>
			</h2>
			<ul class="names">
				{#each g.names as name, i (name)}
					<li data-reveal="fade" style:--d="{(i % 8) * 40}ms" {@attach reveal}>{name}</li>
				{/each}
			</ul>
		</div>
	{/each}
</section>

<ContactBand />

<style>
	:global(.clients-img) {
		grid-column: 1 / span 10;
	}
	.group {
		border-top: 1px solid var(--line-strong);
		padding-block: 28px clamp(48px, 6vw, 88px);
		row-gap: 28px;
	}
	.sector {
		grid-column: 1 / span 5;
		font-size: var(--step-3);
		display: flex;
		align-items: baseline;
		gap: 14px;
	}
	.count {
		letter-spacing: 0;
	}
	.names {
		grid-column: 7 / span 6;
		columns: 2;
		column-gap: var(--col-gap);
		font-size: var(--step-1);
		line-height: 1.35;
	}
	.names li {
		break-inside: avoid;
		padding-bottom: 12px;
	}
	@media (max-width: 960px) {
		:global(.clients-img),
		.sector,
		.names {
			grid-column: 1 / -1;
		}
	}
	@media (max-width: 640px) {
		.names {
			columns: 1;
		}
	}
</style>
