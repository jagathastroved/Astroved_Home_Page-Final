import React from 'react';
import { SpecialEvents } from '../components/sections/SpecialEvents';
import { PersonalGuidance } from '../components/sections/PersonalGuidance';
import { PersonalizedSolutions } from '../components/sections/PersonalizedSolutions';
import { PersonalizedSupport } from '../components/sections/PersonalizedSupport';
import { Rituals } from '../components/sections/Rituals';
import { PremiumPanchang } from '../components/sections/PremiumPanchang';
import { WhyChooseAstroVed } from '../components/sections/WhyChooseAstroVed';
import { AIReports } from '../components/sections/AIReports';
import { TrustTicker } from '../components/sections/TrustTicker';
import { Horoscope } from '../components/sections/Horoscope';
import { Testimonials } from '../components/sections/Testimonials';
import { TrustStats } from '../components/sections/TrustStats';
import { FAQ } from '../components/sections/FAQ';
import { scrollToSection } from '../utils/scroll';
import { SEOHead } from '../components/seo/SEOHead';
import { organizationSchema, websiteSchema, faqSchema, breadcrumbSchema } from '../components/seo/schema';
import { seoData } from '../components/seo/seoData';

export function Home() {
  // const page = seoData.home;

  // const schema = [
  //   organizationSchema(),
  //   websiteSchema(),
  //   breadcrumbSchema([{ name: "Home", url: "https://qa.astroved.com" }]),
  // ];

  return (
    <>
      {/* <SEOHead
        title={page.title}
        description={page.description}
        canonical={page.canonical}
        keywords={page.keywords}
        schema={schema}
      /> */}

      {/* <HeroSection /> */}
      <SpecialEvents />
      <PersonalGuidance />
      <AIReports />
      <PersonalizedSolutions />
      <PersonalizedSupport />
      <Rituals />
      <PremiumPanchang />
      <WhyChooseAstroVed />
      <TrustTicker />
      <Horoscope onCalculateChart={(zodiac) => { scrollToSection('birth-form'); }} />
      <Testimonials />
      <TrustStats />
      <FAQ />
    </>
  );
}
