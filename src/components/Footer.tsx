/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, MessageSquare, ArrowUp, Shield } from 'lucide-react';
import { trackWhatsAppClick } from '../lib/analytics';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export default function Footer({ onNavigateTab }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (tabId: string) => {
    onNavigateTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0C]/90 border-t border-white/5 py-12 text-neutral-400 mt-20 relative z-10" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/5">
          
          {/* Logo & Tagline columns */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center font-bold text-base text-neutral-950 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                Y
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center">
                YJM<span className="text-cyan-400">Web</span>
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Designing and maintaining premium, future-facing website solutions that optimize direct business leads, visual product catalog displays, and mobile-friendly bookings for growing modern businesses.
            </p>

            <span className="text-4xs font-mono text-neutral-600 block uppercase tracking-widest">
              Digital Solutions Engineering • Sri Lanka & Global Clients
            </span>
          </div>

          {/* Quick Navigations */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-neutral-200 text-xs font-mono uppercase tracking-widest font-semibold">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLinkClick('features')} className="hover:text-neon-blue transition-all cursor-pointer">
                  Feature Bento Grid
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('pricing')} className="hover:text-neon-purple transition-all cursor-pointer">
                  Setup Packages
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('management')} className="hover:text-neon-pink transition-all cursor-pointer">
                  3-Month Management
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('logos')} className="hover:text-neon-blue transition-all cursor-pointer">
                  Branding Art Lab
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-neon-purple transition-all cursor-pointer">
                  FAQ & Contact Form
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Core Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-neutral-200 text-xs font-mono uppercase tracking-widest font-semibold">Direct Contacts</h4>
            <p className="text-neutral-500 text-xs">Drop our helpdesk team a line for tailored proposals, custom design elements, or multi-location arrangements.</p>
            
            <div className="space-y-2 pt-1 text-xs">
              <a href="mailto:yjmweb@gmail.com" className="flex items-center gap-2 hover:text-white transition-all text-neutral-300">
                <Mail className="w-4 h-4 text-neon-blue" />
                yjmweb@gmail.com
              </a>

              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof window !== 'undefined' && (window as any).triggerWhatsAppPopup) {
                    (window as any).triggerWhatsAppPopup('footer', 'https://wa.me/94776826937');
                  } else {
                    trackWhatsAppClick('footer');
                    window.open('https://wa.me/94776826937', '_blank');
                  }
                }}
                className="flex items-center gap-2 hover:text-white transition-all text-neutral-300 cursor-pointer text-left"
              >
                <MessageSquare className="w-4 h-4 text-green-400" />
                +94 77 682 6937
              </button>
            </div>
          </div>

        </div>

        {/* Bottom footer credit & top button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs z-10 relative">
          <p>© {new Date().getFullYear()} YJMWeb. Created for high-end hospitality brands. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="text-neutral-600 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              SLA Compliant
            </span>
            
            <button
              onClick={handleScrollToTop}
              id="btn-scroll-top-footer"
              className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-white/5 rounded-lg text-neutral-400 hover:text-white transition-all flex items-center gap-1.5"
              title="Return to peak"
            >
              Peak
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
