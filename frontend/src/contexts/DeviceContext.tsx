import React from "react";

interface DeviceContextType {
  selectedDevice: string;
  setSelectedDevice: React.Dispatch<React.SetStateAction<string>>;
}

export const DeviceContext = React.createContext<DeviceContextType | null>(null);