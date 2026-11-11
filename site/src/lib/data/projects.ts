import dims from './images.json';

export type Sector = 'Healthcare' | 'Industrial' | 'Office' | 'Hospitality' | 'Education' | 'Residential';

export type Photo = { src: string; thumb: string; w: number; h: number; alt: string };

export type Project = {
	slug: string;
	name: string;
	client: string;
	location: string;
	sector: Sector;
	summary: string;
	scope: string[];
	cover: Photo;
	photos: Photo[];
};

type Raw = Omit<Project, 'cover' | 'photos'> & { cover: number; coverAlt: string };

const raw: Raw[] = [
	{
		slug: 'san-lucas-medical',
		name: 'San Lucas Medical',
		client: 'San Lucas Medical',
		location: 'Minglanilla, Cebu',
		sector: 'Healthcare',
		summary:
			'Hospital fit-out across birthing, laboratory, dialysis, ward, private room and clinic areas.',
		scope: [
			'Fit-out of birthing, laboratory, dialysis, ward, private room and clinic areas',
			'Raised floor framed in angle bar',
			'Ceramic floor and wall tiles',
			'Vinyl tiles',
			'Drywall partitions',
			'Polyurethane and cementitious waterproofing',
			'Fixed and acoustic ceilings',
			'Interior and exterior paint finishes'
		],
		cover: 3,
		coverAlt: 'Curved three-storey wing of San Lucas Medical in Minglanilla'
	},
	{
		slug: 'taiyo-yuden',
		name: 'Taiyo Yuden',
		client: 'Taiyo Yuden',
		location: 'Cebu Light Industrial Park, Mactan',
		sector: 'Industrial',
		summary:
			'Interior works for an electronics plant: production floors, partitions, ceilings, insulation and finishes.',
		scope: [
			'Traffic paint application',
			'Fixed and acoustic ceilings',
			'Ceramic and vinyl tiles',
			'Wheel guard fabrication',
			'Waterproofing',
			'Secondary framing',
			'Drywall',
			'Rockwool insulation',
			'Interior painting',
			'Exterior painting in selected areas'
		],
		cover: 2,
		coverAlt: 'Long white production hall with acoustic ceiling at Taiyo Yuden, Mactan'
	},
	{
		slug: 'uspf-technology-hub',
		name: 'USPF Technology Hub',
		client: 'University of Southern Philippines Foundation',
		location: 'Lahug, Cebu City',
		sector: 'Education',
		summary:
			'Design and build of the College of Engineering and Architecture technology hub: glass-walled laboratories, corridors and lecture halls.',
		scope: [
			'Design and build',
			'Demolition',
			'Drywall, supply and installation',
			'Interior and exterior painting',
			'Flush hollow-core wooden doors, paint finish',
			'Glass and windows',
			'Electrical fixtures',
			'Custom wooden folding door'
		],
		cover: 21,
		coverAlt: 'Long corridor with grey doors and polished concrete floor at the USPF technology hub'
	},
	{
		slug: 'maayo-stay-san-remigio',
		name: 'Maayo Stay San Remigio',
		client: 'Maayo',
		location: 'San Remigio, Cebu',
		sector: 'Hospitality',
		summary:
			'Beachfront resort works: open pavilions, guest blocks, gazebos and poolside buildings.',
		scope: [
			'Earthworks',
			'Structural and masonry works',
			'AAC blockwork with skim coat',
			'Polyurethane and cementitious waterproofing',
			'Ceramic and vinyl tiles',
			'Drywall partitions and fixed ceilings',
			'Styro and rockwool soundproofing',
			'Roof framing and roofing',
			'Toilet renovation',
			'Retrofitting',
			'Interior and exterior paint finishes'
		],
		cover: 4,
		coverAlt: 'Open-sided resort pavilion with a white timber roof at Maayo Stay San Remigio'
	},
	{
		slug: 'paramount-life',
		name: 'Paramount Life & General Insurance',
		client: 'Paramount Life & General Insurance Corp.',
		location: 'Cebu Business Park, Cebu City',
		sector: 'Office',
		summary:
			'Design-and-build branch office with a glazed street frontage, meeting rooms and full MEPF.',
		scope: [
			'Design and build',
			'Design and permit processing',
			'Drywall',
			'Fixed and acoustic ceilings',
			'Ceramic tiles',
			'Vinyl planks',
			'Flush hollow-core wooden doors, paint finish',
			'Finishing carpentry',
			'MEPF works',
			'Glass works, supply and installation',
			'Interior and exterior painting'
		],
		cover: 9,
		coverAlt: 'Office with full-height glazing and timber-look vinyl floor at Paramount Life, Cebu Business Park'
	},
	{
		slug: 'pueblo-de-oro',
		name: 'Pueblo de Oro Residences',
		client: 'Pueblo de Oro Development Corporation',
		location: 'Babag, Lapu-Lapu City',
		sector: 'Residential',
		summary:
			'Two-storey homes built from the ground up, from earthworks and structure to stairs, kitchens and finishes.',
		scope: [
			'Earthworks',
			'Structural and masonry works',
			'CHB laying and plastering',
			'Roof framing and roofing',
			'Electrical fixtures',
			'Plumbing and toilet fixtures',
			'Drywall partitions and ceilings',
			'Solid and hollow-core wooden doors, paint finish',
			'Mahogany wood planks',
			'Glass and windows',
			'Ceramic floor and wall tiles',
			'Vinyl tiles',
			'Kitchen sink with granite countertop',
			'Interior and exterior paint finishes'
		],
		cover: 1,
		coverAlt: 'Finished two-storey house with timber-look cladding at Pueblo de Oro, Babag'
	},
	{
		slug: 'call-center-i2',
		name: 'Call Centre, i2 Building',
		client: 'Call Center tenant',
		location: 'IT Park, Lahug, Cebu City',
		sector: 'Office',
		summary:
			'Refurbishment of a working call center: ceilings, carpet tiles, doors, cabinets and blinds.',
		scope: [
			'Removal of damaged walls and ceilings',
			'Acoustic ceilings',
			'Carpet tiles',
			'Repair of laminate-finish doors',
			'Repair of existing cabinets',
			'Roller blinds',
			'Vinyl tiles',
			'Interior paint finishes'
		],
		cover: 18,
		coverAlt: 'Rows of blue workstations on carpet tiles in the i2 Building call center'
	},
	{
		slug: 'call-center-i3',
		name: 'Call Centre, i3 Building',
		client: 'Call Center tenant',
		location: 'IT Park, Lahug, Cebu City',
		sector: 'Office',
		summary:
			'Strip-out and refit of an open-plan floor with new ceilings, carpet tiles and renovated toilets.',
		scope: [
			'Removal of existing ceilings and partitions',
			'Flush hollow-core doors, paint finish',
			'Torch-applied membrane waterproofing',
			'Acoustic and fixed ceilings',
			'Male and female toilet renovation',
			'Compact phenolic boards',
			'Carpet tiles',
			'Cladding of spider-web trusses, paint finish',
			'Interior paint finishes'
		],
		cover: 5,
		coverAlt: 'Open-plan floor with grey carpet tiles and white columns in the i3 Building'
	},
	{
		slug: 'ima-office',
		name: 'IMA Office',
		client: 'IMA',
		location: 'Osmeña Boulevard, Cebu City',
		sector: 'Office',
		summary:
			'Office fit-out from bare shell: partitions, glazing, ceilings, flooring and building services.',
		scope: [
			'Design and build',
			'Building permit processing',
			'Wall demolition',
			'Drywall',
			'Rockwool insulation',
			'Tempered glass, supply and installation',
			'Transfer and reinstallation of glass panels',
			'Acoustic ceilings',
			'Vinyl planks',
			'Electrical, mechanical and auxiliary works',
			'Ceiling and paint finishes'
		],
		cover: 2,
		coverAlt: 'Workroom with timber slat feature wall and acoustic ceiling at the IMA office'
	},
	{
		slug: 'maayo-stay-argao',
		name: 'Maayo Stay Argao',
		client: 'Maayo',
		location: 'Argao, Cebu',
		sector: 'Hospitality',
		summary: 'Guest rooms, restaurant and lounge for a resort in southern Cebu.',
		scope: [
			'Earthworks',
			'Structural and masonry works',
			'Drywall partitions and fixed ceilings',
			'Ceramic and vinyl tiles',
			'Canopy',
			'Brick and stone cladding',
			'Kitchen repair',
			'Polyurethane and cementitious waterproofing',
			'LPC shelving',
			'Finishing carpentry, doors and windows',
			'Interior and exterior paint finishes'
		],
		cover: 9,
		coverAlt: 'Resort lounge with striped timber feature wall at Maayo Stay Argao'
	},
	{
		slug: 'maayo-stay-mandaue',
		name: 'Maayo Hotel Cafeteria',
		client: 'Maayo',
		location: 'Mandaue City, Cebu',
		sector: 'Hospitality',
		summary: 'Finishing works for a hotel cafeteria.',
		scope: [
			'Ceramic tiles',
			'Chinese bamboo',
			'French doors and false windows',
			'Interior and exterior paint finishes'
		],
		cover: 1,
		coverAlt: 'Hotel cafeteria with high open ceiling and coloured chairs in Mandaue City'
	}
];

/** Folder names on disk come from the original site's project order. */
const folder: Record<string, string> = {
	'san-lucas-medical': 'san-lucas-medical',
	'taiyo-yuden': 'taiyo-yuden',
	'uspf-technology-hub': 'uspf',
	'maayo-stay-san-remigio': 'maayo-san-remigio',
	'paramount-life': 'paramount-life',
	'pueblo-de-oro': 'pueblo-de-oro',
	'call-center-i2': 'i2-call-center',
	'call-center-i3': 'i3-call-center',
	'ima-office': 'ima-office',
	'maayo-stay-argao': 'maayo-argao',
	'maayo-stay-mandaue': 'maayo-mandaue'
};

const sizes = dims as unknown as Record<string, [number, number][]>;

function photo(dir: string, n: number, alt: string): Photo {
	const id = String(n).padStart(2, '0');
	const [w, h] = sizes[dir][n - 1];
	return { src: `/img/projects/${dir}/${id}.webp`, thumb: `/img/projects/${dir}/${id}-s.webp`, w, h, alt };
}

export const projects: Project[] = raw.map(({ cover, coverAlt, ...p }) => {
	const dir = folder[p.slug];
	const count = sizes[dir].length;
	return {
		...p,
		cover: photo(dir, cover, coverAlt),
		photos: Array.from({ length: count }, (_, i) =>
			photo(dir, i + 1, `${p.name}, ${p.location}. Site photo ${i + 1} of ${count}.`)
		)
	};
});

export const sectors: Sector[] = ['Healthcare', 'Education', 'Hospitality', 'Office', 'Industrial', 'Residential'];

export const featured = ['san-lucas-medical', 'taiyo-yuden', 'uspf-technology-hub', 'maayo-stay-san-remigio', 'paramount-life', 'pueblo-de-oro']
	.map((s) => projects.find((p) => p.slug === s)!)
	.filter(Boolean);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const photoCount = projects.reduce((n, p) => n + p.photos.length, 0);

/** Extra photos used outside project pages. */
export const stills = {
	/** Cropped from maayo-san-remigio/04 to drop two people standing at the left edge. */
	hero: {
		src: '/img/hero.webp',
		thumb: '/img/hero-s.webp',
		w: 920,
		h: 800,
		alt: 'Open-sided pavilion with a white timber roof at Maayo Stay Resort, San Remigio'
	} satisfies Photo,
	gazebo: photo('maayo-san-remigio', 16, 'Seafront gazebos built for Maayo Stay Resort, San Remigio'),
	atrium: photo('san-lucas-medical', 14, 'Curved atrium walkway at San Lucas Medical, Minglanilla'),
	corridor: photo('taiyo-yuden', 31, 'White-walled corridor with glazed inspection windows at Taiyo Yuden, Mactan'),
	labs: photo('uspf', 10, 'Glass-walled laboratory at the USPF technology hub, Lahug'),
	carpet: photo('i2-call-center', 13, 'Corridor finished with carpet tiles in the i2 Building, IT Park'),
	planks: photo('paramount-life', 15, 'Vinyl plank flooring and glazed frontage at Paramount Life, Cebu Business Park'),
	stair: photo('pueblo-de-oro', 12, 'Stair with timber treads and steel balusters at Pueblo de Oro'),
	exterior: photo('taiyo-yuden', 1, 'Taiyo Yuden plant exterior, Cebu Light Industrial Park'),
	lounge: photo('maayo-argao', 5, 'Restaurant with timber ceiling at Maayo Stay Argao')
};
