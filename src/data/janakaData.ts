export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  thumb?: string;
  caption: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string[];
  image: string;
  imageAlt: string;
}

export interface CoolingComponent {
  id: string;
  name: string;
  location: string;
  role: string;
  signs: string[];
  /** Position in the car illustration's 640×200 coordinate space. */
  x: number;
  y: number;
}

export const siteUrl = 'https://janaka-ac-newweb.vercel.app';

// 1. Business & Contact Information
export const businessInfo = {
  name: 'Janaka Auto AC',
  tagline: 'Car A/C Diagnosis & Repairs in Gampaha',
  subTagline: 'Keep cool. Drive comfortable.',
  phone: '+94 71 455 1409',
  phoneRaw: '+94714551409',
  whatsappNumber: '94714551409',
  whatsappUrl: 'https://wa.me/94714551409',
  email: 'janakaautoac123@gmail.com',
  address: '366 Minuwangoda–Gampaha–Miriswatta Road, Gampaha, Sri Lanka',
  addressShort: '366 Miriswatta Road, Gampaha',
  streetAddress: '366 Minuwangoda–Gampaha–Miriswatta Road',
  locality: 'Gampaha',
  country: 'LK',
  geo: { lat: 7.085055, lng: 80.0085464 },
  googleMapsPlaceUrl: 'https://www.google.com/maps/place/Janaka+Auto+AC/@7.085055,80.0085464,17z',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=7.085055,80.0085464',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=Janaka+Auto+AC%2C+366+Minuwangoda-Gampaha-Miriswatta+Rd%2C+Gampaha&z=17&output=embed',
  facebookUrl: 'https://www.facebook.com/p/Janaka-AUTO-AC-61552238811366/',
  tiktokUrl: 'https://www.tiktok.com/search?q=Janaka%20Auto%20AC',
};

// 2. Business Operating Schedule
export const businessHours = {
  openDays: 'Tuesday – Sunday',
  openDaysShort: 'Tue – Sun',
  hours: '8:30 AM – 6:00 PM',
  closed: 'Closed on Mondays',
  opens: '08:30',
  closes: '18:00',
};

// 3. Core Services
export const servicesData: ServiceItem[] = [
  {
    id: 'gas-refilling',
    number: '01',
    title: 'A/C Gas Recharge',
    summary:
      'Refrigerant recovered, the system evacuated and recharged to the specification for your vehicle, then checked under pressure.',
    details: [
      'Correct refrigerant type and quantity for the vehicle',
      'System vacuum to remove air and moisture before charging',
      'High- and low-side pressure check with manifold gauges',
    ],
    image: '/ac-gas-filling.webp',
    imageAlt: 'Refrigerant recovery and charging equipment in the workshop',
  },
  {
    id: 'compressor',
    number: '02',
    title: 'Compressor Repair',
    summary:
      'Inspection of the compressor, clutch and pulley bearing — repairing the faulty part where that makes sense instead of replacing the whole unit.',
    details: [
      'Noise, clutch engagement and bearing checks',
      'Clutch, bearing and seal repairs',
      'Replacement when a repair is not the right option',
    ],
    image: '/compressor-repair.webp',
    imageAlt: 'Disassembled automotive AC compressor unit under precision inspection',
  },
  {
    id: 'leak-testing',
    number: '03',
    title: 'Leak Detection',
    summary:
      'Tracing why a system keeps losing gas — across hoses, joints, seals and components — so the leak is fixed rather than refilled again.',
    details: [
      'Pressure testing of the refrigerant circuit',
      'Inspection of hoses, O-rings, joints and service valves',
      'Repair of the leaking part before recharging',
    ],
    image: '/ac-diagnostics.webp',
    imageAlt: 'High and low side manifold gauge set connected to vehicle service ports',
  },
  {
    id: 'condenser-evaporator',
    number: '04',
    title: 'Condenser & Evaporator Service',
    summary:
      'Cleaning, repair or replacement of the condenser, evaporator, expansion valve and receiver-drier when they limit cooling.',
    details: [
      'Condenser and receiver-drier replacement',
      'Evaporator and expansion valve servicing',
      'Cooling check after reassembly',
    ],
    image: '/condenser-replacement.webp',
    imageAlt: 'New condenser with receiver-drier ready for installation in the workshop',
  },
  {
    id: 'full-diagnostics',
    number: '05',
    title: 'A/C Diagnosis',
    summary:
      'A structured check of pressures, electrical controls, sensors and vent temperature to find the actual cause of weak or intermittent cooling.',
    details: [
      'Vent temperature and airflow checks',
      'Electrical, sensor and control checks',
      'A clear explanation of what was found before work begins',
    ],
    image: '/ac-temp-test.webp',
    imageAlt: 'Digital thermometer measuring chilled vent air temperature in vehicle cabin',
  },
  {
    id: 'airflow-sanitization',
    number: '06',
    title: 'Airflow & Cabin Air',
    summary:
      'Blower motor, cabin filter and vent servicing for weak airflow and musty smells from the vents.',
    details: [
      'Cabin filter replacement',
      'Blower motor and resistor checks',
      'Vent and duct cleaning for odours',
    ],
    image: '/completed-job.webp',
    imageAlt: 'Customer vehicle completed and ready for pickup outside the workshop',
  },
];

// 4. Simplified refrigerant circuit for the interactive explainer
export const coolingComponents: CoolingComponent[] = [
  {
    id: 'compressor',
    name: 'Compressor',
    location: 'Engine bay, belt-driven or electric',
    role: 'Pumps refrigerant around the system and raises its pressure. It is the heart of the circuit — when it stops, cooling stops.',
    signs: ['Noise when the A/C is switched on', 'A/C clutch not engaging', 'No cold air at all'],
    x: 496,
    y: 126,
  },
  {
    id: 'condenser',
    name: 'Condenser',
    location: 'Front of the vehicle, ahead of the radiator',
    role: 'Releases heat from the hot, high-pressure refrigerant into outside air, turning it from gas back into liquid.',
    signs: ['Cooling weakens in traffic or at idle', 'Bent fins or debris blocking airflow', 'Cooling recovers when moving'],
    x: 544,
    y: 112,
  },
  {
    id: 'receiver-drier',
    name: 'Receiver-drier',
    location: 'Near the condenser, on the high-pressure line',
    role: 'Filters the refrigerant and absorbs moisture that would otherwise damage the system. Usually renewed whenever the system is opened.',
    signs: ['Often replaced during major repairs', 'Moisture-related cooling problems'],
    x: 528,
    y: 122,
  },
  {
    id: 'expansion-valve',
    name: 'Expansion valve',
    location: 'At the firewall, before the evaporator',
    role: 'Meters liquid refrigerant into the evaporator and drops its pressure, so it can absorb heat and become very cold.',
    signs: ['Cooling that comes and goes', 'Frost on A/C pipes', 'Vents cold, then warm'],
    x: 436,
    y: 92,
  },
  {
    id: 'evaporator',
    name: 'Evaporator',
    location: 'Behind the dashboard',
    role: 'Cold refrigerant absorbs heat from cabin air blown across its fins — this is where the air you feel is actually cooled.',
    signs: ['Musty smell from the vents', 'Weak cooling with good airflow', 'Water dripping into the footwell'],
    x: 410,
    y: 96,
  },
  {
    id: 'blower',
    name: 'Blower & cabin filter',
    location: 'Behind the glovebox area',
    role: 'The fan pushes air through the cabin filter and evaporator and out of the vents.',
    signs: ['Weak airflow on every setting', 'Fan works only on some speeds', 'Dust or odours from the vents'],
    x: 375,
    y: 108,
  },
];

// 5. Workshop photography (genuine photos from the garage)
export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Our Workshop in Gampaha',
    category: 'Workshop',
    image: '/workshop-exterior.webp',
    thumb: '/thumbs/workshop-exterior.webp',
    caption: 'The Janaka Auto AC workshop on the Minuwangoda–Gampaha–Miriswatta Road, with covered service bays.',
  },
  {
    id: 'g2',
    title: 'System Pressure Diagnostics',
    category: 'Diagnosis',
    image: '/ac-diagnostics.webp',
    thumb: '/thumbs/ac-diagnostics.webp',
    caption: 'Manifold gauges and service equipment connected to check high- and low-side system pressures.',
  },
  {
    id: 'g3',
    title: 'Condenser Replacement',
    category: 'Components',
    image: '/condenser-replacement.webp',
    thumb: '/thumbs/condenser-replacement.webp',
    caption: 'A new condenser with receiver-drier, ready to fit.',
  },
  {
    id: 'g4',
    title: 'Vehicles in the Service Bays',
    category: 'Workshop',
    image: '/workshop-vehicles.webp',
    thumb: '/thumbs/workshop-vehicles.webp',
    caption: 'Cars in for A/C work under the covered workshop bays.',
  },
  {
    id: 'g5',
    title: 'Hands-on Repairs',
    category: 'Repairs',
    image: '/ac-repair-job.webp',
    thumb: '/thumbs/ac-repair-job.webp',
    caption: 'Working beneath the front of a van to reach A/C lines and components.',
  },
  {
    id: 'g6',
    title: 'Ready for Collection',
    category: 'Completed',
    image: '/completed-job.webp',
    thumb: '/thumbs/completed-job.webp',
    caption: 'A customer vehicle after its A/C work.',
  },
];

export const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'system', label: 'How A/C Works' },
  { id: 'about', label: 'About' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
] as const;
