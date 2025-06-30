import type { IApiError } from "../types/apiTypes";
import type { IImageTypes } from "../types/imageTypes";
import { ACCESS_KEY, API_URL } from "../utils/envVariables";

export async function getImageApi(imageId: string) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/${imageId}?client_id=${ACCESS_KEY}`
    );

    if (!res.ok) {
      throw new Error(`Something went wrong with getting image!`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function downloadImageApi(downloadLink: string) {
  try {
    const res = await fetch(`${downloadLink}&client_id=${ACCESS_KEY}`);

    if (!res.ok) {
      throw new Error(
        `Something went wrong with downloading image from Unsplash`
      );
    }

    const data = await res.json();

    const imageRes = await fetch(data.url);
    const blob = await imageRes.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "unsplash-image.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
}

export async function addImageToCollectionApi(imageData: {
  collection_id: string;
  image: IImageTypes;
}) {
  try {
    const res = await fetch(
      `${API_URL}/api/collection/add-image-to-collection`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(imageData),
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

export async function removeImageFromCollectionApi(imageData: {
  collection_id: string;
  image_id: string;
}) {
  try {
    const res = await fetch(
      `${API_URL}/api/collection/delete-image-from-collection`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(imageData),
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
