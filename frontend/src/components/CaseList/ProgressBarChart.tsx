import { BarChart, Skeleton } from "@toss/tds-mobile";
import type { Variant } from "../CaseTrack/constants";
import { BrightnessLevelDisplay } from "../CaseTrack/constants";

interface Props {
  variants?: Variant[];
  selectedDevice?: string;
}

export function ProgressBarChart({ variants, selectedDevice }: Props) {
  if (!variants?.length) {
    return <Skeleton pattern="listOnly" />;
  }

  // Group and count
  const countsByCategory = variants.reduce<
    Record<string, { completed: number; total: number }>
  >((acc, variant) => {
    const category = variant.target_device_category;
    if (!acc[category]) acc[category] = { completed: 0, total: 0 };
    acc[category].total += 1;
    if (variant.completed) acc[category].completed += 1;
    return acc;
  }, {});

  const countsByBrightness = variants
    .filter((value: Variant) => value.target_device_category === selectedDevice)
    .reduce<Record<string, { completed: number; total: number }>>(
      (acc, variant) => {
        const category = variant.brightness;
        if (!acc[category]) acc[category] = { completed: 0, total: 0 };
        acc[category].total += 1;
        if (variant.completed) acc[category].completed += 1;
        return acc;
      },
      {}
    );

  // Prepare chart data
  const brightnessOrder = ["LOW", "MEDIUM", "HIGH"];
  const entries = Object.entries(
    selectedDevice ? countsByBrightness : countsByCategory
  );

  if (selectedDevice) {
    entries.sort(
      ([a], [b]) => brightnessOrder.indexOf(a) - brightnessOrder.indexOf(b)
    );
  }

  const chartData = entries.map(([category, stats]) => {
    const displayLabel =
      selectedDevice &&
      BrightnessLevelDisplay[category as keyof typeof BrightnessLevelDisplay]
        ? BrightnessLevelDisplay[
            category as keyof typeof BrightnessLevelDisplay
          ]
        : category;
    const percentage = Math.round((stats.completed / stats.total) * 100);
    return {
      maxValue: 1,
      value: stats.completed / stats.total,
      barAnnotation: `${percentage === 100 ? "완료" : `${percentage}%`}`,
      label: displayLabel,
    };
  });

  return (
    <BarChart
      data={chartData}
      fill={{
        type: "all-bar",
        // barIndex: 0,
        theme: "blue",
      }}
    />
  );
}
