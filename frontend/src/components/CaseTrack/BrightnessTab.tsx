import { SegmentedControl } from "@toss/tds-mobile";

import { BrightnessLevelDisplay } from "./constants";

interface Props {
  tabState: string;
  onTabStateChange: (tabName: string) => void;
}

export function BrightnessTab({ tabState, onTabStateChange }: Props) {
  // first, second, third는 탭의 순서를 뜻합니다.
  // 즉, 내용물의 순서를 조정하면 저절로 UI에 반영되는 구조입니다.
  const [first, second, third] = [
    BrightnessLevelDisplay.LOW,
    BrightnessLevelDisplay.MEDIUM,
    BrightnessLevelDisplay.HIGH,
  ];

  return (
    <SegmentedControl value={tabState} onChange={onTabStateChange}>
      <SegmentedControl.Item value={first}>{first}</SegmentedControl.Item>
      <SegmentedControl.Item value={second}>{second}</SegmentedControl.Item>
      <SegmentedControl.Item value={third}>{third}</SegmentedControl.Item>
    </SegmentedControl>
  );
}
