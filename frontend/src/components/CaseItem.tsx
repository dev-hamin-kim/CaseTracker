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
          src="https://static.toss.im/icons/png/4x/icon-plant-fill.png"
          frameShape={Asset.frameShape.CircleSmall}
        />
      }
      right={
        <Button size="small" onClick={onClick}>
            보기
      </Button>
      }
    />
  );
}
