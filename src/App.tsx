import React from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
// import ClickSpark from './components/ui/ClickSpark';
import { ScrollToTop } from './components/ui/ScrollToTop';
// import { HoverGlow } from './components/ui/HoverGlow';

export default function App() {
  return (
    <ThemeProvider>
      {/* <HoverGlow /> */}
      {/* <ScrollToTop /> */}
      {/* <ClickSpark sparkColor="#f59e0b" sparkSize={12} sparkRadius={24} sparkCount={12} duration={500} /> */}
      <div className="min-h-screen bg-ivory dark:bg-[#0c0f24] text-midnight dark:text-cream font-sans selection:bg-gold/30 selection:text-midnight dark:selection:text-cream transition-colors duration-200 relative overflow-x-hidden">
        <MainLayout>
          <Home />
        </MainLayout>
      </div>
    </ThemeProvider>
  );
}
