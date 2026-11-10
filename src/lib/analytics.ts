// Google Analytics 4 Event Tracking Helper

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set' | 'js',
      targetIdOrEventName: string | Date,
      eventParams?: Record<string, unknown>
    ) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

/** Track custom GA4 events safely */
export const trackEvent = (eventName: string, params: Record<string, unknown> = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function' && GA_TRACKING_ID) {
    window.gtag('event', eventName, params);
  }
};

/** Track click on phone call button / link */
export const trackPhoneCall = (source: string = 'website') => {
  trackEvent('phone_call_click', {
    event_category: 'contact',
    event_label: source,
    value: 1,
  });
};

/** Track click on WhatsApp button */
export const trackWhatsAppClick = (serviceOrSource: string = 'general') => {
  trackEvent('whatsapp_click', {
    event_category: 'contact',
    event_label: serviceOrSource,
    value: 1,
  });
};

/** Track click to Google Maps directions */
export const trackDirectionsClick = (source: string = 'website') => {
  trackEvent('directions_click', {
    event_category: 'location',
    event_label: source,
    value: 1,
  });
};

/** Track service page view or contact form submission */
export const trackFormSubmit = (service: string = 'general') => {
  trackEvent('contact_form_submit', {
    event_category: 'conversion',
    event_label: service,
    value: 1,
  });
};

