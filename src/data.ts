/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Package, AddOn, ManagementPlan } from './types';

export const PACKAGES: Package[] = [
  {
    id: 'starter',
    name: 'Starter Website',
    badge: 'Basic Online Presence',
    priceSetup: 79,
    priceMonthly: 39,
    description: 'Perfect for small businesses, freelancers, startup creators, or brand-new local venues seeking basic representation.',
    features: [
      'Up to 5 professional responsive pages',
      'Futuristic custom Home screen',
      'Business information segment',
      'High-legibility products/services display',
      'Contact page with automated form',
      'Google Maps custom location card',
      'Mobile-first layout optimization',
      'Aesthetic 6-photo image gallery',
      'Standard website deployment (Google Sites)',
      'Basic quarterly content updates',
      'Email customer support'
    ],
    isPopular: false,
    glowColor: 'blue'
  },
  {
    id: 'business',
    name: 'Business Website',
    badge: 'Customer Engagement',
    priceSetup: 149,
    priceMonthly: 79,
    description: 'Best for growing businesses looking to drive direct lead inquiries and boost online brand awareness.',
    features: [
      'Up to 10 professional custom pages',
      'Everything in Starter Website package plus:',
      'Improved neon-brushed design layouts',
      'Unrestricted content updates anytime',
      'Live Promotions & Special Offers tab',
      'Interactive Booking/contact form integration',
      'Direct Social Media links connection',
      'Basic SEO (Metadata & Indexing Setup)',
      'Monthly structural updates & content sweeps',
      'Priority support response (under 24h)'
    ],
    isPopular: true,
    glowColor: 'purple'
  },
  {
    id: 'premium',
    name: 'Premium Website',
    badge: 'Full Website Management',
    priceSetup: 249,
    priceMonthly: 149,
    description: 'Complete hands-off website management with advanced analytics, maximum design updates, and tracking.',
    features: [
      'Unlimited structure & screen layout variations',
      'Everything in Business Website package plus:',
      'Weekly content reviews and updates',
      'Seasonal and holiday promotion screen modules',
      'Advanced aesthetic custom layouts',
      'Google Analytics setup & custom dashboards',
      'Search Console tracking & performance analytics',
      'Ultra speed adjustments & SEO monitoring',
      'VIP priority support (under 4h resolution)',
      'Monthly user acquisition reports & advice'
    ],
    isPopular: false,
    glowColor: 'pink'
  }
];

export const ADDONS: AddOn[] = [
  {
    id: 'custom_domain',
    name: 'Custom Domain Setup',
    price: 30,
    description: 'Acquisition (.com, .net, .club) and professional HTTPS configuration for supreme brand trust.',
    category: 'setup'
  },
  {
    id: 'google_analytics',
    name: 'Google Analytics & Console Setup',
    price: 20,
    description: 'Establish live tracking of website visitors, source channels, and popular service or product catalog pages.',
    category: 'setup'
  },
  {
    id: 'extra_pages',
    name: 'Additional Custom Pages (per unit)',
    price: 15,
    description: 'Add extra pages like staff biography, special service details, party portfolios, or media blogs.',
    category: 'feature'
  },
  {
    id: 'menu_update',
    name: 'Instant Content Updates Service',
    price: 10,
    description: 'Urgent price, list, or text changes implemented in less than 2 hours on notice.',
    category: 'maintenance'
  },
  {
    id: 'photo_opt',
    name: 'Premium Photo Compression & SEO Opt',
    price: 15,
    description: 'Optimization of high-resolution showcase images for instant load times and visual alignment.',
    category: 'setup'
  },
  {
    id: 'design_changes',
    name: 'Custom Tailored Design Tweaks',
    price: 15,
    description: 'Unique custom layout edits and graphics revisions requested on top of standard designs.',
    category: 'feature'
  },
  {
    id: 'seasonal_promo',
    name: 'Active Seasonal Special Promotions Screen',
    price: 15,
    description: 'An eye-catching glowing banner page dedicated to Christmas, Valentine’s, or Easter specials.',
    category: 'feature'
  }
];

export const MANAGEMENT_PLANS: ManagementPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Rolling Plan',
    badge: 'Standard',
    pricingText: 'Full monthly pricing',
    discountMultiplier: 1.0,
    benefits: [
      'Billed month-to-month, cancel anytime',
      'Monthly website content and text adjustments',
      'Server health checking & security monitoring',
      'Responsive email tech support setup'
    ]
  },
  {
    id: 'quarterly',
    name: '3-Month Management Package',
    badge: 'Premium Value',
    pricingText: '15% Off Monthly Rate',
    discountMultiplier: 0.85,
    benefits: [
      'Guaranteed active maintenance sweep for 90 days',
      '15% direct discount on monthly subscription price',
      'Priority rapid turnaround support (under 12 hours)',
      'Comprehensive monthly search optimization audit',
      'Continuous caching, layout refinement, and page-speed optimizations'
    ]
  }
];

export const RESTAURANT_FEATURES = [
  {
    title: 'Custom Home Dashboard',
    iconName: 'LayoutGrid',
    description: 'Futuristic visual hero with beautiful custom imagery and crisp overlays designed to lock user attention.',
    detail: 'Complete with a visual high-contrast hook, clean navigation rails, and instant online action triggers.'
  },
  {
    title: 'Interactive Content Layouts',
    iconName: 'BookOpen',
    description: 'Highly legible and dynamic digital catalog displays with filters for custom products, plans, or categories.',
    detail: 'Say goodbye to messy document downloads. Our interactive layouts load instantly on mobile, making exploration rapid.'
  },
  {
    title: 'Smart Booking Form',
    iconName: 'CalendarDays',
    description: 'Polished client-side booking configuration or connection to external software like Calendly/Cal.com.',
    detail: 'Captures preferred date, size, business requirements, and forwards notifications directly to the team.'
  },
  {
    title: 'Google Maps and Location',
    iconName: 'MapPin',
    description: 'Embedded neon-bordered locations with dynamic direction triggers to drive organic localized foot traffic.',
    detail: 'Fully responsive with directions markers so high-intent visitors map straight to your physical entrance.'
  },
  {
    title: 'Promotions & Announcements',
    iconName: 'Sparkles',
    description: 'Dynamic highlight panels to feature seasonal launches, live events, brand intros, or holiday discount coupons.',
    detail: 'A high-impact neon-glow block that quickly informs visitors of high-margin specials.'
  },
  {
    title: 'Modern Mobile Friendly UI',
    iconName: 'Smartphone',
    description: 'Over 85% of local business searches happen on phones. Our websites score 99+ on Google mobile viewport tests.',
    detail: 'Engineered from responsive grid bases so scrolling lists and locating hours is frictionless.'
  },
  {
    title: 'Instant Content Management',
    iconName: 'Wrench',
    description: 'Complete hands-off monthly management system keeping your seasonal hours, pricing, and details accurate.',
    detail: 'Avoid customer frustration over outdated operational hours, pricing or old promotions.'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'How does the monthly website management work?',
    a: 'We operate as your full-service digital agency. When you need text updated, store hours changed for holidays, or a new promo banner added, you send an email or WhatsApp text. We execute the change immediately (usually within hours) so you can focus on running your business.'
  },
  {
    q: 'Why does a business need custom management instead of doing it themselves?',
    a: 'Business environments are incredibly dynamic. Learning website builders, formatting images, updating templates, and troubleshooting mobile layouts takes crucial hours away from client experience. With YJMWeb, you get elite, pristine, futuristic designs maintained constantly by experts for less than a daily cup of coffee.'
  },
  {
    q: 'Can I connect a custom domain like mybrand.com?',
    a: 'Absolutely! We specialize in custom domain mapping. If you already own one, we will map it for you. If you don’t, we configure a .com, .net, or brand domain and handle the active SSL encryption configuration automatically. Select the "Custom Domain Setup" add-on at checkout!'
  },
  {
    q: 'What is the "3-Month Management Package"?',
    a: 'This is our most popular choice. It provides 90 days of guaranteed security updates, prioritize tasks, and optimization audits at a 15% discount on the monthly maintenance rate. This is ideal for keeping your web presence highly active, indexed regularly on Google search, and running quickly.'
  },
  {
    q: 'How does the WhatsApp order system work?',
    a: 'Our checkout compiles your desired setup structure, active add-ons, and contract periods, showing a meticulous order summary. When submitted, all details are structured elegantly and loaded into pre-addressed WhatsApp messaging allowing you to initiate instant personal planning with our team in one tap.'
  },
  {
    q: 'Is there a long-term lock-in contract?',
    a: 'No lock-ins! Unless you choose our 3-Month discounted value package, our monthly management is fully rolling. You can scale down, upgrade your plan, or cancel any time on a 30-day notice cycle. We believe in keeping clients through exceptional design, not legal binds.'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Sanjeewa Perera',
    role: 'Founder & Managing Director',
    restaurant: 'Peak Commerce Group',
    avatarText: 'SP',
    rating: 5,
    text: 'YJMWeb redesigned our outdated service catalog layout into a neon-themed masterpiece. Inquiries went up by 40% in our first month. The Google Maps indexing they prepared brings in dozens of local clients every week. Absolutely worth every dollar!'
  },
  {
    name: 'Elena Rostova',
    role: 'Operations Director',
    restaurant: 'Velvet Premium Brand',
    avatarText: 'ER',
    rating: 5,
    text: 'The 3-month management plan is a lifesaver. We introduce seasonal products every 2 weeks. I text the YJMWeb team and the changes appear beautifully styled on our mobile site by the next morning. It is like having a full-time in-house developer.'
  },
  {
    name: 'Marcus Thorne',
    role: 'General Manager',
    restaurant: 'CyberBite Brand Lab',
    avatarText: 'MT',
    rating: 5,
    text: 'Setting up Google Analytics and optimizing our brand photos resolved our massive load delays. Our bouncing customer rate dropped from 60% down to 12%. The WhatsApp checkout system is highly innovative and frictionless.'
  }
];
