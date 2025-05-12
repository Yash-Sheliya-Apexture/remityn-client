// // src/contexts/WebsiteAppContext.tsx
// "use client"; // Context needs to be client-side

// import React, { useState, createContext, useContext, ReactNode } from "react";

// // 1. Define the shape of the context data
// interface AppContextProps {
//   selectedSendCurrency: string;
//   setSelectedSendCurrency: (currency: string) => void;
// }

// // 2. Create the context with a default value (or undefined)
// // Using undefined is common, paired with a check in the hook
// const AppContext = createContext<AppContextProps | undefined>(undefined);

// // 3. Create a Provider Component (optional but good practice)
// interface AppProviderProps {
//   children: ReactNode;
//   initialSelectedSendCurrency?: string;
// }

// export function WebsiteAppProvider({
//   children,
//   initialSelectedSendCurrency = "EUR", // Default value
// }: AppProviderProps) {
//   const [selectedSendCurrency, setSelectedSendCurrency] = useState<string>(
//     initialSelectedSendCurrency
//   );

//   const value = { selectedSendCurrency, setSelectedSendCurrency };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// }

// // 4. Create the custom hook to consume the context
// export function useAppContext() {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     // Provides a helpful error message if used outside the provider
//     throw new Error("useAppContext must be used within a WebsiteAppProvider");
//   }
//   return context;
// }


// src/contexts/WebsiteAppContext.tsx
"use client";

import React, { useState, createContext, useContext, ReactNode } from "react";

// 1. Define the shape of the context data
interface AppContextProps {
  selectedSendCurrency: string;
  setSelectedSendCurrency: (currency: string) => void;
}

// 2. Create the context with a default value (or undefined)
const AppContext = createContext<AppContextProps | undefined>(undefined);

// 3. Create a Provider Component
interface AppProviderProps {
  children: ReactNode;
  initialSelectedSendCurrency?: string;
}

export function WebsiteAppProvider({
  children,
  initialSelectedSendCurrency = "EUR", // <--- CHANGED DEFAULT TO EUR
}: AppProviderProps) {
  const [selectedSendCurrency, setSelectedSendCurrency] = useState<string>(
    initialSelectedSendCurrency
  );

  const value = { selectedSendCurrency, setSelectedSendCurrency };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// 4. Create the custom hook to consume the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a WebsiteAppProvider");
  }
  return context;
}