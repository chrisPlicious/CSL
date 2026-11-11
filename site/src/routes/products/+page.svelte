<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHead from '#lib/components/PageHead.svelte';
	import Img from '#lib/components/Img.svelte';
	import ContactBand from '#lib/components/ContactBand.svelte';
	import { reveal } from '#lib/motion.js';
	import { productLines, installServices } from '#lib/data/products.js';
	import { stills } from '#lib/data/projects.js';
</script>

<Seo
	title="Products"
	description="Window blinds, carpet tiles, vinyl flooring, wallpaper, acoustic ceilings, PVC folding doors and laminates. Supplied and installed in Cebu."
/>

<PageHead
	lines={['Supplied', 'and installed.']}
	lede="The product lines CSL started with in 2011. Measured on site, supplied, and installed by our team."
/>

<section class="wrap grid lines-sec" aria-label="Product lines">
	<div class="pics">
		<Img photo={stills.carpet} ratio="4 / 5" parallax eager sizes="(min-width: 961px) 33vw, 100vw" caption="Carpet tiles, i2 Building, IT Park." />
		<Img photo={stills.planks} ratio="4 / 3" parallax delay={120} sizes="(min-width: 961px) 33vw, 100vw" caption="Vinyl planks, Paramount Life, Cebu Business Park." />
	</div>

	<div class="list">
		{#each productLines as line (line.id)}
			<div id={line.id} class="line" data-reveal="fade" {@attach reveal}>
				<h2 class="h3">{line.name}</h2>
				<p class="muted">{line.note}</p>
				<ul>
					{#each line.items as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<section class="section wrap grid install" aria-labelledby="install-title">
	<h2 id="install-title" class="h2 install-title" data-reveal="fade" {@attach reveal}>Installation only</h2>
	<div class="install-body">
		<p class="lede">Already have the materials? We also take on labor-only installation and repair.</p>
		<ul>
			{#each installServices as s, i (s)}
				<li data-reveal="fade" style:--d="{i * 50}ms" {@attach reveal}>{s}</li>
			{/each}
		</ul>
	</div>
</section>

<ContactBand heading="Need a quote for materials?" />

<style>
	.lines-sec {
		align-items: start;
		row-gap: 48px;
		padding-bottom: var(--section);
	}
	.pics {
		grid-column: 1 / span 4;
		display: grid;
		gap: clamp(32px, 4vw, 64px);
		position: sticky;
		top: calc(var(--header-h) + 24px);
	}
	.list {
		grid-column: 6 / span 7;
	}
	.line {
		scroll-margin-top: calc(var(--header-h) + 24px);
		border-top: 1px solid var(--line-strong);
		padding-block: 24px clamp(40px, 5vw, 64px);
		display: grid;
		gap: 14px;
	}
	.line ul {
		columns: 2;
		column-gap: var(--col-gap);
		margin-top: 8px;
	}
	.line li {
		break-inside: avoid;
		padding-bottom: 8px;
	}

	.install {
		border-top: 1px solid var(--line-strong);
		row-gap: 32px;
	}
	.install-title {
		grid-column: 1 / span 5;
	}
	.install-body {
		grid-column: 7 / span 6;
		display: grid;
		gap: 28px;
	}
	.install-body ul {
		display: grid;
		gap: 10px;
		font-size: var(--step-1);
	}

	@media (max-width: 960px) {
		.pics,
		.list,
		.install-title,
		.install-body {
			grid-column: 1 / -1;
		}
		.pics {
			position: static;
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 640px) {
		.pics {
			grid-template-columns: 1fr;
		}
		.line ul {
			columns: 1;
		}
	}
</style>
