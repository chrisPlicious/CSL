import { error } from '@sveltejs/kit';
import { projects, getProject } from '#lib/data/projects.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const project = getProject(params.slug);
	if (!project) error(404, 'Project not found');
	const index = projects.indexOf(project);
	const next = projects[(index + 1) % projects.length];
	return { project, next };
};
