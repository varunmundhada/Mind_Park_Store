import { AboutPreview } from "../components/sections/AboutPreview";
import { CafeSpotlightSection } from "../components/sections/CafeSpotlightSection";
import { CtaSection } from "../components/sections/CtaSection";
import { FeaturedProducts } from "../components/sections/FeaturedProducts";
import { HeroSection } from "../components/sections/HeroSection";
import { ImpactSection } from "../components/sections/ImpactSection";
import { JourneySection } from "../components/sections/JourneySection";
import { StoriesSection } from "../components/sections/StoriesSection";
import { SupportBannerSection } from "../components/sections/SupportBannerSection";

export const HomePage = () => (
  <>
    <HeroSection />
    <SupportBannerSection />
    <AboutPreview />
    <JourneySection />
    <FeaturedProducts />
    <ImpactSection />
    <StoriesSection />
    <CafeSpotlightSection />
    <CtaSection />
  </>
);
