import { useState, useEffect } from "react";
import { List, useToast, Top, Skeleton, Border } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";

import type { Case } from "../components/CaseTrack/constants";
import { CaseItem } from "../components/CaseItem";
import { requestWithToken } from "../api";
import { ProgressBarChart } from "./ProgressBarChart";

export function CaseList() {
  const [cases, setCases] = useState<Case[]>([]);
  const [progressBarChartIsShown, setProgressBarChartIsShown] = useState(false);
  const [progressBarChartIsLoading, setProgressBarChartIsLoading] =
    useState(false);
  const { openToast } = useToast();

  const onTappingTopLowerButton = async () => {
    try {
      setProgressBarChartIsLoading(true);

      if (!progressBarChartIsShown) {
        const updatedCases = await Promise.all(
          cases.map(async (caseItem) => {
            // Fetch case detail (with variants)
            const detailedCase = await getCaseInfo(caseItem.id);
            return { ...caseItem, variants: detailedCase?.variants ?? [] };
          })
        );

        setCases(updatedCases);
      }
    } finally {
      setProgressBarChartIsLoading(false);
    }

    setProgressBarChartIsShown(!progressBarChartIsShown);
  };

  useEffect(() => {
    getCases();
  }, []);

  const getCases = async () => {
    const url = "api/cases/"

    requestWithToken(url, "GET")
      .then((data) => setCases(data))
      .catch((error) =>
        openToast(error + "케이스 목록을 불러오는데 실패했어요.", {
          type: "top",
          lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
        })
      );
  };

  return (
    <div className="case-containter">
      <Top
        title={
          <Top.TitleParagraph size={22} color={adaptive.grey900}>
            내가 진행하던 케이스에요.
          </Top.TitleParagraph>
        }
        lower={
          <Top.LowerButton
            onTap={onTappingTopLowerButton}
            loading={progressBarChartIsLoading}
          >
            {progressBarChartIsShown ? "가리기" : "디바이스별 진행상황 보기"}
          </Top.LowerButton>
        }
        // subtitleBottom={<Top.SubtitleParagraph size={13}>어떤 디바이스를 고를지 고민인가요?</Top.SubtitleParagraph>}
      />

      <List>
        {!cases?.length ? (
          <Skeleton pattern="listWithIconOnly" />
        ) : (
          cases.map((item) => (
            <>
              <CaseItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
              />

              {progressBarChartIsShown ? (
                <>
                  <ProgressBarChart variants={item.variants} />
                  <Border variant="height16" />
                </>
              ) : null}
            </>
          ))
        )}
      </List>
    </div>
  );
}
