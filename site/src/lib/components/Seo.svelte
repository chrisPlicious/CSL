<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/data/site.js';

	type Props = { title?: string; description?: string; image?: string };
	let { title, description = site.description, image = '/img/projects/maayo-san-remigio/04.webp' }: Props = $props();

	const fullTitle = $derived(title ? `${title} | ${site.name}` : `${site.name} | Fit-out and construction, Cebu`);
	const canonical = $derived(new URL(page.url.pathname, site.url).href);
	const ogImage = $derived(new URL(image, site.url).href);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
