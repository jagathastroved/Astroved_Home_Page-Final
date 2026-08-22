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

export function Home() {

  return (
    <>
      {/* <HeroSection /> */}
      <SpecialEvents />
      <PersonalGuidance />
      <Horoscope onCalculateChart={(zodiac) => { scrollToSection('birth-form'); }} />
      <PersonalizedSolutions />
      <PersonalizedSupport />
      <Rituals />
      <PremiumPanchang />
      <WhyChooseAstroVed />
      <TrustTicker />
      {/* <AIReports /> */}
      <Testimonials />
      <TrustStats />
      <FAQ />
    </>
  );
}
