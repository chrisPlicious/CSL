export type ProductLine = { id: string; name: string; note: string; items: string[] };

/** Product lines CSL has supplied and installed since 2011 (original site 2013 to 2026, directory listings). */
export const productLines: ProductLine[] = [
	{
		id: 'window',
		name: 'Window treatments',
		note: 'Measured, made to size and installed.',
		items: [
			'Roller blinds, sunscreen and blackout fabric',
			'Combi and double roller blinds',
			'Vertical blinds, PVC and fabric',
			'Horizontal blinds, 1-inch aluminum slats',
			'Wood and faux-wood blinds',
			'Roman shades',
			'Curtains',
			'Outdoor roller shades'
		]
	},
	{
		id: 'flooring',
		name: 'Flooring',
		note: 'Supplied with subfloor preparation and self-leveling where needed.',
		items: [
			'Carpet tiles, regular and custom designs',
			'Carpet in roll, loop and cut pile',
			'Vinyl tiles',
			'Vinyl planks',
			'Vinyl roll-form, homogeneous',
			'Laminated wood flooring',
			'Artificial grass'
		]
	},
	{
		id: 'walls',
		name: 'Walls and ceilings',
		note: 'From acoustic grids to finished wall coverings.',
		items: [
			'Acoustic ceiling boards on aluminum T-runners',
			'Gypsum partitions on light metal frames',
			'Padded and acoustic wall panels',
			'PVC wall and ceiling panels',
			'Vinyl wallpaper and ceiling paper'
		]
	},
	{
		id: 'doors',
		name: 'Doors and partitions',
		note: 'Folding doors and room dividers for homes and offices.',
		items: ['PVC folding doors, regular and deluxe', 'French-style PVC accordion doors', 'PVC folding partitions']
	},
	{
		id: 'other',
		name: 'Laminates and electrical',
		note: 'Supplied for our own projects and to other contractors.',
		items: ['Premium laminates', 'Industrial wires', 'Panel boards']
	}
];

export const installServices = [
	'Carpet tile and carpet-in-roll installation',
	'Concrete self-leveling before vinyl installation',
	'Vinyl tile, plank and roll-form installation',
	'Wallpaper installation',
	'Carpet repair and cleaning',
	'Office and home renovation'
];
