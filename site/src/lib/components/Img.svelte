<script lang="ts">
	import type { Photo } from '#lib/data/projects.js';
	import { reveal } from '#lib/motion.js';

	type Props = {
		photo: Photo;
		/** CSS aspect-ratio for the frame. Defaults to the photo's own ratio. */
		ratio?: string;
		sizes?: string;
		eager?: boolean;
		/** Slow drift of the photo inside its frame, tied to scroll position (CSS only). */
		parallax?: boolean;
		/** Uncover the photo from the bottom when it enters the viewport. */
		animate?: boolean;
		delay?: number;
		caption?: string;
		/** view-transition-name, so the same photo can morph between pages. */
		vt?: string;
		class?: string;
	};

	let {
		photo,
		ratio,
		sizes = '(min-width: 1024px) 50vw, 100vw',
		eager = false,
		parallax = false,
		animate = true,
		delay = 0,
		caption,
		vt,
		class: cls = ''
	}: Props = $props();

	const frameRatio = $derived(ratio ?? `${photo.w} / ${photo.h}`);
</script>

<figure class={['fig', cls]}>
	<div
		class={['frame', parallax && 'parallax', vt && 'vt-photo']}
		style:aspect-ratio={frameRatio}
		style:--d={delay ? `${delay}ms` : undefined}
		style:view-transition-name={vt}
		data-reveal={animate ? 'image' : undefined}
		{@attach animate && reveal}
	>
		<div class="pl">
			<img
				src={photo.src}
				srcset="{photo.thumb} 640w, {photo.src} {photo.w}w"
				{sizes}
				width={photo.w}
				height={photo.h}
				alt={photo.alt}
				loading={eager ? 'eager' : 'lazy'}
				fetchpriority={eager ? 'high' : undefined}
				decoding="async"
			/>
		</div>
	</div>
	{#if caption}
		<figcaption class="meta">{caption}</figcaption>
	{/if}
</figure>

<style>
	.fig {
		display: grid;
		gap: 12px;
	}
	figcaption {
		max-width: 52ch;
	}
</style>
