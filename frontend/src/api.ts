import { Storage } from "@apps-in-toss/web-framework";

const baseURL = import.meta.env.VITE_API_URL;

export interface SubmitProps {
  username: string;
  password: string;
}

export async function requestWithoutToken(url: string, method: string, submit: SubmitProps) {
    const targetURL = baseURL + url;

    try {
        const response = await fetch(targetURL, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submit)
        });
        
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function requestWithToken(url: string, method: string) {
  const targetURL = baseURL + url;
  const accessToken = await Storage.getItem("access");

  try {
    const response = await fetch(targetURL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}
