import type { Attachment } from 'svelte/attachments';
import type Lenis from 'lenis';

/**
 * First-visit loader state. The inline script in app.html puts `has-loader` on <html>
 * before first paint; Loader.svelte calls `finish()` the moment its curtain starts to lift.
 * Reveals wait for that, so the hero animates in as the page is uncovered instead of
 * playing out unseen behind the loader.
 */
const LOADER_END = 'csl:loader-end';
let loaderFinished = false;

export const loader = {
	get pending() {
		return (
			!loaderFinished &&
			typeof document !== 'undefined' &&
			document.documentElement.classList.contains('has-loader')
		);
	},
	finish() {
		if (loaderFinished) return;
		loaderFinished = true;
		window.dispatchEvent(new Event(LOADER_END));
	}
};

/**
 * Reveal-on-enter. The element carries `data-reveal="fade|image|lines"` in its markup
 * (so the hidden state is in the prerendered HTML and nothing flashes on hydration);
 * this attachment only flips `.is-in` once the element enters the viewport.
 * CSS does the motion, and skips it entirely under prefers-reduced-motion.
 *
 * Image reveals start fully clipped (`clip-path: inset(100% 0 0 0)`), and Chrome's
 * IntersectionObserver treats a fully clipped target as not intersecting. So for those
 * we observe the unclipped parent instead.
 */
export const reveal: Attachment<HTMLElement> = (node) => {
	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('is-in');
		return;
	}
	const target = node.dataset.reveal === 'image' && node.parentElement ? node.parentElement : node;
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-in');
					io.disconnect();
				}
			}
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
	);
	if (!loader.pending) {
		io.observe(target);
		return () => io.disconnect();
	}
	const start = () => io.observe(target);
	window.addEventListener(LOADER_END, start, { once: true });
	return () => {
		window.removeEventListener(LOADER_END, start);
		io.disconnect();
	};
};

/**
 * Tag the photo the visitor just clicked so the View Transition morphs it into the
 * project page cover (which always carries `p-{slug}`). Only the clicked photo is tagged,
 * so nothing flies off-screen on other navigations.
 */
export function morphFrom(el: Element | null | undefined, slug: string) {
	if (!(el instanceof HTMLElement)) return;
	el.style.setProperty('view-transition-name', `p-${slug}`);
	el.classList.add('vt-photo');
}

type ScrollInfo = { scroll: number; direction: number };
type ScrollListener = (info: ScrollInfo) => void;

/**
 * Shared handle to the Lenis instance (created in the root layout) so other components
 * can pause scrolling or follow scroll position without adding their own window listeners.
 */
let instance: Lenis | null = null;
const listeners = new Set<ScrollListener>();

export const smooth = {
	set(l: Lenis | null) {
		instance = l;
		l?.on('scroll', (e: Lenis) => {
			const info = { scroll: e.scroll, direction: e.direction };
			for (const fn of listeners) fn(info);
		});
	},
	get() {
		return instance;
	},
	/** Subscribe to Lenis scroll updates. Returns an unsubscribe function. */
	onScroll(fn: ScrollListener) {
		listeners.add(fn);
		return () => listeners.delete(fn);
	}
};
