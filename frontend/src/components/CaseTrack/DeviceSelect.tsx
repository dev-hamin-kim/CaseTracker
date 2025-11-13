import React from "react";
import { BottomSheet, Button } from "@toss/tds-mobile";

interface Props {
  devices: string[];
  onCheck: (checked: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function DeviceSelect({ devices, onCheck, isOpen, onClose }: Props) {
  const [checked, setChecked] = React.useState<string | null>(null);

  return (
    <>
      <BottomSheet
        open={isOpen}
        // onClose={onClose}
        header={
          <BottomSheet.Header>디바이스를 선택해주세요.</BottomSheet.Header>
        }
        cta={
          <BottomSheet.DoubleCTA
            leftButton={
              <Button variant="weak" color="danger" onClick={() => onCheck("")}>
                선택 해제하기
              </Button>
            }
            rightButton={
              <Button variant="weak" color="dark" onClick={onClose}>
                닫기
              </Button>
            }
          ></BottomSheet.DoubleCTA>
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
