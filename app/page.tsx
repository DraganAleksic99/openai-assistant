"use client";

import { useState } from "react";
import Chat from "@/components/chat";
import WeatherWidget from "@/components/weather-widget";
import FileViewer from "@/components/file-viewer";

export type WeatherData = {
  location: string;
  temperature: string;
  conditions: string;
  unit: string;
};

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: "",
    temperature: "",
    conditions: "",
    unit: "",
  });

  return (
    <main className="flex h-screen items-center justify-center gap-[5vw]">
      <div className="flex w-full h-screen flex-grow basis-2/5">
        <div className="flex flex-col gap-5 w-full m-5 justify-between h-[calc(100vh-60px)]">
          <WeatherWidget {...weatherData} isEmpty={!weatherData.location} />
          <FileViewer />
        </div>
      </div>
      <div className="w-full h-full flex-grow basis-3/5">
        <Chat setWeatherData={setWeatherData} />
      </div>
    </main>
  );
}
