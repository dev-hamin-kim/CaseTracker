import { Top, Asset, FixedBottomCTA, useToast } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";
import { Spacing } from "@toss/emotion-utils";
import { useNavigate } from "@tanstack/react-router";
import { isRefreshTokenValid } from "../api";
import { useState } from "react";

export function Intro() {
  const navigate = useNavigate();
  const { openToast } = useToast();
  const [isCheckingToken, setIsCheckingToken] = useState(false);
  let isTokenValid = false

  const onTappingBottomCTA = async () => {
    await verifyToken();

    navigate({ to: isTokenValid ? "/Checkin" : "/Login" });
  };

  const verifyToken = async () => {
    setIsCheckingToken(true);
    try {
      const asdf = await isRefreshTokenValid() ?? false

      isTokenValid = asdf
    } catch (error) {
      openToast(
        "문제가 생겼어요. 스크린샷을 관리자에게 공유해주세요." + `${error}`,
        {
          type: "top",
          lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
        }
      );
    } finally {
      setIsCheckingToken(false);
    }
  };

  return (
    <>
      <Spacing size={14} />
      <Top
        title={
          <Top.TitleParagraph size={22} color={adaptive.grey900}>
            케이스 진행도를 더 쉽게 파악해요.
          </Top.TitleParagraph>
        }
        subtitleBottom={
          <Top.SubtitleParagraph>
            업무를 보다 쉽게 파악해요.
          </Top.SubtitleParagraph>
        }
      />
      <Spacing size={98} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Asset.Image
          frameShape={{ width: 200 }}
          src="https://static.toss.im/icons/png/4x/menu-list.png"
          aria-hidden={true}
        />
      </div>
      <FixedBottomCTA onTap={onTappingBottomCTA} loading={isCheckingToken}>
        시작하기
      </FixedBottomCTA>
    </>
  );
}
