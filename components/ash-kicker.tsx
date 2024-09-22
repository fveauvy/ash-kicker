"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useConfig } from "@/hooks/use-config";
import { calculateStats } from "@/lib/calculations";

export default function AshKicker() {
  const t = useTranslations("AshKicker");
  const { config } = useConfig();
  const [stats, setStats] = useState({
    daysSinceQuitting: 0,
    moneySaved: 0,
    cigarettesNotSmoked: 0,
    daysOfLifeGained: 0,
  });

  useEffect(() => {
    if (config.quitDate) {
      setStats(calculateStats(config));
    }
  }, [config]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/money-saved"
            className="transition-transform hover:scale-105"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{t("moneySaved")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  €{stats.moneySaved.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link
            href="/not-smoked"
            className="transition-transform hover:scale-105"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{t("cigarettesNotSmoked")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.cigarettesNotSmoked}
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link
            href="/life-gained"
            className="transition-transform hover:scale-105"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{t("daysOfLifeGained")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.daysOfLifeGained.toFixed(1)}
                </p>
              </CardContent>
            </Card>
          </Link>
          <Card className="h-full transition-transform hover:scale-105">
            <CardHeader>
              <CardTitle>{t("daysSinceQuitting")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.daysSinceQuitting}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
