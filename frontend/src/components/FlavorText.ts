interface FlavorText {
    count: number;
    text: string;
}

export function getFlavorText(completedCount: number): string {
    return dailyCompletionFlavorText.find(ft => ft.count === completedCount)?.text || "";
}

export const dailyCompletionFlavorText: FlavorText[] = [
    { count: 12, text: "알고 계셨나요? 유튜브에서 동영상 하나당 인식할 수 있는 최대한의 길이는 12시간입니다." },
    { count: 22, text: "어어 갑갑자자기기 글글자자가가 두두번번씩씩 써써져져요요" },
    { count: 42, text: "삶, 우주, 그리고 모든 것에 대한 답변" },
]