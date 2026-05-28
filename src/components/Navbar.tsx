/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNavigateToCheckout: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onNavigateToCheckout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'features', label: 'Solutions' },
    { id: 'pricing', label: 'Packages' },
    { id: 'management', label: 'Management Plan' },
    { id: 'logos', label: 'Branding Lab' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    
    // Smooth scroll back to top of container
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark-bg/85 backdrop-blur-xl border-b border-white/5" id="app-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Monogram Frame on Far Left */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('landing')} id="nav-brand-container">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl text-neutral-950 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              Y
            </div>
            
            <div>
              <span className="text-2xl font-bold tracking-tight text-white flex items-center">
                YJM<span className="text-cyan-400">Web</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-item-${item.id}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-white/5 border border-white/10 text-white font-semibold neon-text-blue' 
                      : 'text-neutral-400 border border-transparent hover:text-white hover:bg-white/2.5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="https://wa.me/94776826937" 
              target="_blank" 
              rel="noreferrer"
              className="text-neutral-400 hover:text-green-400 transition-all flex items-center justify-center p-2 rounded-full bg-white/5 border border-white/5 hover:border-green-400/20 shadow-sm"
              id="navbar-wa-text-link"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-green-400" />
            </a>

            <button
              onClick={onNavigateToCheckout}
              id="navbar-cta-btn-launch"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 active:scale-95 text-neutral-950 font-display font-semibold rounded-full text-xs shadow-md shadow-neon-blue/15 transition-all cursor-pointer"
            >
              Checkout
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={onNavigateToCheckout}
              className="flex items-center justify-center p-2.5 bg-neutral-900 border border-white/5 rounded-xl text-neon-blue"
              id="mob-nav-cta"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-neutral-900 border border-white/5 text-neutral-300 hover:text-white transition-all focus:outline-none"
              id="mobile-menu-burger-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu Overlays */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-bg/95 border-b border-white/5 py-4 px-6 absolute top-20 left-0 w-full z-40 backdrop-blur-2xl transition-all" id="mobile-menu-drawer">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`mob-nav-item-${item.id}`}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center justify-between ${
                    isActive 
                      ? 'bg-neon-blue/10 border-l-4 border-neon-blue text-white font-semibold' 
                      : 'text-neutral-400 hover:text-white hover:bg-white/2.5'
                  }`}
                >
                  {item.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-ping" />}
                </button>
              );
            })}
          </div>
          
          <div className="pt-4 mt-4 border-t border-white/5 space-y-3">
            <a 
              href="https://wa.me/94776826937" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 p-3 bg-neutral-900 rounded-lg text-xs font-mono text-neutral-300 hover:text-white"
            >
              <MessageSquare className="w-4 h-4 text-green-400" />
              WhatsApp Support: +94776826937
            </a>

            <button
              onClick={onNavigateToCheckout}
              id="mob-nav-cta-launch"
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-neutral-950 font-display font-bold rounded-lg text-xs transition-all"
            >
              Checkout Now
              <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
