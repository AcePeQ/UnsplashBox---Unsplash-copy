import type { ILoginData } from "../features/authentication/useLogin";
import { API_URL } from "../utils/envVariables";

export async function loginApi(loginData: ILoginData) {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      headers: {},
      method: "POST",
      body: JSON.stringify(loginData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
