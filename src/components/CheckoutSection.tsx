/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { 
  Check, Info, MessageSquare, Sparkles, User, 
  MapPin, Mail, Phone, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag,
  Globe, Link2
} from 'lucide-react';
import { PACKAGES, ADDONS, MANAGEMENT_PLANS } from '../data';
import { Package, AddOn, ManagementPlan, CustomerInfo } from '../types';
import { 
  trackAddonToggle, 
  trackWhatsAppClick, 
  trackFunnelStep, 
  trackFormInteraction 
} from '../lib/analytics';

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Holy See", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan",
  "Vanuatu", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

interface CheckoutSectionProps {
  initialPackageId?: string;
  onOrderSuccess?: () => void;
}

export default function CheckoutSection({ initialPackageId = 'business', onOrderSuccess }: CheckoutSectionProps) {
  // Config States
  const [selectedPackage, setSelectedPackage] = useState<Package>(
    PACKAGES.find(p => p.id === initialPackageId) || PACKAGES[1]
  );
  
  const [selectedPlan, setSelectedPlan] = useState<ManagementPlan>(MANAGEMENT_PLANS[1]); // Pre-select the 3-Month package for premium value
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(['custom_domain', 'google_analytics']); // Pre-select standard helpful additions
  const [extraPagesCount, setExtraPagesCount] = useState<number>(1);
  
  // Form States
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    restaurantName: '',
    email: '',
    phone: '',
    businessAddress: '',
    additionalNotes: '',
    hasCurrentWebsite: 'No',
    currentWebsiteUrl: '',
    country: 'United States of America'
  });

  const [formErrors, setFormErrors] = useState<Partial<CustomerInfo>>({});
  const [sumTotal, setSumTotal] = useState<{ setup: number; monthly: number; total: number }>({ setup: 0, monthly: 0, total: 0 });

  // Update selected package if parent changes it
  useEffect(() => {
    const pkg = PACKAGES.find(p => p.id === initialPackageId);
    if (pkg) {
      setSelectedPackage(pkg);
    }
  }, [initialPackageId]);

  // Track checkout funnel step 1: checkout_viewed
  useEffect(() => {
    trackFunnelStep(1, 'checkout_viewed', { 
      package_id: selectedPackage.id,
      plan_id: selectedPlan.id,
      addons_count: selectedAddOnIds.length
    });
  }, [selectedPackage.id, selectedPlan.id]);

  // Recalculate totals
  useEffect(() => {
    let setup = selectedPackage.priceSetup;
    let monthly = selectedPackage.priceMonthly;

    // Apply Management Plan Multiplier (monthly rolling vs 15% discount for 3 months)
    const discountedMonthlyRate = Math.round(monthly * selectedPlan.discountMultiplier);

    // Sum Add-Ons
    let addonSetupTotal = 0;
    selectedAddOnIds.forEach(id => {
      const addon = ADDONS.find(a => a.id === id);
      if (addon) {
        if (addon.id === 'extra_pages') {
          addonSetupTotal += addon.price * extraPagesCount;
        } else {
          addonSetupTotal += addon.price;
        }
      }
    });

    setup += addonSetupTotal;

    // Monthly remains distinct or compiled based on billing frequency
    const isQuarterly = selectedPlan.id === 'quarterly';
    const finalMonthly = discountedMonthlyRate;
    
    // Total is Setup Costs + (computed Monthly rate based on option)
    // For 3-Month plan, count 3 months of discounted subscription + setup
    const computedTotal = isQuarterly 
      ? setup + (discountedMonthlyRate * 3)
      : setup + discountedMonthlyRate; // First-month total for rolling layout

    setSumTotal({
      setup,
      monthly: finalMonthly,
      total: computedTotal
    });
  }, [selectedPackage, selectedPlan, selectedAddOnIds, extraPagesCount]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds(prev => {
      const isSelected = prev.includes(id);
      const addon = ADDONS.find(a => a.id === id);
      const addonName = addon?.name || id;
      const addonPrice = addon?.price || 0;
      
      // Track add-on interaction
      trackAddonToggle(id, addonName, !isSelected, addonPrice);

      if (isSelected) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof CustomerInfo]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<CustomerInfo> = {};
    if (!customer.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!customer.restaurantName.trim()) errors.restaurantName = 'Business or Brand name is required';
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customer.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailPattern.test(customer.email)) {
      errors.email = 'Please provide a valid email';
    }

    if (!customer.phone.trim()) {
      errors.phone = 'Mobile phone number is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstError = Object.keys(formErrors)[0];
      const element = document.getElementsByName(firstError)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Compile active Add-on details
    const activeAddonsList = selectedAddOnIds.map(id => {
      const item = ADDONS.find(a => a.id === id);
      if (item) {
        if (item.id === 'extra_pages') {
          return `- ${item.name} x${extraPagesCount} ($${item.price * extraPagesCount})`;
        }
        return `- ${item.name} ($${item.price})`;
      }
      return '';
    }).filter(Boolean);

    // Build the beautiful detailed diagnostic WhatsApp dispatch body
    const msg = `⚡ *YJMWeb Future-Ready Order* ⚡
-----------------------------------------
👤 *Client Contacts:*
- Name: ${customer.fullName}
- Brand: ${customer.restaurantName}
- Email: ${customer.email}
- Phone: ${customer.phone}
- Country: ${customer.country || 'Not Provided'}
- Existing Website: ${customer.hasCurrentWebsite === 'Yes' ? customer.currentWebsiteUrl || 'Yes' : 'No'}
- Address: ${customer.businessAddress || 'Not Provided'}

📦 *Selected Solutions Layout:*
- Package: ${selectedPackage.name} ($${selectedPackage.priceSetup} Setup + $${selectedPackage.priceMonthly}/mo)
- Duration Rate: ${selectedPlan.name} (${selectedPlan.id === 'quarterly' ? '15% Discount Applied' : 'Rolling Monthly'})

🔧 *Standard Add-Ons Setup:*
${activeAddonsList.length > 0 ? activeAddonsList.join('\n') : 'No add-ons selected.'}

-----------------------------------------
💳 *Consolidated Statement:*
• Immediate One-Off Setup Cost: $${sumTotal.setup}
• Optimized Ongoing Rate: $${sumTotal.monthly}/month
• *Total Commited Term Cost:* $${sumTotal.total} ${selectedPlan.id === 'quarterly' ? '(Setup + Initial 3 Months)' : '(Setup + 1st Month)'}

📝 *Special Instructions/Notes:*
${customer.additionalNotes ? customer.additionalNotes : 'None provided.'}

-----------------------------------------
_Please draft our mock layout review based on the details above!_`;

    const encoded = encodeURIComponent(msg);
    const targetUrl = `https://wa.me/94776826937?text=${encoded}`;
    
    // Open in new window safely
    window.open(targetUrl, '_blank');
    
    // Track checkout submissions and funnel completions
    trackWhatsAppClick('checkout');
    trackFunnelStep(4, 'submit_order', {
      brand_name: customer.restaurantName,
      package_id: selectedPackage.id,
      plan_id: selectedPlan.id,
      addons_count: selectedAddOnIds.length,
      total_setup: sumTotal.setup,
      total_monthly: sumTotal.monthly,
      total_value: sumTotal.total
    });

    if (onOrderSuccess) {
      onOrderSuccess();
    }
  };

  return (
    <div className="w-full bg-dark-bg text-white font-sans py-2" id="checkout-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Aspect: Selections and Form */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Customer Details Verification Form (Client Diagnostics and Contact Core) */}
          <section className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden" id="checklist-step-1">
            <div className="absolute top-0 left-0 w-2 h-full bg-neon-blue" />
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-lg bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center text-neon-blue font-mono font-bold text-sm">01</span>
              <h3 className="text-xl font-display font-medium text-white">Client Diagnostics and Contact Core</h3>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase block mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    Full Contact Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={customer.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Sanjeewa Perera"
                    id="inp-full-name"
                    className={`w-full bg-neutral-950 p-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all text-sm placeholder:text-neutral-600 ${
                      formErrors.fullName ? 'border-red-500/75' : 'border-white/10'
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className="text-2xs text-red-400 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase block mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                    Business / Brand Name *
                  </label>
                  <input
                    type="text"
                    name="restaurantName"
                    value={customer.restaurantName}
                    onChange={handleInputChange}
                    placeholder="e.g. Apex Digital Group"
                    id="inp-restaurant-name"
                    className={`w-full bg-neutral-950 p-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all text-sm placeholder:text-neutral-600 ${
                      formErrors.restaurantName ? 'border-red-500/75' : 'border-white/10'
                    }`}
                  />
                  {formErrors.restaurantName && (
                    <p className="text-2xs text-red-400 mt-1">{formErrors.restaurantName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase block mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    Business Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleInputChange}
                    placeholder="e.g. manager@flamegrill.com"
                    id="inp-email"
                    className={`w-full bg-neutral-950 p-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all text-sm placeholder:text-neutral-600 ${
                      formErrors.email ? 'border-red-500/75' : 'border-white/10'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-2xs text-red-400 mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase block mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-zinc-400" />
                    WhatsApp/Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customer.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +94 77 123 4567"
                    id="inp-phone"
                    className={`w-full bg-neutral-950 p-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all text-sm placeholder:text-neutral-600 ${
                      formErrors.phone ? 'border-red-500/75' : 'border-white/10'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-2xs text-red-400 mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase block mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  Business Physical Address
                </label>
                <input
                  type="text"
                  name="businessAddress"
                  value={customer.businessAddress}
                  onChange={handleInputChange}
                  placeholder="e.g. 15 Galle Road, Colombo 03, Sri Lanka"
                  id="inp-address"
                  className="w-full bg-neutral-950 p-3 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all text-sm placeholder:text-neutral-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase block mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-zinc-400" />
                    Do you have any website currently?
                  </label>
                  <select
                    name="hasCurrentWebsite"
                    value={customer.hasCurrentWebsite}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 p-3 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all text-sm text-neutral-300"
                  >
                    <option value="No">No, completely brand new</option>
                    <option value="Yes">Yes, I have an existing website</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase block mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-zinc-400" />
                    Your Country *
                  </label>
                  <select
                    name="country"
                    value={customer.country}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 p-3 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all text-sm text-neutral-300"
                  >
                    {COUNTRIES.map((ctry) => (
                      <option key={ctry} value={ctry}>{ctry}</option>
                    ))}
                  </select>
                </div>
              </div>

              {customer.hasCurrentWebsite === 'Yes' && (
                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase block mb-1.5 flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5 text-zinc-400" />
                    Existing Website URL
                  </label>
                  <input
                    type="url"
                    name="currentWebsiteUrl"
                    value={customer.currentWebsiteUrl}
                    onChange={handleInputChange}
                    placeholder="e.g. https://mycurrentbrand.com"
                    id="inp-current-website"
                    className="w-full bg-neutral-950 p-3 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all text-sm placeholder:text-neutral-600 text-white"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase block mb-1.5">
                  Additional Notes or Specific Styling Instructions
                </label>
                <textarea
                  name="additionalNotes"
                  value={customer.additionalNotes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="e.g. We require our PDF menu digitized. We want a golden-themed dark color scheme for our high-end wine bar styling..."
                  id="inp-notes"
                  className="w-full bg-neutral-950 p-3 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-neon-blue transition-all text-sm placeholder:text-neutral-600"
                />
              </div>
            </form>
          </section>

          {/* Step 2: Solutions Blueprint Select (Packages) */}
          <section className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden" id="checklist-step-2">
            <div className="absolute top-0 left-0 w-2 h-full bg-neon-purple" />
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-lg bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple font-mono font-bold text-sm">02</span>
              <h3 className="text-xl font-display font-medium text-white">Select Web Design Solution</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PACKAGES.map((pkg) => {
                const isSelected = selectedPackage.id === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    id={`btn-pkg-sel-${pkg.id}`}
                    className={`p-4 rounded-xl text-left border relative transition-all duration-300 flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-neutral-900 border-neon-blue shadow-lg shadow-neon-blue/10 scale-[1.02]' 
                        : 'bg-neutral-950/40 border-white/5 hover:border-white/10 hover:bg-neutral-900/30'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-neon-blue flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                      </span>
                    )}
                    <div>
                      <span className="text-3xs uppercase font-mono tracking-widest text-neutral-500 block mb-1">{pkg.badge}</span>
                      <h4 className="font-display font-medium text-sm text-white">{pkg.name}</h4>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="text-xs text-neutral-400">Setup Fee:</div>
                      <div className="text-lg font-mono font-semibold text-white animate-pulse-once">${pkg.priceSetup}</div>
                      <div className="text-xs text-neutral-400 mt-1">Management Rate:</div>
                      <div className="text-base font-mono text-neon-blue font-semibold">${pkg.priceMonthly}/mo</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 3: Choose Duration Layout (Plans) */}
          <section className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden" id="checklist-step-3">
            <div className="absolute top-0 left-0 w-2 h-full bg-neon-pink" />
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-lg bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center text-neon-pink font-mono font-bold text-sm">03</span>
              <h3 className="text-xl font-display font-medium text-white">Select Management Package Duration</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MANAGEMENT_PLANS.map((plan) => {
                const isSelected = selectedPlan.id === plan.id;
                return (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    id={`btn-plan-sel-${plan.id}`}
                    className={`p-5 rounded-xl text-left border relative transition-all duration-300 flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-neutral-900 border-neon-purple shadow-lg shadow-neon-purple/10' 
                        : 'bg-neutral-950/40 border-white/5 hover:border-white/10 hover:bg-neutral-900/30'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div>
                        <span className={`text-4xs font-mono tracking-widest uppercase px-2 py-0.5 rounded-full inline-block mb-2 ${
                          plan.id === 'quarterly' ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30' : 'bg-white/5 text-neutral-400'
                        }`}>
                          {plan.badge}
                        </span>
                        <h4 className="font-display font-medium text-base text-white">{plan.name}</h4>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-neon-purple flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-neutral-400 mt-2.5 flex-1 leading-relaxed">
                      {plan.id === 'quarterly' 
                        ? 'Reduces rolling monthly management fees by 15% and guarantees continuous search ranking, caching speed-ups, and prioritizes content sweeps.' 
                        : 'Cancel rolling structural maintenance checks at any point. Ideal for testing initial customer reactions.'}
                    </p>

                    <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs text-neutral-400">Term Pricing:</span>
                      <span className="text-sm font-mono text-neon-purple font-semibold">{plan.pricingText}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 4: Optional Add-on Checklist */}
          <section className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden" id="checklist-step-4">
            <div className="absolute top-0 left-0 w-2 h-full bg-white/20" />
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white font-mono font-bold text-sm">04</span>
                <h3 className="text-xl font-display font-medium text-white">Select Optional Tailored Add-Ons</h3>
              </div>
              <span className="text-2xs font-mono text-neutral-500">Custom selections update order scope dynamically</span>
            </div>

            <div className="space-y-3.5">
              {ADDONS.map((addon) => {
                const isChecked = selectedAddOnIds.includes(addon.id);
                return (
                  <div 
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    id={`addon-card-${addon.id}`}
                    className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-all duration-300 ${
                      isChecked 
                        ? 'bg-neutral-900/90 border-neon-pink/40 shadow-sm shadow-neon-pink/5' 
                        : 'bg-neutral-950/40 border-white/5 hover:border-white/10 hover:bg-neutral-900/20'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 flex-1">
                      <div className="pt-0.5">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          isChecked 
                            ? 'bg-neon-pink border-neon-pink text-white' 
                            : 'border-white/20 bg-neutral-900'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-medium text-white">{addon.name}</h4>
                          <span className="text-3xs font-mono uppercase bg-white/5 text-neutral-400 px-1.5 py-0.5 rounded">
                            {addon.category}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-xl">
                          {addon.description}
                        </p>

                        {/* Special Quantity Selector logic for Additional Pages */}
                        {addon.id === 'extra_pages' && isChecked && (
                          <div 
                            className="mt-3.5 flex items-center gap-3 bg-neutral-950/80 p-1.5 rounded-lg border border-white/5 w-fit" 
                            onClick={(e) => e.stopPropagation()} // stop toggle active trigger
                          >
                            <span className="text-2xs font-mono text-neutral-400 px-1.5">Count:</span>
                            <button
                              type="button"
                              onClick={() => setExtraPagesCount(c => Math.max(1, c - 1))}
                              id="btn-extra-pages-dec"
                              className="w-6 h-6 rounded bg-neutral-900 hover:bg-white/10 flex items-center justify-center border border-white/10 text-white transition-all"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-medium text-white w-5 text-center">{extraPagesCount}</span>
                            <button
                              type="button"
                              onClick={() => setExtraPagesCount(c => Math.min(10, c + 1))}
                              id="btn-extra-pages-inc"
                              className="w-6 h-6 rounded bg-neutral-900 hover:bg-white/10 flex items-center justify-center border border-white/10 text-white transition-all"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <span className="text-2xs text-neutral-500 font-mono italic pr-1">($15 ea)</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                      <span className="text-xs text-neutral-500 md:hidden block">Fee:</span>
                      <span className="font-mono text-sm text-neon-pink font-semibold">
                        {addon.id === 'extra_pages' && isChecked 
                          ? `$${addon.price * extraPagesCount}` 
                          : `+$${addon.price}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* Right Aspect: Sticky Summary Panel */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 relative shadow-2xl overflow-hidden">
            {/* Glassmorphism Accent */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 blur-3xl rounded-full" />
            
            <h3 className="text-lg font-display font-medium text-white pb-3 border-b border-white/5 mb-5 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neon-blue" />
              Dynamic Checkout Summary
            </h3>

            {/* Selected Base Package Breakdown */}
            <div className="space-y-4 mb-6">
              <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-white/5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-3xs font-mono uppercase text-neon-blue">Selected Base Solution</span>
                    <h4 className="font-display font-medium text-sm text-white mt-0.5">{selectedPackage.name}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-3xs font-mono text-neutral-500 block">Setup Price</span>
                    <span className="font-mono text-sm text-white font-medium">${selectedPackage.priceSetup}</span>
                  </div>
                </div>
              </div>

              {/* Selected Maintenance Duration Plan */}
              <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-white/5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-3xs font-mono uppercase text-neon-purple">Management Cycle</span>
                    <h4 className="font-display font-medium text-sm text-white mt-0.5">{selectedPlan.name}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-3xs font-mono text-neutral-500 block">Monthly Rate</span>
                    <div className="flex items-center gap-1 justify-end">
                      {selectedPlan.id === 'quarterly' && (
                        <span className="text-4xs font-mono text-neutral-500 line-through">${selectedPackage.priceMonthly}</span>
                      )}
                      <span className="font-mono text-sm text-neon-purple font-semibold">${sumTotal.monthly}/mo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Add-Ons */}
              <div>
                <span className="text-3xs font-mono uppercase text-neutral-500 block mb-2 px-1">Configured Custom Add-Ons:</span>
                {selectedAddOnIds.length === 0 ? (
                  <p className="text-xs text-neutral-600 italic px-1">None selected. Build speed remains optimal.</p>
                ) : (
                  <div className="space-y-1.5 max-h-[145px] overflow-y-auto pr-1">
                    {selectedAddOnIds.map(id => {
                      const addon = ADDONS.find(a => a.id === id);
                      if (!addon) return null;
                      return (
                        <div key={addon.id} className="flex justify-between items-center text-xs p-2 bg-neutral-900/40 border border-white/2.5 rounded-lg">
                          <span className="text-neutral-300 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
                            {addon.name}
                            {addon.id === 'extra_pages' && ` (x${extraPagesCount})`}
                          </span>
                          <span className="font-mono text-neutral-300">
                            {addon.id === 'extra_pages' 
                              ? `$${addon.price * extraPagesCount}`
                              : `$${addon.price}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Price Consolidation */}
            <div className="p-4 bg-neutral-900/90 rounded-xl border border-white/10 space-y-3 mb-6">
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">One-Time Setup Total:</span>
                <span className="font-mono text-white font-medium">${sumTotal.setup}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 flex items-center gap-1">
                  Ongoing Management:
                  <span className="group relative cursor-help">
                    <Info className="w-3 h-3 text-neutral-500 hover:text-white" />
                    <span className="absolute bottom-full right-0 w-44 p-2 bg-neutral-950 border border-white/10 rounded-lg text-4xs leading-relaxed text-neutral-300 hidden group-hover:block z-50">
                      Billed monthly to cover server hosting, standard menu variations, and maintenance assistance.
                    </span>
                  </span>
                </span>
                <span className="font-mono text-neon-blue font-semibold">${sumTotal.monthly}/month</span>
              </div>

              <div className="pt-3 border-t border-white/5 flex justify-between items-end">
                <div>
                  <span className="text-xs text-neutral-300 font-medium block">Term Order Price:</span>
                  <span className="text-4xs text-neutral-500 uppercase block font-mono">
                    {selectedPlan.id === 'quarterly' ? 'Setup + Initial 3 Months billing' : 'Setup + 1st month subscription'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple font-bold">
                    ${sumTotal.total}
                  </span>
                </div>
              </div>
            </div>

            {/* Validation warning */}
            {Object.keys(formErrors).length > 0 && (
              <div className="p-3 bg-red-950/20 border border-red-900/50 rounded-xl flex items-start gap-2.5 mb-4">
                <Info className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-2xs text-red-300 leading-relaxed">
                  Please complete the required customer diagnostics form on the left first before dispatching the order to WhatsApp.
                </p>
              </div>
            )}

            {/* Order Dispatch Button */}
            <button
              onClick={handleSubmitOrder}
              id="btn-checkout-submit-whatsapp"
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-green-500 hover:from-green-400 to-emerald-600 hover:to-emerald-500 text-neutral-950 font-display font-semibold rounded-xl text-sm transition-all hover:shadow-xl hover:shadow-green-500/10 cursor-pointer select-none active:scale-[0.98]"
            >
              <MessageSquare className="w-5 h-5 fill-neutral-950 stroke-[1.5]" />
              Confirm via WhatsApp
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Trust Badges */}
            <div className="mt-5 flex items-center justify-center gap-1.5 text-3xs text-neutral-500 uppercase font-mono tracking-widest text-center">
              <ShieldCheck className="w-4 h-4 text-neutral-600" />
              Secure Forwarding System • No Cards Required
            </div>

            {/* Instructions box */}
            <div className="mt-4 p-3 bg-white/2.5 rounded-lg border border-white/2.5 text-[11px] text-neutral-400 leading-relaxed">
              <strong>Order Flow:</strong> Tap the dispatch button to compile your system selection into a beautifully formatted proposal which we will instantly review on WhatsApp to configure your launch schedule.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
