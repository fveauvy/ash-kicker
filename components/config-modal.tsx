"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Config } from "./ash-kicker";

interface ConfigModalProps {
  config: Config;
  onConfigChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ConfigModal({ config, onConfigChange }: ConfigModalProps) {
  return (
    <DialogContent className="bg-background border-border">
      <DialogHeader>
        <DialogTitle>Configuration</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="cigarettesPerDay" className="text-right">
            Cigarettes per day
          </Label>
          <Input
            id="cigarettesPerDay"
            name="cigarettesPerDay"
            type="number"
            value={config.cigarettesPerDay}
            onChange={onConfigChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="pricePerPack" className="text-right">
            Price per pack (€)
          </Label>
          <Input
            id="pricePerPack"
            name="pricePerPack"
            type="number"
            value={config.pricePerPack}
            onChange={onConfigChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="cigarettesPerPack" className="text-right">
            Cigarettes per pack
          </Label>
          <Input
            id="cigarettesPerPack"
            name="cigarettesPerPack"
            type="number"
            value={config.cigarettesPerPack}
            onChange={onConfigChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="minutesOfLifePerCigarette" className="text-right">
            Minutes of life per cigarette
          </Label>
          <Input
            id="minutesOfLifePerCigarette"
            name="minutesOfLifePerCigarette"
            type="number"
            value={config.minutesOfLifePerCigarette}
            onChange={onConfigChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quitDate" className="text-right">
            Quit Date
          </Label>
          <Input
            id="quitDate"
            name="quitDate"
            type="date"
            value={config.quitDate}
            onChange={onConfigChange}
            className="col-span-3"
          />
        </div>
      </div>
    </DialogContent>
  );
}
