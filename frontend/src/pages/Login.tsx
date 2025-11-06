import { useState, useEffect } from "react";
import { Top, BottomCTA, TextField, useToast } from "@toss/tds-mobile";
import { Storage } from "@apps-in-toss/web-framework";

import { useNavigate } from "@tanstack/react-router";

import { requestWithoutToken } from "../api";
import type { SubmitProps } from "../api";

export function Login() {
  useEffect(() => {
    loadRecentUsername()
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { openToast } = useToast();

  const loadRecentUsername = async () => {
    const recentUsername = await Storage.getItem('recentUsername')

    setUsername(recentUsername ?? "")
  }

  const handleSubmit = async (e: SubmitProps) => {
    setLoading(true);

    await Storage.clearItems()

    try {
      const response = await requestWithoutToken("api/token/", "POST", e);

      await Storage.setItem('recentUsername', username)
      await Storage.setItem('refresh', response.refresh as string);
      await Storage.setItem('access', response.access as string);

      navigate({ to: "/CheckIn" });
    } catch (error) {
      openToast(`error while login: ${error}`, {
        type: "top",
        lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Top
      title={
        <Top.TitleParagraph>
          로그인이 필요해요.
        </Top.TitleParagraph>
      }
      subtitleBottom={
        <Top.SubtitleTextButton>
          아이디 혹은 비밀번호를 잊었나요?
        </Top.SubtitleTextButton>
      }
      >


      </Top>
      <div>
        <TextField
          variant="box"
          label="아이디"
          labelOption="sustain"
          placeholder="asst + 사번 + @tosspartners.com"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></TextField>

        <TextField.Password
          variant="box"
          label="비밀번호"
          labelOption="sustain"
          placeholder="기본값은 010-0000-0000 이예요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></TextField.Password>
      </div>
      <div>
        <BottomCTA
          loading={loading}
          onTap={() => handleSubmit({ username, password })}
        >
          로그인
        </BottomCTA>
      </div>
    </div>
  );
}
