import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-HY9X0KFX0H';

const RouteAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
      return;
    }

    const pagePath = `${location.pathname}${location.search}${location.hash}`;

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default RouteAnalytics;
