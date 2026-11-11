<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHead from '#lib/components/PageHead.svelte';
	import { reveal } from '#lib/motion.js';
	import { site } from '#lib/data/site.js';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';

	const types = [
		'Office fit-out',
		'Healthcare',
		'School or institution',
		'Hotel or resort',
		'Industrial',
		'House or residential',
		'Supply and install (blinds, flooring, ceilings)',
		'Other'
	];

	let form = $state({ name: '', email: '', phone: '', type: '', location: '', message: '' });
	let errors = $state<Record<string, string>>({});
	let sent = $state(false);

	function validate() {
		const e: Record<string, string> = {};
		if (!form.name.trim()) e.name = 'Please enter your name.';
		if (!form.email.trim()) e.email = 'Please enter your email address.';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'That email address does not look right.';
		if (!form.message.trim()) e.message = 'Tell us a little about the project.';
		errors = e;
		return Object.keys(e).length === 0;
	}

	function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!validate()) {
			const first = Object.keys(errors)[0];
			document.getElementById(`f-${first}`)?.focus();
			return;
		}
		// Static site: hand the enquiry to the visitor's email app, pre-filled.
		// Swap this for a form endpoint (Formspree, Netlify Forms, etc.) once hosting is chosen.
		const subject = `Project enquiry${form.type ? `: ${form.type}` : ''}`;
		const lines = [`Name: ${form.name}`, `Email: ${form.email}`];
		if (form.phone) lines.push(`Phone: ${form.phone}`);
		if (form.type) lines.push(`Project type: ${form.type}`);
		if (form.location) lines.push(`Location: ${form.location}`);
		lines.push('', form.message);
		const body = lines.join('\n');
		window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		sent = true;
	}
</script>

<Seo
	title="Start a project"
	description="Contact CSL Interiors & Construction Services. CSL Building, Pajac-Maribago Road, Lapu-Lapu City, Cebu. (032) 268 6795."
/>

<PageHead lines={['Start a project']} lede="Tell us about the site, the scope and the timeline, and we will arrange a visit." />

<section class="wrap grid contact" aria-label="Contact details and form">
	<div class="details" data-reveal="fade" {@attach reveal}>
		<div class="block">
			<h2 class="meta">Call</h2>
			{#each site.phones as phone (phone.href)}
				<a class="big link" href={phone.href}>{phone.display}</a>
			{/each}
		</div>
		<div class="block">
			<h2 class="meta">Email</h2>
			<a class="link" href="mailto:{site.email}">{site.email}</a>
		</div>
		<div class="block">
			<h2 class="meta">Visit</h2>
			<address>
				{site.address.building}, {site.address.street}<br />
				{site.address.landmark}<br />
				{site.address.locality}, {site.address.postal} {site.address.region}
			</address>
			<a class="link" href={site.mapUrl} target="_blank" rel="noopener">Open in Maps</a>
		</div>
		<div class="block">
			<h2 class="meta">Follow</h2>
			<a class="link" href={site.facebook} target="_blank" rel="noopener">Facebook</a>
		</div>
	</div>

	<div class="form-col" data-reveal="fade" style:--d="120ms" {@attach reveal}>
		{#if sent}
			<div class="done" role="status">
				<h2 class="h3">Your email app should now be open.</h2>
				<p class="muted">
					The message is filled in and addressed to {site.email}. Press send there. If nothing opened, email us directly
					or call {site.phones[1].display}.
				</p>
				<button type="button" class="link" onclick={() => (sent = false)}>Edit the message</button>
			</div>
		{:else}
			<form novalidate {onsubmit}>
				<div class="row two">
					<div class="field">
						<label for="f-name">Name</label>
						<input id="f-name" name="name" autocomplete="name" bind:value={form.name} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} />
						{#if errors.name}<p class="err" id="e-name">{errors.name}</p>{/if}
					</div>
					<div class="field">
						<label for="f-email">Email</label>
						<input id="f-email" name="email" type="email" autocomplete="email" bind:value={form.email} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'e-email' : undefined} />
						{#if errors.email}<p class="err" id="e-email">{errors.email}</p>{/if}
					</div>
				</div>
				<div class="row two">
					<div class="field">
						<label for="f-phone">Phone <span class="opt">optional</span></label>
						<input id="f-phone" name="phone" type="tel" autocomplete="tel" bind:value={form.phone} />
					</div>
					<div class="field">
						<label for="f-location">Project location <span class="opt">optional</span></label>
						<input id="f-location" name="location" bind:value={form.location} />
					</div>
				</div>
				<div class="field">
					<label for="f-type">Project type <span class="opt">optional</span></label>
					<select id="f-type" name="type" bind:value={form.type}>
						<option value="">Choose one</option>
						{#each types as t (t)}
							<option value={t}>{t}</option>
						{/each}
					</select>
				</div>
				<div class="field">
					<label for="f-message">About the project</label>
					<textarea id="f-message" name="message" rows="6" bind:value={form.message} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'e-message' : 'h-message'}></textarea>
					{#if errors.message}
						<p class="err" id="e-message">{errors.message}</p>
					{:else}
						<p class="help" id="h-message">Floor area, current state of the site and target dates all help.</p>
					{/if}
				</div>
				<button class="btn submit" type="submit">
					Send enquiry
					<ArrowUpRight size={18} weight="light" aria-hidden="true" />
				</button>
			</form>
		{/if}
	</div>
</section>

<style>
	.contact {
		padding-bottom: var(--section);
		row-gap: 56px;
		align-items: start;
	}
	.details {
		grid-column: 1 / span 4;
		display: grid;
		gap: 36px;
	}
	.block {
		display: grid;
		gap: 10px;
		justify-items: start;
		border-top: 1px solid var(--line-strong);
		padding-top: 14px;
	}
	.big {
		font-size: var(--step-2);
		font-weight: 480;
		letter-spacing: -0.015em;
		line-height: 1.2;
	}
	address {
		font-style: normal;
	}

	.form-col {
		grid-column: 6 / span 7;
	}
	form {
		display: grid;
		gap: 28px;
	}
	.row.two {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--col-gap);
	}
	.field {
		display: grid;
		gap: 8px;
	}
	label {
		font-size: 0.95rem;
		color: var(--ink);
	}
	.opt {
		color: var(--ink-2);
		font-size: 0.85rem;
		margin-left: 6px;
	}
	input,
	select,
	textarea {
		width: 100%;
		background: transparent;
		border: 0;
		border-bottom: 1px solid var(--line-strong);
		border-radius: 0;
		padding: 10px 0 12px;
		font-size: var(--step-1);
		font-weight: 350;
		color: var(--ink);
		transition: border-color 0.3s var(--ease-out);
	}
	select {
		appearance: none;
		background-image: linear-gradient(45deg, transparent 50%, var(--ink-2) 50%),
			linear-gradient(135deg, var(--ink-2) 50%, transparent 50%);
		background-position:
			calc(100% - 12px) 55%,
			calc(100% - 7px) 55%;
		background-size: 5px 5px;
		background-repeat: no-repeat;
	}
	select option {
		background: var(--paper);
		color: var(--ink);
	}
	textarea {
		resize: vertical;
		min-height: 140px;
		line-height: 1.5;
	}
	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-bottom-color: var(--ink);
		box-shadow: 0 1px 0 0 var(--ink);
	}
	input:focus-visible,
	select:focus-visible,
	textarea:focus-visible {
		box-shadow: 0 2px 0 0 var(--accent);
		border-bottom-color: var(--accent);
	}
	[aria-invalid='true'] {
		border-bottom-color: var(--accent);
	}
	.err {
		color: var(--accent);
		font-size: 0.9rem;
	}
	.help {
		color: var(--ink-2);
		font-size: 0.9rem;
	}
	.submit {
		justify-self: start;
		margin-top: 8px;
	}
	.done {
		display: grid;
		gap: 18px;
		justify-items: start;
		border-top: 1px solid var(--line-strong);
		padding-top: 24px;
	}

	@media (max-width: 960px) {
		.details,
		.form-col {
			grid-column: 1 / -1;
		}
	}
	@media (max-width: 640px) {
		.row.two {
			grid-template-columns: 1fr;
			gap: 28px;
		}
	}
</style>
