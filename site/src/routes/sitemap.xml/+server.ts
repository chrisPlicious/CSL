import { site } from '#lib/data/site.js';
import { projects } from '#lib/data/projects.js';

export const prerender = true;

export function GET() {
	const paths = [
		'/',
		'/about/',
		'/services/',
		'/projects/',
		...projects.map((p) => `/projects/${p.slug}/`),
		'/clients/',
		'/products/',
		'/contact/'
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `\t<url><loc>${site.url}${p}</loc></url>`).join('\n')}
</urlset>`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
