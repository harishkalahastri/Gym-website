import React, { createContext, useContext, useEffect, useState } from 'react';
import { gyms, defaultGymId } from '../config/gyms';
import type { GymProfile } from '../config/gyms';

interface GymContextType {
  gym: GymProfile;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

export function GymProvider({ children }: { children: React.ReactNode }) {
  const [gym, setGym] = useState<GymProfile>(gyms[defaultGymId]);

  useEffect(() => {
    // 1. Read URL parameter
    const params = new URLSearchParams(window.location.search);
    const gymParam = params.get('gym')?.toLowerCase();
    
    // 2. Select config
    const selectedGym = gymParam && gyms[gymParam] ? gyms[gymParam] : gyms[defaultGymId];
    setGym(selectedGym);

    // 3. Inject CSS Variables dynamically
    document.documentElement.style.setProperty('--brand-primary', selectedGym.colors.primary);
    document.documentElement.style.setProperty('--brand-primary-rgb', selectedGym.colors.primaryRgb);
    
    // Also update document title for realism
    document.title = `${selectedGym.name} | Premium Fitness Club`;
  }, []);

  return (
    <GymContext.Provider value={{ gym }}>
      {children}
    </GymContext.Provider>
  );
}

export function useGym() {
  const context = useContext(GymContext);
  if (context === undefined) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
}
