import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import {
  Top,
  FixedBottomCTA,
  useToast,
  Button,
  // Menu,
} from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";
import { Spacing } from "@toss/emotion-utils";

import { requestWithToken } from "../api";

// Component imports
import { AccessoryVariant } from "../components/CaseTrack/AccessoryVariant";
import { DeviceSelect } from "../components/CaseTrack/DeviceSelect";
import { BrightnessTab } from "../components/CaseTrack/BrightnessTab";

// Constants, Type, Interface imports
import type { Case, BrightnessLevel } from "../components/CaseTrack/constants";
import { BrightnessLevelDisplay } from "../components/CaseTrack/constants";

export const Route = createFileRoute()({
  component: CaseTrack,
});

// TODO: 완료한 케이스 보기 또는 보지 않기 추가?
export function CaseTrack() {
  const navigate = useNavigate();

  const { caseID } = Route.useParams();
  const { openToast } = useToast();

  // State of current Case
  const [caseData, setCaseData] = useState<Case>();

  // State of components
  const [tabState, setTabState] = useState(BrightnessLevelDisplay.HIGH);
  const [selectedDevice, setSelectedDevice] = useState("");

  // onChange, onClick functions
  const onTabStateChange = (value: string) => {
    setTabState(value);
  };

  const onClickingAccessoryVariant = async (id: number) => {
    const selectedVariant = caseData?.variants
      ?.filter((variant) => variant.id === id)
      .at(0);

    if (selectedVariant === undefined) {
      openToast(
        "알 수 없는 문제가 발생했어요. 스크린샷을 관리자에게 공유해주세요.",
        {
          type: "top",
          lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
        }
      );
      return;
    }

    const isVariantDone = selectedVariant.completed;

    try {
      selectedVariant.isLoading = true;
      if (isVariantDone) {
        await deleteVariantDone(id);
      } else {
        await postVariantDone(id);
      }
    } catch (error) {
      openToast(
        "진행상황을 저장하는 중에 문제가 생겼어요. 스크린샷을 관리자에게 공유해주세요." +
          `${error}`,
        {
          type: "top",
          lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
        }
      );
    } finally {
      selectedVariant.isLoading = false;
    }

    getCaseInfo();
  };

  // 여기부터
  const allDevices = caseData?.variants?.map(
    (variant) => variant.target_device_category
  );
  const targetDevices = [...new Set(allDevices)];

  const variantsWithSelectedDevice = caseData?.variants?.filter(
    (variant) => variant.target_device_category === selectedDevice
  );

  const finalAccessoryVariants = variantsWithSelectedDevice?.filter(
    (variant) =>
      BrightnessLevelDisplay[variant.brightness as BrightnessLevel] === tabState
  );

  // 여기까지 정리하기.

  useEffect(() => {
    getCaseInfo();
  }, []);

  // API handling
  const getCaseInfo = () => {
    requestWithToken(`api/cases/view/${caseID}/`, "GET")
      .then((data) => setCaseData(data))
      .catch((error) => {
        openToast("진행상황을 불러오지 못했어요.", {
          type: "top",
          lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
        });
        if (error === "Refresh token expired") {
          navigate({ to: "/Login" });
        }
      });
  };

  const postVariantDone = async (id: number) => {
    requestWithToken(`api/variants/completion-status/${id}/`, "POST").catch(
      (error) => {
        openToast("저장하지 못했어요.", {
          type: "top",
          lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
        });

        if (error === "Refresh token expired") {
          navigate({ to: "/Login" });
        }
      }
    );
  };

  const deleteVariantDone = async (id: number) => {
    requestWithToken(`api/variants/completion-status/${id}/`, "DELETE").catch(
      (error) => {
        openToast("삭제하지 못했어요.", {
          type: "top",
          lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
        });

        if (error === "Refresh token expired") {
          navigate({ to: "/Login" });
        }
      }
    );
  };

  return (
    <>
      <Top
        title={
          <Top.TitleParagraph size={22} color={adaptive.grey900}>
            {caseData?.name}
          </Top.TitleParagraph>
        }
        subtitleTop={
          <Top.SubtitleTextButton>
            {" "}
            설명 보기 (아직 구현 X){" "}
          </Top.SubtitleTextButton>
        }
        lower={
          <DeviceSelect devices={targetDevices} onCheck={setSelectedDevice} />
        }
      />
      <div>
        <BrightnessTab
          tabState={tabState}
          onTabStateChange={onTabStateChange}
        />
      </div>
      <Spacing size={14} />
      <>
        <AccessoryVariant
          variants={finalAccessoryVariants}
          onClick={onClickingAccessoryVariant}
        />
      </>
      <FixedBottomCTA.Double
        leftButton={
          <Button color="dark" variant="weak" display="block" disabled={true}>
            닫기
          </Button>
        }
        rightButton={
          <Button display="block" disabled={true}>
            확인했어요
          </Button>
        }
      />
    </>
  );
}
