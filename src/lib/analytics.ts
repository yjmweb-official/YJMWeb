// Google Analytics 4 (GA4) & Google Tag Manager (GTM) Enterprise Tracking Engine
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const MEASUREMENT_ID = 'G-QFY8QZW1BY';

// Ensure window.dataLayer and window.gtag are always safely defined (GTM-Optional tracking queue)
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
  }
}

// Utility helper to gather marketing and traffic source query parameters (sessions/attribution)
const getSessionSource = (): string => {
  if (typeof window === 'undefined') return 'organic';
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  if (utmSource) {
    return utmMedium ? `${utmSource} / ${utmMedium}` : utmSource;
  }
  if (document.referrer) {
    try {
      const refUrl = new URL(document.referrer);
      if (refUrl.hostname.includes('google')) return 'google / organic';
      if (refUrl.hostname.includes('facebook')) return 'facebook / referral';
      if (refUrl.hostname.includes('instagram')) return 'instagram / referral';
      if (refUrl.hostname.includes('linkedin')) return 'linkedin / referral';
      return `${refUrl.hostname} / referral`;
    } catch {
      return 'referral';
    }
  }
  return 'direct';
};

// Generates correct unified context mapping for both GA4 & GTM dataLayer parameters
const getCurrentContext = () => {
  if (typeof window === 'undefined') {
    return {
      page_name: '',
      page_path: '',
      page_location: '',
      device_type: 'desktop',
      referrer_source: 'direct',
      session_source: 'direct'
    };
  }
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return {
    page_name: document.title,
    page_path: window.location.pathname + window.location.hash || '/',
    page_location: window.location.href,
    device_type: isMobile ? 'mobile' : 'desktop',
    referrer_source: document.referrer || 'direct',
    session_source: getSessionSource()
  };
};

/**
 * 1. SPA Dynamic Page Tracking System
 * Updates document titles and sends correct page_view events ensuring GA4 routes separately.
 */
export const trackPageView = (title: string, path: string) => {
  if (typeof window === 'undefined') return;

  // Set document title dynamically
  document.title = title;

  const currentTab = path.startsWith('/') ? path : `/${path}`;
  const gLocation = window.location.origin + currentTab;
  const ctx = getCurrentContext();

  // Set general global tracker properties
  if (window.gtag) {
    window.gtag('set', {
      page_title: title,
      page_path: currentTab,
      page_location: gLocation,
      device_type: ctx.device_type,
      referrer_source: ctx.referrer_source,
      session_source: ctx.session_source
    });

    // Fire config manually to force separated real-time and standard reports
    window.gtag('config', MEASUREMENT_ID, {
      page_title: title,
      page_location: gLocation,
      page_path: currentTab,
      device_type: ctx.device_type
    });

    // Fire an explicit manual page_view event for safety
    window.gtag('event', 'page_view', {
      page_title: title,
      page_name: title,
      page_path: currentTab,
      page_location: gLocation,
      device_type: ctx.device_type,
      referrer_source: ctx.referrer_source,
      session_source: ctx.session_source,
      send_to: MEASUREMENT_ID
    });
  }

  // Push to GTM compatible dataLayer architecture
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    page_title: title,
    page_name: title,
    page_path: currentTab,
    page_location: gLocation,
    device_type: ctx.device_type,
    referrer_source: ctx.referrer_source,
    session_source: ctx.session_source,
    timestamp: new Date().toISOString()
  });
};

/**
 * 2. WhatsApp Click Tracking (Floating, Support, Checkout, Footer, etc.)
 * Maps clicks instantly to custom events like floating_whatsapp_click and navbar_whatsapp_click.
 * Provides precise GTM and GA4 validation compliance with robust debugging output.
 */
export const trackWhatsAppClick = (buttonType: 'floating' | 'support' | 'checkout' | 'navbar' | 'navbar_support' | 'hero' | 'footer' | 'faq') => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();
  const timestamp = new Date().toISOString();

  // 1. Diagnostics logs for real-time validation check
  console.log(`[GTM-Diagnostics] WhatsApp click detected. Type: ${buttonType}`);

  // 2. Prevent duplicate tracking while satisfying all specific requirements
  if (buttonType === 'floating') {
    // Exact GA4 event requested by customer: both floating_whatsapp_click and submit_order
    if (window.gtag) {
      window.gtag('event', 'floating_whatsapp_click', {
        event_category: 'engagement',
        event_label: 'Floating WhatsApp Button',
        page_title: document.title,
        page_path: window.location.pathname,
        page_location: window.location.href,
        device_type: ctx.device_type,
        timestamp: timestamp
      });
      console.log('[GTM-Diagnostics] Fired GA4 event: floating_whatsapp_click');

      window.gtag('event', 'submit_order', {
        event_category: 'engagement',
        event_label: 'WhatsApp Hotline Button Click',
        page_title: document.title,
        page_path: window.location.pathname,
        page_location: window.location.href,
        device_type: ctx.device_type,
        timestamp: timestamp
      });
      console.log('[GTM-Diagnostics] Fired GA4 event: submit_order');
    }

    // Exact GTM dataLayer push requested by customer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'floating_whatsapp_click',
      button_type: 'floating',
      page_name: document.title,
      page_path: window.location.pathname,
      page_location: window.location.href,
      device_type: ctx.device_type,
      timestamp: timestamp,
      is_conversion: true
    });
    console.log('[GTM-Diagnostics] Pushed to dataLayer: floating_whatsapp_click');

    window.dataLayer.push({
      event: 'submit_order',
      button_type: 'floating',
      page_name: document.title,
      page_path: window.location.pathname,
      page_location: window.location.href,
      device_type: ctx.device_type,
      timestamp: timestamp,
      is_conversion: true
    });
    console.log('[GTM-Diagnostics] Pushed to dataLayer: submit_order');

  } else if (buttonType === 'navbar' || buttonType === 'navbar_support') {
    // Exact GA4 event requested by customer
    if (window.gtag) {
      window.gtag('event', 'navbar_whatsapp_click', {
        event_category: 'engagement',
        event_label: 'Navbar WhatsApp Support',
        page_title: document.title,
        page_path: window.location.pathname,
        page_location: window.location.href,
        device_type: ctx.device_type,
        timestamp: timestamp
      });
      console.log('[GTM-Diagnostics] Fired GA4 event: navbar_whatsapp_click');
    }

    // Exact GTM dataLayer push requested by customer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'navbar_whatsapp_click',
      button_type: 'navbar_support',
      page_name: document.title,
      page_path: window.location.pathname,
      page_location: window.location.href,
      device_type: ctx.device_type,
      timestamp: timestamp,
      is_conversion: true
    });
    console.log('[GTM-Diagnostics] Pushed to dataLayer: navbar_whatsapp_click');

  } else {
    // Direct standard fallback clicks tracking (support, checkout, hero, footer, faq)
    const clickEventName = `${buttonType}_whatsapp_click`;

    if (window.gtag) {
      // Fire general whatsapp_click with specific button_type properties
      window.gtag('event', 'whatsapp_click', {
        button_type: buttonType,
        page_name: ctx.page_name,
        page_path: ctx.page_path,
        page_location: ctx.page_location,
        device_type: ctx.device_type,
        referrer_source: ctx.referrer_source,
        session_source: ctx.session_source,
        timestamp: timestamp
      });

      // Fire exact custom event
      window.gtag('event', clickEventName, {
        button_type: buttonType,
        page_name: ctx.page_name,
        page_path: ctx.page_path,
        page_location: ctx.page_location,
        device_type: ctx.device_type,
        referrer_source: ctx.referrer_source,
        session_source: ctx.session_source,
        timestamp: timestamp
      });
    }

    // Push to general GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'whatsapp_click',
      button_type: buttonType,
      page_name: ctx.page_name,
      page_path: ctx.page_path,
      page_location: ctx.page_location,
      device_type: ctx.device_type,
      referrer_source: ctx.referrer_source,
      session_source: ctx.session_source,
      time_clicked: timestamp,
      is_conversion: true
    });

    window.dataLayer.push({
      event: clickEventName,
      button_type: buttonType,
      page_name: ctx.page_name,
      page_path: ctx.page_path,
      page_location: ctx.page_location,
      timestamp: timestamp,
      is_conversion: true
    });

    console.log(`[GTM-Diagnostics] Fired general WA click events for type: ${buttonType}`);
  }
};

/**
 * 3. Package Selection Custom Tracking
 * Handles select_starter_package, select_business_package, select_premium_package
 */
export const trackPackageSelection = (pkgId: string, duration: 'monthly' | 'quarterly' | '3-month' | string) => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();
  const prices: Record<string, number> = {
    starter: 149,
    business: 499,
    premium: 999
  };
  const pkgPrice = prices[pkgId.toLowerCase()] || 499;
  const pkgName = pkgId.toUpperCase();

  // Exact custom event name requested (select_starter_package etc)
  const exactEventName = `select_${pkgId.toLowerCase()}_package`;

  if (window.gtag) {
    // 1. Fire select_package with dimensional variables
    window.gtag('event', 'select_package', {
      package_name: pkgName,
      package_price: pkgPrice,
      billing_plan: duration,
      page_name: ctx.page_name,
      page_path: ctx.page_path,
      page_location: ctx.page_location,
      device_type: ctx.device_type
    });

    // 2. Fire specific brand tracking events
    window.gtag('event', exactEventName, {
      package_name: pkgName,
      package_price: pkgPrice,
      billing_plan: duration,
      page_name: ctx.page_name,
      page_path: ctx.page_path,
      value: pkgPrice,
      currency: 'USD'
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'package_selected', // Conversion trigger indicator
    package_name: pkgName,
    package_price: pkgPrice,
    billing_plan: duration,
    page_name: ctx.page_name,
    page_path: ctx.page_path,
    device_type: ctx.device_type,
    is_conversion: true
  });

  window.dataLayer.push({
    event: exactEventName,
    package_name: pkgName,
    package_price: pkgPrice,
    billing_plan: duration,
    value: pkgPrice,
    currency: 'USD'
  });
};

/**
 * 4. Add-On Selected Tracking
 */
export const trackAddonToggle = (addonId: string, addonName: string, selected: boolean, priceValue: number) => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();

  if (window.gtag) {
    window.gtag('event', 'addon_selected', {
      addon_name: addonName,
      package_price: priceValue,
      is_selected: selected,
      page_name: ctx.page_name,
      page_path: ctx.page_path,
      page_location: ctx.page_location,
      device_type: ctx.device_type
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'addon_selected',
    addon_name: addonName,
    package_price: priceValue,
    is_selected: selected,
    page_name: ctx.page_name,
    page_path: ctx.page_path,
    device_type: ctx.device_type
  });
};

/**
 * 5. Funnel and Checkout Initiation Tracking
 */
export const trackBeginCheckout = (pkgId: string, billingPlan: string) => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();
  const prices: Record<string, number> = {
    starter: 149,
    business: 499,
    premium: 999
  };
  const pkgPrice = prices[pkgId.toLowerCase()] || 499;

  if (window.gtag) {
    window.gtag('event', 'begin_checkout', {
      package_name: pkgId.toUpperCase(),
      package_price: pkgPrice,
      billing_plan: billingPlan,
      page_name: ctx.page_name,
      page_path: ctx.page_path,
      page_location: ctx.page_location,
      device_type: ctx.device_type,
      referrer_source: ctx.referrer_source,
      session_source: ctx.session_source
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'begin_checkout',
    package_name: pkgId.toUpperCase(),
    package_price: pkgPrice,
    billing_plan: billingPlan,
    page_name: ctx.page_name,
    page_path: ctx.page_path,
    device_type: ctx.device_type,
    referrer_source: ctx.referrer_source,
    session_source: ctx.session_source,
    is_conversion: true
  });
};

/**
 * Funnel stage step analysis
 */
export const trackFunnelStep = (stepNumber: number, stepName: string, details?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();

  if (window.gtag) {
    window.gtag('event', 'checkout_funnel', {
      step_number: stepNumber,
      step_name: stepName,
      page_name: ctx.page_name,
      page_path: ctx.page_path,
      ...details
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'checkout_step',
    step_number: stepNumber,
    step_name: stepName,
    page_name: ctx.page_name,
    page_path: ctx.page_path,
    ...details
  });
};

/**
 * 6. Form Submission Events
 */
export const trackFormSubmit = (formName: string, details?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();

  if (window.gtag) {
    window.gtag('event', 'form_submit', {
      form_name: formName,
      page_name: ctx.page_name,
      page_path: ctx.page_path,
      page_location: ctx.page_location,
      device_type: ctx.device_type,
      referrer_source: ctx.referrer_source,
      session_source: ctx.session_source,
      ...details
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'form_submit',
    form_name: formName,
    page_name: ctx.page_name,
    page_path: ctx.page_path,
    device_type: ctx.device_type,
    referrer_source: ctx.referrer_source,
    session_source: ctx.session_source,
    is_conversion: true,
    ...details
  });
};

/**
 * 7. Scroll Depth Tracking events (scroll_25, scroll_50, scroll_75, scroll_100)
 */
export const trackScrollEvent = (percentage: number) => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();
  const eventName = `scroll_${percentage}`;

  if (window.gtag) {
    // Fire exact event requested (scroll_25 etc)
    window.gtag('event', eventName, {
      percent_scrolled: percentage,
      page_name: ctx.page_name,
      page_path: ctx.page_path,
      page_location: ctx.page_location,
      device_type: ctx.device_type
    });

    // Also fire broad general scroll config for reports
    window.gtag('event', 'scroll', {
      percent_scrolled: percentage,
      page_name: ctx.page_name,
      page_path: ctx.page_path,
      page_location: ctx.page_location
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    percent_scrolled: percentage,
    page_name: ctx.page_name,
    page_path: ctx.page_path,
    device_type: ctx.device_type
  });
};

/**
 * 8. Core CTA Click Event Tracking
 */
export const trackCtaClick = (ctaLabel: string, sectionName: string) => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();

  if (window.gtag) {
    window.gtag('event', 'cta_click', {
      button_type: 'cta',
      cta_label: ctaLabel,
      section: sectionName,
      page_name: ctx.page_name,
      page_path: ctx.page_path,
      page_location: ctx.page_location,
      device_type: ctx.device_type,
      referrer_source: ctx.referrer_source,
      session_source: ctx.session_source
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'cta_click',
    cta_label: ctaLabel,
    section: sectionName,
    page_name: ctx.page_name,
    page_path: ctx.page_path,
    device_type: ctx.device_type
  });
};

/**
 * 9. FAQ Toggle and Accordion Expansion Tracker
 */
export const trackFaqExpand = (questionName: string) => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();

  if (window.gtag) {
    window.gtag('event', 'faq_expand', {
      faq_question: questionName,
      page_name: ctx.page_name,
      page_path: ctx.page_path,
      page_location: ctx.page_location,
      device_type: ctx.device_type
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'faq_expand',
    faq_question: questionName,
    page_name: ctx.page_name,
    page_path: ctx.page_path
  });
};

/**
 * Comprehensive direct dimension tracker
 */
export const trackFormInteraction = (formName: string, actionName: string, details?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();

  if (window.gtag) {
    window.gtag('event', 'form_interaction', {
      form_id: formName,
      form_action: actionName,
      page_name: ctx.page_name,
      page_path: ctx.page_path,
      device_type: ctx.device_type,
      ...details
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'form_interaction',
    form_id: formName,
    form_action: actionName,
    page_name: ctx.page_name,
    page_path: ctx.page_path,
    device_type: ctx.device_type,
    ...details
  });
};
