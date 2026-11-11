<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHead from '#lib/components/PageHead.svelte';
	import Img from '#lib/components/Img.svelte';
	import ContactBand from '#lib/components/ContactBand.svelte';
	import { reveal } from '#lib/motion.js';
	import { disciplines, projectTypes } from '#lib/data/services.js';
	import { stills } from '#lib/data/projects.js';

	const breaks: Record<string, { photo: typeof stills.labs; caption: string }> = {
		structural: { photo: stills.labs, caption: 'USPF Technology Hub, Lahug. Glass-walled laboratories.' },
		electrical: { photo: stills.exterior, caption: 'Taiyo Yuden, Cebu Light Industrial Park.' }
	};
</script>

<Seo
	title="Services"
	description="Architectural, masonry and structural, plumbing, electrical, mechanical and auxiliary works. Design and build, fit-out and general construction in Cebu."
/>

<PageHead
	lines={['From permits', 'to handover.']}
	lede="Whole projects or single trades: design and build, general construction, fit-out and finishing, and the building services behind the walls."
/>

<nav class="wrap jump" aria-label="Disciplines">
	<ul>
		{#each disciplines as d (d.id)}
			<li><a class="link" href="#{d.id}">{d.name}</a></li>
		{/each}
	</ul>
</nav>

{#each disciplines as d (d.id)}
	<section id={d.id} class="wrap grid disc" aria-labelledby="{d.id}-title">
		<div class="disc-head" data-reveal="fade" {@attach reveal}>
			<h2 id="{d.id}-title" class="h2 disc-name">{d.name}</h2>
			<p class="lede">{d.summary}</p>
		</div>
		<ul class="disc-items">
			{#each d.items as item, i (item)}
				<li data-reveal="fade" style:--d="{i * 40}ms" {@attach reveal}>{item}</li>
			{/each}
		</ul>
	</section>
	{#if breaks[d.id]}
		<div class="wrap grid break">
			<Img
				class={d.id === 'structural' ? 'brk-r' : 'brk-l'}
				photo={breaks[d.id].photo}
				ratio="16 / 10"
				parallax
				sizes="(min-width: 961px) 58vw, 100vw"
				caption={breaks[d.id].caption}
			/>
		</div>
	{/if}
{/each}

<section class="section wrap types" aria-labelledby="types-title">
	<h2 id="types-title" class="h3">Project types</h2>
	<p class="types-list" data-reveal="fade" {@attach reveal}>
		{#each projectTypes as t, i (t)}
			<span>{t}</span>{#if i < projectTypes.length - 1}<span class="slash" aria-hidden="true">/</span>{/if}
		{/each}
	</p>
</section>

<ContactBand />

<style>
	.jump {
		padding-bottom: clamp(48px, 6vw, 96px);
	}
	.jump ul {
		display: flex;
		flex-wrap: wrap;
		gap: 10px 28px;
		color: var(--ink-2);
	}

	.disc {
		scroll-margin-top: calc(var(--header-h) + 24px);
		padding-block: clamp(40px, 5vw, 72px);
		border-top: 1px solid var(--line-strong);
		row-gap: 32px;
	}
	.disc-head {
		grid-column: 1 / span 6;
		display: grid;
		gap: 20px;
		align-content: start;
	}
	.disc-name {
		font-size: var(--step-3);
	}
	.disc-items {
		grid-column: 8 / span 5;
		font-size: var(--step-1);
		line-height: 1.4;
		display: grid;
		gap: 12px;
		padding-top: 10px;
	}

	.break {
		padding-block: clamp(32px, 5vw, 80px);
	}
	:global(.brk-r) {
		grid-column: 6 / span 7;
	}
	:global(.brk-l) {
		grid-column: 1 / span 7;
	}

	.types {
		border-top: 1px solid var(--line-strong);
	}
	.types .h3 {
		margin-bottom: 28px;
	}
	.types-list {
		font-size: var(--step-3);
		font-weight: 420;
		line-height: 1.25;
		letter-spacing: -0.02em;
		max-width: 28em;
	}
	.slash {
		color: var(--accent);
		margin-inline: 0.4em;
	}

	@media (max-width: 960px) {
		.disc-head,
		.disc-items,
		:global(.brk-r),
		:global(.brk-l) {
			grid-column: 1 / -1;
		}
	}
</style>
