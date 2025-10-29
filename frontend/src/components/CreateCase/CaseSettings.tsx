// import { Top, TextField } from "@toss/tds-mobile";
// import { adaptive } from "@toss/tds-colors";

// interface Props {
//   progressIndex: number;
//   caseName: string;
//   caseDescription: string;
// }

// export function CaseSettings({ progressIndex }: Props) {
//   switch (progressIndex) {
//     case 0:
//       return <CaseName />;
//     case 1:
//       return <TargetDevices />;
//     case 2:
//       return <Accessories />;
//     default:
//       return <>invalid progressIndex</>;
//   };
// }

// function CaseName() {
//   return (
//     <>
//       <Top
//         title={
//           <Top.TitleParagraph size={22} color={adaptive.grey900}>
//             수집할 케이스의 이름을 입력해주세요.
//           </Top.TitleParagraph>
//         }
//       />
//       {/* 숫자키패드 사용을 위해서는 type="number" 대신 inputMode="numeric"를 사용해주세요. */}
//       <TextField.Clearable
//         variant="box"
//         hasError={false}
//         label="케이스 이름"
//         labelOption="sustain"
//         help="케이스 이름은 필수로 입력해야 해요."
//         value=""
//         placeholder="예: 정상_과한표정"
//         autoFocus={true}
//       />
//       {/* 숫자키패드 사용을 위해서는 type="number" 대신 inputMode="numeric"를 사용해주세요. */}
//       <TextField.Clearable
//         variant="box"
//         hasError={false}
//         label="설명"
//         labelOption="sustain"
//         value=""
//         placeholder="예: 과한 표정(웃음 등)을 짓는 경우"
//       />
//     </>
//   );
// }

// function TargetDevices() {
//   return <></>;
// }

// function Accessories() {
//   return <></>;
// }

// function 