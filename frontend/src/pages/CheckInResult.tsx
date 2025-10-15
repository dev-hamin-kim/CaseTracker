import { Spacing } from '@toss/emotion-utils';
import {
  Text,
  FixedBottomCTA,
  Asset,
} from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';

export function CheckInResult() {
  return (
    <>
      <Spacing size={10} />
      <>
        <Asset.Icon
          frameShape={Asset.frameShape.CleanW24}
          name="icon-arrow-back-ios-mono"
          color="#191F28ff"
          aria-hidden={true}
        />
      </>
      <Text color="#191F28ff" typography="t6" fontWeight="semibold">
        서비스 이름
      </Text>
      <>
        <Asset.Icon
          frameShape={Asset.frameShape.CleanW20}
          name="icon-dots-mono"
          color="rgba(0, 19, 43, 0.58)"
          aria-hidden={true}
        />
      </>
      <>
        <Asset.Icon
          frameShape={Asset.frameShape.CleanW20}
          name="icon-x-mono"
          color="rgba(0, 19, 43, 0.58)"
          aria-hidden={true}
        />
      </>
      <>
        <Asset.Image
          frameShape={Asset.frameShape.CleanW16}
          src="https://static.toss.im/icons/svg/icn-bank-fill-toss.svg"
          aria-hidden={true}
        />
      </>
      <Spacing size={183} />
      <>
        <Asset.Image
          frameShape={{ width: 100 }}
          src="https://static.toss.im/lotties/check-spot-apng.png"
          aria-hidden={true}
        />
      </>
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
      <FixedBottomCTA loading={false}>
        업무 시작하기
      </FixedBottomCTA>
    </>
  );
}