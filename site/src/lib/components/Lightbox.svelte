<script lang="ts">
	import type { Photo } from '#lib/data/projects.js';
	import { smooth } from '#lib/motion.js';
	import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import X from 'phosphor-svelte/lib/X';
	import type { Attachment } from 'svelte/attachments';

	type Props = { photos: Photo[]; index: number | null; onclose: () => void; onmove: (i: number) => void };
	let { photos, index, onclose, onmove }: Props = $props();

	const current = $derived(index === null ? null : photos[index]);

	/** Opens or closes the native dialog whenever `index` changes. */
	const sync: Attachment<HTMLDialogElement> = (node) => {
		const shouldOpen = index !== null;
		if (shouldOpen && !node.open) {
			node.showModal();
			smooth.get()?.stop();
		} else if (!shouldOpen && node.open) {
			node.close();
		}
	};

	function step(dir: number) {
		if (index === null) return;
		onmove((index + dir + photos.length) % photos.length);
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') step(1);
		if (event.key === 'ArrowLeft') step(-1);
	}

	function handleClose() {
		smooth.get()?.start();
		onclose();
	}
</script>

<dialog {@attach sync} class="lb" aria-label="Photo viewer" data-lenis-prevent {onkeydown} onclose={handleClose}>
	{#if current && index !== null}
		<div class="lb-top">
			<p class="meta">{index + 1} of {photos.length}</p>
			<button type="button" class="lb-btn" onclick={onclose} aria-label="Close">
				<X size={22} weight="light" />
			</button>
		</div>
		<figure class="lb-fig">
			{#key current.src}
				<img src={current.src} alt={current.alt} width={current.w} height={current.h} />
			{/key}
		</figure>
		<div class="lb-nav">
			<button type="button" class="lb-btn" onclick={() => step(-1)} aria-label="Previous photo">
				<ArrowLeft size={22} weight="light" />
			</button>
			<button type="button" class="lb-btn" onclick={() => step(1)} aria-label="Next photo">
				<ArrowRight size={22} weight="light" />
			</button>
		</div>
	{/if}
</dialog>

<style>
	.lb {
		width: 100vw;
		height: 100dvh;
		max-width: none;
		max-height: none;
		margin: 0;
		padding: 0;
		border: 0;
		background: var(--paper);
		color: var(--ink);
		display: none;
	}
	.lb[open] {
		display: grid;
		grid-template-rows: auto minmax(0, 1fr) auto;
	}
	.lb::backdrop {
		background: var(--paper);
	}
	.lb-top,
	.lb-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 14px var(--gutter);
	}
	.lb-nav {
		justify-content: center;
		gap: 12px;
		padding-bottom: 20px;
	}
	.lb-fig {
		min-height: 0;
		display: grid;
		place-items: center;
		padding-inline: var(--gutter);
	}
	.lb-fig img {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
	}
	.lb-btn {
		display: inline-grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border: 1px solid var(--line-strong);
		transition:
			background-color 0.3s var(--ease-out),
			color 0.3s var(--ease-out);
	}
	@media (hover: hover) {
		.lb-btn:hover {
			background: var(--ink);
			color: var(--on-ink);
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.lb[open] {
			animation: lb-in 0.5s var(--ease-out);
		}
		.lb-fig img {
			animation: lb-img 0.6s var(--ease-out);
		}
		@keyframes lb-in {
			from {
				opacity: 0;
			}
		}
		@keyframes lb-img {
			from {
				opacity: 0;
				transform: scale(0.985);
			}
		}
	}
</style>
