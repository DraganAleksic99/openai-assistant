import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  location: string;
  temperature: string;
  conditions: string;
  isEmpty: boolean;
};

export default function WeatherWidget({
  location = "---",
  temperature = "---",
  conditions = "Sunny",
  isEmpty = false,
}: Props) {
  const conditionClassMap: Record<string, string> = {
    Cloudy: "bg-gradient-to-tr from-[#b6c6c9] to-[#8fa3ad]",
    Sunny: "bg-gradient-to-bl from-[#ffffd0] to-[#007cf0]",
    Rainy: "bg-gradient-to-t from-[#647d8e] to-[#a8c0c0]",
    Snowy: "bg-gradient-to-b from-[#fff] to-[#acc2d9]",
    Windy: "bg-gradient-to-r from-[#c4e0e5] to-[#4ca1af]",
  };

  if (isEmpty) {
    return (
      <div className="w-full h-full p-5 text-white flex justify-center items-center bg-gradient-to-tr from-[#b6c6c9] to-[#8fa3ad]">
        <div className="flex gap-1 flex-col justify-center items-center">
          <p>Enter a city to see local weather</p>
          <p>Try: what's the weather like in Belgrade?</p>
        </div>
      </div>
    );
  }

  const weatherClass = cn(
    "w-full h-full p-5 text-white flex justify-center items-center",
    `${conditionClassMap[conditions] || "bg-gradient-to-bl from-[#ffffd0] to-[#007cf0]"}`
  );

  return (
    <div className={weatherClass}>
      <div className="flex gap-1 flex-col justify-center items-center">
        <p>{location}</p>
        <h2 className="text-[8em] font-medium">
          {temperature !== "---" ? `${temperature}°C` : temperature}
        </h2>
        <p>{conditions}</p>
      </div>
    </div>
  );
}
