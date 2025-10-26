export interface Case {
  id: number;
  name: string;
  description: string;
  added_by: string | null;
  created_at: string;
  backlight: boolean;
  is_shown: boolean;
  variants: [Variant];
}

export interface Variant {
  id: number;
  brightness: string;
  collection_time: string;
  target_device_category: string;
  accessory: string;
  completed: boolean;
}

export type BrightnessLevel = "LOW" | "MEDIUM" | "HIGH";

export const BrightnessLevelDisplay: Record<BrightnessLevel, string> = {
  LOW: "낮음",
  MEDIUM: "중간",
  HIGH: "높음",
};

