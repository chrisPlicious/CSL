export const site = {
	name: 'CSL Interiors & Construction Services',
	legalName: 'CSL Interiors and Construction Services, Inc.',
	formerName: 'CSL Interiors and Allied Services',
	founded: 2011,
	url: 'https://cslinteriors-construction.com.ph',
	description:
		'Cebu contractor for interior fit-out, finishing and general construction. Offices, hospitals, schools, resorts and homes across Cebu and the Visayas since 2011.',
	address: {
		building: 'CSL Building',
		street: 'Pajac-Maribago Road',
		landmark: 'Across Sacred Heart of Jesus Parish',
		locality: 'Pajac, Lapu-Lapu City',
		region: 'Cebu',
		postal: '6015'
	},
	mapUrl:
		'https://www.google.com/maps/search/?api=1&query=Sacred+Heart+of+Jesus+Parish+Pajac+Lapu-Lapu+City+Cebu',
	phones: [
		{ label: 'Office', display: '(032) 268 6795', href: 'tel:+63322686795' },
		{ label: 'Mobile', display: '0917 322 7314', href: 'tel:+639173227314' }
	],
	email: 'info@cslinteriors-construction.com.ph',
	facebook: 'https://www.facebook.com/cslinteriorsalliedservices'
} as const;

export const nav = [
	{ href: '/about/', label: 'About' },
	{ href: '/services/', label: 'Services' },
	{ href: '/projects/', label: 'Projects' },
	{ href: '/clients/', label: 'Clients' },
	{ href: '/products/', label: 'Products' }
] as const;

/** One label per intent, used everywhere on the site. */
export const cta = {
	contact: { href: '/contact/', label: 'Start a project' },
	work: { href: '/projects/', label: 'View projects' }
} as const;
