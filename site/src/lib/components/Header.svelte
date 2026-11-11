<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { nav, cta } from '#lib/data/site.js';
	import { smooth } from '#lib/motion.js';
	import Logo from '#lib/components/Logo.svelte';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';

	let open = $state(false);
	/** Header slides away while reading down the page and returns on any scroll up. */
	let tucked = $state(false);
	let scrolled = $state(false);

	onMount(() =>
		smooth.onScroll(({ scroll, direction }) => {
			scrolled = scroll > 8;
			if (open) return;
			if (direction === 1 && scroll > 320) tucked = true;
			else if (direction === -1 || scroll <= 320) tucked = false;
		})
	);

	const isCurrent = (href: string) => page.url.pathname.startsWith(href);

	function setOpen(value: boolean) {
		open = value;
		document.documentElement.classList.toggle('menu-open', value);
		const lenis = smooth.get();
		if (value) lenis?.stop();
		else lenis?.start();
	}

	afterNavigate(() => {
		if (open) setOpen(false);
		tucked = false;
	});

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) setOpen(false);
	}
</script>

<svelte:window {onkeydown} />

<a class="skip" href="#main">Skip to content</a>

<header class={['bar', tucked && 'is-tucked', scrolled && 'is-scrolled', open && 'on-brand']} onfocusin={() => (tucked = false)}>
	<div class="wrap inner">
		<a class="mark" href="/" aria-label="CSL Interiors and Construction Services, home">
			<Logo class="mark-logo" />
			<span class="mark-sub" aria-hidden="true">Interiors &amp;<br />Construction</span>
		</a>

		<nav class="links" aria-label="Primary">
			<ul>
				{#each nav as item (item.href)}
					<li>
						<a href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>{item.label}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<a class="btn btn--sm cta" href={cta.contact.href}>
			{cta.contact.label}
			<ArrowUpRight size={16} weight="light" aria-hidden="true" />
		</a>

		<button
			class="toggle"
			type="button"
			aria-expanded={open}
			aria-controls="menu"
			onclick={() => setOpen(!open)}
		>
			{open ? 'Close' : 'Menu'}
		</button>
	</div>
</header>

<div id="menu" class={['menu', 'on-brand', open && 'is-open']} inert={!open} aria-label="Menu">
	<nav class="wrap" aria-label="Mobile">
		<ul>
			{#each [...nav, cta.contact] as item, i (item.href)}
				<li style:--i={i}>
					<a href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>{item.label}</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<style>
	.skip {
		position: fixed;
		top: 8px;
		left: 8px;
		z-index: 100;
		padding: 10px 14px;
		background: var(--ink);
		color: var(--on-ink);
		transform: translateY(-160%);
		transition: transform 0.3s var(--ease-out);
	}
	.skip:focus {
		transform: none;
	}

	.bar {
		position: sticky;
		top: 0;
		z-index: 50;
		height: var(--header-h);
		background: color-mix(in srgb, var(--paper) 86%, transparent);
		backdrop-filter: blur(14px) saturate(140%);
		-webkit-backdrop-filter: blur(14px) saturate(140%);
		box-shadow: inset 0 -1px 0 transparent;
		transition:
			transform 0.6s var(--ease-in-out),
			box-shadow 0.4s var(--ease-out);
	}
	.bar.is-scrolled {
		box-shadow: inset 0 -1px 0 var(--line);
	}
	.bar.is-tucked {
		transform: translate3d(0, -100%, 0);
	}
	@media (prefers-reduced-motion: reduce) {
		.bar {
			transition: none;
		}
	}
	.inner {
		height: 100%;
		display: flex;
		align-items: center;
		gap: clamp(16px, 3vw, 48px);
	}

	.mark {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-right: auto;
		position: relative;
		z-index: 2;
	}
	.mark :global(.mark-logo) {
		height: 44px;
	}
	.mark-sub {
		font-size: 0.66rem;
		line-height: 1.15;
		letter-spacing: 0.01em;
		color: var(--ink-2);
		padding-left: 12px;
		border-left: 1px solid var(--line-strong);
	}
	@media (max-width: 640px) {
		.mark :global(.mark-logo) {
			height: 38px;
		}
	}

	.links ul {
		display: flex;
		gap: clamp(18px, 2.2vw, 36px);
	}
	.links a {
		position: relative;
		font-size: 0.95rem;
		padding-block: 6px;
		color: var(--ink-2);
		transition: color 0.3s var(--ease-out);
	}
	.links a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		background: var(--accent);
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.5s var(--ease-out);
	}
	.links a:hover,
	.links a[aria-current='page'] {
		color: var(--ink);
	}
	.links a:hover::after,
	.links a[aria-current='page']::after {
		transform: scaleX(1);
		transform-origin: left;
	}

	.btn--sm {
		height: 42px;
		padding-inline: 16px;
		font-size: 0.9rem;
	}

	.toggle {
		display: none;
		position: relative;
		z-index: 2;
		height: 42px;
		padding-inline: 16px;
		border: 1px solid var(--line-strong);
		font-size: 0.9rem;
	}

	.menu {
		position: fixed;
		inset: 0;
		z-index: 40;
		background: var(--paper);
		padding-top: calc(var(--header-h) + 24px);
		visibility: hidden;
		clip-path: inset(0 0 100% 0);
		transition:
			clip-path 0.7s var(--ease-in-out),
			visibility 0s linear 0.7s;
	}
	.menu.is-open {
		visibility: visible;
		clip-path: inset(0 0 0 0);
		transition:
			clip-path 0.7s var(--ease-in-out),
			visibility 0s;
	}
	.menu ul {
		display: grid;
		gap: 4px;
	}
	.menu li {
		overflow: hidden;
		border-bottom: 1px solid var(--line);
	}
	.menu a {
		display: block;
		padding-block: 14px;
		font-size: clamp(2rem, 9vw, 3.2rem);
		font-weight: 520;
		font-stretch: 100%;
		letter-spacing: -0.03em;
		line-height: 1.05;
		transform: translateY(100%);
		transition: transform 0.8s var(--ease-out);
		transition-delay: calc(0.15s + var(--i) * 0.05s);
	}
	.menu.is-open a {
		transform: none;
	}
	.menu a[aria-current='page'] {
		color: var(--accent);
	}

	@media (max-width: 960px) {
		.links,
		.cta {
			display: none;
		}
		.toggle {
			display: inline-flex;
			align-items: center;
		}
	}
	@media (min-width: 961px) {
		.menu {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.menu,
		.menu.is-open,
		.menu a {
			transition: none;
		}
	}
</style>
