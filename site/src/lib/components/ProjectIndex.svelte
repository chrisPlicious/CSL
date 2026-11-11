<script lang="ts">
	import type { Project } from '#lib/data/projects.js';
	import { reveal, morphFrom } from '#lib/motion.js';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';

	type Props = { items: Project[] };
	let { items }: Props = $props();

	let active = $state(0);
	let hovering = $state(false);

	/** Morph from the large preview on desktop, or from the row thumbnail on small screens. */
	function tag(event: MouseEvent, i: number, slug: string) {
		const row = event.currentTarget as HTMLElement;
		const preview = row.closest('.pi')?.querySelectorAll<HTMLElement>('.stage img')[i];
		morphFrom(preview && preview.offsetParent !== null ? preview : row.querySelector('.thumb'), slug);
	}
</script>

<div class="pi grid">
	<ul
		class={['rows', hovering && 'is-hovering']}
		onmouseenter={() => (hovering = true)}
		onmouseleave={() => (hovering = false)}
	>
		{#each items as p, i (p.slug)}
			<li data-reveal="fade" style:--d="{i * 70}ms" {@attach reveal}>
				<a
					href="/projects/{p.slug}/"
					class={['row', active === i && 'is-active']}
					onmouseenter={() => (active = i)}
					onfocus={() => (active = i)}
					onclick={(e) => tag(e, i, p.slug)}
				>
					<span class="thumb frame">
						<img src={p.cover.thumb} alt="" width={p.cover.w} height={p.cover.h} loading="lazy" decoding="async" />
					</span>
					<span class="name">{p.name}</span>
					<span class="meta sector">{p.sector}</span>
					<span class="meta loc">{p.location}</span>
					<span class="go" aria-hidden="true"><ArrowUpRight size={22} weight="light" /></span>
				</a>
			</li>
		{/each}
	</ul>

	<div class="preview" aria-hidden="true">
		<div class="stage frame">
			{#each items as p, i (p.slug)}
				<img
					class={[active === i && 'is-on']}
					src={p.cover.src}
					alt=""
					width={p.cover.w}
					height={p.cover.h}
					loading="lazy"
					decoding="async"
				/>
			{/each}
		</div>
		<p class="meta caption">{items[active].summary}</p>
	</div>
</div>

<style>
	.pi {
		align-items: start;
	}
	.rows {
		grid-column: 1 / span 7;
		border-top: 1px solid var(--line);
	}
	.row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 7.5rem minmax(0, 12rem) 28px;
		align-items: baseline;
		gap: 20px;
		padding-block: clamp(18px, 2vw, 28px);
		border-bottom: 1px solid var(--line);
		transition: color 0.45s var(--ease-out);
	}
	.thumb {
		display: none;
	}
	.name {
		font-size: var(--step-2);
		font-weight: 500;
		letter-spacing: -0.02em;
		line-height: 1.1;
		transition: transform 0.6s var(--ease-out);
	}
	.go {
		align-self: center;
		opacity: 0;
		transform: translate(-6px, 6px);
		transition:
			opacity 0.4s var(--ease-out),
			transform 0.5s var(--ease-out);
		color: var(--accent);
	}
	@media (hover: hover) {
		.is-hovering .row {
			color: var(--ink-3);
		}
		.is-hovering .row.is-active {
			color: var(--ink);
		}
		.is-hovering .row.is-active .name {
			transform: translateX(10px);
		}
		.is-hovering .row.is-active .go,
		.row:focus-visible .go {
			opacity: 1;
			transform: none;
		}
	}

	.preview {
		grid-column: 9 / span 4;
		position: sticky;
		top: calc(var(--header-h) + 32px);
		display: grid;
		gap: 14px;
	}
	.stage {
		aspect-ratio: 4 / 5;
	}
	.stage img {
		position: absolute;
		inset: 0;
		opacity: 0;
		transform: scale(1.06);
		transition:
			opacity 0.7s var(--ease-out),
			transform 1.2s var(--ease-out);
	}
	.stage img.is-on {
		opacity: 1;
		transform: none;
	}
	.caption {
		min-height: 3em;
	}

	@media (max-width: 960px) {
		.rows {
			grid-column: 1 / -1;
		}
		.preview {
			display: none;
		}
		.row {
			grid-template-columns: 88px minmax(0, 1fr);
			grid-template-areas:
				'thumb name'
				'thumb sector'
				'thumb loc';
			column-gap: 16px;
			row-gap: 2px;
			align-items: start;
		}
		.thumb {
			display: block;
			grid-area: thumb;
			aspect-ratio: 1;
		}
		.name {
			grid-area: name;
		}
		.sector {
			grid-area: sector;
		}
		.loc {
			grid-area: loc;
		}
		.go {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.stage img,
		.name,
		.go {
			transition: none;
		}
	}
</style>
