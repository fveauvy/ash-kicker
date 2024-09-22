"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

export interface Config {
  cigarettesPerDay: number;
  pricePerPack: number;
  cigarettesPerPack: number;
  minutesOfLifePerCigarette: number;
  quitDate: string;
}

interface ConfigContextType {
  config: Config;
  updateConfig: (newConfig: Partial<Config>) => void;
}

const defaultConfig: Config = {
  cigarettesPerDay: 20,
  pricePerPack: 10,
  cigarettesPerPack: 20,
  minutesOfLifePerCigarette: 11,
  quitDate: new Date().toISOString().split("T")[0],
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<Config>(defaultConfig);

  useEffect(() => {
    const storedConfig = localStorage.getItem("ashKickerConfig");
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig));
    }
  }, []);

  const updateConfig = (newConfig: Partial<Config>) => {
    setConfig((prevConfig) => {
      const updatedConfig = { ...prevConfig, ...newConfig };
      localStorage.setItem("ashKickerConfig", JSON.stringify(updatedConfig));
      return updatedConfig;
    });
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
