import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import RouteAnalytics from "./components/RouteAnalytics";

// --- PAGE IMPORTS ---
import Home from "./pages/Home";
import About from "./pages/About";
import WebServices from "./pages/WebServices";
import DigitalMarketing from "./pages/DigitalMarketing";
import Industries from "./pages/Industries";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import LegalPage from "./pages/LegalPage";

// --- INDUSTRY PAGES ---
import EducationPage from "./pages/industries/education.jsx";
import HealthcarePage from "./pages/industries/healthcare.jsx";
import TechnologyPage from "./pages/industries/technology.jsx";
import EcommercePage from "./pages/industries/ecommerce.jsx";
import HumanResourcesPage from "./pages/industries/human-resources.jsx";
import FoodBeveragePage from "./pages/industries/food-beverage.jsx";
import AutomotivePage from "./pages/industries/automotive.jsx";
import TravelTourismPage from "./pages/industries/travel-tourism.jsx";
import PhotographyPage from "./pages/industries/photography.jsx";
import RealEstatePage from "./pages/industries/real-estate.jsx";
import LogisticsPage from "./pages/industries/logistics.jsx";
import PublishingPage from "./pages/industries/publishing.jsx";
import EntertainmentPage from "./pages/industries/entertainment.jsx";
import BeautyPersonalCarePage from "./pages/industries/beauty-personal-care.jsx";
import ManufacturingPage from "./pages/industries/manufacturing.jsx";

// --- SERVICE PAGES ---
import StaticWebsitePage from "./pages/services/static-website";
import CmsDevelopmentPage from "./pages/services/cms-development";
import ResponsiveDesignPage from "./pages/services/responsive-design";
import PsdToHtmlPage from "./pages/services/psd-to-html";
import EmailTemplatePage from "./pages/services/email-template";
import MultiVendorPage from "./pages/services/multi-vendor";
import InformativeWebsitePage from "./pages/services/informative-website";
import WebsiteMaintenancePage from "./pages/services/website-maintenance";
import SecurityAuditPage from "./pages/services/security-audit";
import CustomCmsPage from "./pages/services/custom-cms";
import ApiIntegrationPage from "./pages/services/api-integration";
import EcommerceDevelopmentPage from "./pages/services/ecommerce-development";
import StartupWebsitePage from "./pages/services/startup-website";
import DynamicWebsitePage from "./pages/services/dynamic-website";
import WebsiteRedesignPage from "./pages/services/website-redesign";
import CrmDevelopmentPage from "./pages/services/crm-development";
import MobileFriendlyPage from "./pages/services/mobile-friendly";
import LandingPagePage from "./pages/services/landing-page";
import CustomDevelopmentPage from "./pages/services/custom-development";
import BusinessProfilePage from "./pages/services/business-profile";
import PortfolioDesignPage from "./pages/services/portfolio-design";
import PerformanceOptimizationPage from "./pages/services/performance-optimization";
import QuickCartPage from "./pages/services/quickcart";
import ErpDevelopmentPage from "./pages/services/erp-development";
import SearchEngineOptimizationPage from "./pages/services/search-engine-optimization";
import SeoAuditsPage from "./pages/services/seo-audits";
import GoogleAnalyticsSetupPage from "./pages/services/google-analytics-setup";
import CompetitorAnalysisPage from "./pages/services/competitor-analysis";
import TechnicalSeoPage from "./pages/services/technical-seo";
import PpcAdvertisingServicePage from "./pages/services/ppc-advertising-service";
import FacebookAdsPage from "./pages/services/facebook-ads";
import LinkedinMarketingPage from "./pages/services/linkedin-marketing";
import SocialMediaManagementPage from "./pages/services/social-media-management";
import DisplayAdvertisingPage from "./pages/services/display-advertising";
import ContentMarketingPage from "./pages/services/content-marketing";
import EmailMarketingServicePage from "./pages/services/email-marketing-service";
import VideoMarketingPage from "./pages/services/video-marketing";
import LocalSeoServicePage from "./pages/services/local-seo-service";
import KeywordResearchPage from "./pages/services/keyword-research";
import ConversionTrackingPage from "./pages/services/conversion-tracking";
import BacklinkBuildingPage from "./pages/services/backlink-building";
import SeoConsultingPage from "./pages/services/seo-consulting";
import GoogleAdsManagementPage from "./pages/services/google-ads-management";
import InstagramMarketingPage from "./pages/services/instagram-marketing";
import YoutubeAdvertisingPage from "./pages/services/youtube-advertising";
import RemarketingCampaignsPage from "./pages/services/remarketing-campaigns";
import AffiliateMarketingPage from "./pages/services/affiliate-marketing";
import BlogWritingPage from "./pages/services/blog-writing";
import NewsletterCampaignsPage from "./pages/services/newsletter-campaigns";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <RouteAnalytics />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/web-services" element={<WebServices />} />
        <Route path="/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/industries" element={<Industries />} />
        
        <Route path="/industries/education" element={<EducationPage />} />
        <Route path="/industries/healthcare" element={<HealthcarePage />} />
        <Route path="/industries/technology" element={<TechnologyPage />} />
        <Route path="/industries/ecommerce" element={<EcommercePage />} />
        <Route path="/industries/human-resources" element={<HumanResourcesPage />} />
        <Route path="/industries/food-beverage" element={<FoodBeveragePage />} />
        <Route path="/industries/automotive" element={<AutomotivePage />} />
        <Route path="/industries/travel-tourism" element={<TravelTourismPage />} />
        <Route path="/industries/photography" element={<PhotographyPage />} />
        <Route path="/industries/real-estate" element={<RealEstatePage />} />
        <Route path="/industries/logistics" element={<LogisticsPage />} />
        <Route path="/industries/publishing" element={<PublishingPage />} />
        <Route path="/industries/entertainment" element={<EntertainmentPage />} />
        <Route path="/industries/beauty-personal-care" element={<BeautyPersonalCarePage />} />
        <Route path="/industries/manufacturing" element={<ManufacturingPage />} />

        <Route path="/web-services/static-website" element={<StaticWebsitePage />} />
        <Route path="/web-services/cms-development" element={<CmsDevelopmentPage />} />
        <Route path="/web-services/responsive-design" element={<ResponsiveDesignPage />} />
        <Route path="/web-services/psd-to-html" element={<PsdToHtmlPage />} />
        <Route path="/web-services/email-template" element={<EmailTemplatePage />} />
        <Route path="/web-services/multi-vendor" element={<MultiVendorPage />} />
        <Route path="/web-services/informative-website" element={<InformativeWebsitePage />} />
        <Route path="/web-services/website-maintenance" element={<WebsiteMaintenancePage />} />
        <Route path="/web-services/security-audit" element={<SecurityAuditPage />} />
        <Route path="/web-services/custom-cms" element={<CustomCmsPage />} />
        <Route path="/web-services/api-integration" element={<ApiIntegrationPage />} />
        <Route path="/web-services/ecommerce-development" element={<EcommerceDevelopmentPage />} />
        <Route path="/web-services/startup-website" element={<StartupWebsitePage />} />
        <Route path="/web-services/dynamic-website" element={<DynamicWebsitePage />} />
        <Route path="/web-services/website-redesign" element={<WebsiteRedesignPage />} />
        <Route path="/web-services/crm-development" element={<CrmDevelopmentPage />} />
        <Route path="/web-services/mobile-friendly" element={<MobileFriendlyPage />} />
        <Route path="/web-services/landing-page" element={<LandingPagePage />} />
        <Route path="/web-services/custom-development" element={<CustomDevelopmentPage />} />
        <Route path="/web-services/business-profile" element={<BusinessProfilePage />} />
        <Route path="/web-services/portfolio-design" element={<PortfolioDesignPage />} />
        <Route path="/web-services/performance-optimization" element={<PerformanceOptimizationPage />} />
        <Route path="/web-services/quickcart" element={<QuickCartPage />} />
        <Route path="/web-services/erp-development" element={<ErpDevelopmentPage />} />

        <Route path="/digital-marketing/search-engine-optimization" element={<SearchEngineOptimizationPage />} />
        <Route path="/digital-marketing/seo-audits" element={<SeoAuditsPage />} />
        <Route path="/digital-marketing/google-analytics-setup" element={<GoogleAnalyticsSetupPage />} />
        <Route path="/digital-marketing/competitor-analysis" element={<CompetitorAnalysisPage />} />
        <Route path="/digital-marketing/technical-seo" element={<TechnicalSeoPage />} />
        <Route path="/digital-marketing/ppc-advertising-service" element={<PpcAdvertisingServicePage />} />
        <Route path="/digital-marketing/facebook-ads" element={<FacebookAdsPage />} />
        <Route path="/digital-marketing/linkedin-marketing" element={<LinkedinMarketingPage />} />
        <Route path="/digital-marketing/social-media-management" element={<SocialMediaManagementPage />} />
        <Route path="/digital-marketing/display-advertising" element={<DisplayAdvertisingPage />} />
        <Route path="/digital-marketing/content-marketing" element={<ContentMarketingPage />} />
        <Route path="/digital-marketing/email-marketing-service" element={<EmailMarketingServicePage />} />
        <Route path="/digital-marketing/video-marketing" element={<VideoMarketingPage />} />
        <Route path="/digital-marketing/local-seo-service" element={<LocalSeoServicePage />} />
        <Route path="/digital-marketing/keyword-research" element={<KeywordResearchPage />} />
        <Route path="/digital-marketing/conversion-tracking" element={<ConversionTrackingPage />} />
        <Route path="/digital-marketing/backlink-building" element={<BacklinkBuildingPage />} />
        <Route path="/digital-marketing/seo-consulting" element={<SeoConsultingPage />} />
        <Route path="/digital-marketing/google-ads-management" element={<GoogleAdsManagementPage />} />
        <Route path="/digital-marketing/instagram-marketing" element={<InstagramMarketingPage />} />
        <Route path="/digital-marketing/youtube-advertising" element={<YoutubeAdvertisingPage />} />
        <Route path="/digital-marketing/remarketing-campaigns" element={<RemarketingCampaignsPage />} />
        <Route path="/digital-marketing/affiliate-marketing" element={<AffiliateMarketingPage />} />
        <Route path="/digital-marketing/blog-writing" element={<BlogWritingPage />} />
        <Route path="/digital-marketing/newsletter-campaigns" element={<NewsletterCampaignsPage />} />
        
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/legal/:slug" element={<LegalPage />} />
        
      </Routes>
      
      <Footer />
    </>
  );
};

export default App;
