import { useState, useEffect } from "react";
import { List, useToast, Top, Skeleton } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";

import { CaseItem } from "../components/CaseItem";
import { requestWithToken } from "../api";

interface Case {
  id: number;
  name: string;
  description: string;
  added_by: string | null;
  created_at: string;
}

export function CaseList() {
  const [cases, setCases] = useState<Case[]>([]);
  const { openToast } = useToast();

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
      />

      <List>
        {!cases?.length ? (
          <Skeleton pattern="listWithIconOnly" />
        ) : (
          cases.map((item) => (
            <CaseItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
            />
          ))
        )}
      </List>
    </div>
  );
}
