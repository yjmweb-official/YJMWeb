// Google Analytics 4 (GA4) Direct Integration Engine
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const MEASUREMENT_ID = 'G-WBB0P6C9DM';

// Ensure window.dataLayer and window.gtag are safely defined
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
  }
}

// Helper to extract session source
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

// Generates context for GA4 event parameters
const getCurrentContext = () => {
  if (typeof window === 'undefined') {
    return {
      page_title: '',
      page_path: '',
      page_location: '',
      device_type: 'desktop'
    };
  }
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return {
    page_title: document.title,
    page_path: window.location.pathname + window.location.hash || '/',
    page_location: window.location.href,
    device_type: isMobile ? 'mobile' : 'desktop'
  };
};

/**
 * 1. SPA Dynamic Page Tracking System
 */
export const trackPageView = (title: string, path: string) => {
  if (typeof window === 'undefined') return;

  // Set document title dynamically
  document.title = title;

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_location: window.location.href,
      page_path: path
    });
    console.log('Page View Sent');
    console.log(`[GA4-Analytics] Page view event dispatched for "${title}" on path "${path}"`);
  }
};

/**
 * 2. WhatsApp Click Tracking (Floating, navbar, support, footer, etc.)
 */
export const trackWhatsAppClick = (buttonType: 'floating' | 'support' | 'checkout' | 'navbar' | 'navbar_support' | 'hero' | 'footer' | 'faq') => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    if (buttonType === 'floating') {
      window.gtag('event', 'floating_whatsapp_click', {
        page_title: document.title,
        page_path: window.location.pathname,
        page_location: window.location.href,
        button_type: 'floating'
      });
      console.log('WhatsApp Click Tracked');
    } else if (buttonType === 'navbar' || buttonType === 'navbar_support') {
      window.gtag('event', 'navbar_whatsapp_click', {
        page_title: document.title,
        page_path: window.location.pathname,
        page_location: window.location.href,
        button_type: 'navbar'
      });
      console.log('WhatsApp Click Tracked');
    } else {
      // General fallback direct mapping for other support, checkout, hero, footer, faq buttons
      window.gtag('event', 'navbar_whatsapp_click', {
         page_title: document.title,
         page_path: window.location.pathname,
         page_location: window.location.href,
         button_type: buttonType
      });
      console.log('WhatsApp Click Tracked');
    }
  }
};

/**
 * 3. Package Selection Custom Tracking
 */
export const trackPackageSelection = (pkgId: string, duration: string) => {
  if (typeof window === 'undefined') return;

  const prices: Record<string, number> = {
    starter: 149,
    business: 499,
    premium: 999
  };
  const pkgPrice = prices[pkgId.toLowerCase()] || 499;
  const pkgName = pkgId.toUpperCase();

  if (window.gtag) {
    window.gtag('event', 'checkout_package_selected', {
      package_name: pkgName,
      package_price: pkgPrice,
      billing_plan: duration
    });
    console.log('Checkout Package Selected Event Sent');
  }
};

/**
 * 4. Add-On Selected Tracking
 */
export const trackAddonToggle = (addonId: string, addonName: string, selected: boolean, priceValue: number) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'addon_selected', {
      addon_name: addonName,
      is_selected: selected,
      addon_price: priceValue,
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
    console.log(`Add-on selected: ${addonName} - State: ${selected}`);
  }
};

/**
 * 5. Funnel and Checkout Initiation Tracking
 */
export const trackBeginCheckout = (pkgId: string, billingPlan: string) => {
  if (typeof window === 'undefined') return;

  const prices: Record<string, number> = {
    starter: 149,
    business: 499,
    premium: 999
  };
  const pkgPrice = prices[pkgId.toLowerCase()] || 499;

  if (window.gtag) {
    window.gtag('event', 'checkout_started', {
      package_name: pkgId.toUpperCase(),
      package_price: pkgPrice,
      billing_plan: billingPlan,
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
    console.log('Checkout Started Event Sent');
  }
};

/**
 * Funnel stage step analysis
 */
export const trackFunnelStep = (stepNumber: number, stepName: string, details?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'checkout_funnel', {
      step_number: stepNumber,
      step_name: stepName,
      page_title: document.title,
      page_path: window.location.pathname,
      ...details
    });
  }
};

/**
 * 6. Form Submission Events
 */
export const trackFormSubmit = (formName: string, details?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'form_submit', {
      form_name: formName,
      page_title: document.title,
      page_path: window.location.pathname,
      ...details
    });
  }
};

/**
 * 7. Scroll Depth Tracking events
 */
export const trackScrollEvent = (percentage: number) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'scroll_depth', {
      percent_scrolled: percentage,
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
    console.log(`Scroll Depth Tracked: ${percentage}%`);
  }
};

/**
 * 8. Core CTA Click Event Tracking
 */
export const trackCtaClick = (ctaLabel: string, sectionName: string) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'cta_click', {
      cta_label: ctaLabel,
      section: sectionName,
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }
};

/**
 * 9. FAQ Toggle Tracker
 */
export const trackFaqExpand = (questionName: string) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'faq_expand', {
      faq_question: questionName,
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }
};

/**
 * Form interaction tracker
 */
export const trackFormInteraction = (formName: string, actionName: string, details?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', 'form_interaction', {
      form_id: formName,
      form_action: actionName,
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      ...details
    });
  }
};
