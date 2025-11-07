import { BarChart, Skeleton } from "@toss/tds-mobile";
import type { Variant } from "../components/CaseTrack/constants";

interface Props {
  variants?: Variant[];
}

export function ProgressBarChart({ variants }: Props) {
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

  // Prepare chart data
  const chartData = Object.entries(countsByCategory).map(
    ([category, stats]) => {
      const percentage = Math.round((stats.completed / stats.total) * 100);
      return {
        maxValue: 1,
        value: stats.completed / stats.total,
        barAnnotation: `${percentage === 100 ? "완료" : `${percentage}%`}`,
        label: category,
      };
    }
  );

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
