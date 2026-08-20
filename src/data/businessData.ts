import { GalleryItem, ServiceItem } from '../types';

export const BUSINESS_INFO = {
  name: 'Euro Car Services',
  shortTagline: 'European Auto Repair You Can Trust',
  description: 'Professional automotive repair and maintenance services for drivers in Tampa, Florida.',
  address: '14228 N Florida Ave #103, Tampa, FL 33613, United States',
  street: '14228 N Florida Ave #103',
  cityStateZip: 'Tampa, FL 33613',
  country: 'United States',
  phoneDisplay: '+1 813-679-6496',
  phoneTel: '+18136796496',
  googleMapsUrl: 'https://maps.app.goo.gl/SNy9yh9Vtd9UU8kU9',
  coordinates: {
    lat: 28.0772,
    lng: -82.4593,
  },
};

export const BUSINESS_HOURS = [
  { day: 'Monday', hours: '8:30 AM – 5:30 PM', isOpenDay: true, openHour: 8.5, closeHour: 17.5 },
  { day: 'Tuesday', hours: '8:30 AM – 5:30 PM', isOpenDay: true, openHour: 8.5, closeHour: 17.5 },
  { day: 'Wednesday', hours: '8:30 AM – 5:30 PM', isOpenDay: true, openHour: 8.5, closeHour: 17.5 },
  { day: 'Thursday', hours: '8:30 AM – 5:30 PM', isOpenDay: true, openHour: 8.5, closeHour: 17.5 },
  { day: 'Friday', hours: '8:30 AM – 5:30 PM', isOpenDay: true, openHour: 8.5, closeHour: 17.5 },
  { day: 'Saturday', hours: 'Closed', isOpenDay: false },
  { day: 'Sunday', hours: 'Closed', isOpenDay: false },
];

export function getTampaBusinessStatus(): {
  isOpen: boolean;
  statusText: string;
  subText: string;
  currentDayName: string;
} {
  try {
    const now = new Date();
    // Format to America/New_York (Tampa time)
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/New_York',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);
    
    let weekday = '';
    let hour = 0;
    let minute = 0;

    for (const part of parts) {
      if (part.type === 'weekday') weekday = part.value;
      if (part.type === 'hour') hour = parseInt(part.value, 10);
      if (part.type === 'minute') minute = parseInt(part.value, 10);
    }

    const currentDecimalHour = hour + minute / 60;
    const todayConfig = BUSINESS_HOURS.find(
      (b) => b.day.toLowerCase() === weekday.toLowerCase()
    );

    if (todayConfig && todayConfig.isOpenDay && todayConfig.openHour && todayConfig.closeHour) {
      if (currentDecimalHour >= todayConfig.openHour && currentDecimalHour < todayConfig.closeHour) {
        return {
          isOpen: true,
          statusText: 'Open Now',
          subText: 'Closes today at 5:30 PM',
          currentDayName: weekday,
        };
      } else if (currentDecimalHour < todayConfig.openHour) {
        return {
          isOpen: false,
          statusText: 'Closed Now',
          subText: 'Opens today at 8:30 AM',
          currentDayName: weekday,
        };
      } else {
        const isFriday = weekday.toLowerCase() === 'friday';
        return {
          isOpen: false,
          statusText: 'Closed for the Day',
          subText: isFriday ? 'Opens Monday at 8:30 AM' : 'Opens tomorrow at 8:30 AM',
          currentDayName: weekday,
        };
      }
    }

    return {
      isOpen: false,
      statusText: 'Closed Today',
      subText: 'Opens Monday at 8:30 AM',
      currentDayName: weekday,
    };
  } catch {
    return {
      isOpen: false,
      statusText: 'Hours: Mon-Fri 8:30 AM – 5:30 PM',
      subText: 'Call +1 813-679-6496',
      currentDayName: 'Tampa, FL',
    };
  }
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'european-auto-repair',
    title: 'European Auto Repair',
    category: 'Specialty',
    popular: true,
    description: 'Comprehensive diagnosis, maintenance, and mechanical repair tailored specifically to European engineering standards.',
    highlights: [
      'Advanced European diagnostic tools',
      'Factory-grade service specifications',
      'OEM & premium replacement parts',
      'Precision mechanical repair',
    ],
    iconName: 'ShieldCheck',
  },
  {
    id: 'brake-service',
    title: 'Brake Service & Repair',
    category: 'Safety',
    popular: true,
    description: 'Complete brake system inspections, rotor resurfacing/replacement, high-performance ceramic & OEM pads, and fluid flush.',
    highlights: [
      'Brake pad & rotor replacement',
      'Hydraulic line & caliper service',
      'ABS & stability system diagnostics',
      'Brake fluid moisture flush',
    ],
    iconName: 'Disc',
  },
  {
    id: 'engine-diagnostics',
    title: 'Engine Diagnostics',
    category: 'Diagnostic',
    popular: true,
    description: 'Precision computer diagnostics for check engine lights, rough idling, misfires, sensor faults, and performance issues.',
    highlights: [
      'OBD-II & factory live data scanning',
      'Sensor & wiring pinpoint testing',
      'Misfire & fuel trim analysis',
      'Clear explanation of trouble codes',
    ],
    iconName: 'Cpu',
  },
  {
    id: 'oil-filter-service',
    title: 'Oil & Filter Service',
    category: 'Maintenance',
    description: 'High-grade European synthetic oil changes matching manufacturer viscosity and approvals for maximum engine protection.',
    highlights: [
      'Approved full-synthetic formulas',
      'OEM oil filter cartridge replacement',
      'Multi-point fluid level top-off',
      'Service indicator reset',
    ],
    iconName: 'Droplets',
  },
  {
    id: 'suspension-steering',
    title: 'Suspension & Steering',
    category: 'Mechanical',
    description: 'Restoring ride stability, steering responsiveness, control arms, ball joints, struts, and bushing replacements.',
    highlights: [
      'Strut, shock & spring inspection',
      'Control arm & bushing replacement',
      'Tie rod & steering rack service',
      'Chassis vibration dampening',
    ],
    iconName: 'Sliders',
  },
  {
    id: 'electrical-diagnostics',
    title: 'Electrical Diagnostics',
    category: 'Diagnostic',
    description: 'Troubleshooting complex electrical wiring, battery management, alternator testing, lighting, and electronic control modules.',
    highlights: [
      'Battery & charging system test',
      'Starter & alternator replacement',
      'Parasitic battery drain testing',
      'Body control module diagnostics',
    ],
    iconName: 'Zap',
  },
  {
    id: 'ac-climate-control',
    title: 'AC & Climate Control',
    category: 'Comfort',
    description: 'Keep cool in the Florida heat with thorough AC refrigerant recharging, leak detection, compressor repairs, and cabin filtering.',
    highlights: [
      'Refrigerant recovery & recharge',
      'UV dye leak inspection',
      'AC compressor & condenser service',
      'Blower motor & evaporator repair',
    ],
    iconName: 'ThermometerSnowflake',
  },
  {
    id: 'engine-transmission-service',
    title: 'Engine & Transmission Service',
    category: 'Mechanical',
    description: 'Major mechanical service including timing chain/belt service, fluid exchanges, gasket sealing, cooling system, and drivetrain care.',
    highlights: [
      'Timing belt & chain inspection',
      'Transmission fluid & filter service',
      'Water pump & thermostat replacement',
      'Valve cover & oil pan gasket repairs',
    ],
    iconName: 'Wrench',
  },
  {
    id: 'preventive-maintenance',
    title: 'Preventive Maintenance',
    category: 'Maintenance',
    description: 'Scheduled milestone maintenance (30k, 60k, 90k, 120k miles) to preserve vehicle reliability and long-term value.',
    highlights: [
      'Spark plug & coil pack replacement',
      'Coolant & brake fluid exchanges',
      'Belt & hose inspections',
      'Cabin & engine air filter swaps',
    ],
    iconName: 'CalendarCheck',
  },
  {
    id: 'vehicle-inspection',
    title: 'Comprehensive Safety Inspection',
    category: 'Safety',
    description: 'Detailed mechanical and safety multi-point inspection for pre-purchase evaluation or peace-of-mind road trip preparation.',
    highlights: [
      'Underbody & suspension inspection',
      'Brake pad & tire tread measurement',
      'Fluid health & leak verification',
      'Exhaust & emission check',
    ],
    iconName: 'FileSearch',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'European Vehicle Expertise',
    description: 'Specialized focus on the nuances of European engineering, tolerances, and manufacturer diagnostic requirements.',
    iconName: 'Car',
  },
  {
    title: 'Professional Service',
    description: 'Experienced technicians dedicated to meticulous, methodical mechanical work and thorough vehicle evaluations.',
    iconName: 'CheckCircle2',
  },
  {
    title: 'Quality Workmanship',
    description: 'Committed to OEM and high-standard replacement components that maintain the safety and integrity of your vehicle.',
    iconName: 'ShieldAlert',
  },
  {
    title: 'Honest Communication',
    description: 'Clear, transparent explanations of necessary repairs without high-pressure sales or unnecessary work.',
    iconName: 'MessageSquareCheck',
  },
  {
    title: 'Customer-Focused Approach',
    description: 'We treat every vehicle with the utmost care, prioritizing customer trust, convenience, and peace of mind.',
    iconName: 'Users',
  },
  {
    title: 'Convenient Tampa Location',
    description: 'Easily accessible facility on N Florida Ave in Tampa with direct parking and dedicated service bays.',
    iconName: 'MapPin',
  },
];

/**
 * 10 Verified Google Maps photo/location links supplied by the business.
 * EVERY LINK IS PRESERVED EXACTLY AS PROVIDED.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: 'Euro Car Services Facility & Workshop #1',
    category: 'Facility',
    tag: 'Shop Exterior & Entrance',
    description: 'Official Euro Car Services facility view on North Florida Avenue in Tampa, FL.',
    googleMapsUrl: 'https://maps.app.goo.gl/qxxTdLZUdQF3imNu7',
    imageUrl: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    title: 'European Automotive Diagnostic Bay #2',
    category: 'Diagnostics',
    tag: 'Diagnostic Testing',
    description: 'Computerized diagnostics and electrical fault identification for European vehicles.',
    googleMapsUrl: 'https://maps.app.goo.gl/t3Gno1uzZuTN8GJH7',
    imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    title: 'Precision Brake & Suspension Service #3',
    category: 'Mechanical',
    tag: 'Brake & Chassis',
    description: 'Precision hydraulic brake service, caliper overhaul, and suspension maintenance.',
    googleMapsUrl: 'https://maps.app.goo.gl/HP1gzAFQb8sqrfqBA',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 4,
    title: 'Engine Bay & Mechanical Repair #4',
    category: 'Engine',
    tag: 'Engine Service',
    description: 'Detailed engine mechanical service, timing components, and fluid system sealing.',
    googleMapsUrl: 'https://maps.app.goo.gl/V7Mm4dvL93c8kvNh6',
    imageUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 5,
    title: 'European Vehicle Inspection & Lift Bay #5',
    category: 'Inspection',
    tag: 'Underbody Inspection',
    description: 'Comprehensive multi-point vehicle lift inspection and drivetrain evaluations.',
    googleMapsUrl: 'https://maps.app.goo.gl/4NGv84v5E1YF3ZLR8',
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 6,
    title: 'Scheduled Maintenance & Fluid Service #6',
    category: 'Maintenance',
    tag: 'Synthetic Oil & Filters',
    description: 'Factory-spec synthetic lubrication, filtration, and preventive fluid exchanges.',
    googleMapsUrl: 'https://maps.app.goo.gl/fQkpTKxKxLgkmQc6A',
    imageUrl: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 7,
    title: 'AC Climate Control & Cooling Repair #7',
    category: 'Climate',
    tag: 'AC System Service',
    description: 'High-precision refrigerant recovery, cooling fan testing, and condenser service.',
    googleMapsUrl: 'https://maps.app.goo.gl/s4GweesN6Ho7HGZJ9',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 8,
    title: 'Electrical & Sensor Troubleshooting #8',
    category: 'Diagnostics',
    tag: 'Module & Wiring Diagnostics',
    description: 'Specialized wiring harness inspection, alternator testing, and battery health checks.',
    googleMapsUrl: 'https://maps.app.goo.gl/eYGEJANxX3Uzo7rNA',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 9,
    title: 'Drivetrain & Transmission Inspection #9',
    category: 'Mechanical',
    tag: 'Drivetrain Care',
    description: 'Transmission diagnostics, axle boot inspection, and differential maintenance.',
    googleMapsUrl: 'https://maps.app.goo.gl/WYB2GLW8KYiQBo529',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 10,
    title: 'Euro Car Services Customer & Service Bay #10',
    category: 'Facility',
    tag: 'Tampa Service Center',
    description: 'Dedicated Tampa service location welcoming drivers seeking dependable automotive repair.',
    googleMapsUrl: 'https://maps.app.goo.gl/jtCLZGuV6mnVWTAZ6',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
  },
];
