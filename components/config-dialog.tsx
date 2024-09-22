"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RocketIcon, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { useConfig } from "@/contexts/config-context";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ConfigDialog() {
  const t = useTranslations("Config");
  const { config, updateConfig } = useConfig();
  const [localConfig, setLocalConfig] = useState(config);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalConfig((prev) => ({
      ...prev,
      [name]: name === "quitDate" ? value : Number(value),
    }));
  };

  const handleSave = () => {
    updateConfig(localConfig);
    setOpen(false);
    toast({
      title: t("settingsSaved"),
      description: t("settingsSavedDescription"),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background border-border">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>{t("quitDateCallout")}</AlertDescription>
          </Alert>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quitDate" className="text-right">
              {t("quitDate")}
            </Label>
            <Input
              id="quitDate"
              name="quitDate"
              type="date"
              value={localConfig.quitDate}
              onChange={handleConfigChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cigarettesPerDay" className="text-right">
              {t("cigarettesPerDay")}
            </Label>
            <Input
              id="cigarettesPerDay"
              name="cigarettesPerDay"
              type="number"
              value={localConfig.cigarettesPerDay}
              onChange={handleConfigChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pricePerPack" className="text-right">
              {t("pricePerPack")}
            </Label>
            <div className="col-span-3 relative">
              <Input
                id="pricePerPack"
                name="pricePerPack"
                type="number"
                value={localConfig.pricePerPack}
                onChange={handleConfigChange}
                className="pl-6"
              />
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                €
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cigarettesPerPack" className="text-right">
              {t("cigarettesPerPack")}
            </Label>
            <Input
              id="cigarettesPerPack"
              name="cigarettesPerPack"
              type="number"
              value={localConfig.cigarettesPerPack}
              onChange={handleConfigChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minutesOfLifePerCigarette" className="text-right">
              {t("minutesOfLifePerCigarette")}
            </Label>
            <Input
              id="minutesOfLifePerCigarette"
              name="minutesOfLifePerCigarette"
              type="number"
              value={localConfig.minutesOfLifePerCigarette}
              onChange={handleConfigChange}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-start-2 col-span-3">
              <a
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1117323/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {t("learnMore")}
              </a>
            </div>
          </div>
        </div>
        <Button onClick={handleSave}>{t("save")}</Button>
      </DialogContent>
    </Dialog>
  );
}
