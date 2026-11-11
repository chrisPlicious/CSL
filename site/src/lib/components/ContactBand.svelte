<script lang="ts">
	import { site, cta } from '#lib/data/site.js';
	import { reveal } from '#lib/motion.js';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';

	type Props = { heading?: string };
	let { heading = 'Have a floor plate, a drawing or a bare slab?' }: Props = $props();
</script>

<section class="band section on-brand" aria-labelledby="band-title">
	<div class="wrap grid">
		<h2 id="band-title" class="h2 title" data-reveal="fade" {@attach reveal}>{heading}</h2>
		<div class="side" data-reveal="fade" style:--d="120ms" {@attach reveal}>
			<p class="lede">Tell us about the site, the scope and the timeline, and we will arrange a visit.</p>
			<div class="actions">
				<a class="btn" href={cta.contact.href}>
					{cta.contact.label}
					<ArrowUpRight size={18} weight="light" aria-hidden="true" />
				</a>
				<a class="link phone" href={site.phones[1].href}>{site.phones[1].display}</a>
			</div>
		</div>
	</div>
</section>

<style>
	.title {
		grid-column: 1 / span 7;
		max-width: 14ch;
	}
	.side {
		grid-column: 9 / span 4;
		align-self: end;
		display: grid;
		gap: 28px;
	}
	.actions {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 24px;
	}
	.phone {
		font-size: 1.05rem;
	}
	@media (max-width: 960px) {
		.title,
		.side {
			grid-column: 1 / -1;
		}
		.side {
			margin-top: 36px;
		}
	}
</style>
