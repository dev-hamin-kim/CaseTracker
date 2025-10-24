import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import {
  Top,
  FixedBottomCTA,
  CTAButton,
  SegmentedControl,
  useToast,
  Menu,
} from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";
import { Spacing } from "@toss/emotion-utils";

import api from "../api";
import { AccessoryVariant } from "../components/AccessoryVariant";
import { DeviceSelect } from "../components/DeviceSelect";

export const Route = createFileRoute()({
  component: CaseTrack,
});

interface Case {
  id: number;
  name: string;
  description: string;
  added_by: string | null;
  created_at: string;
  backlight: boolean;
  is_shown: boolean;
  variants: [Variant];
}

export interface Variant {
  id: number;
  brightness: string;
  collection_time: string;
  target_device_category: string;
  accessory: string;
  completed: boolean;
}

type BrightnessLevel = "LOW" | "MEDIUM" | "HIGH";

const BrightnessLevelDisplay: Record<BrightnessLevel, string> = {
  LOW: "낮음",
  MEDIUM: "중간",
  HIGH: "높음",
};

// TODO: 완료한 케이스 보기 또는 보지 않기 추가?
export function CaseTrack() {
  const { caseID } = Route.useParams();
  const { openToast } = useToast();

  const [caseData, setCaseData] = useState<Case>();
  const [selectedDevice, setSelectedDevice] = useState("");

  // first, second, third는 탭의 순서를 뜻합니다.
  // 즉, 내용물의 순서를 조정하면 저절로 UI에 반영되는 구조입니다.
  const [first, second, third] = [
    BrightnessLevelDisplay.LOW,
    BrightnessLevelDisplay.MEDIUM,
    BrightnessLevelDisplay.HIGH,
  ];

  const [tabState, setTabState] = useState(BrightnessLevelDisplay.HIGH);

  const allDevices = caseData?.variants.map(
    (variant) => variant.target_device_category
  );
  const targetDevices = [...new Set(allDevices)];

  const variantsWithSelectedDevice = caseData?.variants.filter(
    (variant) => variant.target_device_category === selectedDevice
  );

  const finalAccessoryVariants = variantsWithSelectedDevice?.filter(
    (variant) =>
      BrightnessLevelDisplay[variant.brightness as BrightnessLevel] === tabState
  );

  const onTabStateChange = (value: string) => {
    setTabState(value);
  };

  useEffect(() => {
    getCaseInfo();
  }, []);

  const getCaseInfo = () => {
    api
      .get(`/api/cases/view/${caseID}/`)
      .then((response) => response.data)
      .then((data) => setCaseData(data))
      .catch(() =>
        openToast("진행상황을 불러오지 못했어요.", {
          type: "top",
          lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
        })
      );
  };

  const postVariantDone = (id: number) => {
    api.post(`/api/variants/completion-status/${id}/`).catch(() =>
      openToast("저장하지 못했어요.", {
        type: "top",
        lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
      })
    );
  };

  const deleteVariantDone = (id: number) => {
    api.delete(`/api/variants/completion-status/${id}/`).catch(() =>
      openToast("삭제하지 못했어요.", {
        type: "top",
        lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
      })
    );
  };

  const onClickingAccessoryVariant = (id: number) => {
    const selectedVariant = caseData?.variants
      .filter((variant) => variant.id === id)
      .at(0);
    const isVariantDone = selectedVariant?.completed;

    if (isVariantDone === undefined) {
      openToast(
        "알 수 없는 문제가 발생했어요. 스크린샷을 관리자에게 공유해주세요.",
        {
          type: "top",
          lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
        }
      );
      return;
    }

    if (isVariantDone) {
      deleteVariantDone(id);
    } else {
      postVariantDone(id);
    }

    getCaseInfo();
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
          <DeviceSelect list={targetDevices} onCheck={setSelectedDevice} />
        }
      />
      <div>
        <SegmentedControl value={tabState} onChange={onTabStateChange}>
          <SegmentedControl.Item value={first}>{first}</SegmentedControl.Item>
          <SegmentedControl.Item value={second}>{second}</SegmentedControl.Item>
          <SegmentedControl.Item value={third}>{third}</SegmentedControl.Item>
        </SegmentedControl>
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
          <CTAButton color="dark" variant="weak" display="block">
            닫기
          </CTAButton>
        }
        rightButton={<CTAButton display="block">확인했어요</CTAButton>}
      />
    </>
  );
}
