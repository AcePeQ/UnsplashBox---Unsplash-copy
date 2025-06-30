import type { IApiError } from "../types/apiTypes";
import { API_URL } from "../utils/envVariables";

export async function getUserCollections() {
  try {
    const res = await fetch(`${API_URL}/api/collection/collections`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
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

export async function getCollection(collection_name: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/collection/collection?collection_name=${encodeURIComponent(
        collection_name
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
      }
    );

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

export async function createCollection(collectionData: {
  collection_name: string;
}) {
  try {
    const res = await fetch(`${API_URL}/api/collection/create-collection`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(collectionData),
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
