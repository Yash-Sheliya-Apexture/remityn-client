// app/contexts/BrevoStatusContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BrevoStatusContextType {
  isBrevoApiReady: boolean;
  setIsBrevoApiReady: (ready: boolean) => void;
}

// Create the context with a default undefined value
const BrevoStatusContext = createContext<BrevoStatusContextType | undefined>(undefined);

// Create a provider component
export const BrevoStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isBrevoApiReady, setIsBrevoApiReady] = useState(false);

  return (
    <BrevoStatusContext.Provider value={{ isBrevoApiReady, setIsBrevoApiReady }}>
      {children}
    </BrevoStatusContext.Provider>
  );
};

// Create a custom hook to easily consume the context
export const useBrevoStatus = () => {
  const context = useContext(BrevoStatusContext);
  if (context === undefined) {
    throw new Error('useBrevoStatus must be used within a BrevoStatusProvider');
  }
  return context;
};