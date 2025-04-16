import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getExchangeRate() {
  try {
    const response = await fetch("https://v6.exchangerate-api.com/v6/23322a8e6245695fa13995a8/latest/USD");
    const data = await response.json();
    return data.conversion_rates.PKR; // Returns USD to PKR rate
  } catch (error) {
    console.error("Failed to fetch exchange rate:", error);
    return 290; // Default fallback rate
  }
}
