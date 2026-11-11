<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import Img from '#lib/components/Img.svelte';
	import ProjectIndex from '#lib/components/ProjectIndex.svelte';
	import ContactBand from '#lib/components/ContactBand.svelte';
	import { reveal } from '#lib/motion.js';
	import { site, cta } from '#lib/data/site.js';
	import { featured, stills } from '#lib/data/projects.js';
	import { disciplines } from '#lib/data/services.js';
	import { clientGroups, clientCount } from '#lib/data/clients.js';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import Plus from 'phosphor-svelte/lib/Plus';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'GeneralContractor',
		name: site.legalName,
		alternateName: site.formerName,
		url: site.url,
		logo: `${site.url}/logo.png`,
		email: site.email,
		telephone: site.phones.map((p) => p.display),
		foundingDate: String(site.founded),
		areaServed: ['Cebu', 'Visayas'],
		address: {
			'@type': 'PostalAddress',
			streetAddress: `${site.address.building}, ${site.address.street}`,
			addressLocality: 'Lapu-Lapu City',
			addressRegion: 'Cebu',
			postalCode: site.address.postal,
			addressCountry: 'PH'
		},
		sameAs: [site.facebook]
	};
	const ldScript = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</` + 'script>';
</script>

<Seo />
<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html ldScript}
</svelte:head>

<!-- Hero -->
<section class="hero wrap">
	<h1 class="display hero-title" data-reveal="lines" {@attach reveal}>
		<span class="ln"><span>From bare slab</span></span>
		<span class="ln" style:--i="1"><span>to finished room.</span></span>
	</h1>

	<div class="grid hero-body">
		<div class="hero-copy" data-reveal="fade" style:--d="350ms" {@attach reveal}>
			<p class="lede">
				Fit-out, finishing and general construction for offices, hospitals, schools and resorts across Cebu and the
				Visayas since 2011.
			</p>
			<div class="actions">
				<a class="btn" href={cta.contact.href}>
					{cta.contact.label}
					<ArrowUpRight size={18} weight="light" aria-hidden="true" />
				</a>
				<a class="btn btn--ghost" href={cta.work.href}>{cta.work.label}</a>
			</div>
		</div>

		<figure class="hero-fig">
			<div class="frame parallax hero-frame" data-reveal="image" style:--d="150ms" {@attach reveal}>
				<div class="pl">
					<img
						src={stills.hero.src}
						srcset="{stills.hero.thumb} 640w, {stills.hero.src} {stills.hero.w}w"
						sizes="(min-width: 961px) 66vw, 100vw"
						width={stills.hero.w}
						height={stills.hero.h}
						alt={stills.hero.alt}
						fetchpriority="high"
					/>
				</div>
			</div>
			<figcaption class="meta">Maayo Stay Resort, San Remigio</figcaption>
		</figure>
	</div>
</section>

<!-- Intro -->
<section class="section wrap grid intro" aria-label="About CSL">
	<p class="statement" data-reveal="fade" {@attach reveal}>
		CSL began in 2011 supplying and installing blinds, carpet and vinyl in Mandaue. Today the same team delivers whole
		interiors, from partitions and ceilings to electrical, plumbing and the structure underneath.
	</p>
	<dl class="facts">
		<div data-reveal="fade" {@attach reveal}>
			<dt class="meta">Founded</dt>
			<dd>2011</dd>
		</div>
		<div data-reveal="fade" style:--d="90ms" {@attach reveal}>
			<dt class="meta">Clients</dt>
			<dd>{clientCount}</dd>
		</div>
		<div data-reveal="fade" style:--d="180ms" {@attach reveal}>
			<dt class="meta">Trades under one contract</dt>
			<dd>{disciplines.length}</dd>
		</div>
	</dl>
	<a class="link more" href="/about/">Our story</a>
</section>

<!-- Selected projects -->
<section class="section wrap work" aria-labelledby="work-title">
	<div class="work-head">
		<h2 id="work-title" class="h2" data-reveal="fade" {@attach reveal}>Selected projects</h2>
		<a class="link" href={cta.work.href}>{cta.work.label}</a>
	</div>
	<ProjectIndex items={featured} />
</section>

<!-- Services -->
<section class="section wrap grid services" aria-labelledby="svc-title">
	<div class="svc-intro">
		<h2 id="svc-title" class="h2" data-reveal="fade" {@attach reveal}>Six trades, one contract.</h2>
		<p class="lede" data-reveal="fade" style:--d="100ms" {@attach reveal}>
			Architectural, structural, plumbing, electrical, mechanical and auxiliary works, coordinated by one team from
			permit to handover.
		</p>
		<a class="link" href="/services/">All services</a>
	</div>

	<div class="acc">
		{#each disciplines as d, i (d.id)}
			<details name="discipline" data-reveal="fade" style:--d="{i * 60}ms" {@attach reveal}>
				<summary>
					<span class="acc-name">{d.name}</span>
					<span class="acc-icon" aria-hidden="true"><Plus size={22} weight="light" /></span>
				</summary>
				<div class="acc-body">
					<p class="muted">{d.summary}</p>
					<ul>
						{#each d.items as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			</details>
		{/each}
	</div>
</section>

<!-- Image pair -->
<section class="section wrap grid pair" aria-label="Healthcare and industrial work">
	<Img
		class="pair-a"
		photo={stills.atrium}
		ratio="4 / 3"
		parallax
		sizes="(min-width: 961px) 58vw, 100vw"
		caption="San Lucas Medical, Minglanilla. Hospital fit-out."
	/>
	<div class="pair-b">
		<p class="pair-text" data-reveal="fade" {@attach reveal}>
			Hospitals, universities, resorts and an international airport authority are among the clients we have built for.
		</p>
		<Img
			photo={stills.corridor}
			ratio="4 / 5"
			parallax
			delay={120}
			sizes="(min-width: 961px) 30vw, 100vw"
			caption="Taiyo Yuden, Mactan. Partitions, ceilings and finishes."
		/>
	</div>
</section>

<!-- Clients -->
<section class="section wrap clients" aria-labelledby="clients-title">
	<h2 id="clients-title" class="h2" data-reveal="fade" {@attach reveal}>Who we build for</h2>
	<div class="client-cols">
		{#each clientGroups as g, i (g.sector)}
			<div class="cg" data-reveal="fade" style:--d="{i * 70}ms" {@attach reveal}>
				<h3 class="meta">{g.sector}</h3>
				<ul>
					{#each g.names as name (name)}
						<li>{name}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<!-- Supply line -->
<section class="section wrap supply" aria-label="Products">
	<p class="supply-text" data-reveal="fade" {@attach reveal}>
		We still supply and install
		<a class="link" href="/products/#window">window blinds</a>,
		<a class="link" href="/products/#flooring">carpet tiles</a>,
		<a class="link" href="/products/#flooring">vinyl planks</a>,
		<a class="link" href="/products/#walls">acoustic ceilings</a>,
		<a class="link" href="/products/#walls">wallpaper</a> and
		<a class="link" href="/products/#doors">folding doors</a>, the lines we started with in 2011.
	</p>
</section>

<ContactBand />

<style>
	/* Hero */
	.hero {
		padding-top: clamp(32px, 5vw, 72px);
		padding-bottom: clamp(48px, 6vw, 96px);
	}
	.hero-title {
		max-width: 12.5em;
		margin-bottom: clamp(28px, 3.4vw, 52px);
	}
	.hero-body {
		align-items: end;
		row-gap: 32px;
	}
	.hero-copy {
		grid-column: 1 / span 4;
		display: grid;
		gap: 28px;
		padding-bottom: 34px;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}
	.hero-fig {
		grid-column: 5 / span 8;
		display: grid;
		gap: 12px;
	}
	.hero-frame {
		height: clamp(260px, 52svh, 600px);
	}
	.hero-frame img {
		object-position: 50% 30%;
	}

	/* Intro */
	.intro {
		row-gap: clamp(48px, 6vw, 88px);
	}
	.statement {
		grid-column: 3 / span 9;
		font-size: var(--step-3);
		font-weight: 380;
		line-height: 1.18;
		letter-spacing: -0.022em;
		text-wrap: pretty;
	}
	.facts {
		grid-column: 3 / span 9;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--col-gap);
	}
	.facts > div {
		border-top: 1px solid var(--line-strong);
		padding-top: 16px;
		display: grid;
		gap: 10px;
	}
	.facts dd {
		font-size: var(--step-4);
		font-weight: 520;
		font-stretch: 100%;
		letter-spacing: -0.04em;
		line-height: 1;
	}
	.more {
		grid-column: 3 / span 4;
		justify-self: start;
	}

	/* Work */
	.work-head {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: 24px;
		margin-bottom: clamp(32px, 4vw, 56px);
	}

	/* Services */
	.services {
		row-gap: 48px;
	}
	.svc-intro {
		grid-column: 1 / span 4;
		display: grid;
		align-content: start;
		gap: 24px;
		position: sticky;
		top: calc(var(--header-h) + 32px);
		align-self: start;
	}
	.svc-intro .link {
		justify-self: start;
	}
	.acc {
		grid-column: 6 / span 7;
		border-top: 1px solid var(--line);
	}
	details {
		border-bottom: 1px solid var(--line);
	}
	summary {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		padding-block: clamp(20px, 2.2vw, 30px);
		cursor: pointer;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	.acc-name {
		font-size: var(--step-2);
		font-weight: 500;
		letter-spacing: -0.02em;
		line-height: 1.1;
		transition: transform 0.5s var(--ease-out);
	}
	.acc-icon {
		transition: transform 0.5s var(--ease-out);
	}
	details[open] .acc-icon {
		transform: rotate(45deg);
		color: var(--accent);
	}
	@media (hover: hover) {
		summary:hover .acc-name {
			transform: translateX(8px);
		}
	}
	.acc-body {
		display: grid;
		gap: 18px;
		padding-bottom: 32px;
		max-width: 60ch;
	}
	.acc-body ul {
		columns: 2;
		column-gap: 32px;
	}
	.acc-body li {
		break-inside: avoid;
		padding-block: 4px;
	}
	@media (prefers-reduced-motion: no-preference) {
		details::details-content {
			block-size: 0;
			overflow: clip;
			transition:
				block-size 0.6s var(--ease-out),
				content-visibility 0.6s allow-discrete;
		}
		details[open]::details-content {
			block-size: auto;
		}
	}
	/* Pair */
	.pair {
		align-items: start;
		row-gap: 56px;
	}
	:global(.pair-a) {
		grid-column: 1 / span 7;
	}
	.pair-b {
		grid-column: 9 / span 4;
		display: grid;
		gap: clamp(40px, 6vw, 96px);
		padding-top: clamp(0px, 8vw, 140px);
	}
	.pair-text {
		font-size: var(--step-1);
		line-height: 1.45;
		max-width: 30ch;
	}

	/* Clients */
	.clients .h2 {
		margin-bottom: clamp(40px, 5vw, 72px);
	}
	.client-cols {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: var(--col-gap);
	}
	.cg {
		border-top: 1px solid var(--line-strong);
		padding-top: 16px;
		display: grid;
		align-content: start;
		gap: 18px;
	}
	.cg ul {
		display: grid;
		gap: 7px;
		font-size: 0.98rem;
		line-height: 1.35;
	}

	/* Supply */
	.supply-text {
		font-size: var(--step-3);
		font-weight: 380;
		line-height: 1.22;
		letter-spacing: -0.022em;
		max-width: 26em;
	}
	.supply-text .link {
		color: var(--ink);
		background-image: linear-gradient(var(--accent), var(--accent));
		background-size: 100% 2px;
	}
	@media (hover: hover) {
		.supply-text .link:hover {
			background-size: 0% 2px;
		}
	}

	/* Mobile collapse */
	@media (max-width: 1100px) {
		.client-cols {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			row-gap: 40px;
		}
	}
	@media (max-width: 960px) {
		.hero-copy,
		.hero-fig,
		.statement,
		.facts,
		.more,
		.svc-intro,
		.acc,
		:global(.pair-a),
		.pair-b {
			grid-column: 1 / -1;
		}
		.hero-copy {
			order: 2;
			padding-bottom: 0;
		}
		.hero-frame {
			height: auto;
			aspect-ratio: 4 / 3;
		}
		.svc-intro {
			position: static;
		}
		.pair-b {
			padding-top: 0;
		}
	}
	@media (max-width: 640px) {
		.facts {
			grid-template-columns: 1fr;
			row-gap: 28px;
		}
		.client-cols {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.acc-body ul {
			columns: 1;
		}
		.work-head {
			flex-direction: column;
			align-items: start;
		}
	}
</style>
