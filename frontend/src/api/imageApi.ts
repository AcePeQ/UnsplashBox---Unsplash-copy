import { ACCESS_KEY } from "../utils/envVariables";

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
