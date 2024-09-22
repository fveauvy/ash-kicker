import { useState, useEffect } from "react";
import { Config, defaultConfig } from "@/lib/config";

export function useConfig() {
  const [config, setConfig] = useState<Config>(defaultConfig);

  useEffect(() => {
    const storedConfig = localStorage.getItem("ashKickerConfig");
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig));
    }
  }, []);

  const updateConfig = (newConfig: Partial<Config>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    localStorage.setItem("ashKickerConfig", JSON.stringify(updatedConfig));
  };

  return { config, updateConfig };
}
