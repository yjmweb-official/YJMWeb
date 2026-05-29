/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ReactNode } from 'react';
import { 
  BookOpen, Calendar, MapPin, Sparkles, 
  Smartphone, Image, CheckCircle2, ChevronRight, ChevronDown, ChevronUp, Laptop, ShieldCheck, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FeatureTab {
  id: string;
  title: string;
  category: string;
  icon: ReactNode;
  shortDesc: string;
  proTip: string;
  mockScreenTitle: string;
  mockScreenBg: string;
  mockScreenContent: ReactNode;
}

export default function InteractiveFeatures() {
  const [activeFeature, setActiveFeature] = useState<string>('menu');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({
    menu: true // Default expanded
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 640);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const featureTabs: FeatureTab[] = [
    {
      id: 'menu',
      title: 'Digital Showcase Layouts',
      category: 'Customer Delight',
      icon: <Laptop className="w-5 h-5 text-neon-blue" />,
      shortDesc: 'Smooth, responsive online displays replacing archaic files. Outperformed structures detailing your business products, operational details, and custom galleries with instant loads.',
      proTip: 'Speeds up client discoverability and allows prospective customers to browse products directly from local search listings.',
      mockScreenTitle: 'SaaS Catalog View',
      mockScreenBg: 'from-blue-950/30 to-neutral-900',
      mockScreenContent: (
        <div className="space-y-3 font-sans text-xs">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[10px] uppercase font-mono text-neutral-400">⚡ Core Offerings</span>
            <span className="text-[9px] text-neon-blue font-mono font-bold">Aesthetic Design</span>
          </div>
          
          <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 space-y-1 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center text-xs font-semibold text-white">
              <span>Standard Business Plan</span>
              <span className="text-neon-blue font-mono">$149</span>
            </div>
            <p className="text-[10px] text-neutral-400 leading-normal">
              High-index professional custom screens with rapid booking & maps integration.
            </p>
            <div className="flex gap-1.5 pt-1">
              <span className="text-[8px] bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded font-mono uppercase font-semibold">99+ SLA</span>
              <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono uppercase font-semibold">Secure</span>
            </div>
          </div>

          <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 space-y-1 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center text-xs font-semibold text-white">
              <span>Enterprise Redesign Blueprint</span>
              <span className="text-neon-blue font-mono">$249</span>
            </div>
            <p className="text-[10px] text-neutral-400 leading-normal">
              Bespoke visual assets, full optimization audit, and premium monthly reports.
            </p>
            <div className="flex gap-1.5 pt-1">
              <span className="text-[8px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded font-mono uppercase font-semibold">Priority SV</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'booking',
      title: 'Smart Booking Form',
      category: 'Direct Conversions',
      icon: <Calendar className="w-5 h-5 text-neon-purple" />,
      shortDesc: 'A flawless scheduling widget or interactive checkout prompter that gathers customer requirements and forwards notifications directly to your crew.',
      proTip: 'Eliminates commission fees from third-party booking systems and streamlines service appointment schedules.',
      mockScreenTitle: 'Request Consultation',
      mockScreenBg: 'from-purple-950/30 to-neutral-900',
      mockScreenContent: (
        <div className="space-y-2.5 text-xs font-sans">
          <div className="space-y-1">
            <label className="text-[9px] text-neutral-450 block uppercase font-mono tracking-wider">Appointment Window</label>
            <div className="bg-neutral-900/95 p-2.5 border border-white/5 rounded-lg text-[10px] text-neutral-200">
              📅 Friday, June 12 • 4:00 PM (EST)
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-neutral-450 block uppercase font-mono tracking-wider">Consultation Type</label>
            <div className="flex gap-2">
              <span className="flex-1 bg-neon-purple/10 border border-neon-purple/30 text-center py-1.5 rounded-md font-mono text-[10px] text-white font-semibold">
                💻 Web Design
              </span>
              <span className="flex-1 bg-white/5 text-center py-1.5 rounded-md text-[10px] text-neutral-400">
                📈 Marketing
              </span>
            </div>
          </div>

          <button className="w-full py-2 bg-neon-purple hover:bg-neon-purple/90 text-neutral-950 font-semibold font-display rounded-lg text-xs mt-2.5 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            Lock Selected Window
          </button>
        </div>
      )
    },
    {
      id: 'promotions',
      title: 'Active Campaigns Overlay',
      category: 'Seasonal Boosts',
      icon: <Sparkles className="w-5 h-5 text-neon-pink" />,
      shortDesc: 'Sleek custom highlight banners and seasonal launch panels featuring live discounts or service announcements right at first scroll.',
      proTip: 'Increases local conversion rates by keeping hot seasonal announcements front and center.',
      mockScreenTitle: 'Active Campaigns',
      mockScreenBg: 'from-pink-950/30 to-neutral-900',
      mockScreenContent: (
        <div className="space-y-3 font-sans">
          <div className="bg-gradient-to-r from-neon-pink/15 to-neon-purple/15 p-3 rounded-xl border border-neon-pink/30 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <div className="absolute right-0 bottom-0 opacity-10">
              <Sparkles className="w-14 h-14 text-white animate-pulse" />
            </div>
            <span className="text-[8px] font-mono tracking-widest text-neon-pink block mb-0.5 uppercase font-bold">Limited Offer</span>
            <h5 className="font-display font-medium text-xs text-white">Save 15% This Month</h5>
            <p className="text-[9px] text-neutral-300 mt-1 leading-normal">
              On custom business website setups and SSL domain mappings. Use code: PRO15.
            </p>
          </div>

          <div className="p-2.5 bg-neutral-900/90 rounded-lg border border-white/5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            <div>
              <span className="text-[9px] text-neutral-400 block font-mono">Exclusive Coupon</span>
              <span className="text-xs font-mono font-semibold text-white">Code: YJMSTARS</span>
            </div>
            <span className="text-[10px] text-neon-pink font-mono font-extrabold">-15%</span>
          </div>
        </div>
      )
    },
    {
      id: 'maps',
      title: 'Google Maps Directions',
      category: 'Localized Traffic',
      icon: <MapPin className="w-5 h-5 text-emerald-400" />,
      shortDesc: 'Custom vector-bordered Google maps integrations making it frictionless for clients to locate your physical offices or service store fronts.',
      proTip: 'Crucial for local search map ranking improvements and general consumer validation.',
      mockScreenTitle: 'HQ Directions',
      mockScreenBg: 'from-emerald-950/30 to-neutral-900',
      mockScreenContent: (
        <div className="space-y-3 font-sans">
          <div className="h-24 bg-neutral-900 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:14px_14px]" />
            <div className="absolute w-full h-0.5 bg-emerald-500/20 top-1/2" />
            <div className="absolute h-full w-0.5 bg-emerald-500/20 left-1/3" />
            
            <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <MapPin className="w-6 h-6 text-emerald-400 animate-bounce fill-emerald-400/20" />
              <div className="w-2.5 h-2.5 bg-emerald-400/40 rounded-full blur-[2px]" />
            </div>

            <span className="text-[8px] font-mono text-neutral-500 absolute bottom-1 right-2 uppercase tracking-wide">Secure Coordinates</span>
          </div>

          <div className="space-y-1 text-[10px] leading-normal text-neutral-300">
            <p className="font-semibold text-white">📍 15 Galle Road, Colombo 03</p>
            <p className="text-neutral-400 font-mono text-[9px]">MON-FRI: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      )
    },
    {
      id: 'gallery',
      title: 'High-Res Presentation',
      category: 'Visual Showcase',
      icon: <Image className="w-5 h-5 text-amber-400" />,
      shortDesc: 'A flawless custom visual matrix showcasing products, workspace settings, creative works, and premium detail overlays with lightning-fast caching.',
      proTip: 'Optimized through high-speed WebP visual conversions to skip load limits or general screen lags.',
      mockScreenTitle: 'Product Showcase',
      mockScreenBg: 'from-amber-950/30 to-neutral-900',
      mockScreenContent: (
        <div className="grid grid-cols-2 gap-2 font-sans">
          <div className="aspect-[4/3] bg-gradient-to-br from-amber-500/10 to-amber-900/30 rounded-lg border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
            <span className="text-[9px] text-amber-200 font-mono font-medium">Workspace</span>
          </div>
          <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/10 to-purple-900/30 rounded-lg border border-white/5 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
            <span className="text-[9px] text-purple-200 font-mono font-medium">Technology</span>
          </div>
          <div className="aspect-[4/3] bg-gradient-to-br from-indigo-500/10 to-indigo-900/30 rounded-lg border border-white/5 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
            <span className="text-[9px] text-indigo-200 font-mono font-medium">Deliverables</span>
          </div>
          <div className="aspect-[4/3] bg-gradient-to-br from-emerald-500/10 to-emerald-900/30 rounded-lg border border-white/5 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
            <span className="text-[9px] text-emerald-200 font-mono font-medium font-bold">Solutions</span>
          </div>
        </div>
      )
    },
    {
      id: 'mobile',
      title: 'Mobile-First Framework',
      category: 'Core System',
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      shortDesc: 'Since the vast majority of local business searches happen on smartphones, our websites are custom coded with fully responsive component metrics.',
      proTip: 'Guarantees pristine alignment and usability across standard tablets, notebooks, and dynamic displays.',
      mockScreenTitle: 'Fluid Viewport',
      mockScreenBg: 'from-cyan-950/30 to-neutral-900',
      mockScreenContent: (
        <div className="space-y-3 text-center py-1 font-sans">
          <Smartphone className="w-8 h-8 text-cyan-400 mx-auto animate-pulse" />
          <div className="space-y-1">
            <span className="text-[10px] text-white font-semibold block">Responsive Layout Grid</span>
            <span className="text-[9px] text-neutral-450 max-w-[200px] mx-auto block leading-normal">
              Frictionless touch targets allow fluid scrolling and interaction.
            </span>
          </div>
          <span className="inline-block px-2.5 py-0.5 bg-cyan-400/15 border border-cyan-400/30 rounded-full text-[8px] font-mono text-cyan-300 uppercase tracking-widest font-bold">
            99+ Mobile viewport
          </span>
        </div>
      )
    }
  ];

  const handleFeatureClick = (id: string) => {
    setActiveFeature(id);
    if (isMobile) {
      setExpandedFeatures((prev) => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };

  const currentTab = featureTabs.find(t => t.id === activeFeature) || featureTabs[0];

  return (
    <div className="w-full text-white py-1.5 relative" id="interactive-features-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Element: Feature Selectors (Accordion on mobile) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-3.5">
              {featureTabs.map((item) => {
                const isActive = activeFeature === item.id;
                const isExpanded = !!expandedFeatures[item.id];

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isActive 
                        ? 'bg-neutral-950/90 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]' 
                        : 'bg-transparent border-transparent hover:bg-white/2.5'
                    }`}
                  >
                    <button
                      onClick={() => handleFeatureClick(item.id)}
                      id={`feature-btn-${item.id}`}
                      className="w-full flex items-start gap-4 p-5 text-left cursor-pointer focus:outline-none"
                    >
                      <div className={`p-3 rounded-xl shrink-0 transition-colors duration-300 ${
                        isActive ? 'bg-white/5 border border-white/10' : 'bg-neutral-900/60'
                      }`}>
                        {item.icon}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-mono tracking-widest text-neutral-500 block font-semibold">
                            {item.category}
                          </span>
                          {isMobile ? (
                            <span className="p-1 bg-white/5 rounded-md text-neutral-400 group-hover:text-white transition-all">
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </span>
                          ) : (
                            isActive && (
                              <span className="text-[11px] font-mono text-neon-blue font-medium flex items-center gap-1.5 animate-pulse">
                                Active Live Preview
                                <ChevronRight className="w-3.5 h-3.5" />
                              </span>
                            )
                          )}
                        </div>
                        <h4 className={`text-base font-display font-medium mt-1 leading-tight ${
                          isActive ? 'text-white' : 'text-neutral-300'
                        }`}>
                          {item.title}
                        </h4>
                        
                        {/* Accordion Collapse: Always visible on desktop / Collapsible on Mobile */}
                        <AnimatePresence initial={false}>
                          {(!isMobile || isExpanded) && (
                            <motion.div
                              initial={isMobile ? { height: 0, opacity: 0, marginTop: 0 } : false}
                              animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                              exit={isMobile ? { height: 0, opacity: 0, marginTop: 0 } : false}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                                {item.shortDesc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
 
          {/* Right Element: ULTRA-PREMIUM Realistic Phone Simulator Preview Showcase */}
          <div className="lg:col-span-5 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-neutral-950 via-[#07070c] to-neutral-950 rounded-3xl border border-white/5 relative overflow-hidden min-h-[580px] shadow-[inset_0_2px_45px_rgba(0,0,0,0.7)]">
            {/* Ambient Background Neon Light Bulbs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-neon-blue/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-neon-purple/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

            {/* Smart Hardware physical external side buttons (tactile realism) */}
            <div className="absolute left-[calc(50%-153px)] top-28 w-1 h-12 bg-zinc-700/80 rounded-l shadow-lg pointer-events-none z-10" />
            <div className="absolute left-[calc(50%-153px)] top-44 w-1 h-16 bg-zinc-700/80 rounded-l shadow-lg pointer-events-none z-10" />
            <div className="absolute left-[calc(50%-153px)] top-64 w-1 h-16 bg-zinc-700/80 rounded-l shadow-lg pointer-events-none z-10" />
            <div className="absolute right-[calc(50%-153px)] top-36 w-1 h-20 bg-zinc-700/80 rounded-r shadow-lg pointer-events-none z-10" />

            {/* Realistic Premium Smartphone Housing Mockup */}
            <div 
              className="w-[300px] h-[580px] rounded-[48px] bg-[#0c0c14] border-[8px] border-zinc-800 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_1px_2px_rgba(255,255,255,0.08),0_0_40px_rgba(0,198,255,0.05)] relative overflow-hidden flex flex-col justify-between" 
              style={{ transform: 'perspective(1000px) rotateY(-2deg) rotateX(1deg)' }}
              id="smartphone-mockup-frame"
            >
              {/* Dynamic Island / Realistic Camera Notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[110px] h-7 rounded-3xl bg-black z-40 border border-zinc-900 flex items-center justify-between px-3.5 shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-neutral-900/40 relative flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-blue-900/60" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/10 animate-pulse" />
              </div>

              {/* Top status bar layout */}
              <div className="px-6 pt-12 pb-3 flex items-center justify-between text-[10px] font-mono text-neutral-300 bg-black/90 relative z-30 font-semibold tracking-wider">
                <span>12:45 UTC</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-[#22c55e]">5G</span>
                  <div className="w-4.5 h-2.5 bg-neutral-800 border border-neutral-700 rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-neon-blue rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* Realistic Glossy Screen Reflection Overlay Diagonal Sheen */}
              <div className="absolute top-0 right-0 w-[200%] h-full bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08] pointer-events-none z-30 -translate-x-[25%] -rotate-45" />

              {/* Dynamic Inner Simulated Interactive Content */}
              <div className={`flex-1 bg-gradient-to-b ${currentTab.mockScreenBg} p-5 flex flex-col justify-between relative overflow-hidden`}>
                
                {/* Visual grid guide overlay */}
                <div className="absolute inset-0 bg-neutral-950/20 [background-image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-300 font-bold mb-4 uppercase tracking-wider bg-white/5 border border-white/5 py-1 px-2.5 rounded-full w-max backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-ping" />
                    {currentTab.mockScreenTitle}
                  </div>
                  
                  {/* Active Page View Content */}
                  <div className="animate-fade-in">
                    {currentTab.mockScreenContent}
                  </div>
                </div>

                {/* Simulated physical active pro tip container */}
                <div className="mt-4 p-3 bg-neutral-950/90 border border-white/5 rounded-xl text-[10px] text-neutral-300 text-center leading-relaxed font-mono relative z-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  💡 <strong>Pro Tip:</strong> {currentTab.proTip}
                </div>
              </div>

              {/* Smartphone bottom Home indicator bar */}
              <div className="bg-black py-4 flex items-center justify-center relative z-40 border-t border-zinc-950">
                <div className="w-28 h-1 bg-zinc-700 rounded-full" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
