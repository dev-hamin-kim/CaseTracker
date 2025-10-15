import {
  Asset,
  Text,
  SegmentedControl
} from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';

export default function AccessoryVariant() {
    return (
    <>
      <div>
        <SegmentedControl
          alignment="fixed"
          value="0-낮음"
          disabled={false}
          size="large"
          name="SegmentedControl"
        >
          <SegmentedControl.Item value="0-낮음">낮음</SegmentedControl.Item>
          <SegmentedControl.Item value="1-높음">높음</SegmentedControl.Item>
          <SegmentedControl.Item value="2-중간">중간</SegmentedControl.Item>
        </SegmentedControl>
        <SegmentedControl
          alignment="fixed"
          value="0-낮음"
          disabled={false}
          size="large"
          name="SegmentedControl"
        >
          <SegmentedControlItem value="0-낮음">낮음</SegmentedControlItem>
          <SegmentedControlItem value="1-높음">높음</SegmentedControlItem>
          <SegmentedControlItem value="2-중간">중간</SegmentedControlItem>
        </SegmentedControl>
        <>
          <Asset.Icon
            frameShape={Asset.frameShape.CleanW24}
            backgroundColor="transparent"
            name="icon-emoji"
            aria-hidden={true}
            ratio="1/1"
          />
        </>
        <>
          <Asset.Icon
            frameShape={assetFrameShape.CleanW24}
            backgroundColor="transparent"
            name="icon-emoji"
            aria-hidden={true}
            ratio="1/1"
          />
        </>
        <Text
          color={adaptive.grey700}
          typography="t6"
          fontWeight="medium"
          textAlign="center"
        >
          없음
        </Text>
        <>
          <Asset.Icon
            frameShape={Asset.frameShape.CleanW24}
            backgroundColor="transparent"
            name="icon-glasses"
            aria-hidden={true}
            ratio="1/1"
          />
        </>
        <>
          <AssetIcon
            frameShape={assetFrameShape.CleanW24}
            backgroundColor="transparent"
            name="icon-glasses"
            aria-hidden={true}
            ratio="1/1"
          />
        </>
        <Text
          color={adaptive.grey700}
          typography="t6"
          fontWeight="medium"
          textAlign="center"
        >
          안경
        </Text>
        <>
          <Asset.Image
            frameShape={Asset.frameShape.CleanW24}
            backgroundColor="transparent"
            src="https://static.toss.im/2d-emojis/png/4x/u1F3A9.png"
            aria-hidden={true}
            style={{ aspectRatio: '1/1' }}
          />
        </>
        <>
          // 버튼으로 사용하는 경우 IconButton을 사용하거나 role="button"과
          aria-label 값을 작성해주세요
          <AssetImage
            frameShape={assetFrameShape.CleanW24}
            backgroundColor="transparent"
            src="https://static.toss.im/2d-emojis/png/4x/u1F3A9.png"
            aria-hidden={true}
            style={{ aspectRatio: '1/1' }}
          />
        </>
        <Text
          color={adaptive.grey700}
          typography="t6"
          fontWeight="medium"
          textAlign="center"
        >
          모자
        </Text>
        <>
          <Asset.Icon
            frameShape={Asset.frameShape.CleanW24}
            backgroundColor="transparent"
            name="icon-mask"
            aria-hidden={true}
            ratio="1/1"
          />
        </>
        <>
          <AssetIcon
            frameShape={assetFrameShape.CleanW24}
            backgroundColor="transparent"
            name="icon-mask"
            aria-hidden={true}
            ratio="1/1"
          />
        </>
        <Text
          color={adaptive.grey700}
          typography="t6"
          fontWeight="medium"
          textAlign="center"
        >
          마스크
        </Text>
      </div>
    </>
  );
}