/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, MessageSquare } from 'lucide-react';
import { FAQ_ITEMS } from '../data';
import { trackWhatsAppClick, trackFormInteraction } from '../lib/analytics';

export default function FAQContact() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // Open first item by default
  const [formData, setFormData] = useState({ name: '', email: '', query: '' });
  const [sentMessage, setSentMessage] = useState(false);

  const toggleFAQIndex = (index: number) => {
    setOpenIndexes(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.query.trim()) {
      return;
    }

    // Direct WhatsApp prefilled contact routing helper
    const message = `👋 *YJMWeb General Query*
-----------------------------
👤 Name: ${formData.name}
✉️ Email: ${formData.email}
📝 Query: ${formData.query}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/94776826937?text=${encoded}`, '_blank');
    
    // Send event logging to GA4 and GTM
    trackWhatsAppClick('support');
    trackFormInteraction('contact_form', 'submit', {
      name: formData.name,
      email: formData.email
    });

    setSentMessage(true);
    setFormData({ name: '', email: '', query: '' });
    setTimeout(() => setSentMessage(false), 5000);
  };

  return (
    <div className="w-full text-white py-1.5" id="faq-contact-panel">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-7xl mx-auto">
        
        {/* Left Side: Dynamic FAQ Accordions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="mb-6">
            <h3 className="text-xl font-display font-medium text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-neon-blue" />
              Frequently Answered Core Questions
            </h3>
            <p className="text-xs text-neutral-400">Everything you want to know about our premium setup cycles, rolling support, and localized design.</p>
          </div>

          <div className="space-y-3.5">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndexes.includes(index);
              return (
                <div 
                  key={index}
                  id={`faq-item-${index}`}
                  className="bg-neutral-950/40 border border-white/5 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQIndex(index)}
                    id={`faq-toggle-btn-${index}`}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-display font-medium text-xs sm:text-sm text-neutral-200 hover:text-white transition-all hover:bg-white/2.5 cursor-pointer"
                  >
                    <span className="flex-1 pr-4 leading-normal">{item.q}</span>
                    <div className="shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-neon-blue" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-500" />
                      )}
                    </div>
                  </button>

                  {/* Accordion body with smooth height transition */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-72 border-t border-white/2.5' : 'max-h-0'
                    }`}
                  >
                    <div className="p-4 sm:p-5 bg-neutral-900/10 text-xs text-neutral-400 leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Quick Contact & Core Data info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border-white/5 bg-neutral-950/80">
            <h3 className="text-lg font-display font-medium text-white pb-3 border-b border-white/5 mb-5 flex items-center gap-2">
              <Mail className="w-5 h-5 text-neon-purple" />
              Direct Channel Form
            </h3>

            {sentMessage ? (
              <div className="text-center py-8 space-y-3 animate-pulse-once">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                <h4 className="text-sm font-semibold text-white">Message Synced!</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  We have pre-addressed your compiled query and loaded it into your WhatsApp. Check your chat to schedule our first design session!
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="text-4xs font-mono text-neutral-400 uppercase block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. Sanjeewa Perera"
                    id="contact-name"
                    className="w-full bg-neutral-900/60 border border-white/5 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-neon-purple transition-all placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="text-4xs font-mono text-neutral-400 uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. manager@flamegrill.com"
                    id="contact-email"
                    className="w-full bg-neutral-900/60 border border-white/5 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-neon-purple transition-all placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="text-4xs font-mono text-neutral-400 uppercase block mb-1">Query or Special Request</label>
                  <textarea
                    name="query"
                    value={formData.query}
                    onChange={handleFormChange}
                    required
                    rows={3}
                    placeholder="Describe your current restaurant layout or describe any custom features you need..."
                    id="contact-query"
                    className="w-full bg-neutral-900/60 border border-white/5 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-neon-purple transition-all placeholder:text-neutral-600"
                  />
                </div>

                <button
                  type="submit"
                  id="btn-contact-submit-whatsapp"
                  className="w-full py-3 bg-neutral-900 hover:bg-neon-purple/10 border border-white/10 hover:border-neon-purple/40 rounded-lg text-xs font-mono hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer select-none font-semibold"
                >
                  <Send className="w-3.5 h-3.5 text-neon-purple" />
                  Forward Query via WhatsApp
                </button>
              </form>
            )}
          </div>

          {/* Quick info cards */}
          <div className="p-5 bg-neutral-950/40 border border-white/5 rounded-2xl grid grid-cols-1 gap-4">
            
            <a 
              href="mailto:yjmweb@gmail.com" 
              className="flex items-start gap-3.5 p-3.5 bg-neutral-900/40 hover:bg-white/2.5 border border-white/2.5 rounded-xl transition-all"
              id="info-card-email"
            >
              <div className="p-2 bg-neon-blue/10 rounded-lg border border-neon-blue/20">
                <Mail className="w-4 h-4 text-neon-blue" />
              </div>
              <div>
                <span className="text-4xs font-mono uppercase text-neutral-500 block">General Helpdesk Email:</span>
                <span className="text-xs text-white font-medium">yjmweb@gmail.com</span>
              </div>
            </a>

            <a 
              href="https://wa.me/94776826937" 
              target="_blank" 
              rel="noreferrer"
              onClick={() => trackWhatsAppClick('support')}
              className="flex items-start gap-3.5 p-3.5 bg-neutral-900/40 hover:bg-white/2.5 border border-white/2.5 rounded-xl transition-all"
              id="info-card-phone"
            >
              <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                <MessageSquare className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <span className="text-4xs font-mono uppercase text-neutral-500 block">Direct WhatsApp Hotlines:</span>
                <span className="text-xs text-green-400 font-medium font-mono">+94 77 682 6937</span>
              </div>
            </a>

            <div className="flex items-start gap-3.5 p-3.5 bg-neutral-900/40 border border-white/2.5 rounded-xl" id="info-location">
              <div className="p-2 bg-neutral-900 rounded-lg border border-white/5">
                <MapPin className="w-4 h-4 text-neutral-400" />
              </div>
              <div>
                <span className="text-4xs font-mono uppercase text-neutral-500 block">Headquarters Workspace:</span>
                <span className="text-xs text-neutral-300">Galle Road, Colombo, Sri Lanka</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
