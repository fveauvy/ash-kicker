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
