<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import Img from '#lib/components/Img.svelte';
	import Lightbox from '#lib/components/Lightbox.svelte';
	import ContactBand from '#lib/components/ContactBand.svelte';
	import { reveal, morphFrom } from '#lib/motion.js';
	import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const p = $derived(data.project);
	const next = $derived(data.next);

	let viewing = $state<number | null>(null);
</script>

<Seo title={p.name} description="{p.summary} {p.location}." image={p.cover.src} />

<article>
	<header class="wrap grid head">
		<a class="back meta" href="/projects/"><ArrowLeft size={14} weight="light" aria-hidden="true" /> All projects</a>
		<div class="title-col">
			<h1 class="h1" data-reveal="lines" {@attach reveal}>
				<span class="ln"><span>{p.name}</span></span>
			</h1>
			<p class="lede" data-reveal="fade" style:--d="250ms" {@attach reveal}>{p.summary}</p>
		</div>
		<dl class="block" data-reveal="fade" style:--d="350ms" {@attach reveal}>
			<div><dt class="meta">Client</dt><dd>{p.client}</dd></div>
			<div><dt class="meta">Location</dt><dd>{p.location}</dd></div>
			<div><dt class="meta">Sector</dt><dd>{p.sector}</dd></div>
			<div><dt class="meta">Scope</dt><dd>{p.scope.length} work items</dd></div>
		</dl>
	</header>

	<div class="wrap grid">
		<!-- No reveal here: this frame is the landing spot for the photo morph from the previous page. -->
		<Img class="cover" photo={p.cover} eager animate={false} vt="p-{p.slug}" sizes="(min-width: 961px) 83vw, 100vw" />
	</div>

	<section class="section wrap grid scope" aria-labelledby="scope-title">
		<h2 id="scope-title" class="h3 scope-title">Scope of works</h2>
		<ul class="scope-list">
			{#each p.scope as item, i (item)}
				<li data-reveal="fade" style:--d="{(i % 6) * 50}ms" {@attach reveal}>{item}</li>
			{/each}
		</ul>
	</section>

	<section class="wrap gallery" aria-labelledby="gallery-title">
		<h2 id="gallery-title" class="h3">Site photos <span class="meta">{p.photos.length}</span></h2>
		<ul class="masonry">
			{#each p.photos as photo, i (photo.src)}
				<li>
					<button type="button" class="shot" onclick={() => (viewing = i)} aria-label="Open photo {i + 1} of {p.photos.length}">
						<Img {photo} delay={(i % 3) * 80} sizes="(min-width: 961px) 31vw, (min-width: 641px) 48vw, 100vw" />
					</button>
				</li>
			{/each}
		</ul>
	</section>

	<nav class="section wrap next" aria-label="Next project">
		<a
			href="/projects/{next.slug}/"
			class="next-link grid"
			onclick={(e) => morphFrom(e.currentTarget.querySelector('.next-img'), next.slug)}
		>
			<span class="next-text">
				<span class="meta">Next project</span>
				<span class="h2 next-name">{next.name}</span>
				<span class="meta">{next.location}</span>
			</span>
			<span class="next-img frame">
				<img src={next.cover.thumb} alt="" width={next.cover.w} height={next.cover.h} loading="lazy" />
			</span>
			<span class="next-go" aria-hidden="true"><ArrowUpRight size={36} weight="light" /></span>
		</a>
	</nav>
</article>

<Lightbox photos={p.photos} index={viewing} onclose={() => (viewing = null)} onmove={(i) => (viewing = i)} />

<ContactBand heading="Planning something similar?" />

<style>
	.head {
		padding-top: clamp(28px, 4vw, 56px);
		padding-bottom: clamp(40px, 5vw, 72px);
		row-gap: 28px;
		align-items: end;
	}
	.back {
		grid-column: 1 / -1;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		justify-self: start;
		color: var(--ink-2);
	}
	.back:hover {
		color: var(--accent);
	}
	.title-col {
		grid-column: 1 / span 7;
		display: grid;
		gap: 24px;
	}
	.h1 {
		font-size: var(--step-4);
		font-weight: 540;
		font-stretch: 100%;
		letter-spacing: -0.032em;
		line-height: 1.02;
	}
	.block {
		grid-column: 9 / span 4;
		display: grid;
		grid-template-columns: 1fr 1fr;
		border-top: 1px solid var(--line-strong);
	}
	.block > div {
		padding: 14px 12px 14px 0;
		border-bottom: 1px solid var(--line);
		display: grid;
		gap: 4px;
	}
	.block dd {
		font-size: 0.98rem;
		line-height: 1.35;
	}
	:global(.cover) {
		grid-column: 1 / span 10;
	}

	.scope {
		row-gap: 28px;
	}
	.scope-title {
		grid-column: 1 / span 3;
	}
	.scope-list {
		grid-column: 5 / span 8;
		columns: 2;
		column-gap: var(--col-gap);
		font-size: var(--step-1);
		line-height: 1.4;
	}
	.scope-list li {
		break-inside: avoid;
		padding-block: 0 14px;
	}

	.gallery h2 {
		display: flex;
		align-items: baseline;
		gap: 14px;
		margin-bottom: 32px;
	}
	.masonry {
		columns: 3;
		column-gap: var(--col-gap);
	}
	.masonry li {
		break-inside: avoid;
		margin-bottom: var(--col-gap);
	}
	.shot {
		display: block;
		width: 100%;
		text-align: left;
		cursor: zoom-in;
	}
	.shot :global(img) {
		transition: transform 1.2s var(--ease-out);
	}
	@media (hover: hover) {
		.shot:hover :global(img) {
			transform: scale(1.03);
		}
	}

	.next-link {
		align-items: center;
		border-top: 1px solid var(--line-strong);
		padding-top: 28px;
		row-gap: 24px;
	}
	.next-text {
		grid-column: 1 / span 7;
		display: grid;
		gap: 10px;
	}
	.next-name {
		transition: color 0.4s var(--ease-out);
	}
	.next-img {
		grid-column: 9 / span 3;
		aspect-ratio: 4 / 3;
	}
	.next-img img {
		transition: transform 1.2s var(--ease-out);
	}
	.next-go {
		grid-column: 12;
		justify-self: end;
		color: var(--accent);
		transition: transform 0.5s var(--ease-out);
	}
	@media (hover: hover) {
		.next-link:hover .next-name {
			color: var(--accent);
		}
		.next-link:hover .next-img img {
			transform: scale(1.05);
		}
		.next-link:hover .next-go {
			transform: translate(4px, -4px);
		}
	}

	@media (max-width: 960px) {
		.title-col,
		.block,
		:global(.cover),
		.scope-title,
		.scope-list,
		.next-text,
		.next-img {
			grid-column: 1 / -1;
		}
		.masonry {
			columns: 2;
		}
		.next-go {
			display: none;
		}
	}
	@media (max-width: 640px) {
		.scope-list,
		.masonry {
			columns: 1;
		}
	}
</style>
