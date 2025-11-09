import { useEffect, useState } from "react";

import { Asset, Top, FixedBottomCTA, Button } from "@toss/tds-mobile";
import { Spacing } from "@toss/emotion-utils";
import { adaptive } from "@toss/tds-colors";
import { useNavigate } from "@tanstack/react-router";

import { requestWithToken } from "../api";

export function CheckIn() {
  const [username, setUsername] = useState("사용자");

  const navigate = useNavigate();

  const getUsername = async () => {
    requestWithToken("api/user/fullname/", "GET")
    .then((data) => setUsername(data.fullname as string))
  };

  useEffect(() => {
    getUsername()
  }, []);

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
          <Top.SubtitleParagraph>
            오늘 하루도 화이팅이에요!
          </Top.SubtitleParagraph>
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
