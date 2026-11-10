export interface CustomerReview {
  id: string;
  reviewerName: string;
  reviewerInitials: string;
  avatarColor: string;
  rating: number;
  dateText: string;
  reviewText: string;
  vehicleTag?: string;
  serviceTag?: string;
  isFeatured?: boolean;
  isLocalGuide?: boolean;
  googleReviewUrl: string;
}

export interface GoogleReviewsSummary {
  averageRating: number;
  totalReviewCount: number;
  fiveStarCount: number;
  googleMapsPlaceUrl: string;
  googleMapsWriteReviewUrl: string;
}

export const googleReviewsSummary: GoogleReviewsSummary = {
  averageRating: 4.9,
  totalReviewCount: 66,
  fiveStarCount: 63,
  googleMapsPlaceUrl: 'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  googleMapsWriteReviewUrl:
    'https://search.google.com/local/writereview?placeid=ChIJyZYEKvb74joRROHgnvAuGRg',
};

/**
 * Genuine existing Google Customer Reviews provided directly from the official
 * Janaka Auto AC Google Maps Business Profile (Miriswatta, Gampaha).
 * All texts preserve the exact words of the customer.
 */
export const verifiedCustomerReviews: CustomerReview[] = [
  {
    id: 'vikum-samarasinghe',
    reviewerName: 'Vikum Samarasinghe',
    reviewerInitials: 'VS',
    avatarColor: 'from-sky-500 to-cyan-600',
    rating: 5,
    dateText: '2 weeks ago',
    vehicleTag: 'Mitsubishi Lancer CB8',
    serviceTag: 'Full AC Service',
    isFeatured: true,
    reviewText:
      "I've been servicing my vehicles from Mr. Janaka from years ago due to their quality service and the guarantee they give for the work. Recently I did a full AC Service to my Mitsubishi Lancer CB8 and they did an amazing job with most accurate time. Highly Recommend anyone seeking for professional work in AC related work.",
    googleReviewUrl:
      'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  },
  {
    id: 'janaka-lakmal',
    reviewerName: 'Janaka Lakmal',
    reviewerInitials: 'JL',
    avatarColor: 'from-amber-500 to-orange-600',
    rating: 5,
    dateText: '5 months ago',
    isLocalGuide: true,
    vehicleTag: '2019 Honda Civic',
    serviceTag: 'Condenser Replacement',
    reviewText:
      'Went there to fix my 2019 Honda Civic AC issue, and they quickly identified the problem as a leaking condenser. Replaced the faulty condenser and completely checked and serviced the AC system within 4–5 hours, all for 50k. …',
    googleReviewUrl:
      'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  },
  {
    id: 'milinda-gimhana',
    reviewerName: 'Milinda Gimhana',
    reviewerInitials: 'MG',
    avatarColor: 'from-emerald-500 to-teal-600',
    rating: 5,
    dateText: '11 months ago',
    isLocalGuide: true,
    vehicleTag: 'German & Japanese Vehicles',
    serviceTag: 'AC Upgrade & Repair',
    reviewText:
      'Well trusted and reputed place around Gampaha to get your A/C system repaired or upgraded. Highly recommend for all vehicles including German vehicles. Skilled technicians and great after service! 💯',
    googleReviewUrl:
      'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  },
  {
    id: 'chamath-bandara',
    reviewerName: 'Chamath Bandara',
    reviewerInitials: 'CB',
    avatarColor: 'from-blue-500 to-indigo-600',
    rating: 5,
    dateText: '1 year ago',
    serviceTag: 'Electrical Fault Diagnosis',
    reviewText:
      'I went to several places and they said that they have to replace my cooler but it was only an electrical fault and only this place found it.',
    googleReviewUrl:
      'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  },
  {
    id: 'udaya-wanigasooriya',
    reviewerName: 'Udaya Wanigasooriya',
    reviewerInitials: 'UW',
    avatarColor: 'from-indigo-500 to-purple-600',
    rating: 5,
    dateText: '2 months ago',
    serviceTag: 'Evaporator Replacement',
    reviewText:
      'Replaced my evaporator with ease great customer service definitely recommending service',
    googleReviewUrl:
      'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  },
  {
    id: 'tame-the-game',
    reviewerName: 'Tame the Game',
    reviewerInitials: 'TG',
    avatarColor: 'from-rose-500 to-pink-600',
    rating: 5,
    dateText: '1 year ago',
    isLocalGuide: true,
    vehicleTag: 'Mazda Axela 2014',
    serviceTag: 'AC Cooler & Pressure Fix',
    reviewText:
      "Got an issue with my Mazda Axela 2014's AC cooler (leaking coolant pressure) and these guys fixed it up right away. Gave me a new cooler and simplifyied a big hassle to nothing but a convenient experience. Highly recommended. A+++++",
    googleReviewUrl:
      'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  },
  {
    id: 'ishani-udeshika',
    reviewerName: 'Ishani Udeshika',
    reviewerInitials: 'IU',
    avatarColor: 'from-violet-500 to-purple-600',
    rating: 5,
    dateText: '3 years ago',
    isLocalGuide: true,
    vehicleTag: 'Honda Grace',
    serviceTag: 'Evaporator, Filter & Gas Refill',
    reviewText:
      'Mr.Janaka did an amazing job for a reasonable price. I got his service to replace AC Evaporator, AC filter replacement and AC Gas refill for my Honda Grace. Thank you!',
    googleReviewUrl:
      'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  },
  {
    id: 'nuwan-thilanka',
    reviewerName: 'Nuwan Thilanka',
    reviewerInitials: 'NT',
    avatarColor: 'from-teal-500 to-emerald-600',
    rating: 5,
    dateText: '1 week ago',
    serviceTag: 'Accurate Fault Diagnosis',
    reviewText:
      "Great service! My car's AC wasn’t working properly, but they accurately diagnosed the issue and fixed it completely. Highly professional and efficient. Thank you very much for the excellent service.",
    googleReviewUrl:
      'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  },
  {
    id: 'nithula-ratnayake',
    reviewerName: 'Nithula Ratnayake',
    reviewerInitials: 'NR',
    avatarColor: 'from-amber-600 to-yellow-500',
    rating: 5,
    dateText: '4 years ago',
    serviceTag: '10/10 Service Guarantee',
    reviewText:
      "Best in the business. Can recommend to anyone who's having AC issues in their vehicles. They will get the job done perfectly 10/10",
    googleReviewUrl:
      'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  },
  {
    id: 'panduka-rajapaksha',
    reviewerName: 'Panduka Rajapaksha',
    reviewerInitials: 'PR',
    avatarColor: 'from-cyan-600 to-blue-600',
    rating: 5,
    dateText: '3 years ago',
    vehicleTag: 'Toyota Avanza Van',
    serviceTag: 'Dashboard & Cooler Service',
    reviewText:
      'I did a cooler replacement to my avanza van\nDid a good job removing and fitting the dashboard\nWell experienced staff\n100% satisfied',
    googleReviewUrl:
      'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  },
  {
    id: 'sunera-munasinghe',
    reviewerName: 'Sunera Munasinghe',
    reviewerInitials: 'SM',
    avatarColor: 'from-blue-600 to-sky-500',
    rating: 5,
    dateText: '1 year ago',
    isLocalGuide: true,
    vehicleTag: 'Toyota Premio & Montero',
    serviceTag: 'Quick Accurate Diagnosis',
    reviewText:
      "Extremely reliable, trustworthy, and affordable. I have taken a Toyota Premio and Mitsubishi Montero for various AC related issues and the workshop owner's quick diagnosis always fixed the issue.",
    googleReviewUrl:
      'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  },
  {
    id: 'hirusha-weerasuriya',
    reviewerName: 'Hirusha Weerasuriya',
    reviewerInitials: 'HW',
    avatarColor: 'from-zinc-500 to-slate-700',
    rating: 5,
    dateText: '3 years ago',
    vehicleTag: 'Mercedes-Benz C220',
    serviceTag: 'Compressor Replacement',
    reviewText:
      'I went to replace my Benz c220 Compressor they did a amazing job',
    googleReviewUrl:
      'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  },
  {
    id: 'nalin-hettiarachchi',
    reviewerName: 'Nalin Hettiarachchi',
    reviewerInitials: 'NH',
    avatarColor: 'from-emerald-600 to-teal-500',
    rating: 5,
    dateText: '2 months ago',
    vehicleTag: '2017 Honda Grace',
    serviceTag: 'Discharge Hose & Automated Flush',
    reviewText:
      'Repaired my honda graze 2017 did a excellent job.installed a new discharge hose they have a fully automated machine for that keep up the good work',
    googleReviewUrl:
      'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  },
  {
    id: 'thishura-silva',
    reviewerName: 'Thishura Silva',
    reviewerInitials: 'TS',
    avatarColor: 'from-orange-500 to-amber-600',
    rating: 5,
    dateText: '3 years ago',
    vehicleTag: 'Suzuki Wagon R',
    serviceTag: 'Compressor, Condenser & Cooler',
    reviewText:
      "Mr Janaka replaced my brother's Wagon R AC compressor, condenser and cooler under warranty without charging a single penny. Very genuine and professional service. Do not hesitate to visit the workshop for any kind of AC repair. Truly a genuine humble person.",
    googleReviewUrl:
      'https://maps.app.goo.gl/c9k8vEhjb2CKCU176',
  },
];

