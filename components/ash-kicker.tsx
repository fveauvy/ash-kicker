"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useConfig } from "@/contexts/config-context";
import { calculateStats } from "@/lib/calculations";
import { Calendar, Cigarette, EuroIcon, Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";

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
            href="/days-since-quitting"
            className="transition-transform hover:scale-105"
          >
            <Card className="h-full transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2" />
                  {t("daysSinceQuitting")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {stats.daysSinceQuitting}
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link
            href="/money-saved"
            className="transition-transform hover:scale-105"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <EuroIcon className="mr-2" />
                  {t("moneySaved")}
                </CardTitle>{" "}
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {formatPrice(stats.moneySaved)}
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
                <CardTitle className="flex items-center">
                  <Cigarette className="mr-2" />
                  {t("cigarettesNotSmoked")}
                </CardTitle>{" "}
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
                <CardTitle className="flex items-center">
                  <Heart className="mr-2" />
                  {t("daysOfLifeGained")}
                </CardTitle>{" "}
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.daysOfLifeGained.toFixed(1)}
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
