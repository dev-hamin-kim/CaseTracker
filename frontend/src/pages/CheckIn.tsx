import { Asset, Top, FixedBottomCTA } from '@toss/tds-mobile';
import { Spacing } from '@toss/emotion-utils';
import { adaptive } from '@toss/tds-colors';
import { useNavigate } from '@tanstack/react-router';

export function CheckIn() {
    const navigate = useNavigate();

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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Asset.Image
          frameShape={{ width: 200 }}
          src="https://static.toss.im/icons/png/4x/menu-list.png"
          aria-hidden={true}
        />
      </div>
      <FixedBottomCTA onTap={ () => {
        navigate({ to: '/CaseList' });
      } } loading={false}>케이스 목록 보기</FixedBottomCTA>
    </>
  );
}
