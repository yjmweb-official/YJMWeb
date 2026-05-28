/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from 'react';
import { 
  Home, BookOpen, Calendar, MapPin, Sparkles, 
  Smartphone, Image, Mail, Info, FileText, CheckCircle2, ChevronRight 
} from 'lucide-react';

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

  const featureTabs: FeatureTab[] = [
    {
      id: 'menu',
      title: 'Digitized Menu Display',
      category: 'Customer Delight',
      icon: <BookOpen className="w-5 h-5 text-neon-blue" />,
      shortDesc: 'A responsive digital menu replacing archaic laggy PDF files. Features beautiful image-loading placeholders, dietary tags (V, GF) and price updates.',
      proTip: 'Speeds up search discoverability and allows prospective diners to filter options directly from Google maps listings.',
      mockScreenTitle: 'Sensational Menu',
      mockScreenBg: 'from-amber-950/20 to-neutral-900',
      mockScreenContent: (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[10px] uppercase font-mono text-neutral-400">🔥 Flame Specials</span>
            <span className="text-[9px] text-neon-blue font-mono font-bold">100% Chef Rated</span>
          </div>
          
          <div className="p-2 bg-white/2.5 rounded-lg border border-white/5 space-y-1">
            <div className="flex justify-between items-center text-xs font-medium text-white">
              <span>Aged Ribeye Steak</span>
              <span className="text-neon-blue font-mono">$38</span>
            </div>
            <p className="text-[10px] text-neutral-400 leading-normal">
              45-day dry-aged premium beef brushed with black garlic butter.
            </p>
            <span className="text-[9px] bg-amber-500/10 text-amber-400 px-1.5 py-0.2 rounded font-mono uppercase">Gluten-Free</span>
          </div>

          <div className="p-2 bg-white/2.5 rounded-lg border border-white/5 space-y-1">
            <div className="flex justify-between items-center text-xs font-medium text-white">
              <span>Sautéed King Prawns</span>
              <span className="text-neon-blue font-mono">$29</span>
            </div>
            <p className="text-[10px] text-neutral-400 leading-normal">
              Pan-fried locally caught jumbo prawns with chili lime reduction.
            </p>
            <span className="text-[9px] bg-sky-500/10 text-sky-400 px-1.5 py-0.2 rounded font-mono uppercase">Seafood</span>
          </div>
        </div>
      )
    },
    {
      id: 'booking',
      title: 'Reservation Form Framework',
      category: 'Direct Conversions',
      icon: <Calendar className="w-5 h-5 text-neon-purple" />,
      shortDesc: 'A client-side reservation configuration widget or flawless synchronization bridge to OpenTable, Resy, or WhatsApp business triggers.',
      proTip: 'Eliminates commission costs from third-party aggregators and streamlines weekend dining crowd organization.',
      mockScreenTitle: 'Reserve a Table',
      mockScreenBg: 'from-purple-950/20 to-neutral-900',
      mockScreenContent: (
        <div className="space-y-2 text-xs">
          <div className="space-y-1">
            <label className="text-[9px] text-neutral-400 block uppercase font-mono">Date & Seating Spot</label>
            <div className="bg-neutral-950 p-2 border border-white/5 rounded-lg text-[11px] text-neutral-300">
              📅 Friday, June 12 • 7:30 PM
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-neutral-400 block uppercase font-mono">Guests Count</label>
            <div className="flex gap-2">
              <span className="flex-1 bg-neon-purple/10 border border-neon-purple/30 text-center py-1.5 rounded-md font-mono text-[11px] text-white">
                🧍 2 Guests
              </span>
              <span className="flex-1 bg-white/2.5 text-center py-1.5 rounded-md text-[11px] text-neutral-400">
                🧍 4 Guests
              </span>
            </div>
          </div>

          <button className="w-full py-2 bg-neon-purple hover:bg-neon-purple/90 text-neutral-950 font-bold font-display rounded-lg text-[11px] mt-2 transition-all">
            Lock Seating Spot
          </button>
        </div>
      )
    },
    {
      id: 'promotions',
      title: 'Active Promotions Overlay',
      category: 'Seasonal Boosts',
      icon: <Sparkles className="w-5 h-5 text-neon-pink" />,
      shortDesc: 'Dynamic highlight panels and full seasonal campaign cards showcasing happy-hours, live events, or coupon launches to capture quick guest intent.',
      proTip: 'Increases conversion by presenting hot seasonal dining deals right at the first landing scroll.',
      mockScreenTitle: 'Active Campaigns',
      mockScreenBg: 'from-pink-950/20 to-neutral-900',
      mockScreenContent: (
        <div className="space-y-2">
          <div className="bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 p-3 rounded-xl border border-neon-pink/30 relative overflow-hidden">
            <div className="absolute right-1 bottom-1 opacity-10">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <span className="text-[8px] font-mono tracking-widest text-neon-pink block mb-0.5 uppercase">Happy Hour Promo</span>
            <h5 className="font-display font-medium text-xs text-white">Buy 1 Get 1 Free Cocktails</h5>
            <p className="text-[9px] text-neutral-300 mt-1">
              Every Tuesday & Thursday from 5:00 PM to 7:00 PM at the lounge bar.
            </p>
          </div>

          <div className="p-2.5 bg-neutral-950 rounded-lg border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-[9px] text-neutral-400 block">Weekend Brunch Coupon</span>
              <span className="text-xs font-mono font-semibold text-white">Code: BRUNCH15</span>
            </div>
            <span className="text-[10px] text-neon-pink font-mono font-bold">-15%</span>
          </div>
        </div>
      )
    },
    {
      id: 'maps',
      title: 'Google Maps Directions Integration',
      category: 'Localized Traffic',
      icon: <MapPin className="w-5 h-5 text-emerald-400" />,
      shortDesc: 'Custom vector-bordered Google maps modules making it effortless for guests typing searches coordinates on foot to navigate straight to your doors.',
      proTip: 'Crucial for localized Google search rankings and directing tourist foot traffic in high-density shopping districts.',
      mockScreenTitle: 'Find Our Entry',
      mockScreenBg: 'from-emerald-950/20 to-neutral-900',
      mockScreenContent: (
        <div className="space-y-2">
          <div className="h-24 bg-neutral-950 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center">
            {/* Mock Vector Map lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute w-full h-0.5 bg-emerald-500/20 top-1/2" />
            <div className="absolute h-full w-0.5 bg-emerald-500/20 left-1/3" />
            
            {/* Custom Glowing pin */}
            <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <MapPin className="w-6 h-6 text-emerald-400 animate-bounce fill-emerald-400/20" />
              <div className="w-2 h-2 bg-emerald-400/40 rounded-full blur-[2px]" />
            </div>

            <span className="text-[9px] font-mono text-neutral-500 absolute bottom-1 right-2">GPS V4 Locked</span>
          </div>

          <div className="space-y-1 text-[10px] text-neutral-300">
            <p className="font-semibold text-white">📍 15 Galle Road, Colombo 03</p>
            <p className="text-neutral-400">Open Daily: 11:30 AM - 11:00 PM</p>
          </div>
        </div>
      )
    },
    {
      id: 'gallery',
      title: 'HD Photography Gallery',
      category: 'Visual Appetizer',
      icon: <Image className="w-5 h-5 text-amber-400" />,
      shortDesc: 'A sleek custom image layout showing food close-ups, cozy diner settings, and chef techniques with lightning-fast caching.',
      proTip: 'Optimized via modern WebP compression techniques to ensure high-end food pictures load without standard bandwidth lags.',
      mockScreenTitle: 'Aura Gallery',
      mockScreenBg: 'from-amber-950/20 to-neutral-900',
      mockScreenContent: (
        <div className="grid grid-cols-2 gap-2">
          <div className="aspect-square bg-gradient-to-br from-amber-500/20 to-amber-900/30 rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden group">
            <span className="text-[10px] text-amber-200 font-mono">Dry Steak</span>
          </div>
          <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-purple-900/30 rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden">
            <span className="text-[10px] text-purple-200 font-mono">Interiors</span>
          </div>
          <div className="aspect-square bg-gradient-to-br from-indigo-500/20 to-indigo-900/30 rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden">
            <span className="text-[10px] text-indigo-200 font-mono">Cocktails</span>
          </div>
          <div className="aspect-square bg-gradient-to-br from-emerald-500/20 to-emerald-900/30 rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden">
            <span className="text-[10px] text-emerald-200 font-mono">Desserts</span>
          </div>
        </div>
      )
    },
    {
      id: 'mobile',
      title: 'Mobile-First UI Architecture',
      category: 'Core System',
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      shortDesc: 'Since 85%+ of restaurant explorers search from smart mobile viewports, your website is engineered with responsive components from the ground up.',
      proTip: 'Guarantees flawless performance on iOS, Android, tablets, and mini-screens, achieving 99+ mobile score reviews.',
      mockScreenTitle: 'Viewport V4',
      mockScreenBg: 'from-cyan-950/20 to-neutral-900',
      mockScreenContent: (
        <div className="space-y-3 text-center py-2">
          <Smartphone className="w-8 h-8 text-cyan-400 mx-auto animate-pulse" />
          <div>
            <span className="text-[10px] text-white font-medium block">Fluid Grid Optimization</span>
            <span className="text-[9px] text-neutral-400 max-w-xs mx-auto block leading-normal mt-1">
              Tap points are set to at least 44px to prevent frustrating miss-clicks while searching food screens.
            </span>
          </div>
          <div className="inline-block px-2 py-0.5 bg-cyan-400/10 border border-cyan-400/25 rounded-full text-[8px] font-mono text-cyan-400 uppercase">
            Passes Google Mobile Inspection
          </div>
        </div>
      )
    }
  ];

  const currentTab = featureTabs.find(t => t.id === activeFeature) || featureTabs[0];

  return (
    <div className="w-full text-white py-1.5" id="interactive-features-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Element: Feature Selectors */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-3">
              {featureTabs.map((item) => {
                const isActive = activeFeature === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveFeature(item.id)}
                    id={`feature-btn-${item.id}`}
                    className={`w-full flex items-start gap-4 p-5 rounded-2xl text-left border transition-all ${
                      isActive 
                        ? 'bg-neutral-950 border-white/15 shadow-xl scale-[1.01]' 
                        : 'bg-transparent border-transparent hover:bg-white/2.5'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${
                      isActive ? 'bg-white/5 border border-white/10' : 'bg-neutral-900/60'
                    }`}>
                      {item.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-3xs uppercase font-mono tracking-widest text-neutral-500">
                          {item.category}
                        </span>
                        {isActive && (
                          <span className="text-[11px] font-mono text-neon-blue font-medium flex items-center gap-1">
                            Interactive View
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <h4 className={`text-base font-display font-medium mt-1 ${
                        isActive ? 'text-white' : 'text-neutral-300'
                      }`}>
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {item.shortDesc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Element: Animated Phone Simulator Preview */}
          <div className="lg:col-span-5 flex items-center justify-center bg-gradient-to-br from-neutral-950 via-[#0a0a0f] to-neutral-950 p-8 rounded-3xl border border-white/5 relative overflow-hidden min-h-[460px]">
            {/* Structural glowing aura spheres in backdrop */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />

            {/* Custom CSS Styled smartphone housing mockup */}
            <div className="w-[280px] h-[520px] rounded-[44px] bg-neutral-950 border-[6px] border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col justify-between" id="smartphone-mockup-frame">
              {/* Phone ear-notch speaker pill */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-zinc-800 z-30 flex items-center justify-center p-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-950 mr-2" />
                <div className="w-12 h-1 bg-zinc-950 rounded-full" />
              </div>

              {/* Status bar */}
              <div className="px-6 pt-7 pb-2 flex items-center justify-between text-3xs font-mono text-neutral-400 bg-neutral-950 relative z-20">
                <span>12:45 UTC</span>
                <div className="flex items-center gap-1">
                  <span>5G</span>
                  <div className="w-4 h-2 bg-neutral-700 rounded-sm p-0.5">
                    <div className="w-full h-full bg-neon-blue rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Dynamic Inner Simulated Layout viewport */}
              <div className={`flex-1 bg-gradient-to-b ${currentTab.mockScreenBg} p-4 flex flex-col justify-between relative`}>
                <div>
                  <div className="flex items-center gap-1.5 text-2xs font-mono text-neutral-400 mb-3 uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-blue" />
                    {currentTab.mockScreenTitle}
                  </div>
                  
                  {/* Content Box */}
                  <div>
                    {currentTab.mockScreenContent}
                  </div>
                </div>

                {/* Simulated mock-app internal bottom navigation or card footer */}
                <div className="mt-4 p-3 bg-neutral-900/85 border border-white/5 rounded-xl text-[10px] text-neutral-400 text-center leading-relaxed font-mono">
                  💡 <strong>Pro Tip:</strong> {currentTab.proTip}
                </div>
              </div>

              {/* Bottom device swipe indicator bar */}
              <div className="bg-neutral-950 py-3.5 flex items-center justify-center relative z-20">
                <div className="w-24 h-1 bg-zinc-800 rounded-full" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
