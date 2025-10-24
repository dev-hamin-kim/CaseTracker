import React from "react";

import {
  ProgressStepper,
  ProgressStep,
  Top,
  TextField,
  FixedBottomCTA,
  CTAButton,
} from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";
import { Spacing } from "@toss/emotion-utils";

export function CreateCase() {
  const [stepValue, setStepValue] = React.useState(0);

  return (
    <>
      <Spacing size={14} />
      <ProgressStepper
        variant="compact"
        paddingTop="wide"
        activeStepIndex={stepValue}
      >
        <ProgressStep title="케이스 이름" />
        <ProgressStep title="수집 대상 기기" />
        <ProgressStep title="악세사리" />
      </ProgressStepper>
      <Top
        title={
          <Top.TitleParagraph size={22} color={adaptive.grey900}>
            수집할 케이스의 이름을 입력해주세요.
          </Top.TitleParagraph>
        }
      />
      {/* 숫자키패드 사용을 위해서는 type="number" 대신 inputMode="numeric"를 사용해주세요. */}
      <TextField.Clearable
        variant="box"
        hasError={false}
        label="이름"
        labelOption="sustain"
        help="케이스 이름은 필수로 입력해야 해요."
        value=""
        placeholder="예: 정상_과한표정"
        autoFocus={true}
      />
      {/* 숫자키패드 사용을 위해서는 type="number" 대신 inputMode="numeric"를 사용해주세요. */}
      <TextField.Clearable
        variant="box"
        hasError={false}
        label="레이블"
        labelOption="sustain"
        value=""
        placeholder="과한 표정(웃음 등)을 짓는 경우"
      />
      <FixedBottomCTA.Double
        leftButton={
          <CTAButton
            color="dark"
            variant="weak"
            display="block"
            disabled={true}
          >
            (나중에 임시저장 구현하기)
          </CTAButton>
        }
        rightButton={<CTAButton
            display="block"
            onTap={() => {
                setStepValue((prev) => prev + 1);
            }}
            >다음</CTAButton>}
      />
    </>
  );
}
