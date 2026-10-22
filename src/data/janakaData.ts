export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  thumb?: string;
  caption: string;
  badge?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string[];
  techSpec: string;
  duration: string;
  benefit: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
}

export interface BookingSlotOption {
  time: string;
  title: string;
  description: string;
}

// 1. Business & Contact Information
export const businessInfo = {
  name: "Janaka Auto AC",
  tagline: "Architecting Pure Cool. Elevating Every Journey.",
  subTagline: "Keep cool. Drive comfortable.",
  phone: "+94 71 455 1409",
  phoneRaw: "+94714551409",
  whatsappUrl: "https://wa.me/94714551409",
  email: "janakaautoac123@gmail.com",
  address: "366 Minuwangoda–Gampaha–Miriswatta Road, Gampaha, Sri Lanka",
  addressShort: "366 Miriswatta Road, Gampaha",
  googleMapsPlaceUrl: "https://www.google.com/maps/place/Janaka+Auto+AC/@7.085055,80.0085464,17z",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=7.085055,80.0085464",
  googleMapsEmbedUrl: "https://www.google.com/maps?q=Janaka+Auto+AC%2C+366+Minuwangoda-Gampaha-Miriswatta+Rd%2C+Gampaha&z=17&output=embed",
  facebookUrl: "https://www.facebook.com/p/Janaka-AUTO-AC-61552238811366/",
  tiktokUrl: "https://www.tiktok.com/search?q=Janaka%20Auto%20AC",
};

// 2. Business Operating Schedule
export const businessHours = {
  monday: "Closed for Workshop Maintenance & Equipment Calibration",
  tuesdayToSunday: "8:30 AM – 6:00 PM",
  daysOpen: "Tuesday – Sunday (6 Days / Week)",
  note: "Workshop maintenance every Monday ensures high-precision vacuum & manifold accuracy.",
};

// 3. Trust Metrics & Engineering Benchmarks
export const trustMetrics = {
  rating: 4.9,
  reviewsCount: "60+",
  experienceYears: "15+ Years",
  coolingBenchmark: "4.5°C",
  benchmarkDescription: "Sub-Zero Digital Vent Exit Temperature Test",
  dailyBayCapacity: "8 Priority Workshop Bays Daily",
  badges: [
    {
      title: "100% Genuine OEM Parts",
      desc: "Denso, Sanden & Valeo certified components with factory seals",
    },
    {
      title: "Digital Nitrogen Leak Testing",
      desc: "280 PSI high-pressure dry nitrogen decay integrity verification",
    },
    {
      title: "Priority Same-Day Service",
      desc: "Dedicated workshop bay reservation for prompt intake & handover",
    },
    {
      title: "Multi-Brand & Hybrid Certified",
      desc: "Japanese, European luxury & high-voltage POE oil compressor engineering",
    },
  ],
};

// 4. Core Services (All 6 Primary Procedures)
export const servicesData: ServiceItem[] = [
  {
    id: "gas-refilling",
    number: "01",
    title: "A/C Gas Refilling & Precision Charging",
    summary: "Complete deep-vacuum moisture evacuation followed by exact-gram virgin R134a / R1234yf refrigerant injection and line pressure calibration.",
    details: [
      "High-vacuum deep pumpdown (down to 500 microns) to purge moisture & air",
      "Digital gram-accurate virgin R134a / R1234yf pure refrigerant charging",
      "Synthetic PAG / dielectric POE compressor oil level replenishment",
      "Dual-manifold dynamic high/low bar pressure validation",
    ],
    techSpec: "R134a / R1234yf Virgin Refrigerant",
    duration: "45–60 mins",
    benefit: "Protects compressor from premature wear, prevents pressure spikes, and restores rapid sub-zero cooling.",
  },
  {
    id: "compressor-diagnostics",
    number: "02",
    title: "Compressor Diagnostics & Overhaul",
    summary: "In-depth teardown and rebuild of magnetic clutch assemblies, bearings, and control valves rather than costly total compressor replacements.",
    details: [
      "Electromagnetic clutch coil & pulley bearing extraction and precision press",
      "Electronic Control Valve (ECV) pulse calibration for variable displacement",
      "Internal swash plate, piston, and reed valve wear inspection",
      "Shaft seal renewal and calibrated shim air-gap realignment",
    ],
    techSpec: "OEM Denso, Sanden, Valeo Rebuilds",
    duration: "2.5–4.5 hours",
    benefit: "Eliminates abnormal grinding rattles, harsh engine drag, and safeguards vehicle fuel efficiency.",
  },
  {
    id: "leak-testing",
    number: "03",
    title: "High-Pressure Leak Testing",
    summary: "Pinpointing microscopic leaks using electronic halogen sniffers and 280 PSI high-pressure dry nitrogen decay tests across all lines, coils, and fittings.",
    details: [
      "280 PSI dry nitrogen pressure-decay hold test",
      "High-sensitivity electronic halogen detection for micro-joints",
      "Ultraviolet (UV) fluorescent dye leak detection with optical spectrometry",
      "O-ring elastomeric seals, crimp joints, and service valve core inspection",
    ],
    techSpec: "280 PSI Dry Nitrogen & UV Spectrometry",
    duration: "1–2 hours",
    benefit: "Permanently identifies elusive micro-fissures and stops frustrating, repetitive refrigerant loss.",
  },
  {
    id: "condenser-evaporator",
    number: "04",
    title: "Condenser & Evaporator Architecture",
    summary: "Complete servicing, ultrasonic cleaning, micro-fin descaling, or OEM replacement of condensers, evaporator cooling coils, and expansion valves.",
    details: [
      "High-efficiency parallel-flow aluminum condenser flow analysis",
      "Evaporator cooling coil microchannel descaling and pressure hold",
      "Thermal Expansion Valve (TXV) superheat calibration and replacement",
      "Integrated receiver-drier desiccant filter replacement",
    ],
    techSpec: "Parallel-Flow Microchannel OEM Coils",
    duration: "3–5 hours",
    benefit: "Guarantees rapid cabin pulldown and consistent freezing performance even in dense midday tropical traffic.",
  },
  {
    id: "full-diagnostics",
    number: "05",
    title: "Full A/C Diagnostics & Computer Scanning",
    summary: "Multi-sensor computerized scanning of climate control systems, blend door stepper motors, ambient temperature sensors, and ECU data streams.",
    details: [
      "OBD-II climate control ECU fault code scanning & live sensor monitoring",
      "Dual-zone & multi-zone blend door actuator motor synchronization",
      "Cabin vent temperature delta inspection with precision infrared probes",
      "Evaporator fin thermistor and pressure transducer circuit calibration",
    ],
    techSpec: "Digital Manifold & Thermal OBD Diagnostics",
    duration: "30–45 mins",
    benefit: "Pinpoints hidden electrical sensor faults, erratic cooling, and dual-zone temperature discrepancies.",
  },
  {
    id: "airflow-sanitization",
    number: "06",
    title: "Airflow Dynamics & Vent Sanitization",
    summary: "Cabin microfilter renewal, high-output blower motor servicing, and ultrasonic antimicrobial duct fogging for pure, odor-free cabin air.",
    details: [
      "Cabin microfilter replacement (High-grade HEPA & activated carbon)",
      "Blower motor cage cleaning, bearing lubrication, and resistor restoration",
      "Ultrasonic aerosol antimicrobial duct decontamination",
      "Evaporator casing fungal spore and mildew elimination",
    ],
    techSpec: "Ultrasonic Mist Decontamination & HEPA",
    duration: "30–45 mins",
    benefit: "Eliminates damp mildew odors and airborne bacteria, restoring crisp, healthy, high-velocity cabin air.",
  },
];

// 5. Customer Testimonials (Google Verified)
export const reviewItems: ReviewItem[] = [
  {
    id: "r1",
    name: "Nuwan Jayasuriya",
    vehicle: "Toyota Premio 260",
    rating: 5,
    date: "2 weeks ago",
    content: "My car A/C had been blowing warm air for months after being poorly repaired twice elsewhere. Janaka Auto AC found the micro leak in the evaporator within 30 minutes. Cools down to ice cold now. Extremely honest pricing.",
    verified: true,
  },
  {
    id: "r2",
    name: "Dr. Samantha Perera",
    vehicle: "Honda Vezel Hybrid",
    rating: 5,
    date: "1 month ago",
    content: "Very knowledgeable with electric compressors on hybrid cars. They explained the oil grade required for high voltage systems and took exceptional care of my vehicle. Highly recommended in Gampaha!",
    verified: true,
  },
  {
    id: "r3",
    name: "Kasun Wickramasinghe",
    vehicle: "Nissan X-Trail",
    rating: 5,
    date: "2 months ago",
    content: "Compressor had completely seized with loud rattling noise. Instead of charging me for an exorbitant new unit, they rebuilt it with genuine seals and clutch. It has been running silently for a year.",
    verified: true,
  },
  {
    id: "r4",
    name: "Dilshan Senanayake",
    vehicle: "Mercedes-Benz C-Class",
    rating: 5,
    date: "3 weeks ago",
    content: "Diagnostic accuracy here is exceptional. Solved an electronic control valve issue on my climate control that other garages quoted for complete replacement. Master Janaka is truly a specialist.",
    verified: true,
  },
];

// 6. Image Assets (Stored in /public and /public/thumbs for instant 60fps streaming)
export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Our Workshop Exterior in Gampaha",
    category: "Miriswatta Facility",
    image: "/workshop-exterior.webp",
    thumb: "/thumbs/workshop-exterior.webp",
    caption: "Dedicated automotive climate control facility located at 366 Minuwangoda–Gampaha–Miriswatta Road. Equipped with spacious intake bays for sedans, SUVs, and commercial vehicles.",
    badge: "Facility Intake",
  },
  {
    id: "g2",
    title: "A/C Gas Refilling & Precision Charging",
    category: "Refrigerant Station",
    image: "/ac-gas-filling.webp",
    thumb: "/thumbs/ac-gas-filling.webp",
    caption: "Precision recovery, deep vacuum extraction to 500 microns, and gram-exact virgin R134a charging without air or moisture contamination.",
    badge: "Virgin Gas Only",
  },
  {
    id: "g3",
    title: "System Pressure Diagnostics",
    category: "Pressure Diagnostics",
    image: "/ac-diagnostics.webp",
    thumb: "/thumbs/ac-diagnostics.webp",
    caption: "Simultaneous high-side and low-side manifold gauge diagnostics to evaluate compressor compression ratio, expansion valve behavior, and operating pressures.",
    badge: "Gauge Diagnostics",
  },
  {
    id: "g4",
    title: "Compressor Repair & Overhaul",
    category: "Mechanical Precision",
    image: "/compressor-repair.webp",
    thumb: "/thumbs/compressor-repair.webp",
    caption: "Full teardown and rebuild of automotive compressors. Replacement of bearings, magnetic clutch coils, and shaft seals calibrated to OEM tolerances.",
    badge: "Clutch & Bearings",
  },
  {
    id: "g5",
    title: "Sub-Zero 4.5°C Cooling Test",
    category: "Performance Validation",
    image: "/ac-temp-test.webp",
    thumb: "/thumbs/ac-temp-test.webp",
    caption: "Digital thermal probe test verifying 4.5°C vent exit temperature under tropical ambient conditions following full system calibration and deep vacuum charging.",
    badge: "4.5°C Benchmark",
  },
  {
    id: "g6",
    title: "Condenser & Cooler Replacement",
    category: "Component Servicing",
    image: "/condenser-replacement.webp",
    thumb: "/thumbs/condenser-replacement.webp",
    caption: "Installation of brand-new high-efficiency aluminum parallel-flow condensers and integrated receiver-driers to solve chronic high-pressure issues.",
    badge: "New OEM Parts",
  },
  {
    id: "g7",
    title: "Vehicles in Active Service",
    category: "Service Bays",
    image: "/workshop-vehicles.webp",
    thumb: "/thumbs/workshop-vehicles.webp",
    caption: "Simultaneous climate diagnostics and servicing on Japanese family sedans, hybrid crossovers, and commercial vans in our covered workshop bays.",
    badge: "Multi-Bay Workshop",
  },
  {
    id: "g8",
    title: "Hands-on System Repairs",
    category: "Specialist Craft",
    image: "/ac-repair-job.webp",
    thumb: "/thumbs/ac-repair-job.webp",
    caption: "Precision disassembly of front fascia and cooling supports to access concealed evaporator lines, pressure switches, and cooling fan relays.",
    badge: "Certified Hands-On",
  },
  {
    id: "g9",
    title: "Completed Job Quality Check",
    category: "Quality Assurance",
    image: "/completed-job.webp",
    thumb: "/thumbs/completed-job.webp",
    caption: "Completed luxury vehicle undergoing final electronic climate control scan, vent sanitization, and temperature test before client handover.",
    badge: "100% Quality QA",
  },
];

// 7. Booking Slots Data
export const bookingSlotsData: BookingSlotOption[] = [
  {
    time: "08:30 AM",
    title: "Morning Diagnostics & Gas Charging",
    description: "Deep vacuum evacuation, pressure-decay leak test, and virgin R134a charging.",
  },
  {
    time: "11:00 AM",
    title: "Compressor & Pressure Diagnostics",
    description: "In-depth manifold analysis, magnetic clutch gap check, and bearing inspection.",
  },
  {
    time: "02:00 PM",
    title: "Complete Vacuum & Refrigerant Cycle",
    description: "Full moisture extraction, synthetic lubricant replenishment, and cooling optimization.",
  },
  {
    time: "04:30 PM",
    title: "Evening Inspection & Temperature QA",
    description: "Digital vent thermal probe testing, cabin filter review, and system health audit.",
  },
];
