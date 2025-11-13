import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { DeviceProvider } from "../contexts/DeviceProvider";

export function AppRouterProvider() {
  return (
    <DeviceProvider>
      <RouterProvider router={router} />;
    </DeviceProvider>
  );
}
