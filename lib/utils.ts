import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getWeather = (location: string) => {
  // choose a random temperature and condition
  const randomTemperature = Math.floor(Math.random() * 15) + 10;
  const randomConditionIndex = Math.floor(Math.random() * 5);
  const conditions = ["Cloudy", "Sunny", "Rainy", "Snowy", "Windy"];

  return {
    location: location,
    temperature: randomTemperature,
    unit: "C",
    conditions: conditions[randomConditionIndex],
  };
};

export { getWeather };
