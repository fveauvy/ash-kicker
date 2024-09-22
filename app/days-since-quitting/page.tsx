"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useConfig } from "@/contexts/config-context";
import BackButton from "@/components/back-button";
import { Calendar, Droplet, Wind } from "lucide-react";

function calculateTimeSinceQuitting(quitDate: string) {
  const now = new Date();
  const quit = new Date(quitDate);
  const diff = now.getTime() - quit.getTime();

  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
  const days = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { months, days, hours, minutes, seconds };
}

function calculateEnvironmentalImpact(cigarettesNotSmoked: number) {
  const waterPolluted = cigarettesNotSmoked * 3.7; // liters
  const co2Contribution = (cigarettesNotSmoked * 14) / 1000; // kg

  return { waterPolluted, co2Contribution };
}

export default function DaysSinceQuittingPage() {
  const t = useTranslations("DaysSinceQuitting");
  const { config } = useConfig();
  const [timeSinceQuitting, setTimeSinceQuitting] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [environmentalImpact, setEnvironmentalImpact] = useState({
    waterPolluted: 0,
    co2Contribution: 0,
  });

  useEffect(() => {
    const updateTime = () => {
      if (config.quitDate) {
        setTimeSinceQuitting(calculateTimeSinceQuitting(config.quitDate));
        const cigarettesNotSmoked = Math.floor(
          ((Date.now() - new Date(config.quitDate).getTime()) /
            (1000 * 60 * 60 * 24)) *
            config.cigarettesPerDay
        );
        setEnvironmentalImpact(
          calculateEnvironmentalImpact(cigarettesNotSmoked)
        );
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [config]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <BackButton />
        <h2 className="text-3xl font-bold mb-6">{t("title")}</h2>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" />
              {t("timeSinceQuitting")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
              {Object.entries(timeSinceQuitting).map(([key, value]) => (
                <div
                  key={key}
                  className={`flex flex-col items-center ${
                    key === "minutes" || key === "seconds"
                      ? "hidden md:flex"
                      : ""
                  }`}
                >
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    {t(key)}
                  </h3>
                  <p className="text-4xl font-bold text-primary">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <h3 className="text-2xl font-bold mb-4">{t("environmentalImpact")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Droplet className="mr-2" />
                {t("waterPollutionAvoided")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {environmentalImpact.waterPolluted.toFixed(0)} {t("liters")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wind className="mr-2" />
                {t("co2EmissionsAvoided")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {environmentalImpact.co2Contribution.toFixed(1)} {t("kg")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
