<script lang="ts">
	import { site, nav, cta } from '#lib/data/site.js';

	const year = new Date().getFullYear();
</script>

<footer class="foot on-brand">
	<div class="wrap">
		<div class="grid cols">
			<div class="id">
				<!-- Reversed lockup: the footer is always the navy brand block, in both themes. -->
				<img
					class="logo"
					src="/logo-reversed.svg"
					alt={site.legalName}
					width="2431"
					height="1778"
					loading="lazy"
					decoding="async"
				/>
				<p class="muted">Formerly {site.formerName}. Building in Cebu since {site.founded}.</p>
			</div>

			<div class="col">
				<h2 class="meta">Visit</h2>
				<address>
					{site.address.building}<br />
					{site.address.street}<br />
					{site.address.locality}<br />
					{site.address.postal} {site.address.region}
				</address>
				<a class="link" href={site.mapUrl} target="_blank" rel="noopener">Open in Maps</a>
			</div>

			<div class="col">
				<h2 class="meta">Call or write</h2>
				<ul>
					{#each site.phones as phone (phone.href)}
						<li><a class="link" href={phone.href}>{phone.display}</a></li>
					{/each}
					<li><a class="link" href="mailto:{site.email}">{site.email}</a></li>
					<li><a class="link" href={site.facebook} target="_blank" rel="noopener">Facebook</a></li>
				</ul>
			</div>

			<nav class="col" aria-label="Footer">
				<h2 class="meta">Pages</h2>
				<ul>
					{#each [...nav, cta.contact] as item (item.href)}
						<li><a class="link" href={item.href}>{item.label}</a></li>
					{/each}
				</ul>
			</nav>
		</div>

		<div class="base meta">
			<p>&copy; {year} {site.legalName}</p>
			<a class="link" href="#top">Back to top</a>
		</div>
	</div>
</footer>

<style>
	.foot {
		border-top: 1px solid var(--line);
		padding-top: clamp(56px, 7vw, 104px);
		padding-bottom: 28px;
	}
	.cols {
		row-gap: 48px;
	}
	.id {
		grid-column: 1 / span 4;
	}
	.logo {
		width: clamp(220px, 22vw, 320px);
		height: auto;
		margin-bottom: 28px;
	}
	.id p.muted {
		max-width: 36ch;
		font-size: 0.95rem;
	}
	.col {
		grid-column: span 2;
		display: grid;
		align-content: start;
		gap: 14px;
		font-size: 0.95rem;
	}
	.col:nth-child(2) {
		grid-column: 6 / span 2;
	}
	.col:nth-child(3) {
		grid-column: 8 / span 3;
	}
	.col:last-child {
		grid-column: 11 / span 2;
	}
	.col ul {
		display: grid;
		gap: 8px;
	}
	.col .link {
		justify-self: start;
	}
	address {
		font-style: normal;
	}
	.base {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		margin-top: clamp(56px, 7vw, 96px);
		padding-top: 20px;
		border-top: 1px solid var(--line);
	}

	@media (max-width: 1100px) {
		.id {
			grid-column: 1 / -1;
		}
		.col,
		.col:nth-child(2),
		.col:nth-child(3),
		.col:last-child {
			grid-column: span 4;
		}
	}
	@media (max-width: 640px) {
		.col,
		.col:nth-child(2),
		.col:nth-child(3),
		.col:last-child {
			grid-column: 1 / -1;
		}
		.base {
			flex-direction: column;
		}
	}
</style>
