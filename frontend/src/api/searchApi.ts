const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function getSearchResultApi(query: string, page: number) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${ACCESS_KEY}`,
      { method: "GET" }
    );

    if (!res.ok) {
      throw new Error("Something went wrong with getting the photos!");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
