import { useEffect, useState } from "react";

import { Asset, Top, FixedBottomCTA, Button } from "@toss/tds-mobile";
import { Spacing } from "@toss/emotion-utils";
import { adaptive } from "@toss/tds-colors";
import { useNavigate } from "@tanstack/react-router";

import { requestWithToken } from "../api";
import { getFlavorText } from "../components/FlavorText";

export function CheckIn() {
  const [username, setUsername] = useState("사용자");
  const [completedCases, setCompletedCases] = useState(0);

  const navigate = useNavigate();

  const getUsername = async () => {
    requestWithToken("user/fullname/", "GET").then((data) =>
      setUsername(data.fullname as string)
    );
  };

  const getCompletedCount = async () => {
    requestWithToken("user/completion/daily/", "GET").then((data) =>
      setCompletedCases(data.count as number)
    );
  };

  useEffect(() => {
    getUsername();
    getCompletedCount();
  }, []);

  const easterEggText = getFlavorText(completedCases);
  return (
    <>
      <Spacing size={14} />
      <Top
        title={
          <Top.TitleParagraph size={22} color={adaptive.grey900}>
            {username}님 안녕하세요,
          </Top.TitleParagraph>
        }
        subtitleBottom={
          <>
          <Top.SubtitleParagraph>
            {
              
            completedCases > 0
              ? `오늘 완료한 케이스는 ${completedCases}개예요.`
              : "오늘 하루도 화이팅이에요!"}
          </Top.SubtitleParagraph>
          <Top.SubtitleParagraph size={13} color={adaptive.grey300}>{easterEggText}</Top.SubtitleParagraph>
          </>
        }
      />
      <Spacing size={98} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Asset.Image
          frameShape={{ width: 200 }}
          src="https://static.toss.im/2d-emojis/png/4x/u1FAB4.png"
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
            disabled={false}
            onTap={() => {
              navigate({ to: "/MyPage" });
            }}
          >
            내 정보 관리
          </Button>
        }
        hasSafeAreaPadding={true}
      />
    </>
  );
}
