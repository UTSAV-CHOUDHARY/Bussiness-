import { ServiceItem, ProjectItem, ParticipantItem, ReviewItem, BlogPostItem } from './types';
// @ts-ignore
import roof1Damaged from './assets/images/roof1_damaged_1780936598182.png';
// @ts-ignore
import roof1New from './assets/images/roof1_new_1780936617863.png';
// @ts-ignore
import hvac2Old from './assets/images/hvac2_old_1780936637202.png';
// @ts-ignore
import hvac2New from './assets/images/hvac2_new_1780936655671.png';
// @ts-ignore
import metal3Old from './assets/images/metal3_old_1780936672834.png';
// @ts-ignore
import metal3New from './assets/images/metal3_new_1780936690227.png';
// @ts-ignore
import attic4Old from './assets/images/attic4_old_1780936709439.png';
// @ts-ignore
import attic4New from './assets/images/attic4_new_1780936725891.png';

export const SERVICES: ServiceItem[] = [
  {
    id: 'roof-replacement',
    title: 'Roof Replacement',
    description: 'Complete teardown and premium architectural shingle, wood, or metal roof installations.',
    longDescription: 'Our certified roofing crews handle everything from complete heavy-duty teardowns, deck inspections, underlayment application, to flawless installations of GAF Lifetime architectural shingles or precision-aligned sheet metal. Engineered for durability, thermal draft resistance, and wind safeguards up to 130mph.',
    iconName: 'Home',
    category: 'Roofing',
    features: ['GAF Master-Eligible Lifetime Warranties', 'Complete clean-up with magnetic sweeping', 'Full storm damage insurance coordination'],
    basePriceRange: '₹7,00,000 - ₹15,00,000'
  },
  {
    id: 'ac-installation',
    title: 'AC Installation',
    description: 'High-efficiency variable-speed central ACs and energy-saving multi-zone heat pumps.',
    longDescription: 'Upgrade your home to next-generation cooling systems. We specialize in SEER2 certified variable-speed condensers, ductless mini-splits, and high-velocity central units. We compute complete localized heat load calculations to match the precise size and airflow of your home, reducing electric bills by up to 35%.',
    iconName: 'Wind',
    category: 'HVAC',
    features: ['SEER2 ultra high-efficiency units', 'Wi-Fi smart thermostat integration', '10-Year parts & labor guarantee'],
    basePriceRange: '₹4,00,000 - ₹10,00,000'
  },
  {
    id: 'heating-systems',
    title: 'Heating Systems',
    description: 'Energy-saving gas furnaces, dual-fuel heating systems, and heat pump tune-ups.',
    longDescription: 'Keep your sanctuary cozy and safe all winter long. We offer standard-setting 96% AFUE gas furnaces, intelligent hybrid dual-fuel systems, and low-temperature geothermal heat pumps. Our technicians inspect heat exchangers, pilot valves, and manifold pressure to prevent carbon monoxide hazards and air blockages.',
    iconName: 'Flame',
    category: 'HVAC',
    features: ['High-efficiency gas & hybrid systems', 'Multi-stage climate heat exchangers', 'Full gas line integrity diagnostics'],
    basePriceRange: '₹2,90,000 - ₹6,80,000'
  },
  {
    id: 'roof-repairs',
    title: 'Roof Repairs',
    description: 'Fast leak detection, detailed valley flashing repairs, and immediate shingle patching.',
    longDescription: 'Even a minor leak can trigger extensive attic mold and drywall rot. Our fast response diagnostic team uses infrared thermal imaging to trace the origin of water ingress, resetting displaced valley flashing, sealing leak-prone roof boots, and correcting wind-torn structural shingle patches immediately.',
    iconName: 'Wrench',
    category: 'Roofing',
    features: ['24/7 emergency weather tarping', 'High-accuracy thermal leak detection', 'Same-day flashing and boot repairs'],
    basePriceRange: '₹29,000 - ₹1,50,000'
  },
  {
    id: 'hvac-maintenance',
    title: 'HVAC Maintenance',
    description: 'Comprehensive cooling/heating seasonal tune-ups, motor oiling, and deep coil cleaning.',
    longDescription: 'Prevent costly breakdown emergencies and prolong your HVAC equipment lifespan by up to 50%. Our deep maintenance package covers refrigerant level validation, chemical coil washing, fan belt replacements, blower wheel lubrication, and total static system pressure testing to keep airflow perfect.',
    iconName: 'ShieldAlert',
    category: 'HVAC',
    features: ['Custom bi-annual pre-season tune-ups', 'Full duct flow airflow testing', 'Complimentary replacement filter'],
    basePriceRange: '₹10,500 - ₹25,000/year'
  },
  {
    id: 'insulation',
    title: 'Attic Insulation',
    description: 'High-density blow-in fiberglass and polyisocyanurate foil radiant systems.',
    longDescription: 'An uninsulated attic forces your HVAC to run constantly. We install blow-in fiberglass up to R-60 rating, soundproof gaps, and apply reflective aluminum foil radiant tech barriers to deflect heat. Enjoy uniform climate levels, moisture protection, and a highly reduced carbon footprint.',
    iconName: 'Thermometer',
    category: 'Insulation',
    features: ['Blown fiberglass up to R-60 specs', 'Precision air gaps sealing', 'Radiant moisture barriers'],
    basePriceRange: '₹1,20,000 - ₹3,10,000'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Architectural Shingle Home Transformation',
    category: 'Roofing',
    location: 'Brentwood, TN',
    imageBefore: roof1Damaged,
    imageAfter: roof1New,
    description: 'Complete replacement of standard 3-tab shingle roof with premium GAF Timberline HDZ Slate grey shingles. Repaired old roof deck plywood rot, reinforced structural eaves, and installed heavy-duty ice-and-water ridge guards.',
    completionDate: 'April 2026'
  },
  {
    id: 'p2',
    title: 'High-Efficiency Dual HVAC System Install',
    category: 'HVAC',
    location: 'Franklin, TN',
    imageBefore: hvac2Old,
    imageAfter: hvac2New,
    description: 'Replaced a failing 15-year-old AC unit with a brand new 18-SEER2 variable-speed heat pump paired with dual high-pressure digital dampers and smart thermostat automation. Cut the home owner electricity consumption by 38% instantly.',
    completionDate: 'May 2026'
  },
  {
    id: 'p3',
    title: 'Premium Metal Standing Seam Roof',
    category: 'Roofing',
    location: 'Forest Hills, TN',
    imageBefore: metal3Old,
    imageAfter: metal3New,
    description: 'Fitted an ultra-modern 24-gauge standing seam charcoal metal roof with concealed fasteners. Features supreme wind resistance, zero corrosion vulnerabilities, and an energy-reflective solar coating to naturally reduce attic temperatures.',
    completionDate: 'March 2026'
  },
  {
    id: 'p4',
    title: 'Attic Weatherization & Air Sealing',
    category: 'Insulation',
    location: 'Oak Hill, TN',
    imageBefore: attic4Old,
    imageAfter: attic4New,
    description: 'Vaccummed out decaying cellulose insulation, thoroughly sealed leaks with expansion foam, and blew in new high-density R-49 Owens Corning pristine fiberglass insulation along with custom baffled rafter vents.',
    completionDate: 'January 2026'
  }
];

export const TEAM: ParticipantItem[] = [
  {
    id: 't1',
    name: 'Marcus Vance',
    role: 'Founder & Managing Director',
    experience: '25+ Years Experience',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    bio: 'Marcus founded Elite Solutions with a dream to provide honest, premier roofing craftsmanship. He oversees master safety audits personally and takes pride in our 100% customer happiness track record.'
  },
  {
    id: 't2',
    name: 'Elena Rostova',
    role: 'HVAC Master Engineer',
    experience: '12+ Years Experience',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    bio: 'NATE-certified HVAC expert who thrives on engineering clean smart airflow. Elena possesses advanced certifications in dual-fuel heat pumps and industrial zone diagnostics for maximum efficiency.'
  },
  {
    id: 't3',
    name: 'Kevin O\'Brian',
    role: 'Lead Roofing Specialist',
    experience: '15+ Years Experience',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    bio: 'Kevin is a true craftsman in metal fabrication and complex commercial gables. He guarantees every shingle alignment and joint flashing is water-tight, ready for any heavy weather threat.'
  },
  {
    id: 't4',
    name: 'Sophia Alvarez',
    role: 'Customer Care & Claims Specialist',
    experience: '8+ Years Experience',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    bio: 'Sophia bridges the gap between claims, adjusters, and the customer. She streamlines the paperwork process and ensures high-priority storm victims get immediate assistance instantly.'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    name: 'Sarah P.',
    role: 'Homeowner in Franklin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    quote: 'Exceptional service and extremely timely work! Elite replaced our storm-damaged roof in less than two days, coordinated directly with my insurance adjuster, and left my backyard cleaner than before.',
    rating: 5,
    date: '2 weeks ago',
    badge: 'Verified Roof Installation'
  },
  {
    id: 'r2',
    name: 'Sarah H.',
    role: 'Residential Property Manager',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=200&auto=format&fit=crop',
    quote: 'Fixed my central AC quickly during a triple-digit heatwave. The diagnostic technician was professional, explained exactly what joint needed replacement, and provided an accurate upfront quote.',
    rating: 5,
    date: '1 month ago',
    badge: 'Verified AC Repair'
  },
  {
    id: 'r3',
    name: 'Suresh S.',
    role: 'Homeowner in Brentwood',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop',
    quote: 'Replaced both our AC unit and roof underlayment. The dual financing packages made a huge project completely doable. Excellent communication, ultra premium craftsmanship, and real expert advice throughout.',
    rating: 5,
    date: '3 weeks ago',
    badge: 'Verified Complete Combo'
  },
  {
    id: 'r4',
    name: 'Robert K.',
    role: 'Local Business Owner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    quote: 'Installed blow-in attic fiberglass and sealed historical framing. My power bill dropped by ₹12,000 the very first billing month. Amazing service, polite team, exceptionally highly recommended.',
    rating: 5,
    date: '2 months ago',
    badge: 'Verified Blow-in Insulation'
  }
];

export const BLOGS: BlogPostItem[] = [
  {
    id: 'b1',
    title: '5 Crucial Signs Your Roof Has Undetected Storm Leak Damage',
    excerpt: 'Water lines on drywall are trailing indicators. Spot the hidden mold indicators, roof tile blistering, and gravel washouts in gutters before structural wood rot sets in.',
    category: 'Roofing Safety',
    date: 'June 4, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'b2',
    title: 'How to Save Up to 35% on AC Energy Bills with Smart Multi-Zone Setups',
    excerpt: 'Stop wasting high-efficiency cooling on vacant bedrooms. Learn how smart dampers, digital thermostats and optimal ventilation levels work together to balance airflow.',
    category: 'HVAC Tactics',
    date: 'May 28, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'b3',
    title: 'The Homeowner\'s Standard Guide to Winning Complex Insurance Claims',
    excerpt: 'Filing after hail strikes can be intimidating. Documenting exact wind velocities, taking aerial imagery, and getting professional quotes ensures a seamless payout approved.',
    category: 'Financing & Insurance',
    date: 'May 15, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop'
  }
];

export const LOCAL_ZIP_CODES = [
  '37013', '37027', '37064', '37067', '37069', '37122', '37135', '37138', '37201', '37203', '37204', '37205', '37206', '37207', '37208', '37209', '37210', '37211', '37212', '37214', '37215', '37216', '37217', '37218', '37219', '37220', '37221'
];
