/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode, FormEvent } from 'react';
import { Copy, Check, Sparkles, Shield, Cpu, Zap, Flame, Eye, MessageSquare, ArrowRight, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { trackWhatsAppClick, trackFormInteraction, trackFormSubmit } from '../lib/analytics';

interface LogoItem {
  id: string;
  name: string;
  styleName: string;
  description: string;
  bestFor: string;
  icon: ReactNode;
  svgMarkup: string;
}

export default function LogoConcepts() {
  const [activeConcept, setActiveConcept] = useState<string>('monogram');
  const [copied, setCopied] = useState<boolean>(false);
  const [glowEnabled, setGlowEnabled] = useState<boolean>(true);
  const [previewBg, setPreviewBg] = useState<'charcoal' | 'pitch' | 'neon'>('charcoal');

  const [logoBrandName, setLogoBrandName] = useState<string>('');
  const [logoAesthetic, setLogoAesthetic] = useState<string>('Futuristic Geometric');
  const [logoColors, setLogoColors] = useState<string>('');
  const [logoSymbolism, setLogoSymbolism] = useState<string>('');
  const [showLogoSuccess, setShowLogoSuccess] = useState<boolean>(false);

  const handleSubmitLogoOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!logoBrandName.trim()) {
      return;
    }

    const msg = `🎨 *YJMWeb Branding Lab - Custom Logo Order ($15)* 🎨\n-----------------------------------------\n👤 *Client Contacts:*\n- Brand Name: ${logoBrandName}\n- Design Vibe: ${logoAesthetic}\n- Color Scheme: ${logoColors || 'Any / Designer Choice'}\n- Symbolism Notes: ${logoSymbolism || 'None provided.'}\n\n-----------------------------------------\n💳 *Logo Art Commission rate:* $15 one-time Setup Fee\n_Please generate our custom vector logo layout blueprints!_`;

    const encoded = encodeURIComponent(msg);
    const targetUrl = `https://wa.me/94776826937?text=${encoded}`;
    
    // Open through our modern global connection popup if available, otherwise fallback
    if (typeof window !== 'undefined' && (window as any).triggerWhatsAppPopup) {
      (window as any).triggerWhatsAppPopup('support', targetUrl);
    } else {
      window.open(targetUrl, '_blank');
      trackWhatsAppClick('support');
    }

    // Track branding lab logo order in GA4 & GTM
    trackFormSubmit('branding_lab_order', {
      brand_name: logoBrandName,
      aesthetic: logoAesthetic,
      colors: logoColors || 'Any'
    });
    trackFormInteraction('branding_lab_order', 'submit', {
      brand_name: logoBrandName,
      aesthetic: logoAesthetic,
      colors: logoColors || 'Any'
    });

    setShowLogoSuccess(true);
    setTimeout(() => {
      setShowLogoSuccess(false);
    }, 5000);
  };

  const concepts: LogoItem[] = [
    {
      id: 'monogram',
      name: 'Geometric Monogram "YJM"',
      styleName: 'Minimal Futuristic Monogram',
      description: 'An elite interconnected emblem where the letters Y, J, and M weave together in a single continuous mathematical path representing seamless integration and web flow.',
      bestFor: 'Mobile app icons, premium responsive navbars, favicons, corporate letterheads.',
      icon: <Cpu className="w-4 h-4 text-neon-blue" />,
      svgMarkup: `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="monoGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f3ff" />
      <stop offset="100%" stop-color="#bd00ff" />
    </linearGradient>
    <filter id="neonShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <!-- Background element if glow enabled -->
  <g filter="url(#neonShadow)">
    <!-- Y-Path -->
    <path d="M 25 25 L 50 50 L 75 25" stroke="url(#monoGlow)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <!-- J-Path -->
    <path d="M 50 50 L 50 70 C 50 82 30 82 30 70" stroke="url(#monoGlow)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <!-- M-Path -->
    <path d="M 35 40 L 50 55 L 65 40 L 75 70" stroke="url(#monoGlow)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.8" />
  </g>
</svg>`
    },
    {
      id: 'circuit',
      name: 'Neon Circuit Web Symbol',
      styleName: 'Cybernetic Tech Icon',
      description: 'Abstract node-circuit representing network routes, hosting, server nodes and smart responsive websites. Clean parallel cyber tracks with active power point endpoints.',
      bestFor: 'SaaS header backgrounds, dark-mode agency banners, web-app launchers.',
      icon: <Zap className="w-4 h-4 text-neon-purple" />,
      svgMarkup: `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cirGlow" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#bd00ff" />
      <stop offset="100%" stop-color="#00f3ff" />
    </linearGradient>
  </defs>
  <g stroke="url(#cirGlow)" stroke-linecap="round" fill="none">
    <!-- Main diamond cage -->
    <polygon points="50,15 85,50 50,85 15,50" stroke-width="4" stroke-dasharray="10 5" />
    <!-- Core nodes and web tracks -->
    <path d="M 50 15 L 50 85" stroke-width="5" />
    <path d="M 15 50 L 85 50" stroke-width="5" />
    <!-- Inner offset circle -->
    <circle cx="50" cy="50" r="18" stroke-width="3" />
    <!-- Circular terminal nodes -->
    <circle cx="50" cy="50" r="5" fill="#00f3ff" stroke="none" />
    <circle cx="50" cy="15" r="4.5" fill="#bd00ff" stroke="none" />
    <circle cx="50" cy="85" r="4.5" fill="#bd00ff" stroke="none" />
    <circle cx="15" cy="50" r="4.5" fill="#00f3ff" stroke="none" />
    <circle cx="85" cy="50" r="4.5" fill="#00f3ff" stroke="none" />
  </g>
</svg>`
    },
    {
      id: 'typography',
      name: 'Cyber Typography Wordmark',
      styleName: 'Futuristic Tech Typography',
      description: 'A sharp, custom geometrical typography layout for YJMWeb, featuring heavy-duty angular cyber cuts and a built-in progress indicator block to signify continuous performance optimizations.',
      bestFor: 'Desktop logo placements, main website header, branded promo merchandise.',
      icon: <Sparkles className="w-4 h-4 text-neon-pink" />,
      svgMarkup: `<svg viewBox="0 0 240 80" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="typoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f3ff" />
      <stop offset="50%" stop-color="#bd00ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>
  </defs>
  <!-- YJM Cut characters -->
  <g fill="none" stroke="url(#typoGrad)" stroke-width="6" stroke-linecap="miter" stroke-linejoin="miter">
    <!-- Y -->
    <path d="M 15 15 L 30 35 L 30 65 M 45 15 L 30 35" />
    <!-- J -->
    <path d="M 55 15 L 75 15 M 65 15 L 65 52 C 65 65 48 65 48 55" />
    <!-- M -->
    <path d="M 85 65 L 85 15 L 100 42 L 115 15 L 115 65" />
  </g>
  <!-- "WEB" block in modern tracking sans-serif -->
  <text x="135" y="48" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="800" font-size="28" fill="#ffffff" letter-spacing="4">WEB</text>
  <!-- Tech progress underscore -->
  <rect x="135" y="58" width="80" height="4" fill="#00f3ff" rx="2" />
  <circle cx="218" cy="60" r="3" fill="#ff007a" />
</svg>`
    },
    {
      id: 'flat',
      name: 'Flat Clean Geometric Concept',
      styleName: 'Flat Vector Monogram',
      description: 'A simplified, mathematically aligned, flat geometric presentation representing high-contrast visibility. It relies on negative space intersections and functions robustly even in black-andwhite printing.',
      bestFor: 'Social media avatars, vertical banners, invoices, favicon files, paper receipts.',
      icon: <Shield className="w-4 h-4 text-gray-400" />,
      svgMarkup: `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
  <!-- Minimal geometric shapes with no glow -->
  <g fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="butt">
    <path d="M 20,20 L 50,55 L 80,20" />
    <path d="M 50,55 L 50,85" />
    <path d="M 32,35 H 68" stroke-width="4" opacity="0.4" />
    <circle cx="50" cy="20" r="4" fill="#ffffff" />
  </g>
</svg>`
    }
  ];

  const currentConcept = concepts.find(c => c.id === activeConcept) || concepts[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentConcept.svgMarkup);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 lg:p-10 border-white/5 relative overflow-hidden" id="logo-concepts-section">
      {/* Visual background gradient blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-neon-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
        
        {/* Left Side: Concept Selector & Description */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit mb-5">
              <Sparkles className="w-3.5 h-3.5 text-neon-blue" />
              <span className="text-xs font-mono tracking-widest text-neutral-300 uppercase">Branding Lab</span>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-display font-medium text-white mb-3">
              Elite Logo Concepts for <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink font-semibold">YJMWeb</span>
            </h3>
            
            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
              We design logos that symbolize future-facing quality. Explore our distinct conceptual options designed to look absolute on dark applications, high-res phone screens, and social platforms.
            </p>

            <div className="space-y-2.5 mb-8">
              {concepts.map((concept) => (
                <button
                  key={concept.id}
                  onClick={() => setActiveConcept(concept.id)}
                  id={`btn-concept-${concept.id}`}
                  className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl transition-all text-left border ${
                    activeConcept === concept.id
                      ? 'bg-neutral-900/90 border-neon-blue/40 shadow-lg shadow-neon-blue/5'
                      : 'bg-transparent border-white/5 hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    activeConcept === concept.id ? 'bg-neon-blue/10' : 'bg-white/5'
                  }`}>
                    {concept.icon}
                  </div>
                  <div>
                    <h4 className={`text-sm font-medium ${
                      activeConcept === concept.id ? 'text-white' : 'text-neutral-300'
                    }`}>
                      {concept.name}
                    </h4>
                    <p className="text-2xs text-neutral-500 mt-0.5">{concept.styleName}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white/2.5 border border-white/5 rounded-2xl">
            <span className="text-2xs font-mono uppercase text-neon-blue block mb-1">Concept Strategy</span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              All concepts are fully vector-compliant, highly scalable SVG configurations that execute seamlessly on high-dpi mobile displays without loss of speed or rendering artifacts.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Live Preview Workspace */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-neutral-950/80 border border-white/5 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-400">Preview Canvas:</span>
              <div className="flex bg-neutral-900 p-0.5 rounded-lg border border-white/5">
                <button
                  onClick={() => setPreviewBg('charcoal')}
                  id="btn-bg-charcoal"
                  className={`px-2.5 py-1 text-2xs font-mono rounded-md transition-all ${
                    previewBg === 'charcoal' ? 'bg-zinc-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Dark Grid
                </button>
                <button
                  onClick={() => setPreviewBg('pitch')}
                  id="btn-bg-pitch"
                  className={`px-2.5 py-1 text-2xs font-mono rounded-md transition-all ${
                    previewBg === 'pitch' ? 'bg-zinc-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Deep Pitch
                </button>
                <button
                  onClick={() => setPreviewBg('neon')}
                  id="btn-bg-neon"
                  className={`px-2.5 py-1 text-2xs font-mono rounded-md transition-all ${
                    previewBg === 'neon' ? 'bg-neon-purple/20 text-neon-blue font-medium' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Aura Pulse
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono text-neutral-400 select-none">
                <input
                  type="checkbox"
                  checked={glowEnabled}
                  onChange={(e) => setGlowEnabled(e.target.checked)}
                  id="chk-glow-toggle"
                  className="rounded bg-neutral-900 border-white/10 text-neon-blue focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                />
                Neon Glow
              </label>
            </div>
          </div>

          {/* Canvas Display Viewport */}
          <div 
            className={`flex-1 min-h-[290px] h-64 flex items-center justify-center p-8 relative transition-all duration-500 overflow-hidden ${
              previewBg === 'charcoal' ? 'bg-[#0A0A0C] cyber-grid' :
              previewBg === 'pitch' ? 'bg-[#010101]' :
              'bg-gradient-to-br from-neutral-950 via-purple-950/20 to-neutral-950'
            }`}
          >
            {/* Ambient Background Aura Lights */}
            {glowEnabled && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                <div className={`absolute w-44 h-44 rounded-full mix-blend-screen opacity-15 filter blur-3xl transition-all duration-700 animate-pulse-glow ${
                  activeConcept === 'monogram' ? 'bg-neon-blue' :
                  activeConcept === 'circuit' ? 'bg-neon-purple' :
                  activeConcept === 'typography' ? 'bg-neon-pink' : 'bg-white opacity-5'
                }`} />
              </div>
            )}

            {/* Render direct SVG */}
            <div className="max-w-[200px] sm:max-w-[240px] w-full flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <div 
                className="w-full flex justify-center"
                dangerouslySetInnerHTML={{ 
                  __html: glowEnabled 
                    ? currentConcept.svgMarkup 
                    : currentConcept.svgMarkup.replace(/filter="url\(#neonShadow\)"/g, '').replace(/filter: blur\(\d+px\)/g, '') 
                }} 
              />
            </div>
          </div>

          {/* Details / Metadata Footer */}
          <div className="p-5 bg-neutral-950/90 border-t-0 border border-white/5 rounded-b-2xl">
            <h4 className="text-white text-base font-display font-medium flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-neon-blue" />
              {currentConcept.name}
            </h4>
            <p className="text-neutral-400 text-xs leading-relaxed mb-4">
              {currentConcept.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-4 border-t border-white/5">
              <div className="sm:col-span-8">
                <span className="text-3xs font-mono uppercase text-neutral-500 block mb-0.5">Recommended Applications:</span>
                <p className="text-xs text-neutral-300">{currentConcept.bestFor}</p>
              </div>

              <div className="sm:col-span-4 flex items-end justify-start sm:justify-end">
                <button
                  onClick={handleCopyCode}
                  id="btn-copy-svg"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-neon-blue/15 hover:border-neon-blue/50 border border-white/10 rounded-lg text-2xs font-mono text-neutral-300 hover:text-white transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400 animate-pulse" />
                      Copied Code
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy SVG Markup
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* BRANDING LAB FORM SUB-SEGMENT ($15) */}
      <div className="mt-16 pt-12 border-t border-white/5 relative overflow-hidden" id="logo-commission-form-segment">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-3xs font-mono uppercase bg-neon-purple/10 text-neon-purple px-2.5 py-1 rounded-full border border-neon-purple/20">
              Logo Strategy Workshop • $15
            </span>
            <h4 className="text-xl sm:text-2xl font-display font-medium text-white">
              Order Custom Brand Identity Blueprints
            </h4>
            <p className="text-neutral-400 text-xs max-w-lg mx-auto leading-relaxed">
              Skip static stock templates. Our design crew will draft customized vector SVG logo files matching your specific company tone for a single transparent flat-rate of <strong>$15</strong>.
            </p>
          </div>

          <form onSubmit={handleSubmitLogoOrder} className="bg-neutral-950/60 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-5 shadow-2xl relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase block mb-1.5 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-neon-blue" />
                  Your Business / Brand Name *
                </label>
                <input
                  type="text"
                  value={logoBrandName}
                  onChange={(e) => setLogoBrandName(e.target.value)}
                  placeholder="e.g. Apex Commerce Group"
                  className="w-full bg-neutral-950 p-3 rounded-lg border border-white/10 focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple transition-all text-sm placeholder:text-neutral-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase block mb-1.5">
                  Design Aesthetic Vibe
                </label>
                <select
                  value={logoAesthetic}
                  onChange={(e) => setLogoAesthetic(e.target.value)}
                  className="w-full bg-neutral-950 p-3 rounded-lg border border-white/10 focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple transition-all text-sm text-neutral-400"
                >
                  <option value="Futuristic Geometric">Futuristic Geometric (Neon Core)</option>
                  <option value="Sleek Minimalist Monogram">Sleek Minimalist Monogram</option>
                  <option value="High-End Editorial Serif">High-End Editorial Serif (Luxury)</option>
                  <option value="Rustic Vintage Artisan">Rustic Vintage Artisan (Craft / Earthy)</option>
                  <option value="Cyberpunk Distressed Badge">Cyberpunk Distressed Badge</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase block mb-1.5">
                  Primary Logo Color Palette
                </label>
                <input
                  type="text"
                  value={logoColors}
                  onChange={(e) => setLogoColors(e.target.value)}
                  placeholder="e.g. Rich Emerald Green & Brushed Brass"
                  className="w-full bg-neutral-950 p-3 rounded-lg border border-white/10 focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple transition-all text-sm placeholder:text-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase block mb-1.5">
                  Desired Symbolism & Elements
                </label>
                <input
                  type="text"
                  value={logoSymbolism}
                  onChange={(e) => setLogoSymbolism(e.target.value)}
                  placeholder="e.g. Abstract chef hat merged with a lightning key"
                  className="w-full bg-neutral-950 p-3 rounded-lg border border-white/10 focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple transition-all text-sm placeholder:text-neutral-700 text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-2xs font-mono uppercase text-neutral-500 block">Art Studio Commission rate:</span>
                <span className="text-2xl font-mono text-amber-400 font-bold">$15.00</span>
                <span className="text-3xs text-neutral-500 ml-1.5 font-mono">One-Time flat fee</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-neon-purple via-neon-pink to-amber-500 text-white font-display font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-neon-purple/10 transition-all hover:opacity-95 active:scale-[0.98] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white/10" />
                Submit Logo Design Request ($15)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {showLogoSuccess && (
              <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center text-center p-4 z-10">
                <div className="bg-neutral-900 border border-white/10 p-6 rounded-xl shadow-2xl flex flex-col items-center">
                  <Check className="w-10 h-10 text-green-400 mb-2 animate-bounce" />
                  <h5 className="text-white text-base font-semibold">Logo Order Compiled!</h5>
                  <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mt-1">
                    We compiled your aesthetic desires and dispatched them securely over WhatsApp. We will trigger visual proofs for your brand identity immediately!
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

    </div>
  );
}
