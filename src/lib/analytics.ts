// Google Analytics 4 (GA4) Direct Integration Engine
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Measurement ID from master architecture
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

// Browser name detector
const getBrowserName = (): string => {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('SamsungBrowser')) return 'Samsung Browser';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  if (ua.includes('Trident')) return 'Internet Explorer';
  if (ua.includes('Edge') || ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  return 'Other';
};

// OS detector
const getOS = (): string => {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac')) return 'MacOS';
  if (ua.includes('X11') || ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'Other';
};

// Generates context for GA4 event parameters (all global variables requested)
const getGlobalParams = () => {
  if (typeof window === 'undefined') {
    return {
      page_title: '',
      page_path: '',
      page_location: '',
      device_type: 'desktop',
      screen_width: 1024,
      screen_height: 768,
      browser_name: 'unknown',
      operating_system: 'unknown',
      timestamp: new Date().toISOString()
    };
  }
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return {
    page_title: document.title,
    page_path: window.location.pathname + window.location.hash || '/',
    page_location: window.location.href,
    device_type: isMobile ? 'mobile' : 'desktop',
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
    browser_name: getBrowserName(),
    operating_system: getOS(),
    timestamp: new Date().toISOString()
  };
};

/**
 * Core GA4 Event Forwarder
 * Automatically appends all requested global event parameters to every custom event.
 */
export const sendGA4Event = (eventName: string, customParams: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    const payload = {
      ...getGlobalParams(),
      ...customParams
    };
    window.gtag('event', eventName, payload);
    console.log(`[GA4-TRACKING] Event "${eventName}" dispatched:`, payload);
  } else {
    console.warn(`[GA4-TRACKING] gtag not initialized. Blocked event: ${eventName}`);
  }
};

/**
 * 1. SPA Dynamic Page Tracking System
 */
export const trackPageView = (title: string, path: string) => {
  if (typeof window === 'undefined') return;

  // Sync document title
  document.title = title;

  // Track standard page view event
  sendGA4Event('page_view', {
    page_title: title,
    page_path: path,
    page_location: window.location.href
  });

  // Distribute to requested page_view_* specific GA4 Custom Events
  let specificEvent = 'page_view_home';
  const cleanPath = path.replace(/^\/|\/$/g, '');

  switch (cleanPath) {
    case '':
    case 'landing':
      specificEvent = 'page_view_home';
      break;
    case 'features':
      specificEvent = 'page_view_services';
      break;
    case 'pricing':
      specificEvent = 'page_view_pricing';
      break;
    case 'management':
      specificEvent = 'page_view_about'; // Under Management / Agency representation
      break;
    case 'logos':
      specificEvent = 'page_view_portfolio'; // Design references / Branding art
      break;
    case 'checkout':
      specificEvent = 'page_view_checkout';
      break;
    case 'contact':
      specificEvent = 'page_view_contact';
      break;
    case 'faq':
      specificEvent = 'page_view_faq';
      break;
    default:
      specificEvent = 'page_view_home';
  }

  sendGA4Event(specificEvent, {
    page_title: title,
    page_path: path,
    page_location: window.location.href
  });
};

/**
 * 2. WhatsApp Click Tracking (Floating, navbar, support, footer, etc.)
 */
export const trackWhatsAppClick = (
  buttonType: 'floating' | 'support' | 'checkout' | 'navbar' | 'navbar_support' | 'hero' | 'footer' | 'faq' | 'contact' | 'package',
  details?: { package_name?: string; button_location?: string }
) => {
  let mappedEvent = 'button_click_whatsapp_contact';

  switch (buttonType) {
    case 'floating':
      mappedEvent = 'button_click_whatsapp_floating';
      break;
    case 'navbar':
    case 'navbar_support':
      mappedEvent = 'button_click_whatsapp_navbar';
      break;
    case 'checkout':
      mappedEvent = 'button_click_whatsapp_checkout';
      break;
    case 'package':
      mappedEvent = 'button_click_whatsapp_package';
      break;
    case 'support':
    case 'contact':
    case 'faq':
    case 'hero':
    case 'footer':
    default:
      mappedEvent = 'button_click_whatsapp_contact';
  }

  sendGA4Event(mappedEvent, {
    button_type: buttonType,
    package_name: details?.package_name || '',
    button_location: details?.button_location || buttonType,
    ...details
  });
};

/**
 * 3. Package Selection Custom Tracking
 */
export const trackPackageSelection = (pkgId: string, duration: string) => {
  let packageEvent = 'package_select_business';
  const priceMap: Record<string, number> = {
    starter: 79,
    business: 149,
    premium: 249,
    custom: 499
  };

  const id = pkgId.toLowerCase();
  if (id === 'starter') packageEvent = 'package_select_starter';
  else if (id === 'premium') packageEvent = 'package_select_premium';
  else if (id === 'custom') packageEvent = 'package_select_custom';
  else packageEvent = 'package_select_business';

  sendGA4Event(packageEvent, {
    package_name: pkgId.toUpperCase(),
    package_price: priceMap[id] || 149,
    billing_plan: duration
  });
};

/**
 * 4. Add-On Selected Tracking and Custom Mapping
 */
export const trackAddonToggle = (addonId: string, addonName: string, selected: boolean, priceValue: number) => {
  // Flag checkout_addon_selected parameter during active checkout operations
  sendGA4Event('checkout_addon_selected', {
    addon_id: addonId,
    addon_name: addonName,
    is_selected: selected,
    addon_price: priceValue
  });

  // Map to distinct individual addon custom indicators
  let mappedAddonEvent = '';
  switch (addonId) {
    case 'custom_domain':
      mappedAddonEvent = 'addon_select_custom_domain';
      break;
    case 'google_analytics':
      mappedAddonEvent = 'addon_select_google_analytics';
      break;
    case 'google_search_console':
      mappedAddonEvent = 'addon_select_google_search_console';
      break;
    case 'extra_pages':
      mappedAddonEvent = 'addon_select_additional_pages';
      break;
    case 'whatsapp_integration':
      mappedAddonEvent = 'addon_select_whatsapp_button';
      break;
    case 'photo_opt':
      mappedAddonEvent = 'addon_select_photo_optimization';
      break;
    case 'design_changes':
      mappedAddonEvent = 'addon_select_design_changes';
      break;
    case 'seasonal_promo':
      mappedAddonEvent = 'addon_select_seasonal_promotion';
      break;
    case 'rolling_performance':
      mappedAddonEvent = 'addon_select_speed_optimization';
      break;
    case 'comprehensive_sla':
      mappedAddonEvent = 'addon_select_monthly_management';
      break;
    case 'custom_logos':
      mappedAddonEvent = 'addon_select_logo_design';
      break;
    case 'copywriting':
      mappedAddonEvent = 'addon_select_content_creation';
      break;
  }

  if (mappedAddonEvent && selected) {
    sendGA4Event(mappedAddonEvent, {
      addon_name: addonName,
      addon_price: priceValue
    });
  }
};

/**
 * 5. Funnel and Checkout Initiation Tracking
 */
export const trackBeginCheckout = (pkgId: string, billingPlan: string) => {
  const priceMap: Record<string, number> = {
    starter: 79,
    business: 149,
    premium: 249,
    custom: 499
  };

  sendGA4Event('checkout_start', {
    package_name: pkgId.toUpperCase(),
    package_price: priceMap[pkgId.toLowerCase()] || 149,
    billing_plan: billingPlan
  });
};

/**
 * Funnel stages and actions
 */
export const trackFunnelStep = (stepNumber: number, stepName: string, details?: Record<string, any>) => {
  // Map our stages to user's checkout key events
  if (stepName === 'checkout_viewed') {
    sendGA4Event('checkout_start', details);
  } else if (stepName === 'package_confirmed') {
    sendGA4Event('checkout_package_confirmed', details);
  } else if (stepName === 'whatsapp_redirect') {
    sendGA4Event('checkout_whatsapp_sent', details);
  } else if (stepName === 'checkout_success') {
    sendGA4Event('checkout_completed', details);
  }

  // Backwards compatibility standard step logged
  sendGA4Event('checkout_funnel', {
    step_number: stepNumber,
    step_name: stepName,
    ...details
  });
};

/**
 * 6. Form Submission Events
 */
export const trackFormSubmit = (formName: string, details?: Record<string, any>) => {
  sendGA4Event('checkout_form_completed', details);
  sendGA4Event('form_submit', {
    form_name: formName,
    ...details
  });
};

/**
 * 7. Scroll Depth Tracking events
 */
export const trackScrollEvent = (percentage: number) => {
  sendGA4Event(`scroll_${percentage}`, {
    percent_scrolled: percentage
  });
  
  // Standard background event logged
  sendGA4Event('scroll_depth', {
    percent_scrolled: percentage
  });
};

/**
 * 8. Core CTA Click Event Tracking
 */
export const trackCtaClick = (ctaLabel: string, sectionName: string) => {
  let mappedCtaEvent = 'button_click_get_started';
  const label = ctaLabel.toLowerCase();

  if (label.includes('get started') || label.includes('launch project')) {
    mappedCtaEvent = 'button_click_get_started';
  } else if (label.includes('pricing') || label.includes('package') || label.includes('view rate')) {
    mappedCtaEvent = 'button_click_view_pricing';
  } else if (label.includes('start project') || label.includes('checkout') || label.includes('order')) {
    mappedCtaEvent = 'button_click_start_project';
  } else if (label.includes('contact now') || label.includes('speak with expert')) {
    mappedCtaEvent = 'button_click_contact_now';
  } else if (label.includes('request quote') || label.includes('estimate')) {
    mappedCtaEvent = 'button_click_request_quote';
  } else if (label.includes('book consultation') || label.includes('appointment')) {
    mappedCtaEvent = 'button_click_book_consultation';
  } else if (label.includes('choose package') || label.includes('select')) {
    mappedCtaEvent = 'button_click_choose_package';
  } else if (label.includes('submit') || label.includes('checkout now')) {
    mappedCtaEvent = 'button_click_checkout';
  }

  sendGA4Event(mappedCtaEvent, {
    cta_label: ctaLabel,
    section: sectionName
  });

  // Maintain dual event compatibility layer
  sendGA4Event('cta_click', {
    cta_label: ctaLabel,
    section: sectionName
  });
};

/**
 * 9. FAQ Toggle Tracker
 */
export const trackFaqExpand = (questionName: string) => {
  // Fire session_engaged on first key interaction
  sendGA4Event('session_engaged', {
    interaction_type: 'faq_engagement'
  });

  sendGA4Event('faq_section_viewed', {
    faq_question: questionName
  });

  sendGA4Event('faq_expand', {
    faq_question: questionName
  });
};

/**
 * Form interaction tracking core
 */
export const trackFormInteraction = (formName: string, actionName: string, details?: Record<string, any>) => {
  if (actionName === 'focus' || actionName === 'input_start') {
    sendGA4Event('checkout_form_started', details);
    sendGA4Event('form_interaction_started', {
      form_id: formName
    });
  }

  sendGA4Event('form_interaction', {
    form_id: formName,
    form_action: actionName,
    ...details
  });
};
