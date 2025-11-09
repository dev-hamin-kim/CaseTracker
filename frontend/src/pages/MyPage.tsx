import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import {
  Top,
  Asset,
  FixedBottomCTA,
  GridList,
  Button,
  BottomSheet,
  Post,
  useToast,
} from "@toss/tds-mobile";
import { Storage } from "@apps-in-toss/web-framework";
import { Spacing } from "@toss/emotion-utils";

export function MyPage() {
  const navigate = useNavigate();
  const { openToast } = useToast();

  const [isOpen, setIsOpen] = useState(false);

  const onTappingBottomCTA = () => {
    navigate({ to: "/CheckIn" });
  };

  const onClickingLogout = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Top
        title={<Top.TitleParagraph>내 정보 관리하기</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph>
            아직 공사중이니 조심하세요!
          </Top.SubtitleParagraph>
        }
      ></Top>

      <Spacing size={98} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Asset.Image
          frameShape={{ width: 200 }}
          src="https://static.toss.im/2d-emojis/png/4x/u1F6A7.png"
          aria-hidden={true}
        />
      </div>
      <Spacing size={48} />
      <GridList column={3}>
        <GridList.Item
          image={
            <img
              src="https://static.toss.im/icons/png/4x/icon-out-solid-mono.png"
              style={{
                width: `24px`,
                height: `24px`,
              }}
            />
          }
          onClick={onClickingLogout}
        >
          로그아웃
        </GridList.Item>
        <GridList.Item
          image={
            <img
              src="https://static.toss.im/icons/png/4x/icon-security-masking-star-mono.png"
              style={{
                width: `24px`,
                height: `24px`,
              }}
            />
          }
          onClick={() => {
            openToast("아직 구현되지 않았어요. 관리자에게 문의해주세요.", {
              type: "bottom",
              lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
              higherThanCTA: true,
            });
          }}
        >
          비밀번호 변경
        </GridList.Item>
      </GridList>
      <FixedBottomCTA
        color="dark"
        variant="weak"
        display="block"
        onTap={onTappingBottomCTA}
      >
        돌아가기
      </FixedBottomCTA>

      <LogoutCTA
        isOpen={isOpen}
        onClickingGoBack={() => {
          setIsOpen(false);
        }}
        onClickingLogout={async () => {
          await Storage.removeItem("access");
          await Storage.removeItem("refresh");
          navigate({ to: "/" });
        }}
      />
    </>
  );
}

interface LogoutCTAProps {
  isOpen: boolean;
  onClickingLogout: () => void;
  onClickingGoBack: () => void;
}
function LogoutCTA({
  isOpen,
  onClickingGoBack,
  onClickingLogout,
}: LogoutCTAProps) {
  return (
    <div style={{ padding: 16 }}>
      <BottomSheet
        open={isOpen}
        header={
          <BottomSheet.Header>정말 로그아웃 하시겠어요?</BottomSheet.Header>
        }
        cta={
          // @here
          <BottomSheet.DoubleCTA
            leftButton={
              <Button variant="weak" color="dark" onClick={onClickingGoBack}>
                돌아가기
              </Button>
            }
            rightButton={
              <Button color="danger" onClick={onClickingLogout}>
                로그아웃하기
              </Button>
            }
          />
        }
      >
        <Post.Paragraph>진짜요?</Post.Paragraph>
      </BottomSheet>
    </div>
  );
}
