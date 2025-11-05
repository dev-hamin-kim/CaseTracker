import { Storage } from "@apps-in-toss/web-framework";

const baseURL = import.meta.env.VITE_API_URL;

export interface SubmitProps {
  username: string;
  password: string;
}

export async function requestWithoutToken(
  url: string,
  method: string,
  submit: SubmitProps
) {
  const targetURL = baseURL + url;

  try {
    const response = await fetch(targetURL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submit),
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function isRefreshTokenValid() {
  const targetURL = baseURL + "api/token/verify/";
  const refreshToken = await Storage.getItem("refresh");

  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(targetURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      await Storage.removeItem("access");
      await Storage.removeItem("refresh");
      return false;
    }

    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function requestWithToken(url: string, method: string) {
  const targetURL = baseURL + url;
  let accessToken = await Storage.getItem("access");
  const refreshToken = await Storage.getItem("refresh");

  try {
    let response = await fetch(targetURL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      // Try to refresh token
      const refreshResponse = await fetch(`${baseURL}/api/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!refreshResponse.ok) {
        await Storage.removeItem("access");
        await Storage.removeItem("refresh");
        throw new Error("Refresh token expired");
      }

      const refreshData = await refreshResponse.json();
      accessToken = refreshData.access;
      await Storage.setItem("access", accessToken ?? "");

      // Retry original request with new access token
      response = await fetch(targetURL, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
