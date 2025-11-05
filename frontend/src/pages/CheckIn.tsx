import {
  Asset,
  Top,
  FixedBottomCTA,
  Button,
} from "@toss/tds-mobile";
import { Spacing } from "@toss/emotion-utils";
import { adaptive } from "@toss/tds-colors";
import { useNavigate } from "@tanstack/react-router";

export function CheckIn() {
  const navigate = useNavigate();

  return (
    <>
      <Spacing size={14} />
      <Top
        title={
          <Top.TitleParagraph size={22} color={adaptive.grey900}>
            아직 한창 공사중이에요.
          </Top.TitleParagraph>
        }
        subtitleBottom={
          <Top.SubtitleParagraph>
            아래의 "케이스 목록 보기" 기능만 정상 작동해요.
          </Top.SubtitleParagraph>
        }
      />
      <Spacing size={98} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Asset.Image
          frameShape={{ width: 200 }}
          src="https://static.toss.im/2d-emojis/png/4x/u1F6A7.png"
          aria-hidden={true}
        />
      </div>
      <FixedBottomCTA.Double
        rightButton={
          <Button
            color="primary"
            onTap={() => {
              navigate({ to: "/CaseList" });
            }}
          >
            케이스 목록 보기
          </Button>
        }
        leftButton={
          <Button
            variant="weak"
            onTap={() => {
              navigate({ to: "/CreateCase" });
            }}
          >
            케이스 추가하기
          </Button>
        }
        hasSafeAreaPadding={true}
      />
    </>
  );
}
