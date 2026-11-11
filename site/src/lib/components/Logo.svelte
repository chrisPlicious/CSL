<script lang="ts">
	import { logoMark as m } from '#lib/data/logo.js';

	type Props = {
		/** Accessible name. Leave out when the surrounding link already names it. */
		title?: string;
		class?: string;
	};
	let { title, class: className }: Props = $props();
</script>

<!--
	The CSL house mark. Colors come from --logo-red, --logo-blue and --logo-line, so it shows
	full color on the light page and turns its lines and letters light on navy (dark mode,
	.on-brand blocks) without a second file.
-->
<svg
	class={['logo', className]}
	viewBox="0 0 {m.width} {m.height}"
	style:aspect-ratio="{m.width} / {m.height}"
	role={title ? 'img' : undefined}
	aria-label={title}
	aria-hidden={title ? undefined : 'true'}
	focusable="false"
>
	<path class="r" d={m.red} />
	<path class="b" d={m.blue} />
	<path class="k" d={m.line} />
</svg>

<style>
	.logo {
		display: block;
		width: auto;
		overflow: visible;
	}
	path {
		fill-rule: evenodd;
		transition: fill 0.4s var(--ease-out);
	}
	.r {
		fill: var(--logo-red);
	}
	.b {
		fill: var(--logo-blue);
	}
	.k {
		fill: var(--logo-line);
	}
</style>
