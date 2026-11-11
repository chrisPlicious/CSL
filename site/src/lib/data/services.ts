export type Discipline = { id: string; name: string; summary: string; items: string[] };

export const disciplines: Discipline[] = [
	{
		id: 'architectural',
		name: 'Architectural works',
		summary: 'Partitions, ceilings, floors, carpentry, waterproofing and every finish in between.',
		items: [
			'Design, layout and permit processing',
			'Acoustic and fixed ceilings',
			'Drywall partitions',
			'Finishing carpentry',
			'Interior and exterior paint finishes',
			'Ceramic tiles, vinyl tiles and carpet tiles',
			'Waterproofing',
			'Soundproofing',
			'Welding works and finishes'
		]
	},
	{
		id: 'structural',
		name: 'Masonry and structural works',
		summary: 'Ground and structure: earthworks, concrete, blockwork and site works.',
		items: [
			'Earthworks',
			'Concreting and reinforcement',
			'CHB laying with plastering',
			'AAC blockwork with skim coat',
			'Road concreting',
			'Riprap works'
		]
	},
	{
		id: 'plumbing',
		name: 'Plumbing works',
		summary: 'Water supply, drainage and fixtures, designed, permitted, installed and tested.',
		items: [
			'Design, layout and permit processing',
			'Water supply systems',
			'Drainage and waste removal systems',
			'Toilet fixtures and accessories',
			'Testing and commissioning'
		]
	},
	{
		id: 'electrical',
		name: 'Electrical works',
		summary: 'Power and lighting from rough-ins to commissioning, with maintenance after handover.',
		items: [
			'Design, layout and permit processing',
			'Rough-ins, wiring and conduits',
			'Electrical devices',
			'Power distribution',
			'Switchboards and circuit breakers',
			'Grounding and lighting',
			'Testing and commissioning',
			'Maintenance and repairs'
		]
	},
	{
		id: 'mechanical',
		name: 'Mechanical works',
		summary: 'Air-conditioning, ventilation and fire protection systems.',
		items: [
			'Design, layout and permit processing',
			'HVAC systems',
			'Fire protection systems',
			'Testing and commissioning',
			'Maintenance and repairs'
		]
	},
	{
		id: 'auxiliary',
		name: 'Auxiliary works',
		summary: 'CCTV and telephone systems, installed and maintained.',
		items: [
			'Design, layout and permit processing',
			'Closed-circuit television (CCTV)',
			'Private branch exchange (PABX)',
			'Testing and commissioning',
			'Maintenance and repairs'
		]
	}
];

export const projectTypes = [
	'Office fit-out',
	'Commercial spaces',
	'Healthcare facilities',
	'Schools and universities',
	'Resorts and hotels',
	'Industrial plants',
	'Homes and subdivisions'
];
