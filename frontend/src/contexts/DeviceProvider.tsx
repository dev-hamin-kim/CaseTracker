import React from "react";
import { DeviceContext } from "./DeviceContext";

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [selectedDevice, setSelectedDevice] = React.useState<string>("");

  return (
    <DeviceContext.Provider value={{ selectedDevice, setSelectedDevice }}>
      {children}
    </DeviceContext.Provider>
  );
}
