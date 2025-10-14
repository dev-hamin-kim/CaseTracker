import {
  // assetFrameShape,
  // AssetIcon,
  // AssetContentIcon,
  Asset,
  // Text,
  // AssetImage,
  // AssetContentImage,
  Top,
  // TopTitleParagraph,
  // TopSubtitleParagraph,
  FixedBottomCTA,
} from '@toss/tds-mobile';
import { Spacing } from '@toss/emotion-utils';
import { adaptive } from '@toss/tds-colors';

export default function App() {
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
      <>
        <Asset.Image
          frameShape={{ width: 200 }}
          src="https://static.toss.im/icons/png/4x/menu-list.png"
          aria-hidden={true}
        />
      </>
      <FixedBottomCTA loading={false}>출근하기</FixedBottomCTA>
    </>
  );
}
