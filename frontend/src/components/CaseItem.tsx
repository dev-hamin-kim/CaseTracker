import { useNavigate } from "@tanstack/react-router";
import { ListRow, Asset, Button } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";

interface Props {
  id: number;
  name: string;
  description: string;
}

export function CaseItem({ id, name, description }: Props) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate({ to: "/CaseTrack/$caseID", params: { caseID: id } });
  };

  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="2RowTypeA"
          top={name}
          topProps={{ color: adaptive.grey700, fontWeight: "bold" }}
          bottom={description}
          bottomProps={{ color: adaptive.grey600 }}
        />
      }
      verticalPadding="large"
      horizontalPadding="medium"
      left={
        // 나중에 여기다 Lottie 아이콘 사용하여 케이스 진행도 표시하면 좋을듯
        // TDS Mobile 문서 https://tossmini-docs.toss.im/tds-mobile/components/ListRow/list-row-components/
        // 컴포넌트/ListRow/ListRow 영역 구성하기 참고
        <Asset.Image
          src={getIconURL({ name })}
          frameShape={Asset.frameShape.CircleSmall}
        />
      }
      right={
        <Button size="small" variant="weak" onClick={onClick}>
          보기
        </Button>
      }
    />
  );
}

interface IconURLProps {
  name: string;
}

function getIconURL({ name }: IconURLProps) {
  const baseURL = "https://static.toss.im/";
  const prefix = name.substring(0, name.indexOf("_"));

  const urlList = new Map<string, string>([
    ["정상", "icons/png/4x/icon-simplicity-emoji-smile.png"],
    ["2D", "2d-emojis/png/4x/u1F3AD.png"],
    ["3D", "2d-emojis/png/4x/u1F47A.png"],
    ["디스플레이", "icons/png/4x/icon-it.png"],
  ]);

  const iconURL = urlList.get(prefix) || "icons/png/4x/icon-warning-circle.png";

  return baseURL + iconURL;
}
