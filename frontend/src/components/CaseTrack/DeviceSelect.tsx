import React from "react";
import { BottomSheet } from "@toss/tds-mobile";

interface Props {
  devices: string[];
  onCheck: (checked: string) => void;
  isOpen: boolean;
}

export function DeviceSelect({ devices, onCheck, isOpen }: Props) {
  const [checked, setChecked] = React.useState<string | null>(null);

  return (
    <>
      <BottomSheet
        open={isOpen}
        header={
          <BottomSheet.Header>테스트할 기기를 선택해주세요.</BottomSheet.Header>
        }
      >
        <BottomSheet.Select
          value={checked ?? undefined}
          onChange={(e) => {
            const selected = e.target.value;
            setChecked(selected);
            onCheck(selected);
          }}
          options={devices.map((device) => ({
            name: device,
            value: device,
          }))}
        />
      </BottomSheet>
    </>
  );
}
