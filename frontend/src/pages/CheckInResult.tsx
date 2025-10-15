import { Spacing } from "@toss/emotion-utils";
import { Text, FixedBottomCTA, Asset } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";

export function CheckInResult() {
  return (
    <>
      <Spacing size={183} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Asset.Image
          frameShape={{
            width: 100,
            height: 100,
          }}
          src="https://static.toss.im/lotties/check-spot-apng.png"
          aria-hidden={true}
        />
      </div>
      <Spacing size={24} />
      <Text
        display="block"
        color={adaptive.grey800}
        typography="t2"
        fontWeight="bold"
        textAlign="center"
      >
        출근 체크를 완료했어요.
      </Text>
      <Text
        display="block"
        color={adaptive.grey700}
        typography="t5"
        fontWeight="regular"
        textAlign="center"
      >
        오늘 하루도 화이팅이예요!
      </Text>
      <FixedBottomCTA loading={false}>업무 시작하기</FixedBottomCTA>
    </>
  );
}
