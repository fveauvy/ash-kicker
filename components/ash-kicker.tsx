"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Settings } from "lucide-react";

import { ConfigModal } from "./config-modal";
import DynamicThemeToggle from "./theme-toggle";
import { formatPrice } from "@/lib/utils";

export interface Config {
  cigarettesPerDay: number;
  pricePerPack: number;
  cigarettesPerPack: number;
  minutesOfLifePerCigarette: number;
  quitDate: string;
}

const defaultConfig: Config = {
  cigarettesPerDay: 20,
  pricePerPack: 10,
  cigarettesPerPack: 20,
  minutesOfLifePerCigarette: 11,
  quitDate: "",
};

export default function AshKicker() {
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [daysSinceQuitting, setDaysSinceQuitting] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);
  const [cigarettesNotSmoked, setCigarettesNotSmoked] = useState(0);
  const [daysOfLifeGained, setDaysOfLifeGained] = useState(0);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const storedConfig = localStorage.getItem("ashKickerConfig");
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig));
    }
  }, []);

  useEffect(() => {
    if (config.quitDate) {
      const quit = new Date(config.quitDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - quit.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setDaysSinceQuitting(diffDays);
      setMoneySaved(
        ((diffDays * config.cigarettesPerDay) / config.cigarettesPerPack) *
          config.pricePerPack
      );
      setCigarettesNotSmoked(diffDays * config.cigarettesPerDay);
      setDaysOfLifeGained(
        (diffDays *
          config.cigarettesPerDay *
          config.minutesOfLifePerCigarette) /
          (24 * 60)
      );
    }
  }, [config]);

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => {
      const newConfig = {
        ...prev,
        [name]: name === "quitDate" ? value : Number(value),
      };
      localStorage.setItem("ashKickerConfig", JSON.stringify(newConfig));
      return newConfig;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Ash Kicker</h1>
          <div className="flex space-x-2">
            {isMounted && <DynamicThemeToggle />}

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <ConfigModal
                config={config}
                onConfigChange={handleConfigChange}
              />
            </Dialog>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Money Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {formatPrice(moneySaved)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cigarettes Not Smoked</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {cigarettesNotSmoked}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Days of Life Gained</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {daysOfLifeGained.toFixed(1)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Days Since Quitting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {daysSinceQuitting}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
