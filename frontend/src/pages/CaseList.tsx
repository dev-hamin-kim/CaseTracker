import { useState, useEffect } from "react";
import { List, useToast } from "@toss/tds-mobile";

import { CaseItem } from "../components/CaseItem";
import api from "../api";

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

  const getCases = () => {
    api
      .get("/api/cases/")
      .then((response) => response.data)
      .then((data) => setCases(data))
      .catch(() =>
        openToast("케이스 목록을 불러오는데 실패했어요.", {
          type: "top",
          lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
        })
      );
  };

  return (
  <div className="case-containter">
    <List>
      {cases.map((item) => (
        <CaseItem
          key={item.id}
          name={item.name}
          description={item.description}
        />
      ))}
    </List>
  </div>
  );
}
