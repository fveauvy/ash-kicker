import { Config } from "@/lib/config";
import { differenceInDays } from "date-fns";

interface Stats {
  daysSinceQuitting: number;
  moneySaved: number;
  cigarettesNotSmoked: number;
  daysOfLifeGained: number;
}

export function calculateStats(config: Config): Stats {
  const now = new Date();
  const quitDate = new Date(config.quitDate);
  const daysSinceQuitting = differenceInDays(now, quitDate);

  const cigarettesNotSmoked = daysSinceQuitting * config.cigarettesPerDay;
  const moneySaved =
    (cigarettesNotSmoked / config.cigarettesPerPack) * config.pricePerPack;
  const minutesOfLifeGained =
    cigarettesNotSmoked * config.minutesOfLifePerCigarette;
  const daysOfLifeGained = minutesOfLifeGained / (24 * 60);

  return {
    daysSinceQuitting,
    moneySaved,
    cigarettesNotSmoked,
    daysOfLifeGained,
  };
}

interface DetailedStats {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  total: number;
}

export function calculateDetailedMoneySaved(config: Config): DetailedStats {
  const now = new Date();
  const quitDate = new Date(config.quitDate);
  const daysSinceQuitting = differenceInDays(now, quitDate);

  const dailyCost =
    (config.cigarettesPerDay / config.cigarettesPerPack) * config.pricePerPack;

  const daily = dailyCost;
  const weekly = daily * 7;
  const monthly = daily * 30; // Approximation
  const yearly = daily * 365;
  const total = dailyCost * daysSinceQuitting;

  return {
    daily,
    weekly,
    monthly,
    yearly,
    total,
  };
}

export function calculateDetailedCigarettesNotSmoked(
  config: Config
): DetailedStats {
  const now = new Date();
  const quitDate = new Date(config.quitDate);
  const daysSinceQuitting = differenceInDays(now, quitDate);

  const daily = config.cigarettesPerDay;
  const weekly = daily * 7;
  const monthly = daily * 30; // Approximation
  const yearly = daily * 365;
  const total = daily * daysSinceQuitting;

  return {
    daily,
    weekly,
    monthly,
    yearly,
    total,
  };
}

export function calculateDetailedLifeGained(config: Config): DetailedStats {
  const now = new Date();
  const quitDate = new Date(config.quitDate);
  const daysSinceQuitting = differenceInDays(now, quitDate);

  const dailyMinutes =
    config.cigarettesPerDay * config.minutesOfLifePerCigarette;
  const daily = dailyMinutes;
  const weekly = (dailyMinutes * 7) / 60; // Convert minutes to hours
  const monthly = (dailyMinutes / 60) * 30; // Approximation
  const yearly = (dailyMinutes / (24 * 60)) * 365;
  const total = (dailyMinutes * daysSinceQuitting) / (24 * 60);

  return {
    daily,
    weekly,
    monthly,
    yearly,
    total,
  };
}

export function calculateTimeSinceQuitting(quitDate: string) {
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

export function calculateEnvironmentalImpact(cigarettesNotSmoked: number) {
  const waterPolluted = cigarettesNotSmoked * 3.7; // liters
  const co2Contribution = (cigarettesNotSmoked * 14) / 1000; // kg

  return { waterPolluted, co2Contribution };
}
