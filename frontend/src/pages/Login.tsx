import { useState } from "react";
import { BottomCTA, TextField, useToast } from "@toss/tds-mobile";
import { Storage } from "@apps-in-toss/web-framework";

import { useNavigate } from "@tanstack/react-router";

import { requestWithoutToken } from "../api";
import type { SubmitProps } from "../api";

export function Login() {
  const [username, setUsername] = useState("ct_admin");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { openToast } = useToast();

  const handleSubmit = async (e: SubmitProps) => {
    setLoading(true);

    await Storage.clearItems()

    try {
      const response = await requestWithoutToken("api/token/", "POST", e);

      // await Storage.setItem('refresh', response.data.refresh as string);
      await Storage.setItem('access', response.access as string);
    } catch (error) {
      openToast(`error while login: ${error}`, {
        type: "top",
        lottie: `https://static.toss.im/lotties-common/error-yellow-spot.json`,
      });
    } finally {
      setLoading(false);
      navigate({ to: "/CheckIn" });
    }
  };
  return (
    <div>
      <div>
        <TextField
          variant="box"
          label="아이디"
          labelOption="sustain"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></TextField>

        <TextField.Password
          variant="box"
          label="비밀번호"
          labelOption="sustain"
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
