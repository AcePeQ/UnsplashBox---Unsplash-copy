import type { ILoginData } from "../features/authentication/useLogin";
import type { IRegisterData } from "../features/authentication/useRegister";
import type { IApiError, IRegisterResponse } from "../types/apiTypes";
import { API_URL } from "../utils/envVariables";

export async function loginApi(loginData: ILoginData) {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify(loginData),
    });

    if (!res.ok) {
      const error: IApiError = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error:", error.message);
      throw error;
    } else {
      console.error("Unknown error:", error);
      throw new Error("Something went wrong");
    }
  }
}

export async function registerApi(registerData: IRegisterData) {
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(registerData),
    });

    if (!res.ok) {
      const error: IApiError = await res.json();
      throw new Error(error.message);
    }

    const data: IRegisterResponse = await res.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error:", error.message);
      throw error;
    } else {
      console.error("Unknown error:", error);
      throw new Error("Something went wrong");
    }
  }
}

export async function logoutApi() {
  try {
    const res = await fetch(`${API_URL}/api/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      const error: IApiError = await res.json();
      throw new Error(error.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error:", error.message);
      throw error;
    } else {
      console.error("Unknown error:", error);
      throw new Error("Something went wrong");
    }
  }
}

export async function updateProfileImageApi(imageData: {
  profilePicture: string;
}) {
  try {
    const res = await fetch(`${API_URL}/api/auth/update-profile-image`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(imageData),
      credentials: "include",
    });

    if (!res.ok) {
      const error: IApiError = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error:", error.message);
      throw error;
    } else {
      console.error("Unknown error:", error);
      throw new Error("Something went wrong");
    }
  }
}
