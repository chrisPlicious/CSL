<script lang="ts">
	import '@fontsource-variable/archivo/wdth.css';
	import '@fontsource/ibm-plex-mono/400.css';
	import archivoLatin from '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2?url';
	import '../app.css';
	import Lenis from 'lenis';
	import { onMount } from 'svelte';
	import { onNavigate, afterNavigate } from '$app/navigation';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Loader from '#lib/components/Loader.svelte';
	import { smooth } from '#lib/motion.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Smooth scrolling, skipped entirely for visitors who prefer reduced motion.
	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: true });
		smooth.set(lenis);
		return () => {
			lenis.destroy();
			smooth.set(null);
		};
	});

	// Keep Lenis in step with SvelteKit's own scroll handling (top of page, or restored position on back).
	afterNavigate(() => {
		const lenis = smooth.get();
		if (!lenis) return;
		lenis.resize();
		lenis.scrollTo(window.scrollY, { immediate: true, force: true });
	});

	// Cross-document style page transition, where the browser supports it.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<!-- Headlines use this face at large sizes; preloading avoids a visible font swap on first paint. -->
	<link rel="preload" href={archivoLatin} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<Loader />
<div id="top"></div>
<Header />
<main id="main">
	{@render children()}
</main>
<Footer />
