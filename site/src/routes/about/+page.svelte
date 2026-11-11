<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHead from '#lib/components/PageHead.svelte';
	import Img from '#lib/components/Img.svelte';
	import ContactBand from '#lib/components/ContactBand.svelte';
	import { reveal } from '#lib/motion.js';
	import { stills } from '#lib/data/projects.js';

	const timeline = [
		{
			year: '2011',
			text: 'Founded in Mandaue City as CSL Interiors and Allied Services, supplying and installing carpet, vinyl flooring and window blinds.'
		},
		{
			year: '2013',
			text: 'Supplying and installing across the Visayas and Mindanao: carpet, vinyl, blinds, wallpaper, acoustic boards, PVC doors and laminates.'
		},
		{
			year: '2020',
			text: 'By 2020, wall and ceiling works, tiling, painting and full interior fit-out had joined the installation trades.'
		},
		{
			year: 'Today',
			text: 'Incorporated as CSL Interiors and Construction Services, Inc., working from the CSL Building in Lapu-Lapu City, with structural and building services work alongside fit-out.'
		}
	];

	const values = [
		{ name: 'Integrity', line: 'We do what is right.' },
		{ name: 'Quality', line: 'We build to the highest standards.' },
		{ name: 'Teamwork', line: 'We achieve more together.' },
		{ name: 'Safety', line: 'We protect people and projects.' }
	];
</script>

<Seo
	title="About"
	description="CSL Interiors and Construction Services, Inc. carries forward the work of CSL Interiors and Allied Services, a Cebu interiors company founded in 2011."
/>

<PageHead
	lines={['Fifteen years of', 'building in Cebu.']}
	lede="CSL Interiors and Construction Services, Inc. carries forward the work of CSL Interiors and Allied Services, founded in Mandaue City in 2011."
/>

<div class="wrap grid">
	<Img class="about-hero" photo={stills.stair} ratio="16 / 9" parallax eager sizes="(min-width: 961px) 75vw, 100vw" caption="Pueblo de Oro Residences, Babag. Stair and finishes." />
</div>

<section class="section wrap grid story" aria-label="Our story">
	<p class="story-lead" data-reveal="fade" {@attach reveal}>
		The people behind CSL have spent years delivering demanding projects for hospitals, universities, resorts and
		developers. That experience is the reason the company now takes on whole buildings, not only their finishes.
	</p>
	<div class="story-body" data-reveal="fade" style:--d="120ms" {@attach reveal}>
		<p>
			We build for residential, commercial, hospitality, industrial and institutional clients. Our work covers
			architectural works, interior fit-out, design and build, ceilings, drywall, tiling, renovation and general
			construction.
		</p>
		<p>
			We work closely with owners, designers and project teams to understand the objectives, budget, quality standard
			and timeline of each job, then plan the work around them.
		</p>
	</div>
</section>

<section class="section wrap timeline" aria-labelledby="tl-title">
	<h2 id="tl-title" class="h2">How we got here</h2>
	<ol>
		{#each timeline as t, i (t.year)}
			<li class="grid" data-reveal="fade" style:--d="{i * 70}ms" {@attach reveal}>
				<span class="year">{t.year}</span>
				<p>{t.text}</p>
			</li>
		{/each}
	</ol>
</section>

<section class="section wrap values" aria-labelledby="values-title">
	<h2 id="values-title" class="sr-only">Values</h2>
	<ul class="vals">
		{#each values as v, i (v.name)}
			<li data-reveal="fade" style:--d="{i * 80}ms" {@attach reveal}>
				<span class="val-name">{v.name}</span>
				<span class="muted">{v.line}</span>
			</li>
		{/each}
	</ul>
</section>

<section class="section wrap grid mv" aria-label="Mission and vision">
	<div class="mv-img">
		<Img photo={stills.gazebo} ratio="4 / 5" parallax sizes="(min-width: 961px) 33vw, 100vw" caption="Maayo Stay Resort, San Remigio." />
	</div>
	<div class="mv-text">
		<div data-reveal="fade" {@attach reveal}>
			<h2 class="h3">Mission</h2>
			<p>To provide high-quality construction services and products that consistently meet or exceed our clients' expectations.</p>
		</div>
		<div data-reveal="fade" style:--d="120ms" {@attach reveal}>
			<h2 class="h3">Vision</h2>
			<p>
				To be one of the most effective, efficient and trusted contractors in the Philippines in architectural works,
				interior fit-out, construction and building finishes, and a preferred contractor and supplier known for
				quality, reliability and service.
			</p>
		</div>
	</div>
</section>

<ContactBand />

<style>
	:global(.about-hero) {
		grid-column: 1 / span 10;
	}

	.story {
		row-gap: 40px;
	}
	.story-lead {
		grid-column: 1 / span 7;
		font-size: var(--step-2);
		font-weight: 380;
		line-height: 1.3;
		letter-spacing: -0.015em;
	}
	.story-body {
		grid-column: 9 / span 4;
		display: grid;
		gap: 18px;
		color: var(--ink-2);
		padding-top: 8px;
	}

	.timeline .h2 {
		margin-bottom: clamp(36px, 4vw, 64px);
	}
	.timeline li {
		border-top: 1px solid var(--line-strong);
		padding-block: 24px 36px;
		align-items: baseline;
	}
	.year {
		grid-column: 1 / span 4;
		font-size: var(--step-4);
		font-weight: 520;
		font-stretch: 100%;
		letter-spacing: -0.04em;
		line-height: 1;
	}
	.timeline p {
		grid-column: 6 / span 6;
		font-size: var(--step-1);
		line-height: 1.45;
	}

	.vals {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		column-gap: var(--col-gap);
		row-gap: clamp(40px, 5vw, 80px);
	}
	.vals li {
		display: grid;
		gap: 10px;
	}
	.val-name {
		font-size: var(--step-5);
		font-weight: 540;
		font-stretch: 100%;
		letter-spacing: -0.04em;
		line-height: 0.95;
	}
	.vals li:nth-child(even) {
		padding-top: clamp(0px, 6vw, 96px);
	}

	.mv {
		row-gap: 48px;
		align-items: start;
	}
	.mv-img {
		grid-column: 1 / span 4;
	}
	.mv-text {
		grid-column: 6 / span 6;
		display: grid;
		gap: clamp(40px, 5vw, 72px);
		padding-top: clamp(0px, 6vw, 96px);
	}
	.mv-text > div {
		display: grid;
		gap: 16px;
	}
	.mv-text p {
		font-size: var(--step-1);
		line-height: 1.45;
		max-width: 44ch;
	}

	@media (max-width: 960px) {
		:global(.about-hero),
		.story-lead,
		.story-body,
		.year,
		.timeline p,
		.mv-img,
		.mv-text {
			grid-column: 1 / -1;
		}
		.timeline p {
			margin-top: 12px;
		}
		.mv-text {
			padding-top: 0;
		}
	}
	@media (max-width: 640px) {
		.vals {
			grid-template-columns: 1fr;
		}
		.vals li:nth-child(even) {
			padding-top: 0;
		}
	}
</style>
