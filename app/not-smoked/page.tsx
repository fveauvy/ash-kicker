"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useConfig } from "@/contexts/config-context";
import { calculateDetailedCigarettesNotSmoked } from "@/lib/calculations";
import BackButton from "@/components/back-button";

export default function CigarettesNotSmokedPage() {
  const t = useTranslations("CigarettesNotSmoked");
  const { config } = useConfig();
  const [stats, setStats] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
    total: 0,
  });

  useEffect(() => {
    if (config.quitDate) {
      setStats(calculateDetailedCigarettesNotSmoked(config));
    }
  }, [config]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <BackButton />
        <h2 className="text-3xl font-bold mb-6">{t("title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("daily")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.daily}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("weekly")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.weekly}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("monthly")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.monthly}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("yearly")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.yearly}
              </p>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("total")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.total}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
