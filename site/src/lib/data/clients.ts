export type ClientGroup = { sector: string; names: string[] };

/** All 43 clients from the original Clients page, grouped by sector. */
export const clientGroups: ClientGroup[] = [
	{
		sector: 'Healthcare',
		names: [
			'Chong Hua Hospital',
			'Perpetual Succour Hospital',
			'San Lucas Medical',
			'Hospital Maayo',
			'St. Paul University Hospital',
			'ACE Medical Center Tacloban',
			'ACE Medical Center Bayawan',
			'Wellness Hub'
		]
	},
	{
		sector: 'Education',
		names: [
			'University of San Carlos',
			'University of San Jose-Recoletos',
			'Asian College of Technology',
			'St. Paul University Surigao',
			'Kumon'
		]
	},
	{
		sector: 'Hospitality',
		names: [
			'Marco Polo Residences Cebu',
			'Solea Mactan Cebu Resort',
			'Maayo San Remigio',
			'Maayo Argao',
			'Maayo Hotel',
			'Gintell Rest N Go'
		]
	},
	{
		sector: 'Developers',
		names: [
			'Avida Towers Cebu',
			'Taft Properties',
			'Paramount Properties',
			'Primary Homes',
			'Primary Properties Corporation',
			'Primary Structures Corporation',
			'Pueblo de Oro Development Corporation',
			'CLS Properties',
			'Greentech Development Corporation',
			'Duros Development Corporation'
		]
	},
	{
		sector: 'Corporate and industry',
		names: [
			'Mactan-Cebu International Airport Authority',
			'Toyota Team Cebu',
			'City Savings Bank',
			'Paramount Life & General Insurance',
			'Elburg Shipmanagement Philippines',
			'Augustea Ship Manning Philippines',
			'Mactan Steel Center',
			'Wellmade Manufacturing Corporation',
			'APO Floors',
			'SCI',
			'Metro Wear',
			'Furniture Source',
			'Anything Timber',
			'SCEGA Coop Philippines'
		]
	}
];

export const clientCount = clientGroups.reduce((n, g) => n + g.names.length, 0);
