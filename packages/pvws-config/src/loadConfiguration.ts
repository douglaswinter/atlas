import { type CsWebLibConfig } from "@diamondlightsource/cs-web-lib";
import { useEffect, useState } from "react";

const configFile = "/pvwsconfig.json";
const defaultConfig = {
  PVWS_SOCKET: "pvws.diamond.ac.uk",
  PVWS_SSL: true,
  THROTTLE_PERIOD: 100,
};

export const loadPvwsConfig = async (): Promise<CsWebLibConfig> => {
  let config;
  if (config) {
    return config;
  }
  try {
    // Point towards your file location
    const response = await fetch(configFile);
    config = await response.json();
  } catch (error) {
    console.warn("Configuration not found falling back to defaults", error);
    // Set defaults here if necessary
    config = defaultConfig;
  }

  return config as CsWebLibConfig;
};

export const useLoadPvwsConfig = () => {
  const [config, setConfig] = useState<CsWebLibConfig>();
  useEffect(() => {
    loadPvwsConfig().then((config) => {
      setConfig(config);
    });
  }, []);
  return config;
};
