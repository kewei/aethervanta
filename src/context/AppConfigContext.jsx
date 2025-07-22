import { createContext, useContext, useState } from "react";

const AppConfigContext = createContext();

export const AppConfigProvider = ({ children }) => {
  const [selectedConstellations, setSelectedConstellations] = useState([
    "GPS", "Galileo", "BeiDou", "GLONASS"
  ]);

  const [sdrConfig, setSdrConfig] = useState({
    device: null,
    frequency: 1575.42e6, // L1 by default
    sampleRate: 2e6,
    gain: 20,
  });

  return (
    <AppConfigContext.Provider
      value={{
        selectedConstellations,
        setSelectedConstellations,
        sdrConfig,
        setSdrConfig,
      }}
    >
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => useContext(AppConfigContext);
