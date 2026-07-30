import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActions } from '../components/FloatingActions';
import { useTheme } from '../context/ThemeProvider';
import Particles from '../components/ui/Particles';

const particleColors = ['#f59e0b', '#8b5cf6', '#e0e7ff'];

function ParticlesBackground() {
  const { theme } = useTheme();
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-50 dark:opacity-100">
      <Particles
        particleColors={particleColors}
        particleCount={theme === 'dark' ? 100 : 30}
        particleSpread={12}
        speed={0.15}
        particleBaseSize={300}
        moveParticlesOnHover={true}
        particleHoverFactor={3.5}
        alphaParticles={true}
        disableRotation={false}
        sizeRandomness={1.5}
        cameraDistance={25}
      />
    </div>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Abstract global glowing orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold/10 dark:bg-gold/5 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple/10 dark:bg-indigo/10 blur-[150px] pointer-events-none z-0" />

      {/* Global Particles Background Layer */}
      <ParticlesBackground />

      <Navbar />

      <main className="relative z-10">
        {children}
      </main>

      <Footer />

      {/* Floating Action Buttons */}
      {/* <FloatingActions /> */}
    </div>
  );
}