export interface PlanetaryPosition {
  house: string;
  sign: string;
  status: string;
}

export interface CosmicReading {
  phase: 'Building' | 'Waiting';
  phaseTitle: string;
  phaseVibe: string;
  vibeScore: number;
  alignment: {
    sun: PlanetaryPosition;
    moon: PlanetaryPosition;
    ascendant: string;
  };
  favorableHours: string[];
  detailedReport: string;
  actionableSteps: string[];
  luckyColor: string;
  luckyNumber: number;
  nakshatra: string;
}

export type Theme = 'light' | 'dark';

export interface ZodiacSign {
  name: string;
  sanskrit: string;
  ruler: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  imageUrl: string;
}

export interface LiveMomentCard {
  id: string;
  title: string;
  tag: string;
  urgency: 'Closes in 3 days' | 'This Week' | 'Limited Seats' | 'Next 24 Hours' | 'Auspicious Portal';
  image: string;
}
