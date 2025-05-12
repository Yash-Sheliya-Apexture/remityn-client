// src/types/country-list.d.ts
declare module 'country-list' {
    interface Country {
      code: string;
      name: string;
    }
    export function getData(): Country[];
    // Add other functions if you use them, e.g., getName(code), getCode(name)
  }