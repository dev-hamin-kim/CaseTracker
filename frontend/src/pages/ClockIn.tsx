import { useState, useEffect } from "react";
import { FixedBottomCTA, Top, GridList, Tab, Skeleton } from "@toss/tds-mobile";
import { Spacing } from "@toss/emotion-utils";

import { requestWithToken } from "../api";

interface AttendanceRecordResponse {
  date: string;
  count: number;
  records: AttendanceRecord[];
}

interface AttendanceRecord {
  id: number;
  user: number;
  user_full_name: string;
  date: string;
  clock_in_time: string | null;
  clock_out_time: string | null;
  completed_variants_count: number;
}

interface RecordDisplay {
  id: number;
  name: string;
  time: string | null;
}

export function ClockIn() {
  const [username, setUsername] = useState("");
  const [userAlreadyClockedInOrOut, setUserAlreadyClockedInOrOut] =
    useState(false);
  const [processingRequest, setProcessingRequest] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [pageState, setPageState] = useState<"출근" | "퇴근">("출근");

  const [attendanceRecord, setAttendanceRecord] = useState<AttendanceRecord[]>(
    []
  );

  // const qwe = attendanceRecord.find(record => {
  //   if (record.user_full_name === username) {
  //     setUserAlreadyClockedInOrOut(true)
  //   }
  // });

  const recordDisplay: RecordDisplay[] = attendanceRecord.map((record) => ({
    id: record.id,
    name: record.user_full_name,
    time: selectedTabIndex === 0 ? record.clock_in_time : record.clock_out_time,
  }));

  const onTappingBottomCTA = async () => {
    setProcessingRequest(true);

    try {
      if (selectedTabIndex === 0) {
        await requestWithToken("attendance/clock-in/", "POST");
      }

      if (selectedTabIndex === 1) {
        await requestWithToken("attendance/clock-out/", "POST");
      }

      await fetchAttendanceRecords();
    } finally {
      setProcessingRequest(false);
    }
  };

  const fetchAttendanceRecords = async () => {
    requestWithToken("attendance/records/", "GET")
      .then((response) => {
        const data = response as AttendanceRecordResponse;
        setAttendanceRecord(data.records);
      })
      .catch((error) => {
        console.error("Error fetching attendance records:", error);
      });
  };

  const getUsername = async () => {
    requestWithToken("user/fullname/", "GET").then((data) =>
      setUsername(data.fullname as string)
    );
  };

  useEffect(() => {
    getUsername();
    fetchAttendanceRecords();
  }, []);

  useEffect(() => {
    const already = checkIfUserAlreadyClocked(
      pageState,
      username,
      attendanceRecord
    );
    setUserAlreadyClockedInOrOut(already);
  }, [attendanceRecord, pageState, username]);

  return (
    <>
      <Top
        title={
          username === "" ? (
            <Top.TitleParagraph>로딩 중...</Top.TitleParagraph>
          ) : (
            <Top.TitleParagraph>
              {userAlreadyClockedInOrOut
                ? `이미 ${pageState}체크를 완료했어요.`
                : username + `님, 아직 ${pageState}체크를 하지 않았어요.`}
            </Top.TitleParagraph>
          )
        }
      />

      <Tab
        size="small"
        onChange={(index) => {
          setSelectedTabIndex(index);
          setPageState(index === 0 ? "출근" : "퇴근");
        }}
      >
        <Tab.Item selected={selectedTabIndex === 0}>출근</Tab.Item>
        <Tab.Item selected={selectedTabIndex === 1}>퇴근</Tab.Item>
      </Tab>

      <Spacing size={14} />

      {attendanceRecord.length === 0 ? (
        <Skeleton pattern="listOnly" />
      ) : (
        <GridList column={3}>
          {recordDisplay
            .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
            .map((record) => (
              <GridList.Item key={record.id} image={<></>}>
                {`${record.name}\n${record.time ?? "--:--"}`}
              </GridList.Item>
            ))}
        </GridList>
      )}

      <FixedBottomCTA
        onTap={onTappingBottomCTA}
        loading={processingRequest}
        disabled={userAlreadyClockedInOrOut}
      >
        {pageState}하기
      </FixedBottomCTA>
    </>
  );
}

function timeToMinutes(time: string | null): number {
  if (!time) return Infinity;
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function checkIfUserAlreadyClocked(
  state: "출근" | "퇴근",
  username: string,
  records: AttendanceRecord[]
) {
  const userRecord = records.find((r) => r.user_full_name === username);

  if (!userRecord) return false;

  if (state === "출근") {
    return userRecord.clock_in_time !== null;
  }

  if (state === "퇴근") {
    return userRecord.clock_out_time !== null;
  }

  return false;
}


// interface LogoutCTAProps {
//   isOpen: boolean;
//   onClickingLogout: () => void;
//   onClickingGoBack: () => void;
// }

// function ClockOutCTA({
//   isOpen,
//   onClickingGoBack,
//   onClickingLogout,
// }: LogoutCTAProps) {
//   return (
//     <div style={{ padding: 16 }}>
//       <BottomSheet
//         open={isOpen}
//         header={
//           <BottomSheet.Header>정말 로그아웃 하시겠어요?</BottomSheet.Header>
//         }
//         cta={
//           // @here
//           <BottomSheet.DoubleCTA
//             leftButton={
//               <Button variant="weak" color="dark" onClick={onClickingGoBack}>
//                 돌아가기
//               </Button>
//             }
//             rightButton={
//               <Button color="danger" onClick={onClickingLogout}>
//                 로그아웃하기
//               </Button>
//             }
//           />
//         }
//       >
//         <Post.Paragraph>진짜요?</Post.Paragraph>
//       </BottomSheet>
//     </div>
//   );
// }
