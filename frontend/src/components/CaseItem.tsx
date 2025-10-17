import { ListRow } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";

interface Props {
  name: string;
  description: string;
}

export function CaseItem({ name, description }: Props) {
  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="2RowTypeA"
          top={name}
          topProps={{ color: adaptive.grey700, fontWeight: "bold" }}
          bottom={description}
          bottomProps={{ color: adaptive.grey600 }}
        />
        
      }
      verticalPadding="large"
      horizontalPadding="medium"
    />
  );
}
