import { useState } from "react";
import { Asset, GridList, Skeleton } from "@toss/tds-mobile";
import { colors } from "@toss/tds-colors";
import type { Variant } from "../pages/CaseTrack";

interface Props {
  variants: [Variant];
  onClick: (id: number) => void;
}

type Accessories = "NONE" | "GLASSES" | "HAT" | "MASK";

const AccessoryDisplay: Record<Accessories, string> = {
  NONE: "없음",
  GLASSES: "안경",
  HAT: "모자",
  MASK: "마스크",
};

export function AccessoryVariant({ variants, onClick }: Props) {
  const [selectedID, setSelectedID] = useState<number | null>(null);

  if (!variants?.length) {
    return <Skeleton pattern="listOnly" />;
  }

  const handleClick = (id: number) => {
    if (selectedID === null) {
      setSelectedID(id);
    } else {
      setSelectedID(null);
    }
    onClick(id);
  };

  return (
    <>
      <GridList column={2}>
        {variants.map((item) => {
          const isCompleted = item.completed;

          return (
            <GridList.Item
              key={item.id}
              image={<AccessoryIcon item={item.accessory} />}
              onClick={() => {
                handleClick(item.id);
              }}
              style={{
                backgroundColor: isCompleted
                  ? colors.blue200
                  : colors.background,
                borderColor: isCompleted ? colors.blue300 : colors.background,
                borderRadius: 8,
                transition: "background-color 0.2s ease",
              }}
            >
              {AccessoryDisplay[item.accessory as Accessories]}
            </GridList.Item>
          );
        })}
      </GridList>
    </>
  );
}

function AccessoryIcon({ item }: { item: string }) {
  let iconName = "";

  if (item === "HAT") {
    return (
      <Asset.Image
        frameShape={Asset.frameShape.CleanW24}
        backgroundColor="clear"
        src="https://static.toss.im/2d-emojis/png/4x/u1F3A9.png"
        aria-hidden={true}
        style={{ aspectRatio: "1/1" }}
      />
    );
  }

  if (item.match("NONE")) {
    iconName = "icon-emoji";
  } else if (item.match("GLASSES")) {
    iconName = "icon-glasses";
  } else if (item.match("MASK")) {
    iconName = "icon-mask";
  }

  return (
    <Asset.Icon
      frameShape={Asset.frameShape.CleanW24}
      backgroundColor="transparent"
      name={iconName}
      aria-hidden={true}
      ratio="1/1"
    />
  );
}
