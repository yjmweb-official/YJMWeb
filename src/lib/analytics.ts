// Google Analytics 4 & Google Tag Manager tracking engine
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const MEASUREMENT_ID = 'G-QFY8QZW1BY';

// Returns unified parameters for current state
const getCurrentContext = () => {
  if (typeof window === 'undefined') {
    return {
      page_title: '',
      page_path: '',
      page_location: '',
      device_info: 'desktop',
      referrer: 'direct',
    };
  }
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return {
    page_title: document.title,
    page_path: window.location.pathname + window.location.hash,
    page_location: window.location.href,
    device_info: isMobile ? 'mobile' : 'desktop',
    referrer: document.referrer || 'direct',
  };
};

/**
 * Tracks a page view both with gtag configuration update and custom event tags.
 */
export const trackPageView = (title: string, path: string) => {
  if (typeof window === 'undefined') return;

  // Set document title first
  document.title = title;

  const currentTab = path.startsWith('/') ? path : `/${path}`;
  const gLocation = window.location.origin + currentTab;

  // Set general gtag properties
  if (window.gtag) {
    window.gtag('set', {
      page_title: title,
      page_path: currentTab,
      page_location: gLocation,
    });

    // Fire config with page details manually to enforce real-time reporting separation
    window.gtag('config', MEASUREMENT_ID, {
      page_title: title,
      page_location: gLocation,
      page_path: currentTab,
    });

    // Explicitly send page_view event for safety
    window.gtag('event', 'page_view', {
      page_title: title,
      page_path: currentTab,
      page_location: gLocation,
      send_to: MEASUREMENT_ID,
    });
  }

  // Push event specifically to Google Tag Manager compatible dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    page_title: title,
    page_path: currentTab,
    page_location: gLocation,
    device_type: getCurrentContext().device_info,
    referrer_source: getCurrentContext().referrer,
    timestamp: new Date().toISOString()
  });
};

/**
 * Tracks WhatsApp click interactions across different components.
 */
export const trackWhatsAppClick = (buttonType: 'floating' | 'support' | 'checkout' | 'navbar' | 'hero' | 'footer' | 'faq') => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();

  // Send generic event to GA
  if (window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      button_type: buttonType,
      page_name: ctx.page_title,
      page_path: ctx.page_path,
      page_location: ctx.page_location,
      device_type: ctx.device_info,
      referrer_source: ctx.referrer
    });

    // Also send more specific events requested by user
    const specificEventName = `${buttonType}_whatsapp_click`;
    window.gtag('event', specificEventName, {
      page_name: ctx.page_title,
      page_path: ctx.page_path,
      page_location: ctx.page_location,
    });
  }

  // GTM dataLayer compatible structure
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'whatsapp_click',
    button_type: buttonType,
    page_name: ctx.page_title,
    page_path: ctx.page_path,
    page_location: ctx.page_location,
    device_type: ctx.device_info,
    referrer_source: ctx.referrer,
    time_clicked: new Date().toISOString()
  });

  // GTM triggers
  window.dataLayer.push({
    event: `${buttonType}_whatsapp_click`,
    button_type: buttonType,
    page_name: ctx.page_title,
    page_path: ctx.page_path,
    page_location: ctx.page_location,
    is_conversion: true
  });
};

/**
 * Tracks selection of different design and development packages.
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

  if (window.gtag) {
    // 1. Generic package selection click
    window.gtag('event', 'select_package', {
      package_id: pkgId,
      package_price: pkgPrice,
      plan_duration: duration,
      page_name: ctx.page_title,
      page_path: ctx.page_path
    });

    // 2. Specific GA4 custom event requested (e.g. select_starter_package)
    const specificEvent = `select_${pkgId.toLowerCase()}_package`;
    window.gtag('event', specificEvent, {
      package_id: pkgId,
      package_price: pkgPrice,
      plan_duration: duration,
      page_name: ctx.page_title,
      page_path: ctx.page_path,
      value: pkgPrice,
      currency: 'USD'
    });
  }

  // GTM pushes
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'select_package',
    package_id: pkgId,
    package_price: pkgPrice,
    plan_duration: duration,
    page_name: ctx.page_title,
    page_path: ctx.page_path,
    page_location: ctx.page_location,
    is_conversion: true
  });

  window.dataLayer.push({
    event: `select_${pkgId.toLowerCase()}_package`,
    package_id: pkgId,
    package_price: pkgPrice,
    plan_duration: duration,
    value: pkgPrice,
    currency: 'USD'
  });
};

/**
 * Tracks add-on toggling in the checkout component.
 */
export const trackAddonToggle = (addonId: string, addonName: string, selected: boolean, priceValue: number) => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();

  const eventName = selected ? 'add_to_cart_addon' : 'remove_from_cart_addon';

  if (window.gtag) {
    window.gtag('event', eventName, {
      addon_id: addonId,
      addon_name: addonName,
      price: priceValue,
      page_name: ctx.page_title,
      page_path: ctx.page_path,
      value: priceValue,
      currency: 'USD'
    });

    // Custom individual tracking events for specific add-on tracking
    const cleanedAddonId = addonId.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    window.gtag('event', `toggle_addon_${cleanedAddonId}`, {
      addon_id: addonId,
      addon_name: addonName,
      is_selected: selected,
      price: priceValue
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'addon_interaction',
    addon_id: addonId,
    addon_name: addonName,
    interaction_type: selected ? 'select' : 'deselect',
    price_value: priceValue,
    page_name: ctx.page_title,
    page_path: ctx.page_path,
    device_type: ctx.device_info
  });
};

/**
 * Tracks various steps in the checkout and setup process (Funnel stages).
 */
export const trackFunnelStep = (stepNumber: number, stepName: string, details?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();

  if (window.gtag) {
    window.gtag('event', 'checkout_funnel', {
      step_number: stepNumber,
      step_name: stepName,
      page_name: ctx.page_title,
      page_path: ctx.page_path,
      ...details
    });

    // Conversion identifier event for step 5 (order placed support click / WhatsApp submit)
    if (stepNumber === 5) {
      window.gtag('event', 'checkout_completed', {
        step_name: stepName,
        value: details?.total_monthly || 149,
        currency: 'USD'
      });
    }
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'checkout_step',
    step_number: stepNumber,
    step_name: stepName,
    page_name: ctx.page_title,
    page_path: ctx.page_path,
    ...details,
    is_conversion: stepNumber >= 3
  });
};

/**
 * Tracks scroll patterns (25%, 50%, 75%, 100%)
 */
export const trackScrollEvent = (percentage: number) => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();

  if (window.gtag) {
    window.gtag('event', 'scroll', {
      percent_scrolled: percentage,
      page_title: ctx.page_title,
      page_path: ctx.page_path,
      page_location: ctx.page_location
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'scroll_depth',
    percent_scrolled: percentage,
    page_name: ctx.page_title,
    page_path: ctx.page_path
  });
};

/**
 * Tracks standard CTAs or form contact selections.
 */
export const trackFormInteraction = (formName: string, actionName: string, details?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  const ctx = getCurrentContext();

  if (window.gtag) {
    window.gtag('event', 'form_interaction', {
      form_id: formName,
      form_action: actionName,
      page_name: ctx.page_title,
      page_path: ctx.page_path,
      ...details
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'form_submission',
    form_id: formName,
    form_action: actionName,
    page_name: ctx.page_title,
    page_path: ctx.page_path,
    is_conversion: actionName === 'submit'
  });
};
