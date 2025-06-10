import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSearchResultApi } from "../../api/searchApi";

export function useGetSearchResult(query: string, page: number) {
  const { data, isPending, error, isError, isFetched, isPlaceholderData } =
    useQuery({
      queryKey: ["searchResult"],
      queryFn: () => getSearchResultApi(query, page),
      placeholderData: keepPreviousData,
    });

  return { data, isPending, error, isError, isFetched, isPlaceholderData };
}
