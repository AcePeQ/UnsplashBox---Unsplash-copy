import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchResultApi } from "../../api/searchApi";

export function useGetSearchResult(query?: string) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["searchResult", query],
    queryFn: ({ pageParam }) => getSearchResultApi(query as string, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.lastPage === 0) return undefined;
      return lastPageParam + 1;
    },
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
}
