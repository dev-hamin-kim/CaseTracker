import React from "react";
import { Top, Menu } from "@toss/tds-mobile";

interface Props {
    list: string[]
    onCheck: (checked: string) => void
}

export function DeviceSelect( { list, onCheck }: Props) {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState("");
  return (
    <Menu.Trigger
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      placement="right-end"
      dropdown={
        <Menu.Dropdown header={<Menu.Header>테스트할 기기</Menu.Header>}>
          {list.map((device) => (
            // 나중에 이거 여백 좀 어떻게 해야 좀 덜 어색할듯
            <Menu.DropdownCheckItem
              checked={checked === device}
              onCheckedChange={(isChecked: boolean) => {
                if (isChecked) {
                  setChecked(device);
                  onCheck(device);
                }
              }}
            >
              {device}
            </Menu.DropdownCheckItem>
          ))}
        </Menu.Dropdown>
      }
    >
      <Top.LowerButton>
        {checked ? `${checked} 사용 중` : "기기를 선택하세요"}
      </Top.LowerButton>
    </Menu.Trigger>
  );
}
