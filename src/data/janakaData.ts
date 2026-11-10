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
  slug: string;
  number: string;
  title: string;
  summary: string;
  details: string[];
  image: string;
  imageAlt: string;
}

export interface DedicatedService {
  slug: string;
  number: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  overview: string;
  symptoms: string[];
  whatIsIncluded: string[];
  processSteps: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  image: string;
  imageAlt: string;
  keywords: string[];
  sinhalaKeywords: string[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  readTime: string;
  publishedDate: string;
  updatedDate: string;
  author: string;
  image: string;
  imageAlt: string;
  sections: { heading: string; paragraphs: string[]; keyTakeaways?: string[] }[];
  faqs: { q: string; a: string }[];
  relatedServices: { title: string; href: string }[];
}

export interface HomepageFAQ {
  q: string;
  a: string;
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

// Canonical Production Domain
export const siteUrl = 'https://www.janakaac.lk';

// 1. Business & Contact Information (NAP - Verified)
export const businessInfo = {
  name: 'Janaka Auto AC',
  legalName: 'Janaka Auto AC (Pvt) Ltd',
  tagline: 'Car A/C Diagnosis & Guaranteed Repairs in Gampaha',
  subTagline: 'Keep cool. Drive comfortable with sub-zero cabin airflow.',
  phone: '+94 71 455 1409',
  phoneRaw: '+94714551409',
  phoneHref: 'tel:+94714551409',
  phoneDisplay: '+94 71 455 1409',
  whatsappNumber: '94714551409',
  whatsappUrl: 'https://wa.me/94714551409',
  email: 'janakaautoac123@gmail.com',
  address: '366 Minuwangoda–Gampaha–Miriswatta Road, Gampaha, Sri Lanka',
  addressShort: '366 Miriswatta Road, Gampaha',
  streetAddress: '366 Minuwangoda–Gampaha–Miriswatta Road',
  locality: 'Gampaha',
  region: 'Western Province',
  postalCode: '11000',
  country: 'LK',
  geo: { lat: 7.085055, lng: 80.0085464 },
  googleMapsPlaceUrl: 'https://www.google.com/maps/place/Janaka+Auto+AC/@7.085055,80.0085464,17z',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=7.085055,80.0085464',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=Janaka+Auto+AC%2C+366+Minuwangoda-Gampaha-Miriswatta+Rd%2C+Gampaha&z=17&output=embed',
  facebookUrl: 'https://www.facebook.com/p/Janaka-AUTO-AC-61552238811366/',
  tiktokUrl: 'https://www.tiktok.com/search?q=Janaka%20Auto%20AC',
  experienceYears: '15+',
  establishedYear: '2011',
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

// 3. Homepage Core Services Preview
export const servicesData: ServiceItem[] = [
  {
    id: 'car-ac-repair-gampaha',
    slug: 'car-ac-repair-gampaha',
    number: '01',
    title: 'Car A/C Repair in Gampaha',
    summary:
      'Full automotive climate diagnostics and guaranteed mechanical repairs on Miriswatta Road. From cooling failure to compressor, coil and valve overhauls.',
    details: [
      'Comprehensive manifold pressure & electrical diagnostic scan',
      'Accurate failure diagnosis before any parts are replaced',
      'Factory-standard sub-zero vent temperature calibration',
    ],
    image: '/ac-diagnostics.webp',
    imageAlt: 'Automotive AC manifold diagnostic gauges connected to vehicle in Janaka Auto AC workshop',
  },
  {
    id: 'car-ac-gas-refilling',
    slug: 'car-ac-gas-refilling',
    number: '02',
    title: 'A/C Gas Recharge (R134a / R1234yf)',
    summary:
      'Refrigerant recovered, system deep-vacuumed to remove moisture and non-condensables, and recharged with pure virgin refrigerant and synthetic PAG lubricant.',
    details: [
      'Exact vehicle OEM gas weight measured by digital scale',
      'System deep vacuum hold to boil out moisture acid',
      'Dual-port high and low pressure gauge verification',
    ],
    image: '/ac-gas-filling.webp',
    imageAlt: 'Refrigerant recovery and charging equipment in Janaka Auto AC Gampaha',
  },
  {
    id: 'car-ac-compressor-repair',
    slug: 'car-ac-compressor-repair',
    number: '03',
    title: 'Compressor Repair & Overhaul',
    summary:
      'We repair faulty parts—magnetic clutch, pulley bearings, shaft seals, and valve plates—saving you from purchasing expensive complete assemblies.',
    details: [
      'Bearing rumble and magnetic clutch clearance inspection',
      'Coil resistance, internal reed valve and shaft seal repair',
      'Pressure discharge test to verify compression ratio',
    ],
    image: '/compressor-repair.webp',
    imageAlt: 'Disassembled automotive AC compressor unit under repair at Janaka Auto AC',
  },
  {
    id: 'car-ac-leak-detection',
    slug: 'car-ac-leak-detection',
    number: '04',
    title: 'Nitrogen Leak Detection',
    summary:
      'Tracing why your system loses gas repeatedly. We run high-pressure dry nitrogen holding tests and electronic halogen sniffing so leaks are fixed permanently.',
    details: [
      'Dry nitrogen pressure hold test up to 280 PSI',
      'Electronic halogen sniffer across O-rings and crimps',
      'Permanent joint and component repair before re-gassing',
    ],
    image: '/workshop-vehicles.webp',
    imageAlt: 'Vehicles undergoing AC leak inspection in covered bays at Janaka Auto AC',
  },
  {
    id: 'car-ac-condenser-evaporator-service',
    slug: 'car-ac-condenser-evaporator-service',
    number: '05',
    title: 'Condenser & Evaporator Service',
    summary:
      'Cleaning, micro-puncture repair, or replacement of front condensers, in-cabin evaporator cores, expansion valves, and receiver-driers.',
    details: [
      'Front condenser fin washing and leak pressure-testing',
      'Evaporator cooling core servicing and expansion valve calibration',
      'Receiver-drier renewal to prevent desiccant acid damage',
    ],
    image: '/condenser-replacement.webp',
    imageAlt: 'New condenser with receiver-drier ready for installation in Gampaha workshop',
  },
  {
    id: 'car-ac-diagnostics',
    slug: 'car-ac-diagnostics',
    number: '06',
    title: 'Structured Climate Diagnostics',
    summary:
      'Dual manifold readings, vent temperature logging, sensor checks, and electrical climate control diagnostics to solve intermittent or weak cooling.',
    details: [
      'Digital probe vent temperature measurement',
      'Electrical relay, fuse, blend door actuator and sensor checks',
      'Clear, honest explanation of root cause before quoting',
    ],
    image: '/ac-temp-test.webp',
    imageAlt: 'Digital probe thermometer testing air conditioning vent output temperature',
  },
  {
    id: 'car-ac-maintenance',
    slug: 'car-ac-maintenance',
    number: '07',
    title: 'Airflow & Cabin Air Sanitization',
    summary:
      'Blower motor servicing, resistor diagnosis, cabin pollen filter renewal, and anti-bacterial vent treatments to eliminate musty smells and restore strong airflow.',
    details: [
      'Activated carbon cabin filter replacement',
      'Blower motor current draw & resistor speed checks',
      'Evaporator fin sanitization for clean, fresh cabin air',
    ],
    image: '/completed-job.webp',
    imageAlt: 'Customer vehicle completed and ready for pickup outside Janaka Auto AC',
  },
];

// 4. Dedicated High-Intent Landing Pages
export const dedicatedServices: DedicatedService[] = [
  {
    slug: 'car-ac-repair-gampaha',
    number: '01',
    title: 'Car AC Repair in Gampaha',
    seoTitle: 'Car AC Repair Gampaha | AC Garage Miriswatta | Janaka Auto AC',
    metaDescription:
      'Looking for car AC repair in Gampaha? Visit Janaka Auto AC on Miriswatta Road for expert auto AC diagnostics, gas refilling, compressor repair, and guaranteed cooling.',
    h1: 'Specialist Car AC Repair in Gampaha – Janaka Auto AC',
    tagline: 'Gampaha’s Dedicated Automotive Air Conditioning Specialists on Miriswatta Road',
    overview:
      'When your vehicle air conditioning stops cooling, blows warm air during traffic jams, or makes unusual noises, you need a specialist who understands automotive thermodynamics. At Janaka Auto AC in Miriswatta, Gampaha, car air conditioning is all we do. With over 15 years of dedicated experience, we diagnose the exact failure point before turning a bolt, preventing unnecessary part replacements and restoring ice-cold airflow.',
    symptoms: [
      'A/C blowing warm or room-temperature air even when set to maximum cold',
      'Cooling works on highway speeds but turns warm in Gampaha town traffic',
      'Unusual grinding, clicking, or squeaking noises when the A/C button is pressed',
      'Gas was refilled recently but the system stopped cooling again within weeks',
      'Weak or restricted airflow from dashboard vents despite fan speed on high',
      'Musty, damp, or chemical odor blowing into the passenger cabin',
    ],
    whatIsIncluded: [
      'Dual-gauge manifold pressure test (High side & Low side analysis)',
      'Digital probe vent output temperature calibration (Target 4.5°C – 7.5°C)',
      'Dry nitrogen pressure test to verify sealed loop integrity',
      'Magnetic clutch air gap and coil electrical resistance check',
      'Cabin pollen micro-filter inspection and airflow velocity audit',
      'Transparent diagnosis and honest written estimate before repair work starts',
    ],
    processSteps: [
      {
        title: '1. Structured Intake & Pressure Scan',
        desc: 'We hook professional dual-manifold gauges to your vehicle high and low service ports to observe static and operating pressures.',
      },
      {
        title: '2. Component Failure Isolation',
        desc: 'We check compressor displacement, condenser heat rejection, expansion valve throttling, and electrical control signals to locate the root fault.',
      },
      {
        title: '3. Transparent Customer Consultation',
        desc: 'We explain the exact cause to you in plain language. If a repair or seal replacement solves the issue, we never push costly new assemblies.',
      },
      {
        title: '4. Precision Repair & Vacuum Dehydration',
        desc: 'After mechanical repair, the system is evacuated under deep vacuum (29.9 inHg) for at least 25 minutes to boil off moisture acids.',
      },
      {
        title: '5. Calibrated Recharge & Cooling Proof',
        desc: 'We recharge exact OEM-specified virgin refrigerant and fresh synthetic PAG oil, testing vent output temperatures under full load.',
      },
    ],
    faqs: [
      {
        q: 'Where is your car AC garage located in Gampaha?',
        a: 'Janaka Auto AC is located at 366 Minuwangoda–Gampaha–Miriswatta Road, Miriswatta, Gampaha. We are easily accessible from Gampaha town, Yakkala, Minuwangoda, and Kadawatha, with covered service bays.',
      },
      {
        q: 'How long does a standard car AC repair take?',
        a: 'Routine gas recharging, pressure leak testing, and electrical diagnostics typically take 45 to 90 minutes. Major repairs such as compressor overhauls or dashboard evaporator replacements take between 3 and 6 hours.',
      },
      {
        q: 'Do you work on Japanese, European, and Hybrid vehicles?',
        a: 'Yes. We regularly service Toyota (Premio, Allion, Aqua, Axio, Prius, Vitz, Prado), Honda (Vezel, Grace, Fit, Civic), Nissan, Suzuki, Kia, Hyundai, Mitsubishi, as well as European models and commercial KDH vans.',
      },
      {
        q: 'What are your workshop opening hours?',
        a: 'We are open 6 days a week from Tuesday to Sunday, 8:30 AM to 6:00 PM. We are closed on Mondays.',
      },
    ],
    image: '/ac-diagnostics.webp',
    imageAlt: 'Technician conducting vehicle air conditioning diagnostics at Janaka Auto AC in Gampaha',
    keywords: [
      'AC Garage Gampaha',
      'Gampaha AC Garage',
      'Gampaha Garage AC',
      'Car AC Repair Gampaha',
      'Auto AC Gampaha',
      'Car AC Service Gampaha',
      'Vehicle AC Repair Gampaha',
      'Miriswatta AC Garage',
    ],
    sinhalaKeywords: [
      'ගම්පහ AC ගරාජ්',
      'ගම්පහ කාර් AC අලුත්වැඩියා',
      'වාහන AC සර්විස් ගම්පහ',
      'මිරිස්වත්ත AC ගරාජ්',
    ],
  },
  {
    slug: 'car-ac-gas-refilling',
    number: '02',
    title: 'Car AC Gas Refilling & Recharge',
    seoTitle: 'Car AC Gas Refill Gampaha | R134a & R1234yf Recharge | Janaka Auto AC',
    metaDescription:
      'Professional car AC gas refilling in Gampaha. Precision refrigerant recovery, deep vacuum moisture purge, and digital-scale gas charging at Miriswatta workshop.',
    h1: 'Car AC Gas Refilling & Precision Recharge in Gampaha',
    tagline: 'Deep Vacuum Evacuation, Pure Virgin Refrigerant & Exact OEM Weight Specifications',
    overview:
      'A car air conditioning system is a hermetically sealed pressurized loop. Refrigerant does not "burn away" or get consumed like engine oil or petrol. If your vehicle has lost refrigerant, refilling gas without vacuuming and leak-checking is only a temporary and costly band-aid. At Janaka Auto AC in Gampaha, we follow international automotive HVAC standards: full recovery, deep vacuum dehydration, dry nitrogen integrity check, and precision digital scale recharge using pure virgin R134a or R1234yf refrigerant with fresh synthetic PAG compressor oil.',
    symptoms: [
      'Air from vents is lukewarm or only cools slightly on cold mornings',
      'You recently refilled AC gas at a roadside shop and cooling vanished within weeks',
      'Hissing noise inside the dashboard when the AC is switched on',
      'Compressor clutch engages but fails to create cold airflow',
      'Condensation on low-pressure lines is missing under the bonnet',
    ],
    whatIsIncluded: [
      'Recovery of remaining refrigerant to prevent atmospheric pollution',
      'Deep vacuum pump evacuation to 29.9 inHg to eliminate moisture and air',
      'Vacuum decay hold test to detect immediate gross leakage',
      'Digital scale charging of exact OEM manufacturer weight (grams)',
      'Replenishment of clean PAG synthetic compressor lubricant',
      'Operating manifold pressure audit on both high and low service ports',
    ],
    processSteps: [
      {
        title: '1. Residual Refrigerant Extraction',
        desc: 'We safely connect recovery equipment to evaluate existing gas quantity and check for oil contamination or burnt compressor particles.',
      },
      {
        title: '2. Deep Vacuum Moisture Dehydration',
        desc: 'Air contains moisture. Moisture reacts with refrigerant to create hydrochloric acid that corrodes compressor valves. We pull a 25-minute deep vacuum to boil off all moisture.',
      },
      {
        title: '3. Vacuum Leak Verification',
        desc: 'The gauges are isolated under full vacuum. If the needles creep towards zero, a physical leak is present that must be sealed before charging.',
      },
      {
        title: '4. Precision Gram-Weighed Gas Charge',
        desc: 'Every car model requires a specific charge (e.g., 450g, 500g, 650g). Overcharging is as bad as undercharging. We weigh pure virgin refrigerant on digital scales.',
      },
      {
        title: '5. High/Low Dynamic Pressure Test',
        desc: 'With the engine idling and fan running, we verify that low-side pressure sits at 28–35 PSI and high-side pressure matches ambient temperature (180–230 PSI).',
      },
    ],
    faqs: [
      {
        q: 'Why does my car AC gas keep leaking out after refilling?',
        a: 'Because a physical puncture, hardened O-ring, dried shaft seal, or stone chip on the condenser exists. Merely topping up gas without finding and sealing the leak will guarantee that the new gas escapes again. At Janaka Auto AC, we locate and fix the leak first.',
      },
      {
        q: 'How often should a car AC be refilled?',
        a: 'In a properly sealed system with sound seals and hoses, car AC gas can last 3 to 5 years or more without needing a top-up. Annual routine inspections are recommended to check operating pressures and cabin filters.',
      },
      {
        q: 'Do you charge R1234yf for newer vehicles?',
        a: 'Yes, we handle both standard R134a and modern R1234yf eco-refrigerants with dedicated manifold equipment to prevent cross-contamination.',
      },
    ],
    image: '/ac-gas-filling.webp',
    imageAlt: 'Refrigerant recovery and charging equipment at Janaka Auto AC in Gampaha',
    keywords: [
      'Car AC Gas Refill Gampaha',
      'AC Gas Refill Gampaha',
      'Car AC Gas Recharge Sri Lanka',
      'Auto AC Gas Refill Gampaha',
      'Car AC Refrigerant Gampaha',
      'R134a AC Gas Gampaha',
    ],
    sinhalaKeywords: [
      'කාර් AC ගෑස් පිරවීම',
      'වාහන AC ගෑස් රීෆිල් ගම්පහ',
      'ගම්පහ AC ගෑස් ගැසීම',
    ],
  },
  {
    slug: 'car-ac-compressor-repair',
    number: '03',
    title: 'Car AC Compressor Repair & Rebuilding',
    seoTitle: 'Car AC Compressor Repair Gampaha | Clutch, Bearing & Overhaul | Janaka Auto AC',
    metaDescription:
      'Expert car AC compressor repair in Gampaha. Magnetic clutch replacement, pulley bearing overhauls, shaft seal renewal, and compressor rebuilding in Miriswatta.',
    h1: 'Car AC Compressor Repair & Component Rebuilding in Gampaha',
    tagline: 'Repair-First Philosophy: Save Up To 60% Compared to Brand New Assembly Replacements',
    overview:
      'The AC compressor is the mechanical heart of your car’s climate control, pumping high-pressure vapor through the condenser. Many generic workshops immediately advise vehicle owners to replace the entire compressor assembly as soon as any noise or cooling drop appears—costing upwards of Rs. 80,000 to Rs. 250,000. At Janaka Auto AC, we believe in component-level craftsmanship. In many cases, the fault is an exhausted magnetic clutch coil, a worn pulley bearing, a dried front shaft seal, or internal control valve sticking. We rebuild and service compressors to OEM tolerances, saving you substantial money while restoring factory cooling performance.',
    symptoms: [
      'Loud metallic rattling, whining, or bearing squeal from the engine bay when AC is on',
      'AC button light turns on inside the cabin, but the compressor clutch fails to click and engage',
      'Cabin only blows cold when driving at high RPM, turning warm when idling at traffic lights',
      'Burnt electrical or rubber smell coming from the serpentine belt area',
      'AC fuse blows repeatedly when the climate control is turned on',
      'Visible green oil dye leaking around the compressor nose or front shaft seal',
    ],
    whatIsIncluded: [
      'Bench test of compressor displacement, suction pressure, and discharge pressure',
      'Magnetic clutch coil electrical resistance measurement (OEM spec 3.0 – 4.2 ohms)',
      'Clutch friction plate resurfacing and air gap calibration with precision shims',
      'Heavy-duty double-row angular contact pulley bearing replacement',
      'High-pressure carbon-ceramic front shaft seal replacement',
      'Internal valve plate inspection, reed valve cleaning, and fresh PAG oil flush',
    ],
    processSteps: [
      {
        title: '1. On-Vehicle Diagnostics',
        desc: 'We measure compressor input voltage, ground signal, magnetic clutch coil resistance, and mechanical belt tension to confirm whether the fault is electrical or mechanical.',
      },
      {
        title: '2. Safe Evacuation & Removal',
        desc: 'Refrigerant is professionally recovered. The compressor is dismounted and brought to our dedicated clean rebuild bench.',
      },
      {
        title: '3. Component-Level Teardown',
        desc: 'We dismantle the clutch hub, pulley bearing, front nose housing, and shaft seal. We inspect the swash plate and pistons for metal scouring.',
      },
      {
        title: '4. Precision Rebuild & Reshimming',
        desc: 'New Japanese high-speed bearings and OEM seals are pressed into place. Clutch air gap is set using feeler gauges to exactly 0.35mm – 0.60mm.',
      },
      {
        title: '5. Pressure Testing & Reinstallation',
        desc: 'The rebuilt unit is nitrogen pressure-tested for zero shaft leakage, refilled with calibrated PAG oil, remounted, and tested under sustained engine load.',
      },
    ],
    faqs: [
      {
        q: 'Can every car AC compressor be repaired?',
        a: 'Most clutch, coil, bearing, shaft seal, and control valve failures can be successfully repaired. However, if a compressor has suffered severe internal mechanical seizure (internal pistons shattered and metal shavings circulated throughout the lines), replacement is required along with a full system chemical flush.',
      },
      {
        q: 'How much can I save by repairing rather than replacing?',
        a: 'A clutch, bearing, or seal rebuild typically costs a fraction (often 30% to 45%) of the price of a brand-new original compressor assembly.',
      },
      {
        q: 'What causes AC compressors to fail in Sri Lanka?',
        a: 'The two most common culprits are running the system with low refrigerant (which starves the compressor of oil return) and a clogged condenser that causes excessive head pressure and extreme heat buildup.',
      },
    ],
    image: '/compressor-repair.webp',
    imageAlt: 'Automotive AC compressor teardown and precision repair at Janaka Auto AC Gampaha',
    keywords: [
      'Car AC Compressor Repair Gampaha',
      'Car AC Compressor Repair Sri Lanka',
      'AC Compressor Clutch Repair Gampaha',
      'AC Compressor Bearing Replacement',
      'Auto AC Compressor Rebuild Gampaha',
      'Car AC Compressor Price Sri Lanka',
    ],
    sinhalaKeywords: [
      'කාර් AC කම්ප්රෙසර් අලුත්වැඩියාව',
      'වාහන AC කොම්ප්‍රෙසර් රෙපයාර් ගම්පහ',
      'AC බෙයාරින් මාරු කිරීම',
    ],
  },
  {
    slug: 'car-ac-leak-detection',
    number: '04',
    title: 'Car AC Leak Detection & Nitrogen Pressure Testing',
    seoTitle: 'Car AC Leak Detection Gampaha | Nitrogen Pressure Testing | Janaka Auto AC',
    metaDescription:
      'Accurate car AC leak detection in Gampaha. High-pressure dry nitrogen testing, electronic halogen sniffers, and UV dye tracing at Janaka Auto AC Miriswatta.',
    h1: 'Car AC Gas Leak Detection & Pressure Testing in Gampaha',
    tagline: 'Pinpoint Micro-Leaks Without Guesswork Using 280 PSI Dry Nitrogen & Electronic Sniffers',
    overview:
      'If your car’s air conditioner blows cold for only a week or two after being gassed, your system has an active refrigerant leak. Because automotive refrigerant is colorless and evaporates into the air instantaneously, finding microscopic leaks in a complex engine bay or behind the dashboard requires specialized instruments. At Janaka Auto AC in Gampaha, we never guess. We utilize dry high-purity nitrogen holding tests pressurized up to 280 PSI, combined with ultrasonic and electronic halogen sniffers capable of detecting leaks as small as 3 grams per year.',
    symptoms: [
      'AC cools well immediately after gas charging, but gradually loses chill over days or weeks',
      'Hissing or bubbling sound heard from the dashboard vents when the AC is switched off',
      'Oily, greasy dirt accumulation around rubber hose crimps, pipe joints, or condenser corners',
      'Compressor clutch stops clicking on due to low-pressure safety switch cutoff',
      'Ice or heavy frost formation on high-pressure metal pipes under the bonnet',
    ],
    whatIsIncluded: [
      'Dry nitrogen pressurization of the closed loop up to 280 PSI to simulate thermal stress',
      'Precision gauge pressure drop monitoring over a sustained observation period',
      'Electronic halogen sniffer scanning across all joints, O-rings, and service Schrader valves',
      'Inspection of front condenser core for stone-chip punctures and corrosion',
      'Evaporator drain tube sniffing to detect hidden in-dash HVAC core micro-leaks',
      'Exact repair proposal specifying only the leaking component that requires attention',
    ],
    processSteps: [
      {
        title: '1. Refrigerant Recovery & Dry Nitrogen Charge',
        desc: 'Any remaining gas is safely extracted. The system is pressurized with oxygen-free dry nitrogen. Nitrogen does not contain moisture and safely tests joints under high pressure.',
      },
      {
        title: '2. High-Pressure Hold Monitoring',
        desc: 'We lock the manifold valves and monitor pressure hold. A dropping gauge needle confirms that gas is escaping.',
      },
      {
        title: '3. Electronic Sniffer & Ultrasonic Scan',
        desc: 'Our sensitive electronic halogen detector scans the condenser face, compressor shaft seal, aluminum crimps, and firewall connections.',
      },
      {
        title: '4. In-Dash Evaporator Core Check',
        desc: 'We sample the condensate drain tube with the electronic sniffer. If halogen vapors register at the drain, the evaporator behind the dashboard is leaking.',
      },
      {
        title: '5. Component Repair & Re-Verification',
        desc: 'The faulty O-ring, hose, or core is replaced or repaired. The system is re-pressurized with nitrogen to confirm 100% zero pressure drop before final gas charging.',
      },
    ],
    faqs: [
      {
        q: 'Why do you use nitrogen instead of just refilling with gas and soap water?',
        a: 'Refrigerant is expensive and harmful to vent into the air. Soap water only detects large bubbles and cannot reach hidden components like the evaporator core inside the dashboard. Nitrogen allows testing at 280 PSI safely, cleanly, and conclusively.',
      },
      {
        q: 'Where are the most common leak points in vehicles?',
        a: 'The most frequent leak spots are front condenser cores (hit by road pebbles on Sri Lankan roads), compressor nose shaft seals, rubber hose crimps, and aged O-rings at pipe couplings.',
      },
      {
        q: 'Can a leaking evaporator be repaired without removing the dashboard?',
        a: 'If an evaporator core has pinhole corrosion, it is located inside the HVAC box behind the dashboard. Proper repair or replacement requires careful dashboard disassembly by specialized technicians to prevent dashboard rattles.',
      },
    ],
    image: '/workshop-vehicles.webp',
    imageAlt: 'Automotive AC leak detection with nitrogen pressure gauges at Janaka Auto AC Gampaha',
    keywords: [
      'Car AC Leak Detection Gampaha',
      'Car AC Gas Leak Sri Lanka',
      'Nitrogen AC Pressure Test Gampaha',
      'Car AC Gas Leaking Fix Gampaha',
      'Auto AC Leak Repair Miriswatta',
    ],
    sinhalaKeywords: [
      'කාර් AC ලීක් පරීක්ෂාව',
      'වාහනයේ AC ගෑස් ලීක් වීම',
      'AC බට ලීක් චෙක් කිරීම ගම්පහ',
    ],
  },
  {
    slug: 'car-ac-diagnostics',
    number: '05',
    title: 'Complete Car AC Diagnostics & Climate Inspection',
    seoTitle: 'Car AC Diagnostics Gampaha | Electrical & Pressure Check | Janaka Auto AC',
    metaDescription:
      'Structured car AC diagnostics in Gampaha. Manifold pressure tests, digital vent temperature logging, electrical climate scan, and sensor checks in Miriswatta.',
    h1: 'Structured Car AC Diagnostics & Climate Inspection in Gampaha',
    tagline: 'Accurate Dual-Gauge Thermodynamic & Electronic Climate Control Analysis',
    overview:
      'Modern automotive climate control is an integrated thermodynamic and electronic system. When your AC acts erratically—cooling well at night but blowing warm in afternoon sun, or cooling on the passenger side while blowing lukewarm on the driver side—the cause could be anything from a faulty ambient temperature sensor to a stuck blend door actuator or an over-pressurized condenser fan. At Janaka Auto AC on Miriswatta Road, Gampaha, our structured diagnosis eliminates guesswork and provides you with a clear, verified picture of your vehicle’s climate health.',
    symptoms: [
      'Intermittent cooling: AC works for 15 minutes, then cuts off and blows warm air',
      'Temperature difference between driver and passenger vents on dual-zone systems',
      'Cooling performance drops drastically during sunny midday heat in traffic',
      'Radiator/condenser cooling fan does not switch to high speed when AC is activated',
      'AC compressor clutch clicks on and off every few seconds (rapid short-cycling)',
      'Dashboard climate control screen flashes error codes or defrost lights',
    ],
    whatIsIncluded: [
      'Dual-port manifold gauge reading (Low-side suction & High-side head pressures)',
      'Digital thermistor probe measurement at center dash vent output (Target 4.5°C)',
      'Condenser cooling fan speed stages and thermal cut-in temperature verification',
      'Compressor clutch relay, high-pressure cutoff switch, and fuse integrity check',
      'HVAC blend door actuator sweep and air distribution flap inspection',
      'Written failure diagnosis and fixed repair quote before any work commences',
    ],
    processSteps: [
      {
        title: '1. Customer Consultation & Symptom History',
        desc: 'We discuss when the issue occurs: at idle, after 30 minutes of driving, during rainy weather, or under direct sunlight.',
      },
      {
        title: '2. Static & Operating Pressure Evaluation',
        desc: 'We record static pressure (engine off) to evaluate gas volume, followed by dynamic high and low operating pressures across multiple engine RPMs.',
      },
      {
        title: '3. Electrical & Actuator Audit',
        desc: 'We inspect the compressor control solenoid (PWM valve on newer variable displacement compressors), pressure transducer sensors, and relay contacts.',
      },
      {
        title: '4. Thermal Rejection & Airflow Measurement',
        desc: 'We audit condenser fin cleanliness, airflow velocity through the radiator pack, and cabin filter resistance.',
      },
      {
        title: '5. Comprehensive Technical Briefing',
        desc: 'You receive a clear explanation of what is malfunctioning, what parts need attention, and an honest quotation with no hidden fees.',
      },
    ],
    faqs: [
      {
        q: 'Why does my car AC cool well when moving but turns warm when idling?',
        a: 'This is usually caused by inadequate airflow across the front condenser. Common reasons include a failing condenser radiator fan motor, dirty condenser fins clogged with road grime, or an overcharged system causing extreme high-side pressure at idle.',
      },
      {
        q: 'What does it mean when one side of the car is cold and the other is warm?',
        a: 'On dual-zone systems, this is often caused by a malfunctioning blend door actuator. On single-zone systems, it is a classic sign of low refrigerant: the evaporator is only partially flooded, chilling half the airflow while the rest remains warm.',
      },
      {
        q: 'How much does a diagnosis cost at your Gampaha workshop?',
        a: 'We provide an honest diagnostic check at our workshop on Miriswatta Road. If repairs are carried out with us, the diagnostic inspection is included in the service.',
      },
    ],
    image: '/ac-temp-test.webp',
    imageAlt: 'Digital probe thermometer testing vehicle climate vent temperature in Gampaha workshop',
    keywords: [
      'Car AC Diagnostics Gampaha',
      'Car AC Diagnosis Sri Lanka',
      'Auto AC Electrician Gampaha',
      'Car Climate Control Diagnosis',
      'Car AC Not Working Gampaha',
    ],
    sinhalaKeywords: [
      'කාර් AC ඩයග්නොසිස්',
      'වාහන AC පරික්ෂාව ගම්පහ',
      'AC සිසිල් නොවීම පරීක්ෂා කිරීම',
    ],
  },
  {
    slug: 'car-ac-condenser-evaporator-service',
    number: '06',
    title: 'Condenser & Evaporator Core Service',
    seoTitle: 'Car AC Condenser & Evaporator Repair Gampaha | Janaka Auto AC',
    metaDescription:
      'Condenser replacement, evaporator core leak repair, and expansion valve calibration in Gampaha. Expert thermal core servicing on Miriswatta Road.',
    h1: 'Car AC Condenser & Evaporator Core Service in Gampaha',
    tagline: 'High-Efficiency Heat Exchanger Servicing: Maximum Thermal Transfer & Clean Airflow',
    overview:
      'The condenser (at the front of your car) and the evaporator (hidden behind the dashboard) are the two vital heat exchangers in your vehicle’s climate circuit. The condenser expels heat absorbed from the cabin out into the atmosphere, while the evaporator absorbs heat from inside the car to leave the airflow ice-cold. If the condenser is choked with road dirt or damaged by stone chips, heat cannot escape; if the evaporator has corroded pinhole leaks or is packed with bacterial grime, your cabin will smell foul and stay warm. At Janaka Auto AC, we service, clean, flush, and replace condensers and evaporator cores to restore maximum thermal exchange.',
    symptoms: [
      'AC cools weakly when driving through heavy Sri Lankan heat and midday sunshine',
      'Water dripping into the front passenger or driver footwell carpets',
      'Persistent damp, moldy, or chemical smell emerging from the dashboard vents',
      'Visible bent fins, oil spots, or road debris clogging the condenser behind the front bumper',
      'AC lines freezing over with white ice under the bonnet',
      'Gas keeps escaping but all pipes and compressor joints in the engine bay appear dry',
    ],
    whatIsIncluded: [
      'Condenser core fin flushing and micro-puncture pressure hold testing',
      'Receiver-drier desiccant cartridge replacement during major thermal servicing',
      'Careful dashboard removal and reassembly for evaporator replacement with zero rattle',
      'Thermal expansion valve (TXV) superheat calibration and blockage clearing',
      'Anti-bacterial foam cleaning of the evaporator housing box to kill mold spores',
      'Full vacuum dehydration and calibrated refrigerant recharge after installation',
    ],
    processSteps: [
      {
        title: '1. Thermal Exchange Assessment',
        desc: 'We measure temperature delta across the condenser face and evaporator outlet to evaluate thermal efficiency.',
      },
      {
        title: '2. Condenser Cleaning or Replacement',
        desc: 'If the condenser is clogged with road dust, we chemically flush the exterior fins. If corroded or punctured by stones, we fit an OEM-grade replacement core.',
      },
      {
        title: '3. Evaporator Inspection & Disassembly',
        desc: 'When in-dash evaporator leaks are confirmed, our technicians carefully disassemble dashboard trim and HVAC ducting without breaking clips.',
      },
      {
        title: '4. Thermal Expansion Valve (TXV) Renewal',
        desc: 'We clean or renew the expansion valve to ensure smooth liquid-to-vapor expansion without icing or starving the core.',
      },
      {
        title: '5. Reassembly, Pressure Test & Warranty',
        desc: 'The HVAC assembly is sealed with new foam gaskets, nitrogen pressure-checked, reinstalled with zero dashboard rattles, and calibrated for guaranteed cooling.',
      },
    ],
    faqs: [
      {
        q: 'Why does water leak onto the passenger floorboard when the AC is on?',
        a: 'The evaporator removes humidity from cabin air, creating water condensation. This water is supposed to drain outside through an underbody tube. If the drain tube becomes clogged with dust, water backs up inside the HVAC housing and overflows onto your floorboard carpets.',
      },
      {
        q: 'Will my dashboard rattle after replacing an evaporator core?',
        a: 'Not when done by experienced specialists. At Janaka Auto AC, we have over 15 years of experience servicing dashboards on Japanese, European, and Korean vehicles. We label every screw, replace broken plastic clips, and install anti-vibration felt tape to guarantee a silent, rattle-free dashboard.',
      },
      {
        q: 'What is the role of the receiver-drier?',
        a: 'The receiver-drier contains a desiccant pack that absorbs microscopic moisture and filters debris in the refrigerant loop. It should always be replaced whenever the system is opened for major repairs.',
      },
    ],
    image: '/condenser-replacement.webp',
    imageAlt: 'New condenser with receiver-drier ready for installation in Gampaha workshop',
    keywords: [
      'Car AC Condenser Repair Gampaha',
      'Car AC Evaporator Replacement Sri Lanka',
      'Cooling Coil Repair Gampaha',
      'Auto AC Condenser Gampaha',
      'Car AC Water Leaking Inside',
    ],
    sinhalaKeywords: [
      'කන්ඩෙන්සර් මාරු කිරීම',
      'ඉවැපරේටර් කූලින් කොයිල් අලුත්වැඩියාව',
      'වාහනයේ ඇතුලට වතුර කාන්දු වීම',
    ],
  },
  {
    slug: 'car-ac-maintenance',
    number: '07',
    title: 'Car AC Preventative Maintenance & Cabin Air Sanitization',
    seoTitle: 'Car AC Maintenance Gampaha | Cabin Filter & Blower Service | Janaka Auto AC',
    metaDescription:
      'Preventative car AC maintenance in Gampaha. Blower motor cleaning, cabin filter replacement, vent anti-bacterial treatment, and belt inspections in Miriswatta.',
    h1: 'Car AC Preventative Maintenance & Airflow Sanitization in Gampaha',
    tagline: 'Protect Your Health & Prevent Costly Climate Breakdowns with Routine Workshop Care',
    overview:
      'Sri Lanka’s tropical climate combines intense heat, high humidity, and airborne road dust. Over months of daily driving, your car’s cabin filter collects dust, pollen, exhaust soot, and moisture—creating a breeding ground for bacteria and mold inside your dashboard ducting. At the same time, road dust coats your condenser fins, forcing your compressor to work harder under extreme head pressure. Routine preventative maintenance at Janaka Auto AC keeps your cabin air pure, safeguards your family’s respiratory health, and extends the lifespan of your expensive compressor.',
    symptoms: [
      'Airflow feels weak even when the fan blower speed is set to maximum',
      'Unpleasant musty, wet-dog, or stale odor when the AC is first switched on',
      'Dust or sneezing triggered when turning on the climate blower',
      'Fan blower motor makes a buzzing, fluttering, or chirping noise',
      'Vehicle fuel economy drops noticeably when the AC is running',
      'Condenser fins behind the front grille look black and choked with grime',
    ],
    whatIsIncluded: [
      'Removal and replacement of cabin pollen/activated carbon air filter',
      'Blower motor squirrel-cage fan removal, leaf clearing, and motor bearing lubrication',
      'Anti-bacterial and anti-fungal sanitizing spray through evaporator core and ducting',
      'Exterior high-pressure water wash of front condenser fins to clear packed road grime',
      'Compressor drive belt tension check and visual pulley inspection',
      'System operating pressure and vent temperature performance sign-off',
    ],
    processSteps: [
      {
        title: '1. Cabin Airflow & Filter Audit',
        desc: 'We access the cabin filter housing behind the glovebox and inspect the particulate loading, mold spots, and airflow resistance.',
      },
      {
        title: '2. Blower Motor Service',
        desc: 'We remove the blower assembly, clear accumulated dry leaves and debris, test motor resistor speed resistance, and lubricate spindle bearings.',
      },
      {
        title: '3. Evaporator Sanitization Treatment',
        desc: 'We apply professional automotive disinfectant through the HVAC intake to eliminate bacterial colonies and mold spores that cause musty odors.',
      },
      {
        title: '4. Condenser Fin Cleaning',
        desc: 'We carefully pressure-wash the front condenser fins to remove mud, bugs, and traffic film, significantly reducing compressor head pressures.',
      },
      {
        title: '5. Belt & Pressure Verification',
        desc: 'We check the serpentine drive belt for cracking or glazed slack, verify gas pressures on our gauges, and confirm sub-zero vent delivery.',
      },
    ],
    faqs: [
      {
        q: 'How often should I change my car’s cabin air filter in Sri Lanka?',
        a: 'Due to road dust, traffic pollution, and humidity in Sri Lanka, cabin air filters should be inspected every 6 months and replaced every 10,000 to 15,000 km. A clogged filter restricts airflow and strains the blower motor.',
      },
      {
        q: 'What causes the bad smell when I turn on my car AC?',
        a: 'The evaporator core is constantly damp from condensation. When dust settles on this damp core, bacteria and mold grow, producing musty microbial volatile organic compounds (MVOCs). Our anti-bacterial treatment sterilizes the core and eliminates the smell at its source.',
      },
      {
        q: 'Can regular AC maintenance improve my car’s fuel efficiency?',
        a: 'Yes. A clean condenser allows heat to escape easily, lowering system head pressure. This reduces the mechanical load on your engine from the compressor, noticeably improving fuel economy and acceleration in city driving.',
      },
    ],
    image: '/completed-job.webp',
    imageAlt: 'Customer vehicle completed and ready for pickup outside Janaka Auto AC in Gampaha',
    keywords: [
      'Car AC Maintenance Gampaha',
      'Car AC Service Sri Lanka',
      'Car AC Cabin Filter Replacement Gampaha',
      'Car AC Bad Smell Removal',
      'Auto AC Cleaning Gampaha',
    ],
    sinhalaKeywords: [
      'කාර් AC සර්විස් ගම්පහ',
      'AC ෆිල්ටර් මාරු කිරීම',
      'AC එකෙන් එන නරක සුවඳ ඉවත් කිරීම',
    ],
  },
];

// 5. Educational Guides (National Sri Lanka-Wide SEO Content)
export const blogArticles: BlogArticle[] = [
  {
    slug: 'how-to-choose-a-car-ac-garage-in-sri-lanka',
    title: 'How to Choose a Reliable Car AC Garage in Sri Lanka (Workshop Guide)',
    seoTitle: 'How to Choose a Car AC Garage in Sri Lanka | Workshop Guide | Janaka Auto AC',
    metaDescription:
      'Searching for the best AC garage in Sri Lanka? Learn what diagnostic equipment, refrigerant purity standards, and repair practices separate trusted workshops from guesswork.',
    excerpt:
      'Finding a trustworthy car AC garage in Sri Lanka can be challenging. Many roadside shops simply top up gas without checking for leaks, or immediately push you to replace costly compressors. Here is what to look for when choosing a genuine automotive climate specialist.',
    readTime: '7 min read',
    publishedDate: '2026-10-15',
    updatedDate: '2026-11-10',
    author: 'Janaka Auto AC Technical Team',
    image: '/workshop-exterior.webp',
    imageAlt: 'Janaka Auto AC workshop facility on Miriswatta Road in Gampaha',
    sections: [
      {
        heading: '1. The Difference Between an AC Specialist and a General Garage',
        paragraphs: [
          'Many general auto repair shops treat vehicle air conditioning as an afterthought alongside oil changes and brake pads. However, automotive climate control is a precision thermodynamic science involving high-pressure phase changes, synthetic lubricants, and electronic sensor logic.',
          'A specialized AC workshop invests in dedicated dual-port manifold gauge sets, dry nitrogen pressure rigs, vacuum pumps, electronic halogen sniffers, and clean rebuild benches. When selecting a garage in Gampaha or anywhere in Sri Lanka, choose a team dedicated purely to vehicle air conditioning.',
        ],
        keyTakeaways: [
          'Specialist workshops focus 100% of their tools and daily practice on climate systems.',
          'They have the equipment to diagnose root causes rather than selling quick temporary top-ups.',
        ],
      },
      {
        heading: '2. Insist on a Proper Diagnosis Before Approving Repairs',
        paragraphs: [
          'If a technician looks under your bonnet for ten seconds and immediately claims, "Your compressor is dead, you need a new one for Rs. 150,000," be cautious. A reputable technician will connect manifold gauges to read both high-side and low-side pressures while running the engine.',
          'They will inspect the magnetic clutch coil resistance, listen to bearing noise with a mechanic’s stethoscope, and check whether electrical relays or control valves are at fault before declaring the compressor ruined.',
        ],
        keyTakeaways: [
          'Always demand dual manifold gauge pressure readings (High Side and Low Side).',
          'Reputable workshops explain what failed, why it failed, and show you the reading.',
        ],
      },
      {
        heading: '3. Look for a "Repair Over Replace" Philosophy',
        paragraphs: [
          'Replacing whole assemblies is easy for mechanics, but expensive for customers. In many automotive compressors, the internal pump is completely healthy, but the magnetic clutch coil has burned out, the front shaft seal has dried up, or the pulley bearing is worn.',
          'A craftsman workshop will offer component-level rebuilding: pressing in a new Japanese double-row bearing, replacing the shaft seal, or rewinding the coil. This saves you up to 60% of the cost of a brand new assembly while delivering identical cooling performance.',
        ],
        keyTakeaways: [
          'Ask if the workshop can rebuild or repair bearings, clutches, and seals.',
          'This repair-first mindset is a hallmark of genuine automotive craftsmanship.',
        ],
      },
      {
        heading: '4. Refrigerant Purity: Why Virgin Gas and Deep Vacuums Matter',
        paragraphs: [
          'Low-grade contaminated refrigerants and improper charging procedures cause thousands of premature compressor failures in Sri Lanka every year. Moisture in an air conditioning loop mixes with refrigerant to form corrosive hydrochloric and hydrofluoric acids that eat away aluminum valves.',
          'A professional workshop will always pull a deep vacuum for 20 to 30 minutes before charging to boil off every trace of moisture, and use pure virgin R134a or R1234yf weighed on a digital gram scale.',
        ],
        keyTakeaways: [
          'Never allow a workshop to charge gas without a minimum 20-minute deep vacuum evacuation.',
          'Refrigerant must be weighed with a digital scale to match the vehicle manufacturer specification.',
        ],
      },
      {
        heading: '5. Transparent Customer Communication and Clear Pricing',
        paragraphs: [
          'Honesty is the most important factor in automotive service. A trusted workshop will provide a clear estimate before turning a bolt, keep your replaced parts for your inspection, and clearly explain maintenance steps to keep your cabin ice-cold for years.',
          'At Janaka Auto AC in Miriswatta, Gampaha, we have served vehicle owners across the Western Province for over 15 years based on these exact principles.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is Janaka Auto AC considered the best AC garage in Sri Lanka?',
        a: 'We do not make boastful claims about being "the best in Sri Lanka." What we do offer is 15+ years of dedicated air conditioning specialization, modern diagnostic tools, honest component-level repairs, and thousands of satisfied vehicle owners in Gampaha and across the Western Province.',
      },
      {
        q: 'Can customers outside Gampaha visit your workshop?',
        a: 'Yes! We regularly welcome vehicle owners from Colombo, Kadawatha, Yakkala, Minuwangoda, Ja-Ela, Negombo, and Kurunegala who travel to our Miriswatta facility for specialist repairs.',
      },
    ],
    relatedServices: [
      { title: 'Car AC Repair in Gampaha', href: '/services/car-ac-repair-gampaha' },
      { title: 'Compressor Repair & Rebuild', href: '/services/car-ac-compressor-repair' },
      { title: 'Nitrogen Leak Detection', href: '/services/car-ac-leak-detection' },
    ],
  },
  {
    slug: 'car-ac-not-cooling-causes',
    title: 'Car AC Not Cooling Properly: Common Causes & Real Fixes in Sri Lanka Heat',
    seoTitle: 'Car AC Not Cooling Causes & Fixes | Sri Lanka Climate Guide | Janaka Auto AC',
    metaDescription:
      'Car AC blowing warm air or cooling weakly? Discover the top reasons vehicle air conditioners fail in Sri Lanka heat and how technicians diagnose them.',
    excerpt:
      'There is nothing more frustrating than stepping into your car on a sweltering 34°C afternoon in Sri Lanka only to find your AC blowing warm room-temperature air. Here are the 6 most common reasons car air conditioning fails and how to fix them permanently.',
    readTime: '6 min read',
    publishedDate: '2026-10-18',
    updatedDate: '2026-11-10',
    author: 'Janaka Auto AC Technical Team',
    image: '/ac-temp-test.webp',
    imageAlt: 'Diagnosing car AC vent temperature in Gampaha workshop',
    sections: [
      {
        heading: '1. Low Refrigerant Caused by a Micro-Leak',
        paragraphs: [
          'Refrigerant does not disappear over time. If cooling has steadily degraded over weeks, you have a physical micro-leak. When the gas level drops, the evaporator core cannot absorb heat, resulting in lukewarm air from the vents.',
          'Refilling gas without fixing the leak guarantees you will be back with warm air in a few weeks. The real fix is a dry nitrogen pressure test up to 280 PSI to pinpoint and seal the leaking O-ring, hose crimp, or condenser tube.',
        ],
      },
      {
        heading: '2. Clogged Front Condenser Fins',
        paragraphs: [
          'The condenser sits right at the front of your car, ahead of the engine radiator. On Sri Lankan roads, it is constantly bombarded by dust, insects, mud, and road grime.',
          'When the fins become clogged, the condenser cannot shed heat into the outside air. The high-side pressure skyrockets, causing the AC to blow warm air when idling or in traffic jams, even if the gas charge is full.',
        ],
      },
      {
        heading: '3. Compressor Clutch or Bearing Failure',
        paragraphs: [
          'The compressor must spin to pressurize refrigerant. If the magnetic clutch coil burns out or the clutch air gap wears too wide, the compressor pulley will free-wheel without engaging the pump. You will hear no "click" when pressing the AC button, and no cooling will take place.',
        ],
      },
      {
        heading: '4. Choked Cabin Air Pollen Filter',
        paragraphs: [
          'Located behind your glovebox, the cabin filter strains incoming air before it crosses the evaporator. If it is packed with black road dust, airflow drops to a whisper. The evaporator can even freeze into a block of ice because not enough warm cabin air passes over it.',
        ],
      },
      {
        heading: '5. Radiator / Condenser Cooling Fan Failure',
        paragraphs: [
          'When your car is stopped at a traffic light in Gampaha or Colombo, outside air does not flow naturally through your bumper. The electric cooling fan must pull air through the condenser. If the fan motor brushes are worn or the relay is burnt, the AC will instantly turn warm at idle.',
        ],
      },
      {
        heading: '6. Stuck Expansion Valve (TXV)',
        paragraphs: [
          'The expansion valve regulates the liquid refrigerant flow into the evaporator. If moisture in the system freezes inside the valve orifice or debris jams the pin, refrigerant flow stops and cooling cuts off completely.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does my car AC cool on the highway but not in traffic?',
        a: 'When driving fast on the highway, high-speed ram air rushes through your front bumper and cools the condenser. In traffic, cooling relies entirely on the electric condenser fan. If the fan is weak or the condenser fins are dirty, cooling fails at idle.',
      },
      {
        q: 'Can I just keep topping up gas every few months?',
        a: 'No. Running with a leak allows air and moisture into the system, which destroys compressor oil and leads to complete compressor seizure, costing far more than fixing the leak early.',
      },
    ],
    relatedServices: [
      { title: 'Structured AC Diagnostics', href: '/services/car-ac-diagnostics' },
      { title: 'AC Gas Refill & Vacuum Service', href: '/services/car-ac-gas-refilling' },
      { title: 'Condenser & Evaporator Service', href: '/services/car-ac-condenser-evaporator-service' },
    ],
  },
  {
    slug: 'when-to-refill-car-ac-gas',
    title: 'When Should You Refill Car AC Gas? Common Myths vs Real Facts',
    seoTitle: 'When to Refill Car AC Gas | Common Myths Explained | Janaka Auto AC',
    metaDescription:
      'Does car AC gas get used up over time? Learn why AC systems are sealed loops, when a recharge is actually needed, and why repeated refilling without fixing leaks is a waste.',
    excerpt:
      'One of the most persistent automotive myths in Sri Lanka is that car AC gas "gets burnt" or "used up" like fuel. The truth is quite different: an automotive AC system is completely sealed. Here is the engineering reality behind when and how to refill your car’s refrigerant.',
    readTime: '5 min read',
    publishedDate: '2026-10-22',
    updatedDate: '2026-11-10',
    author: 'Janaka Auto AC Technical Team',
    image: '/ac-gas-filling.webp',
    imageAlt: 'Manifold gauges monitoring refrigerant charging at Janaka Auto AC',
    sections: [
      {
        heading: '1. Myth: Car AC Gas Gets Consumed During Daily Use',
        paragraphs: [
          'Fact: Refrigerant is not a fuel. It does not burn, evaporate into the cabin, or get consumed. The AC system is a continuous closed loop: refrigerant is compressed, condensed into liquid, expanded, boiled into gas, and recycled continuously.',
          'In a healthy vehicle with tight O-rings, flexible rubber hoses, and an undamaged condenser, the refrigerant can circulate for 5 years or longer without losing a single gram.',
        ],
      },
      {
        heading: '2. Fact: If Gas Is Low, a Physical Leak Exists',
        paragraphs: [
          'If your vehicle’s cooling performance has dropped and gauges show low pressure, gas has physically escaped into the atmosphere through a leak point.',
          'Because R134a molecules are extremely small, they can seep through microscopic pinholes in aluminum condenser tubes or past dried rubber O-rings. Refilling gas without fixing the leak guarantees you will lose the new gas too.',
        ],
      },
      {
        heading: '3. When Is a Refrigerant Recharge Genuinely Required?',
        paragraphs: [
          'A legitimate gas recharge is required in three circumstances: (1) After finding and repairing an identified leak; (2) After replacing a mechanical part such as a compressor, condenser, or evaporator; (3) When the system has been opened for engine repairs or collision work.',
        ],
      },
      {
        heading: '4. The Danger of Overcharging Refrigerant',
        paragraphs: [
          'Many inexperienced mechanics think "more gas equals more cooling." This is scientifically false. An overcharged AC system leaves no room for the liquid refrigerant to vaporize inside the evaporator.',
          'Head pressures spike dangerously, the compressor strains and consumes excess engine power, the clutch slips, and the air blowing into your cabin actually becomes warmer.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How do I know my car has the exact right amount of gas?',
        a: 'The only reliable way is to evacuate the system completely, draw a deep vacuum, and weigh the exact charge specified on the vehicle under-bonnet sticker using digital scales.',
      },
      {
        q: 'What is the correct pressure for car AC gas?',
        a: 'On a standard 30°C Sri Lankan day, operating low-side pressure should hover around 28–35 PSI, while high-side pressure should read roughly 180–220 PSI with the compressor running.',
      },
    ],
    relatedServices: [
      { title: 'A/C Gas Refilling & Recharge', href: '/services/car-ac-gas-refilling' },
      { title: 'Nitrogen Leak Detection', href: '/services/car-ac-leak-detection' },
    ],
  },
  {
    slug: 'car-ac-gas-leak-signs',
    title: 'Signs of a Car AC Gas Leak & How Technicians Locate It',
    seoTitle: 'Car AC Gas Leak Signs & Detection Methods | Workshop Guide | Janaka Auto AC',
    metaDescription:
      'Frequent cooling loss? Discover key signs of a refrigerant leak and how professional workshops use dry nitrogen and halogen sniffers to pinpoint micro-punctures.',
    excerpt:
      'A slow refrigerant leak is the number one cause of car air conditioning trouble. Discover the physical warning signs of a leak and understand the technical diagnostic methods professional workshops use to pinpoint them.',
    readTime: '6 min read',
    publishedDate: '2026-10-25',
    updatedDate: '2026-11-10',
    author: 'Janaka Auto AC Technical Team',
    image: '/workshop-vehicles.webp',
    imageAlt: 'Automotive technician conducting nitrogen pressure leak testing in Gampaha',
    sections: [
      {
        heading: '1. Oily Dirt Spots on AC Components and Hoses',
        paragraphs: [
          'Refrigerant gas carries synthetic PAG oil with it to lubricate the compressor. When refrigerant leaks out through a pinhole, the oil escapes alongside it.',
          'Because oil does not evaporate, airborne road dust sticks to the wet spot, forming a telltale dark, greasy grime patch. You can often spot these around rubber hose crimps, pipe flanges, and condenser corners.',
        ],
      },
      {
        heading: '2. Hissing Noise Inside the Dashboard',
        paragraphs: [
          'When gas pressure drops below normal operating thresholds, the expansion valve starves for liquid refrigerant. Instead of a smooth liquid spray, it meters a mixture of gas bubbles, creating a distinct hissing or gargling noise inside the dashboard when the AC is switched on.',
        ],
      },
      {
        heading: '3. Rapid Clutch Short-Cycling',
        paragraphs: [
          'Modern vehicles feature a low-pressure cutoff switch. When refrigerant is low, pressure drops rapidly when the compressor pulls suction, causing the safety switch to cut power to the clutch. The compressor clicks on and off every 5 to 10 seconds without producing steady cooling.',
        ],
      },
      {
        heading: '4. How Janaka Auto AC Tests for Micro-Leaks',
        paragraphs: [
          'We use dry high-pressure nitrogen pressurized to 280 PSI. Nitrogen molecules are stable and highlight pressure drops immediately on our gauges. We then trace joints with electronic halogen sniffer probes sensitive to 3 grams/year.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can leak-stop chemical sealants fix my car AC leak?',
        a: 'We strongly advise against liquid leak-stop additives sold in cans. These chemical sealants react with moisture to harden. While they may temporarily plug a tiny pinhole, they frequently clog expansion valves, ruin compressor reed valves, and contaminate workshop recovery machines.',
      },
      {
        q: 'How long does a proper leak test take?',
        a: 'A thorough nitrogen pressure hold test and electronic sniffer inspection typically takes 45 to 60 minutes.',
      },
    ],
    relatedServices: [
      { title: 'Nitrogen Leak Detection', href: '/services/car-ac-leak-detection' },
      { title: 'Condenser & Evaporator Repair', href: '/services/car-ac-condenser-evaporator-service' },
    ],
  },
  {
    slug: 'car-ac-compressor-problems',
    title: 'Signs of a Damaged Car AC Compressor: Repair vs Replace Options',
    seoTitle: 'Car AC Compressor Problems, Signs & Repair Guide | Janaka Auto AC',
    metaDescription:
      'Whining compressor noise, clutch not engaging, or no cold air? Learn common compressor failures and when clutch or bearing repairs save you money over full replacement.',
    excerpt:
      'A failing car AC compressor can produce strange engine noises, rob engine power, and leave your vehicle unbearable in tropical heat. Here is how to diagnose compressor problems early and save thousands of rupees with component-level repairs.',
    readTime: '6 min read',
    publishedDate: '2026-10-28',
    updatedDate: '2026-11-10',
    author: 'Janaka Auto AC Technical Team',
    image: '/compressor-repair.webp',
    imageAlt: 'Disassembled car AC compressor unit on workshop bench at Janaka Auto AC',
    sections: [
      {
        heading: '1. Squealing, Grinding, or Rumbling Noises',
        paragraphs: [
          'If you hear a high-pitched squeal or metallic rumbling from the front of the engine that changes when you press the AC button, the compressor pulley bearing or magnetic clutch hub is likely worn.',
          'Leaving a noisy bearing unchecked can cause it to seize completely, snapping your serpentine drive belt and disabling your alternator and power steering.',
        ],
      },
      {
        heading: '2. AC Clutch Not Engaging (No Clicking Sound)',
        paragraphs: [
          'When you activate the climate control, the magnetic coil behind the compressor pulley energizes, magnetically pulling the clutch plate against the spinning pulley.',
          'If the coil burns out due to age or excessive heat, the clutch will never engage. The pulley simply spins freely, and zero cooling takes place.',
        ],
      },
      {
        heading: '3. Loss of Compression at Idle Speeds',
        paragraphs: [
          'Inside the compressor, miniature pistons and reed valves compress low-pressure vapor into high-pressure gas. Over years of use, reed valves can become weak or scored.',
          'When this occurs, the compressor cannot generate sufficient pressure differential at engine idle speeds (800 RPM), causing the AC to blow warm air until you accelerate on the open road.',
        ],
      },
      {
        heading: '4. When Can a Compressor Be Repaired vs Replaced?',
        paragraphs: [
          'Bearing noise, clutch plate slip, coil burnout, shaft seal leaks, and control valve sticking can all be repaired with genuine replacement components.',
          'Full replacement is only required if internal pistons have suffered "black death" catastrophic seizure, which contaminates the entire circuit with metal debris.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is compressor "Black Death"?',
        a: 'When a compressor runs completely starved of lubrication, internal aluminum pistons grind directly against cylinder walls, creating microscopic black metal powder that circulates through every hose and valve. In this event, a full system chemical flush and new compressor/condenser are mandatory.',
      },
      {
        q: 'How can I extend the lifespan of my car AC compressor?',
        a: 'Run your AC for at least 10 minutes every week even in rainy weather to circulate oil through the seals, ensure your gas is never depleted, and wash your front condenser fins regularly.',
      },
    ],
    relatedServices: [
      { title: 'Compressor Repair & Rebuild', href: '/services/car-ac-compressor-repair' },
      { title: 'Structured Climate Diagnostics', href: '/services/car-ac-diagnostics' },
    ],
  },
  {
    slug: 'car-ac-maintenance-guide',
    title: 'Complete Car AC Maintenance Guide for Sri Lankan Drivers',
    seoTitle: 'Car AC Maintenance Guide for Sri Lanka | Climate Care Tips | Janaka Auto AC',
    metaDescription:
      'Essential automotive climate maintenance tips for Sri Lanka’s tropical heat and dust. Keep your AC ice-cold and prevent costly compressor breakdowns.',
    excerpt:
      'Operating an automotive air conditioner in Sri Lanka presents unique challenges: constant 30°C+ ambient temperatures, high humidity, road dust, and long hours idling in Colombo and Gampaha traffic jams. Follow these practical maintenance guidelines to protect your AC system.',
    readTime: '5 min read',
    publishedDate: '2026-11-02',
    updatedDate: '2026-11-10',
    author: 'Janaka Auto AC Technical Team',
    image: '/completed-job.webp',
    imageAlt: 'Customer vehicle inspected and certified at Janaka Auto AC',
    sections: [
      {
        heading: '1. Replace Your Cabin Air Filter Every 10,000 km',
        paragraphs: [
          'Sri Lankan roads are laden with diesel exhaust particles, red road dust, and organic pollen. Your cabin filter catches all of this to protect your lungs.',
          'When neglected, a clogged filter starves the blower motor, reduces vent airflow by up to 70%, and causes unpleasant musty odors.',
        ],
      },
      {
        heading: '2. Keep Your Front Condenser Radiator Clear',
        paragraphs: [
          'Every time you wash your car, ask the service station or use a gentle garden hose to spray water through your front bumper grille to rinse accumulated mud, dried bugs, and dirt from the condenser fins.',
          'Never use an ultra-high-pressure industrial jet washer directly at close range, as this can bend the fragile aluminum cooling fins.',
        ],
      },
      {
        heading: '3. Never Turn On AC Immediately at Full Blast After Parking in Direct Sun',
        paragraphs: [
          'When your car sits parked in the afternoon sun, cabin temperatures can reach 55°C. Rolling down your windows for the first 60 seconds of driving expels the trapped superheated air naturally.',
          'Once the hot air is flushed out, roll up the windows and engage the AC. This drastically reduces initial thermal shock on your compressor and cools the cabin twice as fast.',
        ],
      },
      {
        heading: '4. Schedule an Annual Manifold Pressure Check',
        paragraphs: [
          'Have a specialist workshop connect manifold gauges once a year. A 10-minute pressure audit verifies that high and low pressures are in harmony, the cooling fan engages properly, and no slow micro-leaks are developing.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Does using recirculated air mode save fuel?',
        a: 'Yes! In "Recirculate" mode, the AC re-cools already chilled air from inside the cabin rather than pulling hot 34°C humid air from outside, reducing compressor workload and improving fuel efficiency.',
      },
      {
        q: 'Why should I run my AC in cold or rainy weather?',
        a: 'The AC system acts as a dehumidifier, clearing fogged windscreen glass instantly. Furthermore, running the system circulates PAG oil, keeping rubber seals supple and preventing gas leaks.',
      },
    ],
    relatedServices: [
      { title: 'Airflow & Cabin Air Maintenance', href: '/services/car-ac-maintenance' },
      { title: 'Car AC Repair in Gampaha', href: '/services/car-ac-repair-gampaha' },
    ],
  },
  {
    slug: 'car-ac-service-guide-sri-lanka',
    title: 'The Ultimate Car Air Conditioning Service Guide in Sri Lanka',
    seoTitle: 'Car AC Service Guide Sri Lanka | Refrigerants, Pressures & Care | Janaka Auto AC',
    metaDescription:
      'Everything you need to know about automotive AC servicing in Sri Lanka: R134a vs R1234yf gases, PAG synthetic lubricants, operating pressures, and maintenance intervals.',
    excerpt:
      'A comprehensive technical primer for Sri Lankan vehicle owners: understanding your car’s climate circuit, comparing R134a and R1234yf refrigerants, and knowing what legitimate servicing entails.',
    readTime: '7 min read',
    publishedDate: '2026-11-05',
    updatedDate: '2026-11-10',
    author: 'Janaka Auto AC Technical Team',
    image: '/ac-diagnostics.webp',
    imageAlt: 'Complete automotive climate diagnostic manifold rig at Janaka Auto AC',
    sections: [
      {
        heading: '1. The Thermodynamic Cooling Cycle Explained Simply',
        paragraphs: [
          'Your car AC does not create cold; it removes heat. The compressor pumps high-pressure gas to the front condenser, where outdoor airflow turns it into a high-pressure liquid. This liquid travels through the receiver-drier to the expansion valve, which drops the pressure drastically.',
          'The sudden pressure drop causes the refrigerant to flash into a freezing mist inside the evaporator. Your blower fan blows cabin air across these freezing fins, delivering sub-zero chilled air into your vents.',
        ],
      },
      {
        heading: '2. R134a vs Modern R1234yf Refrigerants in Sri Lanka',
        paragraphs: [
          'Most vehicles on Sri Lankan roads (manufactured before 2018–2020) utilize R134a refrigerant. Newer European and hybrid Japanese models feature R1234yf, which has a Global Warming Potential (GWP) of less than 1.',
          'R1234yf requires specialized charging couplings, dedicated manifold equipment, and compatible synthetic oils. It must never be mixed with standard R134a.',
        ],
      },
      {
        heading: '3. What Does a Complete 100% Guaranteed Service Include at Janaka Auto AC?',
        paragraphs: [
          'At Janaka Auto AC in Miriswatta, Gampaha, a comprehensive service includes: refrigerant recovery, 280 PSI dry nitrogen pressure test, 25-minute deep vacuum dehydration, precision digital scale recharge, fresh synthetic PAG lubricant, cabin micro-filter audit, condenser exterior wash, and digital probe vent calibration.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How long does a full comprehensive AC service take?',
        a: 'A standard complete service takes approximately 1 hour to 1.5 hours in our covered service bays.',
      },
      {
        q: 'Can I book an appointment in advance?',
        a: 'Yes! You can call or WhatsApp us at +94 71 455 1409 to reserve your intake bay and minimize waiting time.',
      },
    ],
    relatedServices: [
      { title: 'Car AC Repair in Gampaha', href: '/services/car-ac-repair-gampaha' },
      { title: 'A/C Gas Refilling & Recharge', href: '/services/car-ac-gas-refilling' },
      { title: 'Structured Climate Diagnostics', href: '/services/car-ac-diagnostics' },
    ],
  },
];

// 6. Homepage High-Value Local FAQs (Schema.org FAQPage)
export const homepageFAQs: HomepageFAQ[] = [
  {
    q: 'Where is Janaka Auto AC located in Gampaha?',
    a: 'Janaka Auto AC is conveniently located at 366 Minuwangoda–Gampaha–Miriswatta Road, Miriswatta, Gampaha. We are easily accessible from Gampaha town center, Yakkala, Minuwangoda, and Kadawatha, featuring covered service bays for sedans, SUVs, and commercial vans.',
  },
  {
    q: 'Why should I choose Janaka Auto AC over a general garage?',
    a: 'Unlike general repair garages that treat air conditioning as a sideline, automotive climate control is our 100% daily specialization. We have specialized manifold pressure gauges, dry nitrogen pressure rigs, vacuum dehydrators, electronic leak sniffers, and over 15 years of dedicated hands-on experience.',
  },
  {
    q: 'Can you repair a car AC compressor instead of replacing it?',
    a: 'Yes! We follow a strict "Repair Over Replace" philosophy. In many cases, we can repair magnetic clutch coils, replace noisy pulley bearings, renew front shaft seals, or overhaul valve plates, saving you up to 60% compared to buying a costly brand-new compressor assembly.',
  },
  {
    q: 'Why does my car AC gas keep leaking out after being refilled?',
    a: 'Automotive refrigerant is a sealed closed loop and does not burn away. If your car loses cooling, a physical leak exists. Roadside top-ups without vacuuming and leak-testing are a waste of money. We use 280 PSI dry nitrogen testing and electronic halogen sniffers to pinpoint and fix the leak permanently.',
  },
  {
    q: 'What are your workshop opening hours in Gampaha?',
    a: 'We are open 6 days a week from Tuesday to Sunday, 8:30 AM to 6:00 PM (closed on Mondays). Our weekend availability makes it easy for working professionals to service their vehicle without taking leave.',
  },
  {
    q: 'How can I book a service or get a diagnostic quotation?',
    a: 'You can tap our "Book a Service" button, message us on WhatsApp at +94 71 455 1409, or call our direct technician line for immediate advice and priority bay booking.',
  },
];

// 7. Workshop Photography
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

// 8. Simplified cooling components for interactive schematic
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

export const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'system', label: 'How A/C Works' },
  { id: 'about', label: 'About' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
] as const;
