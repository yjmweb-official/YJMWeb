/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  ArrowRight, Sparkles, MessageSquare, ShieldCheck, Cpu, 
  Utensils, Globe, Gauge, HelpCircle, Flame, Star, 
  BookOpen, Phone, MapPin, CheckCircle, Smartphone, 
  Settings, ShoppingBag, Clock, Heart, Award, Key, Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents
import Navbar from './components/Navbar';
import LogoConcepts from './components/LogoConcepts';
import InteractiveFeatures from './components/InteractiveFeatures';
import ManagementPlans from './components/ManagementPlans';
import CheckoutSection from './components/CheckoutSection';
import FAQContact from './components/FAQContact';
import Footer from './components/Footer';

// Static Data
import { PACKAGES, TESTIMONIALS, RESTAURANT_FEATURES } from './data';

// Centralised Domain Configuration for Seamless Custom Domain Migration (e.g. yjmweb.com)
export const PRIMARY_DOMAIN = 'https://yjmweb.vercel.app';

// Analytics tracking
import { 
  trackPageView, 
  trackWhatsAppClick, 
  trackPackageSelection,
  trackScrollEvent,
  trackFormInteraction,
  trackFunnelStep,
  trackCtaClick
} from './lib/analytics';

function PhilosophyFeatureCard({ title, description, dotClass }: { title: string; description: string; dotClass: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div 
      className="p-5 bg-black/60 rounded-xl border border-white/5 flex flex-col justify-start transition-all cursor-pointer md:cursor-default"
      onClick={() => setIsOpen(!isOpen)}
    >
      <h4 className="text-sm font-semibold text-white flex items-center justify-between gap-2 select-none">
        <span className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${dotClass} inline-block`} />
          {title}
        </span>
        <span className={`text-neutral-500 text-2xs transition-transform duration-300 md:hidden ${isOpen ? 'rotate-180 text-white' : ''}`}>
          ▼
        </span>
      </h4>
      <div className={`transition-all duration-300 overflow-hidden md:block ${isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 md:max-h-40 md:opacity-100'}`}>
        <p className="text-neutral-400 text-xs leading-relaxed mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  // Read path or hash on initialize to support deep linking and accurate initial GA reports
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      const validTabs = ['landing', 'features', 'pricing', 'management', 'logos', 'checkout', 'contact', 'faq'];
      
      if (validTabs.includes(path)) {
        return path;
      }
      
      if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if (validTabs.includes(hash)) {
          return hash;
        }
      }
    }
    return 'landing';
  });
  const [selectedPackageId, setSelectedPackageId] = useState<string>('business');
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [sectionDescOpen, setSectionDescOpen] = useState<boolean>(false);
  const [checkoutIntroOpen, setCheckoutIntroOpen] = useState<boolean>(false);

  // Expose global trigger for WhatsApp redirects with direct analytics tracking
  useEffect(() => {
    (window as any).triggerWhatsAppPopup = (
      buttonType: 'floating' | 'support' | 'checkout' | 'navbar' | 'navbar_support' | 'hero' | 'footer' | 'faq' | 'contact' | 'package',
      url: string = 'https://wa.me/94776826937',
      details?: { package_name?: string; button_location?: string }
    ) => {
      // Instantly dispatch original button click tracking (keeps it robust)
      trackWhatsAppClick(buttonType, details);

      try {
        // Immediately open WhatsApp directly in a new tab/window
        window.open(url, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.error('Failed to open WhatsApp in a new tab, falling back to same tab redirection', err);
        window.location.href = url;
      }
    };

    return () => {
      delete (window as any).triggerWhatsAppPopup;
    };
  }, []);

  // Synchronize dynamic URL update and send manual page views to Google Analytics
  useEffect(() => {
    if (activeTab === 'contact' || activeTab === 'faq') {
      setTimeout(() => {
        const contactSection = document.getElementById('faq-contact-segment');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    let title = 'YJMWeb | Professional Website Design & Management';
    let metaDesc = 'YJMWeb delivers premium custom-coded websites, blazing-fast speed optimization, and hands-free maintenance packages.';
    let canonical = `${PRIMARY_DOMAIN}/`;

    switch (activeTab) {
      case 'landing':
        title = 'YJMWeb | Professional Website Design & Management';
        metaDesc = 'YJMWeb delivers premium custom-coded websites, blazing-fast speed optimization, and hands-free maintenance packages.';
        canonical = `${PRIMARY_DOMAIN}/`;
        break;
      case 'features':
        title = 'YJMWeb Solutions | Engineered Web Features';
        metaDesc = 'Explore our advanced technical stack including responsive bento-grid templates, fast-load CDNs, automated security backups, and server optimization.';
        canonical = `${PRIMARY_DOMAIN}/features`;
        break;
      case 'pricing':
        title = 'YJMWeb Pricing | Website Packages & Management Plans';
        metaDesc = 'Explore our transparent flat-rate pricing packages and flexible quarterly maintenance schedules designed for businesses of all sizes.';
        canonical = `${PRIMARY_DOMAIN}/pricing`;
        break;
      case 'management':
        title = 'YJMWeb Management | Dedicated Website Maintenance & Upgrades';
        metaDesc = 'Choose our business management subscription schedules covering hosting upgrades, search console configurations, offsite backups, and SEO sweeps.';
        canonical = `${PRIMARY_DOMAIN}/management`;
        break;
      case 'logos':
        title = 'YJMWeb Brand Blueprinting | Custom Logo Designs & Layouts';
        metaDesc = 'Skip static stock templates. Our premium vector design crew drafts custom SVG logo files matching your direct corporate aesthetic rules.';
        canonical = `${PRIMARY_DOMAIN}/logos`;
        break;
      case 'checkout':
        title = 'YJMWeb Checkout | Launch Your Website Project';
        metaDesc = 'Customize your futuristic web solution, toggle premium modules, estimate setup and rolling support costs, and submit your request to lock launch priority.';
        canonical = `${PRIMARY_DOMAIN}/checkout`;
        break;
      case 'contact':
        title = 'Contact YJMWeb | Website Design & Support';
        metaDesc = 'Speak directly with our expert team to schedule your free consultation or request dedicated website maintenance and tech support.';
        canonical = `${PRIMARY_DOMAIN}/contact`;
        break;
      case 'faq':
        title = 'YJMWeb FAQ | Frequently Asked Questions';
        metaDesc = 'Find quick answers to common questions about our custom web design, secure hosting, monthly updates, and pricing plans.';
        canonical = `${PRIMARY_DOMAIN}/faq`;
        break;
    }

    // Call unified tracker for page views
    const routerPath = activeTab === 'landing' ? '/' : `/${activeTab}`;
    trackPageView(title, routerPath);

    // Sync HTML document title
    document.title = title;

    // Helper to safely update meta tag values
    const updateOrCreateMetaTag = (attrName: string, attrVal: string, contentVal: string, isProp = false) => {
      const selector = `meta[${isProp ? 'property' : 'name'}="${attrVal}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(isProp ? 'property' : 'name', attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    // Update tags
    updateOrCreateMetaTag('name', 'description', metaDesc);
    updateOrCreateMetaTag('property', 'og:title', title, true);
    updateOrCreateMetaTag('property', 'og:description', metaDesc, true);
    updateOrCreateMetaTag('property', 'og:url', canonical, true);
    updateOrCreateMetaTag('name', 'twitter:title', title);
    updateOrCreateMetaTag('name', 'twitter:description', metaDesc);

    // Update canonical link element
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical);

    // Dynamic JSON-LD structured data creation
    let schemaEl = document.getElementById('json-ld-schema') as HTMLScriptElement;
    if (!schemaEl) {
      schemaEl = document.createElement('script');
      schemaEl.id = 'json-ld-schema';
      schemaEl.type = 'application/ld+json';
      document.head.appendChild(schemaEl);
    }

    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${PRIMARY_DOMAIN}/#organization`,
      'name': 'YJMWeb',
      'url': PRIMARY_DOMAIN,
      'logo': `${PRIMARY_DOMAIN}/logo.png`,
      'image': `${PRIMARY_DOMAIN}/logo.png`,
      'telephone': '+94776826937',
      'priceRange': '$$',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '15 Galle Road',
        'addressLocality': 'Colombo 03',
        'addressCountry': 'LK'
      }
    };

    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${PRIMARY_DOMAIN}/#website`,
      'name': 'YJMWeb',
      'url': PRIMARY_DOMAIN,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${PRIMARY_DOMAIN}/#search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };

    const webpageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      'url': canonical,
      'name': title,
      'description': metaDesc,
      'isPartOf': { '@id': `${PRIMARY_DOMAIN}/#website` },
      'about': { '@id': `${PRIMARY_DOMAIN}/#organization` }
    };

    const combinedSchemas: any[] = [organizationSchema, websiteSchema, webpageSchema];

    if (activeTab === 'landing' || activeTab === 'faq') {
      combinedSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How long does a custom business package setup take?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We build custom-fit high-conversion storefronts and landing portfolios within 7 to 14 business days, including full server setup, Google Console indices, and testing campaigns.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Do we get true custom system builds instead of templates?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes! Everything we deliver is hand-coded using state-of-the-art frameworks like React, Vite, and Tailwind CSS. No sluggish builders or templates are used.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How do the rolling monthly management services work?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We monitor all background systems, run continuous cloud backups, configure search listings, track key performance, and handle minor design updates so you do not have to think about website server problems.'
            }
          }
        ]
      });
    }

    schemaEl.text = JSON.stringify(combinedSchemas);

    // Keep the hash/pathname visually represent routing in browser
    const usesHash = window.location.hash || !window.location.pathname || window.location.pathname === '/';
    if (usesHash) {
      const targetHash = activeTab === 'landing' ? '' : `#${activeTab}`;
      if (typeof window !== 'undefined' && window.location.hash !== targetHash) {
        const cleanUrl = window.location.pathname + targetHash;
        window.history.replaceState(null, '', cleanUrl);
      }
    } else {
      const targetPath = activeTab === 'landing' ? '/' : `/${activeTab}`;
      if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
        window.history.replaceState(null, '', targetPath);
      }
    }
  }, [activeTab]);

  // Scroll threshold tracking (25%, 50%, 75%, 100%) dynamically per route
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const triggeredThresholds = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) return;

      const scrollPercentage = Math.round((scrollTop / docHeight) * 100);

      const checkThreshold = (threshold: number) => {
        if (scrollPercentage >= threshold && !triggeredThresholds.has(threshold)) {
          triggeredThresholds.add(threshold);
          trackScrollEvent(threshold);
        }
      };

      checkThreshold(25);
      checkThreshold(50);
      checkThreshold(75);
      checkThreshold(100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);

  // Exit Intent tracking
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let exitIntentTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20 && !exitIntentTriggered) {
        exitIntentTriggered = true;
        trackFormInteraction('window_exit', 'exit_intent', {
          trigger_type: 'mouse_leave_viewport'
        });
        
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'exit_intent',
          page_name: document.title,
          page_path: window.location.pathname + window.location.hash
        });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Time on page / active engagement intervals (15s, 30s, 60s, 120s, 180s)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const trackTimeInterval = (seconds: number) => {
      if (window.gtag) {
        window.gtag('event', 'time_spent_checkpoint', {
          seconds_spent: seconds,
          page_name: document.title,
          page_path: window.location.pathname + window.location.hash
        });
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'time_on_page',
        seconds_spent: seconds,
        page_name: document.title,
        page_path: window.location.pathname + window.location.hash
      });
    };

    const timer15 = setTimeout(() => trackTimeInterval(15), 15000);
    const timer30 = setTimeout(() => trackTimeInterval(30), 30000);
    const timer60 = setTimeout(() => trackTimeInterval(60), 60000);
    const timer120 = setTimeout(() => trackTimeInterval(120), 120000);
    const timer180 = setTimeout(() => trackTimeInterval(180), 180000);

    return () => {
      clearTimeout(timer15);
      clearTimeout(timer30);
      clearTimeout(timer60);
      clearTimeout(timer120);
      clearTimeout(timer180);
    };
  }, [activeTab]);

  // Synchronize reverse hash change navigation (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.substring(1) || 'landing';
        const validTabs = ['landing', 'features', 'pricing', 'management', 'logos', 'checkout', 'contact'];
        if (validTabs.includes(hash)) {
          setActiveTab(hash);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleChoosePackageFromHero = () => {
    setActiveTab('pricing');
    trackCtaClick('view_packages_hero', 'hero_main');
    trackFormInteraction('hero_cta', 'click', {
      cta_id: 'view_packages_hero',
      current_tab: 'landing'
    });
  };

  const handleSelectPackageForCheckout = (pkgId: string) => {
    setSelectedPackageId(pkgId);
    setActiveTab('checkout');
    trackCtaClick(`select_${pkgId.toLowerCase()}_package`, 'pricing_grid');
    trackPackageSelection(pkgId, 'monthly');
    trackFunnelStep(2, 'package_selected', { package_id: pkgId });
  };

  const handleSelectPlanForCheckout = (planId: 'monthly' | 'quarterly') => {
    setActiveTab('checkout');
    trackCtaClick(`select_plan_${planId}`, 'management_grid');
    trackFormInteraction('management_subscription', 'select_plan', { plan_id: planId });
    trackFunnelStep(2, 'management_plan_selected', { plan_id: planId });
  };

  const handleOrderSuccess = () => {
    setShowSuccessModal(true);
    trackFunnelStep(5, 'purchase_success', {
      package_id: selectedPackageId,
      currency: 'USD',
      total_monthly: 149
    });
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-neutral-100 font-sans relative overflow-x-hidden selection:bg-neon-blue/30 selection:text-white" id="yjmweb-master-root">
      
      {/* Absolute Ambient Background Pulsing Aura Globes */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full filter blur-[140px] pointer-events-none animate-pulse-glow" />
      
      {/* Moving background tech-grid */}
      <div className="absolute inset-0 cyber-grid opacity-35 hover:opacity-40 transition-opacity duration-1000 pointer-events-none z-0" />

      {/* Floating active assistant sidebar widget on Right corner */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5" id="floating-whatsapp-assistant">
        <button 
          onClick={(e) => {
            e.preventDefault();
            if (typeof window !== 'undefined' && (window as any).triggerWhatsAppPopup) {
              (window as any).triggerWhatsAppPopup('floating', 'https://wa.me/94776826937');
            } else {
              trackWhatsAppClick('floating');
              window.open('https://wa.me/94776826937', '_blank');
            }
          }}
          className="w-14 h-14 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-neutral-950 shadow-2xl hover:shadow-green-500/25 transition-all outline-none hover:scale-110 active:scale-95 group relative border border-green-400/20 cursor-pointer"
          id="btn-whatsapp-floating-trigger"
          title="Connect on WhatsApp"
        >
          {/* Neon water-ripple effect ring */}
          <span className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-30" />
          <MessageSquare className="w-6 h-6 fill-neutral-950 stroke-[1.5]" />
          
          {/* Toolkit label */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-neutral-950 text-white font-mono text-[10px] font-medium rounded-md border border-white/10 uppercase tracking-widest pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WhatsApp Hotline
          </span>
        </button>
      </div>

      {/* Sticky Header Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onNavigateToCheckout={() => handleSelectPackageForCheckout('business')} 
      />

      {/* Main Container Workspace */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Dynamic Navigation Subviews */}
        <AnimatePresence mode="wait">
          
          {/* View Tab 1: LANDING PAGE */}
          {(activeTab === 'landing' || activeTab === 'contact' || activeTab === 'faq') && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-24"
              id="landing-tab-view"
            >
              {/* HERO SECTION */}
              <section className="text-center space-y-8 py-8 lg:py-16 relative overflow-hidden" id="hero-segment">
                {/* Visual grid backdrop overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-neon-blue/10 via-neon-purple/5 to-neon-pink/10 rounded-full blur-[100px] opacity-40 pointer-events-none" />

                <div className="max-w-4xl mx-auto space-y-6 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full animate-pulse-once">
                    <Sparkles className="w-3.5 h-3.5 text-neon-blue" />
                    <span className="text-3xs font-mono tracking-widest text-neutral-300 uppercase">Premium Future Web Design</span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.08]">
                    We build websites that <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink drop-shadow-sm font-extrabold pb-1">
                      convert
                    </span>
                  </h1>

                  <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                    We build and manage stunning, high-performance websites that help businesses grow online. Experience state-of-the-art layout aesthetics and hands-free upkeep.
                  </p>
                </div>

                {/* Hero Action Triggers */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                  <button
                    onClick={() => handleSelectPackageForCheckout('business')}
                    id="hero-cta-btn-get-started"
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 hover:scale-[1.02] text-neutral-950 font-display font-semibold rounded-xl text-xs sm:text-sm shadow-lg shadow-neon-blue/15 transition-all cursor-pointer"
                  >
                    Get Started Now
                  </button>

                  <button
                    onClick={handleChoosePackageFromHero}
                    id="hero-cta-btn-view-packages"
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-display font-medium rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    View Packages
                  </button>
                </div>

                {/* Bento features horizontal previews */}
                <div className="pt-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4" id="hero-stats-bar">
                  <div className="p-4 bg-white/2.5 border border-white/5 rounded-xl text-center">
                    <span className="text-xs font-mono text-neutral-500 block">Responsive Design</span>
                    <span className="text-sm font-semibold text-white mt-1 block">99+ Mobile Scores</span>
                  </div>
                  <div className="p-4 bg-white/2.5 border border-white/5 rounded-xl text-center">
                    <span className="text-xs font-mono text-neutral-500 block">Ongoing Updates</span>
                    <span className="text-sm font-semibold text-white mt-1 block">SLA 2-Hour Response</span>
                  </div>
                  <div className="p-4 bg-white/2.5 border border-white/5 rounded-xl text-center">
                    <span className="text-xs font-mono text-neutral-500 block">Booking Triggers</span>
                    <span className="text-sm font-semibold text-white mt-1 block">Commission Free</span>
                  </div>
                </div>
              </section>

              {/* AGENCY SUMMARY / SERVICES INTRO */}
              <section className="space-y-12" id="services-intro-segment">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-4xs font-mono uppercase tracking-widest text-neon-purple">Modern Web Agency</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">
                    Premium Solutions Engineered for Growing Businesses
                  </h2>
                  <p className="text-neutral-400 text-xs sm:text-sm">
                    We eliminate the frustration of templates. YJMWeb is your dedicated server, design, analytics, and SEO master.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-neutral-950 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all group">
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center text-neon-blue">
                        <Globe className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-display font-medium text-white group-hover:text-neon-blue transition-colors">Custom Websites</h3>
                      <p className="text-neutral-400 text-xs leading-relaxed">
                        Modern, fast, and professionally designed websites tailored to your business goals. Built for performance, usability, and growth.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-neutral-950 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all group">
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple">
                        <Settings className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-display font-medium text-white group-hover:text-neon-purple transition-colors">Website Management</h3>
                      <p className="text-neutral-400 text-xs leading-relaxed">
                        Easy website management without technical hassle. Send updates, content changes, or new requirements and we'll handle everything for you.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-neutral-950 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all group">
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-neon-pink/10 border border-neon-pink/20 flex items-center justify-center text-neon-pink">
                        <Gauge className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-display font-medium text-white group-hover:text-neon-pink transition-colors">Performance & Visibility</h3>
                      <p className="text-neutral-400 text-xs leading-relaxed">
                        Responsive on all devices, optimized for search engines, fast loading, and designed to provide a smooth user experience.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-CTA row */}
                <div className="pt-4 flex items-center justify-center gap-6 text-xs text-neutral-400 flex-wrap">
                  <span className="flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    Unlimited Revisions (Business+)
                  </span>
                  <span className="flex items-center gap-1.5 font-mono">
                    <Cpu className="w-4 h-4 text-neon-blue" />
                    Dedicated Lightning CDN
                  </span>
                  <span className="flex items-center gap-1.5 font-mono">
                    <Star className="w-4 h-4 text-amber-400" />
                    Google Maps Verification
                  </span>
                </div>
              </section>

              {/* FEATURES BENTO SECTION GRID PREVIEW */}
              <section className="space-y-10" id="features-interactive-segment">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-white/5 pb-6">
                  <div>
                    <span className="text-4xs font-mono uppercase tracking-widest text-neon-blue">Digital Arsenal</span>
                    <h2 className="text-2xl sm:text-3xl font-display font-medium text-white mt-1">
                      Engineered Visual Components
                    </h2>
                  </div>
                  <button 
                    onClick={() => setActiveTab('features')}
                    className="text-xs font-mono text-neon-blue hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Explore all 10 standard features
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <InteractiveFeatures />
              </section>

              {/* WHY CHOOSE YJMWEB SECTION */}
              <section className="glass-panel p-8 sm:p-12 rounded-3xl border-white/5 bg-neutral-950/40 relative overflow-hidden" id="why-choose-yjmweb">
                <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div 
                      className="cursor-pointer md:cursor-default" 
                      onClick={() => setSectionDescOpen(!sectionDescOpen)}
                    >
                      <span className="text-4xs font-mono uppercase tracking-widest text-neon-blue block">Design Philosophy</span>
                      <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white leading-tight flex items-center justify-between gap-2 mt-1 select-none">
                        <span>Why Growing Businesses Choose YJMWeb</span>
                        <span className={`text-neutral-500 text-xs transition-transform duration-300 md:hidden ${sectionDescOpen ? 'rotate-180 text-white' : ''}`}>
                          ▼
                        </span>
                      </h2>
                    </div>
                    <div className={`transition-all duration-300 overflow-hidden md:block ${sectionDescOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 md:max-h-40 md:opacity-100'}`}>
                      <p className="text-neutral-445 text-xs sm:text-sm leading-relaxed">
                        Business operators are specialists in growth and delivering client value—not code, domain mapping, or mobile diagnostic tools. We bridge the gap completely.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => handleSelectPackageForCheckout('business')}
                        className="px-6 py-3 bg-neutral-900 hover:bg-white/5 border border-white/10 hover:border-white/20 text-xs font-mono font-bold rounded-xl text-neutral-200 hover:text-white transition-all cursor-pointer"
                      >
                        Design My Blueprint
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <PhilosophyFeatureCard 
                      title="Direct Client Channels"
                      description="Skip paying up to 30% to middleman directories or scheduling aggregators. Capture bookings directly on your custom, SSL-secured dot-com layout."
                      dotClass="bg-neon-blue"
                    />

                    <PhilosophyFeatureCard 
                      title="Lightning Speed Loads"
                      description="Optimized WebP visuals and high-performance CDN support mean your product listings or service portfolios load instantly for visitors."
                      dotClass="bg-neon-purple"
                    />

                    <PhilosophyFeatureCard 
                      title="Zero Site Editor Pain"
                      description="Never spend late nights configuring layouts or correcting mobile alignment errors. Just chat/email us changes, and we execute them immediately."
                      dotClass="bg-neon-pink"
                    />

                    <PhilosophyFeatureCard 
                      title="Seamless Local Ranking"
                      description="We map out metadata headers, Schema structures, and verify map listings so prospective clients locate your business near them."
                      dotClass="bg-green-400"
                    />
                  </div>
                </div>
              </section>

              {/* SIMPLE STEPS TIMELINE */}
              <section className="space-y-12" id="process-timeline-segment">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-4xs font-mono uppercase tracking-widest text-neon-blue">Launch Logistics</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">Three Steps to Digital Supremacy</h2>
                  <p className="text-neutral-400 text-xs">A clear process focused on speed to market.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  {/* Timeline connectors in background on desktop */}
                  <div className="hidden md:block absolute top-[44px] left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-20" />

                  <div className="text-center space-y-4 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-neutral-950 border border-neon-blue flex items-center justify-center mx-auto shadow-lg shadow-neon-blue/5 font-display font-bold text-lg text-neon-blue">
                      01
                    </div>
                    <h3 className="font-display font-medium text-white text-base">Select & Configure</h3>
                  </div>

                  <div className="text-center space-y-4 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-neutral-950 border border-neon-purple flex items-center justify-center mx-auto shadow-lg shadow-neon-purple/5 font-display font-bold text-lg text-neon-purple">
                      02
                    </div>
                    <h3 className="font-display font-medium text-white text-base">Live WhatsApp Review</h3>
                  </div>

                  <div className="text-center space-y-4 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-neutral-950 border border-neon-pink flex items-center justify-center mx-auto shadow-lg shadow-neon-pink/5 font-display font-bold text-lg text-neon-pink">
                      03
                    </div>
                    <h3 className="font-display font-medium text-white text-base">Prism Launch</h3>
                  </div>
                </div>
              </section>

              {/* TESTIMONIALS SLIDER SECTION */}
              <section className="space-y-10" id="testimonials-segment">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-4xs font-mono uppercase tracking-widest text-neon-pink">Client Success Profiles</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">Loved by Growing Businesses & Brands</h2>
                </div>

                <div className="max-w-4xl mx-auto relative">
                  {/* Testimonial Active Display */}
                  <div className="glass-panel p-6 sm:p-10 rounded-2xl border-white/5 bg-neutral-950/80 relative overflow-hidden transition-all duration-500">
                    <div className="absolute right-6 top-6 opacity-5 pointer-events-none">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 1-2 2a5 5 0 0 1-5-5H6a5 5 0 0 0 5 5h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/><path d="M6 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 1-2 2a5 5 0 0 1-5-5H6a5 5 0 0 0 5 5h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/></svg>
                    </div>

                    <div className="space-y-6">
                      <div className="flex gap-1">
                        {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>

                      <p className="text-neutral-200 text-sm sm:text-base leading-relaxed italic font-medium">
                        "{TESTIMONIALS[activeTestimonial].text}"
                      </p>

                      <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple flex items-center justify-center font-display font-bold text-sm text-neutral-950">
                          {TESTIMONIALS[activeTestimonial].avatarText}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{TESTIMONIALS[activeTestimonial].name}</h4>
                          <span className="text-xs text-neutral-500 font-mono">
                            {TESTIMONIALS[activeTestimonial].role} • <span className="text-neon-blue">{TESTIMONIALS[activeTestimonial].restaurant}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nav selectors */}
                  <div className="flex items-center justify-center gap-2.5 mt-6">
                    {TESTIMONIALS.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTestimonial(index)}
                        id={`btn-testimonial-dot-${index}`}
                        className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                          activeTestimonial === index 
                            ? 'bg-neon-blue w-8' 
                            : 'bg-neutral-800 hover:bg-neutral-700'
                        }`}
                        title={`Review profile ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* QUICK CTA CALLOUT SECTION */}
              <section className="text-center py-6">
                <div className="glass-panel p-8 sm:p-12 rounded-3xl border-neon-blue/30 bg-gradient-to-r from-neutral-950 via-neutral-900/40 to-neutral-950 max-w-4xl mx-auto space-y-6 relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-neon-blue/10 rounded-full blur-[90px] pointer-events-none" />
                  
                  <span className="text-3xs font-mono uppercase tracking-widest text-neon-blue bg-neon-blue/10 px-3 py-1 rounded-full border border-neon-blue/20">
                    Ready to Digitally Dominate?
                  </span>
                  
                  <h2 className="text-2xl sm:text-4xl font-display font-medium text-white max-w-2xl mx-auto leading-tight">
                    Equip Your Restaurant with a Futuristic Digital Asset Today
                  </h2>
                  
                  <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mx-auto leading-normal">
                    Select custom layout configurations, calculate costs down to the cent, and connect directly on WhatsApp to initiate development.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => handleSelectPackageForCheckout('business')}
                      id="lower-cta-btn"
                      className="px-8 py-3.5 bg-gradient-to-r from-neon-blue to-neon-purple text-neutral-950 font-display font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-neon-blue/10 transition-all hover:scale-[1.01] cursor-pointer"
                    >
                      Begin Blueprints Setup
                    </button>
                  </div>
                </div>
              </section>

              {/* FAQ & CONTACT INTEGRATION */}
              <section id="faq-contact-segment" className="pt-8">
                <FAQContact />
              </section>

            </motion.div>
          )}

          {/* View Tab 2: FEATURES SECTION */}
          {activeTab === 'features' && (
            <motion.div
              key="features-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
              id="solutions-tab-view"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-4xs font-mono uppercase tracking-widest text-neon-blue">Dynamic Arsenal</span>
                <h1 className="text-3xl sm:text-4xl font-display font-medium text-white">Engineered Web Features</h1>
                <p className="text-neutral-400 text-xs sm:text-sm">
                  We deploy cutting-edge functional components optimized specifically for the modern business landscape. Explore standard features interactively on our mock smartphone below.
                </p>
              </div>

              <InteractiveFeatures />

              {/* Extra features listing for prompt checklist coverage (All 10 bullet points) */}
              <div className="pt-8 max-w-5xl mx-auto space-y-6">
                <h4 className="text-white text-base font-display font-medium border-b border-white/5 pb-2 uppercase tracking-wider text-center">
                  Full Solutions Inventory Checklist
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-neutral-950/40 border border-white/2.5 rounded-xl flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-neon-blue shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">✅ Custom Brand Home Page</strong>
                      <p className="text-neutral-400 text-2xs mt-0.5 leading-normal">Premium neon-brushed frontpage landing module with instant CTA triggers.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950/40 border border-white/2.5 rounded-xl flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-neon-blue shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">✅ Business Information Section</strong>
                      <p className="text-neutral-400 text-2xs mt-0.5 leading-normal">Operational details, team biographies and historical storyboards beautifully placed.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950/40 border border-white/2.5 rounded-xl flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-neon-blue shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">✅ Digital Showcase catalog</strong>
                      <p className="text-neutral-400 text-2xs mt-0.5 leading-normal">Legible service listings featuring responsive images, tag alerts and item details.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950/40 border border-white/2.5 rounded-xl flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-neon-blue shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">✅ Core Contact Information</strong>
                      <p className="text-neutral-400 text-2xs mt-0.5 leading-normal">Prompters to phone lines, emails, and WhatsApp business profiles readily available.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950/40 border border-white/2.5 rounded-xl flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-neon-blue shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">✅ Google Maps Location Card</strong>
                      <p className="text-neutral-400 text-2xs mt-0.5 leading-normal">Directions anchors maps directly to coordinates to boost localized foot traffic.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950/40 border border-white/2.5 rounded-xl flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-neon-blue shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">✅ Photo Showcase Gallery</strong>
                      <p className="text-neutral-400 text-2xs mt-0.5 leading-normal">Optimized visual showcase photos to make services and products look amazing instantly.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950/40 border border-white/2.5 rounded-xl flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-neon-blue shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">✅ Promotions & Announcements</strong>
                      <p className="text-neutral-400 text-2xs mt-0.5 leading-normal">Banners specifically engineered for campaign discount coupons or seasonal details.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950/40 border border-white/2.5 rounded-xl flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-neon-blue shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">✅ Customer Contact Forms</strong>
                      <p className="text-neutral-400 text-2xs mt-0.5 leading-normal">Pre-secured client text structures sending questions immediately to your inbox.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950/40 border border-white/2.5 rounded-xl flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-neon-blue shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">✅ Mobile Friendly Design</strong>
                      <p className="text-neutral-400 text-2xs mt-0.5 leading-normal">Tap points, font sizing and layout fluidities tested on extreme viewports.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-950/30 border border-dashed border-white/5 rounded-xl flex items-center justify-center sm:col-span-2 lg:col-span-3">
                    <span className="text-2xs font-mono text-neutral-500">All features come standard inside the Business & Premium setups.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* View Tab 3: PRICING PAGE */}
          {activeTab === 'pricing' && (
            <motion.div
              key="pricing-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
              id="packages-tab-view"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-4xs font-mono uppercase tracking-widest text-neon-purple">Solutions Pricing</span>
                <h1 className="text-3xl sm:text-4xl font-display font-medium text-white">Futuristic Web Packages</h1>
                <p className="text-neutral-400 text-xs sm:text-sm">
                  We maintain zero hidden fees. Select standard packages suited to your business requirements and configure optional setup parameters interactively.
                </p>
              </div>

              {/* THREE MAIN PACKAGES GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
                {PACKAGES.map((pkg) => {
                  const isBusiness = pkg.id === 'business';
                  return (
                    <div
                      key={pkg.id}
                      id={`pricing-card-col-${pkg.id}`}
                      className={`glass-panel rounded-2xl p-6 lg:p-8 flex flex-col justify-between transition-all relative overflow-hidden ${
                        isBusiness 
                          ? 'border-neon-purple/40 bg-gradient-to-b from-purple-950/10 via-neutral-950 to-neutral-950 shadow-xl shadow-neon-purple/5' 
                          : 'border-white/5'
                      }`}
                    >
                      {/* Popular ribbon for Business package */}
                      {isBusiness && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-neon-purple text-white font-mono text-[9px] uppercase tracking-widest">
                          Highly Recommended
                        </span>
                      )}

                      <div className="space-y-6">
                        <div>
                          <span className="text-3xs uppercase tracking-widest font-mono text-neutral-500">{pkg.badge}</span>
                          <h3 className="text-xl font-display font-bold text-white mt-1">{pkg.name}</h3>
                          <p className="text-neutral-400 text-xs mt-2.5 leading-relaxed">{pkg.description}</p>
                        </div>

                        {/* Price Area */}
                        <div className="py-4 border-y border-white/5 space-y-1">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs text-neutral-400 font-mono">Setup Fee:</span>
                            <span className="text-2xl font-mono text-white font-semibold">${pkg.priceSetup}</span>
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs text-neutral-400 font-mono">Monthly Upkeep:</span>
                            <span className="text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple font-bold">
                              ${pkg.priceMonthly}/mo
                            </span>
                          </div>
                        </div>

                        {/* Bullet list */}
                        <div className="space-y-3.5">
                          <span className="text-4xs font-mono uppercase text-neutral-500 block">Package Features Includes:</span>
                          <ul className="space-y-2.5 text-xs text-neutral-300">
                            {pkg.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                                  pkg.glowColor === 'blue' ? 'bg-neon-blue' : pkg.glowColor === 'purple' ? 'bg-neon-purple' : 'bg-neon-pink'
                                }`} />
                                <span className="leading-normal">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/5 mt-8 space-y-3">
                        <button
                          onClick={() => handleSelectPackageForCheckout(pkg.id)}
                          id={`btn-select-pkg-${pkg.id}`}
                          className={`w-full py-3.5 rounded-xl font-display font-semibold text-xs tracking-wide transition-all uppercase cursor-pointer select-none ${
                            isBusiness
                              ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white hover:opacity-90 hover:scale-[1.01]'
                              : 'bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border border-white/10 hover:border-white/20'
                          }`}
                        >
                          Configure {pkg.name.split(' ')[0]} Setup
                        </button>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            let message = `Hello YJMWeb, I'm interested in the ${pkg.name}.`;
                            const targetUrl = `https://wa.me/94776826937?text=${encodeURIComponent(message)}`;
                            if (typeof window !== 'undefined' && (window as any).triggerWhatsAppPopup) {
                              (window as any).triggerWhatsAppPopup('package', targetUrl, {
                                package_name: pkg.name,
                                button_location: `pricing_card_${pkg.id}`
                              });
                            } else {
                              trackWhatsAppClick('package', { package_name: pkg.name, button_location: `pricing_card_${pkg.id}` });
                              window.open(targetUrl, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          id={`btn-wa-inquire-${pkg.id}`}
                          className="w-full py-2.5 rounded-xl font-mono text-[11px] font-medium tracking-wide transition-all text-neutral-400 hover:text-white bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/5 cursor-pointer flex items-center justify-center gap-2 select-none"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                          Inquire on WhatsApp
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Redirect to config disclaimer banner */}
              <div className="p-6 bg-neutral-950 border border-white/5 rounded-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-3xs uppercase font-mono text-neon-blue">Advanced Add-on Configurator</span>
                  <p className="text-xs text-neutral-400 leading-normal max-w-md">
                    Need additional capabilities like Google Analytics set ups, compressed photograph updates or extra menu layouts? Custom add-ons can be enabled interactively on the Checkout section.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
                  <button
                    onClick={() => {
                      let message = "Hello YJMWeb, I would like a custom website quotation.";
                      const targetUrl = `https://wa.me/94776826937?text=${encodeURIComponent(message)}`;
                      if (typeof window !== 'undefined' && (window as any).triggerWhatsAppPopup) {
                        (window as any).triggerWhatsAppPopup('package', targetUrl, {
                          package_name: 'Custom Package',
                          button_location: 'custom_disclaimer_banner'
                        });
                      } else {
                        trackWhatsAppClick('package', { package_name: 'Custom Package', button_location: 'custom_disclaimer_banner' });
                        window.open(targetUrl, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="w-full sm:w-auto px-5 py-3 bg-neutral-900 hover:bg-white/5 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white text-xs font-mono rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                    Custom Quote Inquiry
                  </button>
                  <button
                    onClick={() => handleSelectPackageForCheckout('business')}
                    className="w-full sm:w-auto px-5 py-3 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue hover:text-white border border-neon-blue/20 hover:border-neon-blue/30 text-xs font-mono rounded-lg transition-all cursor-pointer"
                  >
                    Configure Custom Blueprint
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* View Tab 4: WEBSITE MANAGEMENT PLANS SECTION */}
          {activeTab === 'management' && (
            <motion.div
              key="management-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
              id="management-tab-view"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-4xs font-mono uppercase tracking-widest text-neon-purple">Operations Assistance</span>
                <h1 className="text-3xl sm:text-4xl font-display font-medium text-white">Website Maintenance Plans</h1>
                <p className="text-neutral-400 text-xs sm:text-sm">
                  We manage all hosting backups, server upgrades, search consoles, and design tweaks. Choose our popular quarterly management option to save 15% immediately on routine maintenance costs.
                </p>
              </div>

              <ManagementPlans onSelectPlan={handleSelectPlanForCheckout} />

              {/* Scope Breakdown */}
              <div className="p-6 sm:p-10 bg-neutral-950 border border-white/5 rounded-3xl max-w-4xl mx-auto space-y-6">
                <h3 className="text-white text-base font-display font-medium border-b border-white/5 pb-2 uppercase tracking-wide">
                  What we execute during Maintenance Sweeps:
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-neutral-400">
                  <div className="space-y-1.5">
                    <h5 className="font-semibold text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-neon-blue" />
                      Ongoing Menu Tweaks
                    </h5>
                    <p className="leading-relaxed">
                      We substitute prices, alter dietary attributes or load fresh seasonal meal templates on notice so visitors get up-to-date data.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h5 className="font-semibold text-white flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-neon-blue" />
                      Speed Audits & Compression
                    </h5>
                    <p className="leading-relaxed">
                      We continuously test mobile load statistics, compressing chef photos to guarantee instant rendering speeds when diner foot-traffic is high.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h5 className="font-semibold text-white flex items-center gap-2">
                      <Globe className="w-4 h-4 text-neon-purple" />
                      Standard Schema Integration
                    </h5>
                    <p className="leading-relaxed">
                      We update web structure schemas to notify search engine indices of your ongoing business status, boosting local representation.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h5 className="font-semibold text-white flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-neon-purple" />
                      Core Server Security Support
                    </h5>
                    <p className="leading-relaxed">
                      We manage SSL certifications, domain host modifications, and backup routines, keeping your web presence reliable 24/7.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* View Tab 5: LOGO DESIGN REQUIREMENTS BRANDING LAB */}
          {activeTab === 'logos' && (
            <motion.div
              key="logos-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
              id="logos-tab-view"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-4xs font-mono uppercase tracking-widest text-neon-purple">Brand Art Studio</span>
                <h1 className="text-3xl sm:text-4xl font-display font-medium text-white">YJMWeb Logo Concepts</h1>
                <p className="text-neutral-400 text-xs sm:text-sm">
                  We design digital symbols engineered for futuristic corporate branding. Review multiple logo concept templates below, toggle active vector glows and review optimal placement advice.
                </p>
              </div>

              <LogoConcepts />
            </motion.div>
          )}

          {/* View Tab 6: CONFIGURE & INTERACTIVE CHECKOUT PAGE */}
          {activeTab === 'checkout' && (
            <motion.div
              key="checkout-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
              id="checkout-tab-view"
            >
              <div className="text-center max-w-2xl mx-auto">
                <div 
                  className="cursor-pointer md:cursor-default"
                  onClick={() => setCheckoutIntroOpen(!checkoutIntroOpen)}
                >
                  <span className="text-4xs font-mono uppercase tracking-widest text-neon-pink block">Interactive Builder</span>
                  <h1 className="text-3xl sm:text-4xl font-display font-medium text-white flex items-center justify-center gap-2 mt-1 select-none">
                    <span>Customize Your Solution Blueprint</span>
                    <span className={`text-neutral-500 text-xs transition-transform duration-300 md:hidden ${checkoutIntroOpen ? 'rotate-180 text-white' : ''}`}>
                      ▼
                    </span>
                  </h1>
                </div>
                <div className={`transition-all duration-300 overflow-hidden md:block ${checkoutIntroOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 md:max-h-40 md:opacity-100'}`}>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    Toggle desired design modules, calculate immediate setup rates and rolling maintenance durations down to the cent, fill contact scopes and submit to lock launch priority.
                  </p>
                </div>
              </div>

              {/* Full Checkout Component */}
              <CheckoutSection 
                initialPackageId={selectedPackageId} 
                onOrderSuccess={handleOrderSuccess} 
              />
            </motion.div>
          )}

        </AnimatePresence>

        {/* Dynamic Launch Order Success Toast Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-fade-in" id="order-success-modal">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border-neon-blue/40 bg-neutral-950 max-w-md w-full text-center space-y-5 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-neon-blue/10 rounded-full blur-2xl" />
              
              <CheckCircle className="w-14 h-14 text-green-400 mx-auto animate-bounce" />
              
              <div className="space-y-1.5">
                <h3 className="text-lg font-display font-semibold text-white">Order Selection Forwarded!</h3>
                <span className="text-[10px] font-mono uppercase text-neon-blue">SLA Queue Priority: High</span>
                <p className="text-xs text-neutral-400 leading-relaxed pt-2">
                  We have structured your specified web package, active add-ons, and billing schedules. We transferred these particulars to your WhatsApp client for an immediate review session. Check your app to verify.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  id="btn-close-success-modal"
                  className="px-6 py-2.5 bg-neutral-905 hover:bg-white/5 border border-white/10 rounded-lg text-2xs font-mono text-neutral-300 hover:text-white transition-all w-full cursor-pointer select-none"
                >
                  Dismiss Workspace Status
                </button>
              </div>
            </div>
          </div>
        )}



      </main>

      {/* Global Interactive Footer */}
      <Footer onNavigateTab={setActiveTab} />

    </div>
  );
}
