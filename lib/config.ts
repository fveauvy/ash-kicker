export interface Config {
  cigarettesPerDay: number;
  pricePerPack: number;
  cigarettesPerPack: number;
  minutesOfLifePerCigarette: number;
  quitDate: string;
}

export const defaultConfig: Config = {
  cigarettesPerDay: 8,
  pricePerPack: 10,
  cigarettesPerPack: 20,
  minutesOfLifePerCigarette: 11,
  quitDate: "",
};
